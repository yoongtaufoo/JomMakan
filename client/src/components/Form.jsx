import React, { useState, useEffect, useRef } from "react";

//<Form date={null}/>
//For the registration form
const RegistrationForm = (props) => {
  const [submit, setSubmit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const Rworkshop = props.registrationInfo;
  const tables = props.tables;
  const [numberOfPax, setNumberOfPax] = useState(1);
  const popRef = useRef(null);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split('T')[0];
  // const handleClickOutside = (event) => {
  //   if (popRef.current && !popRef.current.contains(event.target)) {
  //     setConfirm(false);
  //   }
  // };
  useEffect(() => {
    let handler = (e)=>{
      if(!popRef.current.contains(e.target)){
        setConfirm(false);
      }
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

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
            <input id="Rinput" type="date" min={tomorrowString} required></input>
          </div>
        )}
        {/* restaurant reservation time input  */}
        {props.tables !== null ? (
          <div>
            Time:
            <br />
            <input id="Rtimeinput" type="time" step="3600000" required></input> to  
            <input id="Rtimeinput" type="time" step="3600000" ></input>
          </div>
        ) : (
          null
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
          {props.tables !== null ? (
            //if its a reservation form
            <select id="Rinput" value={numberOfPax} onChange={handlePaxChange} required>
              {nopaxOptions}
            </select>
          ) : (
            //if its a registration form
            <input id='Rinput' type="number" required></input>
          ) }
          
        </div>
        {props.tables !== null ? (
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
        <div id="popup-overlay" >
          <div id="popup" ref={popRef}>
            <div>Confirm reservation?</div>
            <div>
              <button id="buttonPopupCancel"onClick={() => setSubmit(false)}>Cancel</button>
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
        <div id="popup-overlay">
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
