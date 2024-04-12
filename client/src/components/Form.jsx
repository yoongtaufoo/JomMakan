import React , { useState , useEffect,useRef } from "react";

//<Form date={null}/>
//For the registration form 
const RegistrationForm = (props) => {
    const [submit, setSubmit] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const popRef = useRef(null);

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
return(
    <div id='Rform'>
    <div id='Rinputs'>
    {props.date !== null ? (
    <div>Date:<br/><div id='Rinput'>{props.date}</div></div>
  ) : (
    <div>Date:<br/><input id='Rinput' type='datetime-local'></input></div>
  )}
        
        <div>Name:<br/><input id='Rinput'></input></div>
        <div>Phone No:<br/><input id='Rinput' type='tel'></input></div>
        <div>No of pax:<br/><input id='Rinput' type='number'></input></div>
        <div id="Check">
        <label id="Rtext" ><input id = "checkbox" type="checkbox" name="" if="" />I have read and understood the Registration Policy of this restaurant</label>
     </div>
    <button id="submitButton" onClick={() => setSubmit(!submit)}>Submit</button>
    </div>

    {submit &&
        <div id='popup-overlay'>
            <div id='popup'>
                <div>Confirm reservation?</div>
                <div>
                    <button  onClick={() => setSubmit(false)}>Wait</button>
                    <button  onClick={() => {setConfirm(true); setSubmit(false);}}>Confirm</button>
                </div>
            </div>
        </div>
    }
    {confirm &&
        <div id='popup-overlay' ref={popRef}>
            <div id='popup'>
                <div>Confirmed</div>
            </div>
        </div>
    }
    </div>
)
}

export default RegistrationForm;