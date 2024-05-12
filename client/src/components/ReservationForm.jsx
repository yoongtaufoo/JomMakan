import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ReservationForm = (props) => {
  // for checking if all fields are inputted
  const [dateinput, setDateInput] = useState("");
  const [timestartinput, setTimeStartInput] = useState("");
  const [timeendinput, setTimeEndInput] = useState("");
  const [nameinput, setNameInput] = useState("");
  const [phoneinput, setPhoneInput] = useState("");
  const [paxinput, setPaxInput] = useState("");
  const [tableinput, setTableInput] = useState("");
  const [isFormValid, setIsFormValid] = useState(false); // State to track overall form validity
  const [tables, setTables] = useState(""); // Handle table option change
  const [isChecked, setIsChecked] = useState(false); // Check if Reservation Policy is ticked
  const [date, setDate] = useState(0); // Handle change event for date input
  const [numberOfPax, setNumberOfPax] = useState(0); // Handle change event for the number of pax input
  const [submit, setSubmit] = useState(false); // submit pop up
  const [confirm, setConfirm] = useState(false); // confirm pop up

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

  // Function to handle change in start time
  const handleStartTimeChange = (event) => {
    const selectedStartTime = event.target.value;
    // setStartTime(selectedStartTime);
    console.log(selectedStartTime);
    // Calculate end time by adding one hour to the start time
    const [startHour, startMinute] = selectedStartTime.split(":").map(Number);
    const endHour = startHour + 1;
    const endMinute = startMinute < 30 ? 0 : 30; // Round up to nearest half hour
    const formattedEndHour = endHour.toString().padStart(2, "0");
    const formattedEndMinute = endMinute.toString().padStart(2, "0");
    const calculatedEndTime = `${formattedEndHour}:${formattedEndMinute}`;
    console.log(calculatedEndTime);
    setTimeEndInput(calculatedEndTime);
  };

  // Handle change event for the number of pax input
  const handlePaxChange = (event) => {
    setNumberOfPax(parseIntevent.target.value);
  };

  // Handle change event for date
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  useEffect(() => {
    if (date) {
      // Check if the date is not empty
      // Make API call when the date input changes
      axios
        .get(
          `http://localhost:3001/api/reservation/reservations?date=${date}&restaurantId=${restaurantid}`
        )
        .then((response) => {
          setReservations(response.data); // Update reservations state with API response data
        })
        .catch((error) => {
          console.error("Error fetching reservations:", error);
        });
    }
  }, [date]); // Run this effect whenever the 'date' state changes

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

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

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
      .post(
        "http://localhost:3001/api/reservation/reserve",
        {
          date: dateinput,
          timestart: timestartinput,
          timeend: timeendinput,
          name: nameinput,
          phone: phoneinput,
          pax: paxinput,
          table_id: tableinput,
          status: "U",
          restaurant_id: restaurantid,
        },
        {
          headers: {
            Authorization: token, // Include JWT in request headers
          },
        }
      )
      .then(() => {
        // alert("Reserved Successfully");
        setDateInput("");
        setTimeStartInput("");
        setTimeEndInput("");
        setNameInput("");
        setPhoneInput("");
        setPaxInput("");
        setTableInput("");
        setConfirm(true);
        window.location.reload();
      })
      .catch((error) => {
        console.log("Unable to reserve user");
      });
  };

  let userid = "User123";

  // get userid from local storage
  const storedUser = JSON.parse(localStorage.getItem("JomMakanUser"));
  if (storedUser) {
    userid = storedUser.user._id;
  }

  // Get restaurant id from url
  const { id } = useParams();
  const restaurantid = parseInt(id);

  // const tables = props.tables;

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

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get("api/");
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const fetchReservations = async () => {
    axios
      .get("http://localhost:3001/api/reservation/myreservations")
      .then(({ data }) => {
        setReservations(data);
      })
      .catch((error) => {
        reservations;
        console.error("Error fetching :", error);
      });
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
  ]);

  // generate table options based on no of pax and availability
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

  // const tableOptions = tables.map((table) => (
  //   <option
  //     key={table.id}
  //     value={table.id}
  //     disabled={!isTableAvailable(table.id)}
  //   >
  //     Table {table.id}
  //   </option>
  // ));

  const isTableAvailable = (tableId) => {
    // Check if the table has sufficient capacity
    const table = tables.find((table) => table.id === tableId);
    if (!table || table.capacity < noPax) {
      return false; // Table does not exist or has insufficient capacity
    }

    // Check if there are any reservations for the selected date and time range
    if (
      reservations.some(
        (reservation) =>
          reservation.table_id === tableId &&
          reservation.date === date &&
          reservation.timestart <= endTime &&
          reservation.timeend >= startTime
      )
    ) {
      return false; // Table is already reserved
    }

    return true; // Table is available
  };

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
  // const generateEndTimeOptions = (openingTime, closingTime) => {
  //   const options = [<option key="null" value=""></option>];
  //   if (openingTime && closingTime) {
  //     const parsedOpeningTime = parseTime(openingTime);
  //     const parsedClosingTime = parseTime(closingTime);

  //     for (
  //       let hour = parsedOpeningTime.hours + 1;
  //       hour <= parsedClosingTime.hours;
  //       hour++
  //     ) {
  //       // Loop through each minute (0 and 30)
  //       for (let minute of [0, 30]) {
  //         const time = `${hour.toString().padStart(2, "0")}:${minute
  //           .toString()
  //           .padStart(2, "0")}`;
  //         options.push(
  //           <option key={time} value={time}>
  //             {time}
  //           </option>
  //         );
  //       }
  //     }

  //     return options;
  //   }
  //   return [];
  // };

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
            value={date}
            onChange={(e) => {
              handleInputChange(e);
              handleDateChange(e);
            }}
            required
          ></input>
        </div>

        <div>
          Time:
          <br />
          <select
            id="Rtimeinput"
            name="timestartinput"
            onChange={(event) => {
              handleInputChange(event);
              handleStartTimeChange(event);
            }}
            required
          >
            {generateStartTimeOptions(openingTime, closingTime)}
          </select>
          to
          <div id="Rtimeinput" name="timeendinput" required>
            {timeendinput}
          </div>
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
      {confirm && (
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
