// This card can be used for displaying registration or reservation made
import react from "react";

const CollectionCard = (props) => {
    let workshops=props.workshop;
    // Function body
    return(
    <div className="row g-0 custom-row">
                <div className="col-md-4">
                    <img src={workshops.image} className="img-fluid rounded-start card-img-top" alt="..."/>
                </div>
                <div className="col-md-4">
                    <div className="card-body">
                        <h5 className="card-title">{workshops.name}</h5>
                        <p className="card-text">{workshops.description}</p>
                        <p className="card-text">
                            <i className='bi-geo-alt-fill custom-icon'></i>
                            {workshops.phone}
                        </p>
                        <p className="card-text">
                            <i className="bi bi-telephone-fill custom-icon"></i>
                            {workshops.address}
                        </p>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="card-body">
                        <h5 className="card-title">{workshops.timeslot}</h5>
                        <p className="card-text">Name : {workshops.Rname}</p>
                        <p className="card-text">Phone No: {workshops.Rphone}</p>
                        <p className="card-text">No. Pax: {workshops.Rpax}</p>
                    </div>
                    

            </div>
            {workshops.Rstatus === 'U' && 
            <div className="col-md-2">
                    <div className="card-body" >
                    <div className="card-body"><button type="button" className="btn btn-outline-dark custom-button">Cancel</button></div>
                    </div>
                    

            </div>
            }
       </div>
            );
};

export default CollectionCard;