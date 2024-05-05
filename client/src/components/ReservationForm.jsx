import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ReservationForm = (props) => {
  const [submit, setSubmit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [dateinput, setDateInput] = useState("");
  const [timestartinput, setTimeStartInput] = useState("");
  const [timeendinput, setTimeEndInput] = useState("");
  const [nameinput, setNameInput] = useState("");
  const [phoneinput, setPhoneInput] = useState("");
  const [paxinput, setPaxInput] = useState("");
  const [tableinput, setTableInput] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  let userid = "User123";

  // get userid from local storage
  const storedUser = JSON.parse(localStorage.getItem("JomMakanUser"));
  if (storedUser) {
    userid = storedUser.user._id;
  }

  const { id } = useParams();
  const restaurantid = parseInt(id);

  const tables = props.tables;
  const [numberOfPax, setNumberOfPax] = useState(0);
  const popRef = useRef(null);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split("T")[0];

  const handleClickOutside = (event) => {
    if (popRef.current && !popRef.current.contains(event.target)) {
      setConfirm(false);
      setSubmit(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isFormValid, setIsFormValid] = useState(false); // State to track overall form validity

  // Function to handle input changes and check form validity
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update state based on input name
    switch (name) {
      case "dateinput":
        setDateInput(value); // Pass checkFormValidity as callback
        break;
      case "timestartinput":
        setTimeStartInput(value); // Pass checkFormValidity as callback
        break;
      case "timeendinput":
        setTimeEndInput(value); // Pass checkFormValidity as callback
        break;
      case "nameinput":
        setNameInput(value); // Pass checkFormValidity as callback
        break;
      case "phoneinput":
        setPhoneInput(value); // Pass checkFormValidity as callback
        break;
      case "paxinput":
        setPaxInput(value); // Pass checkFormValidity as callback
        break;
      case "tableinput":
        setTableInput(value); // Pass checkFormValidity as callback
        break;
      default:
        break;
    }
  };

  // Effect to check form validity and log state values
  useEffect(() => {
    // Check if all required fields are filled
    const isValid =
      dateinput !== "" &&
      timestartinput !== "" &&
      timeendinput !== "" &&
      nameinput !== "" &&
      phoneinput !== "" &&
      paxinput !== "" &&
      tableinput !== "";
    //CHANGE
    
    // Log current input values
    console.log(
      "dateinput: ",
      dateinput,
      "timestartinput: ",
      timestartinput,
      "timeendinput",
      timeendinput,
      "nameinput",
      nameinput,
      "phoneinput",
      phoneinput,
      "paxinput",
      paxinput,
      "tableinput",
      tableinput,
      // "userid",
      // userid,
      "restaurantid",
      restaurantid
    );

    // Update form validity state
    setIsFormValid(isValid);
  }, [
    dateinput,
    timestartinput,
    timeendinput,
    nameinput,
    phoneinput,
    paxinput,
    tableinput,
    // status,
    // userid,
    // restaurantid,
  ]);

  const handleConfirm = () => {
    if (!isFormValid) {
      alert("Please fill in all required fields.");
      return;
    }
    if (!isChecked) {
      alert(
        "Please check the box to indicate that you have read and understood the Registration Policy."
      );
      return; // Stop further execution if isChecked is false
    }
    const token = localStorage.getItem("JomMakanUser"); // Get JWT from localStorage
    if (!token) {
      alert("User is not authenticated."); // Handle case where user is not authenticated
      return;
    }
    axios
      .post("http://localhost:3001/api/reservation/reserve", {
        date: dateinput,
        timestart: timestartinput,
        timeend: timeendinput,
        name: nameinput,
        phone: phoneinput,
        pax: paxinput,
        table_id: tableinput,
        status: "U",
        restaurant_id: restaurantid,
      }
        , {
        headers: {
          Authorization: token, // Include JWT in request headers
        },
        }
      )
      .then(() => {
        alert("Reserved Successfully");
        setDateInput("");
        setTimeStartInput("");
        setTimeEndInput("");
        setNameInput("");
        setPhoneInput("");
        setPaxInput("");
        setTableInput("");
        setConfirm(true);
      })
      .catch((error) => {
        console.log("Unable to reserve user");
      });
  };

  // Handle change event for the number of pax input
  const handlePaxChange = (event) => {
    if (props.tables !== null) {
      setNumberOfPax(parseInt(event.target.value));
    }
  };

  // Generate select options for pax no
  const nopaxOptions = props.tables
    ? [
        <option key="null" value=""></option>,
        ...Array.from(
          { length: Math.max(...props.tables.map((table) => table.pax)) },
          (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          )
        ),
      ]
    : [];

  // const nopaxOptions = [];
  // if (props.tables !== null) {
  //   for (let i = 1; i <= Math.max(...tables.map((table) => table.pax)); i++) {
  //     nopaxOptions.push(
  //       <option key={i} value={i}>
  //         {i}
  //       </option>
  //     );
  //   }
  // }

  // Generate select options for restaurant tables
  const tableOptions = props.tables
    ? [
        <option key="null" value="">
          Select a table
        </option>,
        ...props.tables.map((table, index) => (
          <option
            key={index}
            value={table.id}
            disabled={numberOfPax > table.pax || table.status === "Unavailable"}
          >
            Table {table.id} - ({table.pax} pax capacity) - {table.status}
          </option>
        )),
      ]
    : [];

  // Parse the opening hours string and extract opening and closing times
  const parseOpeningHours = (openingHours) => {
    if (props.tables !== null) {
      const timePattern = /\b\d{1,2}:\d{2}\s*(?:am|pm)?\b/gi;
      const times = openingHours.match(timePattern);
      // If times are found
      if (times && times.length >= 2) {
        const [openingTime, closingTime] = times;

        return { openingTime, closingTime };
      }
      return { openingTime: "", closingTime: "" };
    }
  };

  const { openingTime, closingTime } = parseOpeningHours(props.openinghours);

  const parseTime = (timeString) => {
    if (timeString) {
      // Split the time string by colon and space
      const [time, period] = timeString.split(" ");

      // Split the time by colon to get hours and minutes
      const [hoursString, minutesString] = time.split(":");

      // Parse hours and minutes as numbers
      let hours = parseInt(hoursString, 10);
      let minutes = parseInt(minutesString, 10);

      // Adjust hours if it's PM
      if (period && period.toLowerCase() === "pm" && hours !== 12) {
        hours += 12; // Convert hours to 24-hour format if it's PM
      }

      return { hours, minutes };
    }
    return { hours: 0, minutes: 0 };
  };

  // console.log(openingTime);

  // Generate time options for opening and closing hours
  const generateEndTimeOptions = (openingTime, closingTime) => {
    const options = [<option key="null" value=""></option>];
    if (openingTime && closingTime) {
      const parsedOpeningTime = parseTime(openingTime);
      const parsedClosingTime = parseTime(closingTime);

      for (
        let hour = parsedOpeningTime.hours + 1;
        hour <= parsedClosingTime.hours;
        hour++
      ) {
        // Loop through each minute (0 and 30)
        for (let minute of [0, 30]) {
          const time = `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`;
          options.push(
            <option key={time} value={time}>
              {time}
            </option>
          );
        }
      }

      return options;
    }
    return [];
  };

  const generateStartTimeOptions = (openingTime, closingTime) => {
    const options = [<option key="null" value=""></option>];
    if (openingTime && closingTime) {
      const parsedOpeningTime = parseTime(openingTime);
      const parsedClosingTime = parseTime(closingTime);

      for (
        let hour = parsedOpeningTime.hours;
        hour <= parsedClosingTime.hours - 1;
        hour++
      ) {
        // Loop through each minute (0 and 30)
        for (let minute of [0, 30]) {
          const time = `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`;
          options.push(
            <option key={time} value={time}>
              {time}
            </option>
          );
        }
      }

      return options;
    }
    return [];
  };

  return (
    <div id="Rform">
      <div id="Rinputs">
        <div>
          Date:
          <br />
          <input
            id="Rinput"
            type="date"
            name="dateinput"
            min={tomorrowString}
            onChange={handleInputChange}
            required
          ></input>
        </div>

        <div>
          Time:
          <br />
          <select
            id="Rtimeinput"
            name="timestartinput"
            onChange={handleInputChange}
            required
          >
            {generateStartTimeOptions(openingTime, closingTime)}
          </select>
          to
          <select
            id="Rtimeinput"
            name="timeendinput"
            onChange={handleInputChange}
            required
          >
            {generateEndTimeOptions(openingTime, closingTime)}
          </select>
        </div>

        <div>
          Name:
          <br />
          <input
            id="Rinput"
            name="nameinput"
            onChange={handleInputChange}
            required
          ></input>
        </div>

        <div>
          Phone No:
          <br />
          <input
            id="Rinput"
            type="tel"
            name="phoneinput"
            onChange={handleInputChange}
            required
          ></input>
        </div>

        <div>
          No of pax:
          <br />
          <select
            id="Rinput"
            // value={numberOfPax.toString()}
            value={numberOfPax}
            name="paxinput"
            onChange={(e) => {
              handleInputChange(e);
              handlePaxChange(e);
            }}
            required
          >
            {nopaxOptions}
          </select>
        </div>

        <div>
          Table:
          <br />
          <select id="Rinput" name="tableinput" onChange={handleInputChange}>
            {tableOptions}
          </select>
        </div>

        <div id="Check">
          <label id="Rtext">
            <input
              id="checkbox"
              type="checkbox"
              name=""
              if=""
              checked={isChecked}
              onChange={(e) => {
                handleCheckboxChange(e);
              }}
              required
            />
            I have read and understood the Registration Policy of this
            restaurant
          </label>
        </div>
        <button id="form-submitButton" onClick={() => setSubmit(!submit)}>
          Submit
        </button>
      </div>

      {submit && (
        <div className="popup-overlay">
          <div className="popup" ref={popRef}>
            <div>Confirm reservation?</div>
            <div>
              <button id="buttonPopupCancel" onClick={() => setSubmit(false)}>
                Cancel
              </button>
              <button
                onClick={() => {
                  setSubmit(false);
                  handleConfirm();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {confirm &&
        (
          <div className="popup-overlay">
            <div className="popup" ref={popRef}>
              <i class="bi bi-calendar2-check-fill"></i>
              <div>Confirmed</div>
            </div>
          </div>
        )}
    </div>
  );
};

export default ReservationForm;
