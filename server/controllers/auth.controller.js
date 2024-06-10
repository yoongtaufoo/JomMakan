const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const zxcvbn = require("zxcvbn");
const nodemailer = require("nodemailer");

// POST register users
const register = async (req, res) => {
  const { username, location, email, password, password2, profilePic } =
    req.body;

  try {
    // Check password strength
    const passwordStrength = zxcvbn(password).score;
    // console.log(passwordStrength);
    if (passwordStrength < 3) {
      return res.status(400).json({
        message: "Password strength must be at least 'Good' to sign up.",
      });
    }

    // Check retype password
    if (password !== password2) {
      return res.status(400).json({
        message: "Passwords do not match.",
      });
    }

    // Check if the email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      let errorMessage = "";
      if (existingUser.email === email && existingUser.username === username) {
        errorMessage = "Email and Username already exists";
      } else if (existingUser.email === email) {
        errorMessage = "Email already exists";
      } else {
        errorMessage = "Username already exists";
      }
      return res.status(400).json({ message: errorMessage });
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user ans dave to db
    const newUser = new User({
      username,
      location,
      email,
      password: hashedPassword,
      profilePic,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

// POST Log in user
const login = async (req, res) => {
  try {
    // Check if the user exists
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email is not registered." });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Wrong Password." });

    // Generate cookie token and send to the user

    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
    const age = 1000 * 60 * 60 * 24 * 7; // expired in one week (in millisecond)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: age,
    });

    // console.log(user);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: age,
      })
      .status(200)
      .json({
        token,
        // user: { _id: user._id, username: user.username, email: user.email },
        user: { _id: user._id },
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login." });
  }
};

// Log out
const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful." });
};

// forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res
        .status(400)
        .send({ Status: "Error", Message: "Email has not registered" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10m",
    });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "JomMakan Reset Password Link",
      // text: `http://localhost:5173/reset-password/${user._id}/${token}`,
      html: `<h1>Reset Your JomMakan Password</h1>
      <p>Click on the following link to reset your password:</p>
      <a href="http://localhost:5173/reset-password/${user._id}/${token}">http://localhost:5173/reset-password/${user._id}/${token}</a>
      <p>The link will expire in 10 minutes.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ Status: "Error", Message: "Failed to send email" });
      } else {
        return res.send({
          Status: "Success",
          Message: `Reset password link has been sent to ${email}. Please check your email.`,
        });
      }
    });
  });
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      // return res.json({ Status: "Error", Message: "Error with token" });
      return res.json({ Status: "Error", Message: "The link has expired" });
    } else {
      try {
        const user = await User.findById(id);
        if (!user) {
          return res.json({ Status: "Error", Message: "User not found" });
        }

        // Check password strength
        const passwordStrength = zxcvbn(password).score;
        if (passwordStrength < 3) {
          return res.status(400).json({
            Status: "Error",
            Message: "Password strength must be at least 'Good'",
          });
        }

        // Check if new password is the same as the old password
        const isSamePassword = await bcrypt.compare(password, user.password);
        if (isSamePassword) {
          return res.json({
            Status: "Error",
            Message: "New password cannot be the same as the old password",
          });
        }

        // Hash new password and update
        const hash = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(id, { password: hash });

        return res.json({
          Status: "Success",
          Message: "Reset password successfully",
        });
      } catch (err) {
        return res.json({ Status: "Error", Message: err.message });
      }
    }
  });
};

// update password (User Profile)
const updatePassword = async (req, res) => {
  const { token, userId, currentPassword, newPassword } = req.body;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" });
    } else {
      User.findById(userId)
        .then((user) => {
          if (!user) {
            return res.json({ Status: "User not found" });
          }

          // Compare current password
          bcrypt.compare(currentPassword, user.password, (err, isMatch) => {
            if (err) return res.json({ Status: "Error comparing passwords" });
            if (!isMatch)
              return res.json({ Status: "Incorrect current password" });

            // Check if new password is the same as the current password
            bcrypt.compare(newPassword, user.password, (err, isMatch) => {
              if (err) return res.json({ Status: "Error comparing passwords" });
              if (isMatch)
                return res.json({
                  Status: "New password cannot be the same as current password",
                });

              // Check password strength
              const passwordStrength = zxcvbn(newPassword).score;
              if (passwordStrength < 3) {
                return res.json({
                  Status: "Password strength must be at least 'Good'",
                });
              }

              // Hash new password and update
              bcrypt.hash(newPassword, 10, (err, hash) => {
                if (err)
                  return res.json({ Status: "Error hashing new password" });

                user.password = hash;
                user
                  .save()
                  .then(() => res.json({ Status: "Success" }))
                  .catch((err) => res.json({ Status: err.message }));
              });
            });
          });
        })
        .catch((err) => res.json({ Status: err.message }));
    }
  });
};

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
};
