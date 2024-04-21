import React, { useState, useEffect, useRef } from "react";

//<Form date={null}/>
//For the registration form
const RegistrationForm = (props) => {
  const [submit, setSubmit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const popRef = useRef(null);

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

  return (
    <div id="Rform">
      <div id="Rinputs">
        <div>
          Date:
          <br />
          <div id="Rinput">{props.date}</div>
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
            <input id='Rinput' type="number" required></input>
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

export default RegistrationForm;
