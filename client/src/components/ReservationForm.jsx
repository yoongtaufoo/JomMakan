import React, { useState, useEffect, useRef } from "react";

const ReservationForm = (props) => {
    const [submit, setSubmit] = useState(false);
    const [confirm, setConfirm] = useState(false);
    // const Rworkshop = props.registrationInfo;
    const tables = props.tables;
    const [numberOfPax, setNumberOfPax] = useState(1);
    const popRef = useRef(null);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];

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

    // Handle change event for the number of pax input
    const handlePaxChange = (event) => {
        if(props.tables!==null){
        setNumberOfPax(parseInt(event.target.value));
        }
    };
    

    // Generate select options for pax no
    const nopaxOptions = [];
    if(props.tables!==null){
        for (let i = 1; i <= Math.max(...tables.map(table => table.pax)); i++) {
        nopaxOptions.push(<option key={i} value={i}>{i}</option>);
        }
    }

    // Generate select options for restaurant tables
    const tableOptions = props.tables && props.tables.map((table, index) => (
        <option
        key={index}
        value={table.id}
        disabled={numberOfPax > table.pax || table.status === 'Unavailable'}
        >
        Table {table.id} - ({table.pax} pax capacity) - {table.status}
        </option>
    ));

    // Parse the opening hours string and extract opening and closing times
    const parseOpeningHours = (openingHours) => {
        if(props.tables!==null){
        const timePattern = /\b\d{1,2}:\d{2}\s*(?:am|pm)?\b/gi;
        const times = openingHours.match(timePattern);
        // If times are found
        if (times && times.length >= 2) {
        const [openingTime, closingTime] = times;
        
        return { openingTime, closingTime };
        }
        return  { openingTime: "", closingTime: "" };
    }
    };
    
    
    const { openingTime, closingTime } = parseOpeningHours(props.openinghours);

    const parseTime = (timeString) => {
    if (timeString) {
    
    // Split the time string by colon and space
    const [time, period] = timeString.split(' ');

    // Split the time by colon to get hours and minutes
    const [hoursString, minutesString] = time.split(':');

    // Parse hours and minutes as numbers
    let hours = parseInt(hoursString, 10);
    let minutes = parseInt(minutesString, 10);

    // Adjust hours if it's PM
    if (period && period.toLowerCase() === 'pm' && hours !== 12) {
        hours += 12; // Convert hours to 24-hour format if it's PM
    }

    return { hours, minutes };
    }
    return { hours: 0, minutes: 0 };
};

// console.log(openingTime);

// Generate time options for opening and closing hours
    const generateEndTimeOptions = (openingTime, closingTime) => {
    if(openingTime && closingTime){
    
    const parsedOpeningTime = parseTime(openingTime);
    const parsedClosingTime = parseTime(closingTime);

    const options = [];

    for (let hour = parsedOpeningTime.hours + 1; hour <= parsedClosingTime.hours; hour++) {
        // Loop through each minute (0 and 30)
        for (let minute of [0, 30]) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(<option key={time} value={time}>{time}</option>);
        }
    }

    return options;
    }
    return [];
    };

    const generateStartTimeOptions = (openingTime, closingTime) => {
    if(openingTime&&closingTime){
    const parsedOpeningTime = parseTime(openingTime);
    const parsedClosingTime = parseTime(closingTime);

    const options = [];

    for (let hour = parsedOpeningTime.hours; hour <= parsedClosingTime.hours - 1; hour++) {
        // Loop through each minute (0 and 30)
        for (let minute of [0, 30]) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(<option key={time} value={time}>{time}</option>);
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
                <input id="Rinput" type="date" min={tomorrowString} required></input>
            </div>
            
            <div>
                Time:
                <br />
                <select id="Rtimeinput" required>
                {generateStartTimeOptions(openingTime, closingTime)}
                </select>
                to  
                <select id="Rtimeinput">
                {generateEndTimeOptions(openingTime, closingTime)}
                </select>
            </div>

            <div>
                Name:
                <br />
                <input id="Rinput" required></input>
            </div>

            <div>
                Phone No:
                <br />
                <input id="Rinput" type="tel" required></input>
            </div>

            <div>
                No of pax:
                <br />
                <select id="Rinput" value={numberOfPax} onChange={handlePaxChange} required>
                    {nopaxOptions}
                </select>
            </div>
            
            <div>
                Table:
                <br />
                <select id="Rinput">
                    {tableOptions}
                </select>
            </div>

            <div id="Check">
                <label id="Rtext">
                    <input id="checkbox" type="checkbox" name="" if="" required />I have
                    read and understood the Registration Policy of this restaurant
                </label>
            </div>
            <button id="form-submitButton" onClick={() => setSubmit(!submit)}>
                Submit
            </button>
        </div>

        {submit && (
            <div id="popup-overlay" >
            <div id="popup" ref={popRef}>
                <div>Confirm reservation?</div>
                <div>
                <button id="buttonPopupCancel" onClick={() => setSubmit(false)}>Cancel</button>
                <button
                    onClick={() => {
                    setConfirm(true);
                    setSubmit(false);
                    }}
                >
                    Confirm
                </button>
                </div>
            </div>
            </div>
        )}
        {confirm && (
            <div id="popup-overlay" >
            <div id="popup"  ref={popRef}>
            <i class="bi bi-calendar2-check-fill"></i>
                <div>Confirmed</div>
            </div>
            </div>
        )}
        </div>
    );
    };

    export default ReservationForm;
