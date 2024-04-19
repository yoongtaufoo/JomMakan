import React, { useState, useEffect, useRef } from "react";

//<Form date={null}/>
//For the registration form
const RegistrationForm = (props) => {
  const [submit, setSubmit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const popRef = useRef(null);
  const Rworkshop = props.registrationInfo;
  const tables = props.tables;
  const [numberOfPax, setNumberOfPax] = useState(1);

  const handleClickOutside = (event) => {
    if (popRef.current && !popRef.current.contains(event.target)) {
      setConfirm(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Handle change event for the number of pax input
  const handlePaxChange = (event) => {
    setNumberOfPax(parseInt(event.target.value));
  };

  // Generate select options for pax no
  const nopaxOptions = [];
  for (let i = 1; i <= Math.max(...tables.map(table => table.pax)); i++) {
    nopaxOptions.push(<option key={i} value={i}>{i}</option>);
  }

  // Generate select options for restaurant tables
  const tableOptions = tables.map((table, index) => (
    <option
      key={index}
      value={table.id}
      disabled={numberOfPax > table.pax || table.status === 'Unavailable'}
    >
      Table {table.id} - ({table.pax} pax capacity)
    </option>
  ));

  return (
    <div id="Rform">
      <div id="Rinputs">
        {props.date !== null ? (
          <div>
            Date:
            <br />
            <div id="Rinput">{props.date}</div>
          </div>
        ) : (
          <div>
            Date:
            <br />
            <input id="Rinput" type="datetime-local" required></input>
          </div>
        )}

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
        {props.table !== null ? (
          <div>
            Table:
            <br />
              <select id="Rinput">
                {tableOptions}
              </select>
          </div>
        ) : null }
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
        <div id="popup-overlay">
          <div id="popup">
            <div>Confirm reservation?</div>
            <div>
              <button onClick={() => setSubmit(false)}>Wait</button>
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
        <div id="popup-overlay" ref={popRef}>
          <div id="popup">
            <div>Confirmed</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
