const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const zxcvbn = require("zxcvbn");

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
  const { id, token } = req.params;
  const { password } = req.body;

  // Find the user by user id
  const user = await User.findOne({ _id: id }).then((user) => {
    if (!user) {
      return res.send({ Status: "User not existed" });
    }

    const userEmail = user.email;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "youremail@gmail.com",
        pass: "your password",
      },
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: userEmail,
      subject: "Reset Password Link",
      text: `http://localhost:5173/reset_password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });
  });

  // jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
  //   if (err) {
  //     return res.json({ Status: "Error with token" });
  //   } else {
  //     bcrypt
  //       .hash(password, 10)
  //       .then((hash) => {
  //         UserModel.findByIdAndUpdate({ _id: id }, { password: hash })
  //           .then((u) => res.send({ Status: "Success" }))
  //           .catch((err) => res.send({ Status: err }));
  //       })
  //       .catch((err) => res.send({ Status: err }));
  //   }
  // });
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

            // Check password strength
            const passwordStrength = zxcvbn(newPassword).score;
            // console.log(passwordStrength);
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
  updatePassword,
};
