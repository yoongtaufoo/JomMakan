import React from 'react';

const DetailCard = ({ workshop }) => {
  return (
    <div style={{ padding: "10px", display: "block", margin: "5% auto" }}>
      <img src={workshop.photo} alt={workshop.title} style={{ width: '150%', height: '200px' }} />
      <div>
        <h1 className='custom-h1'>{workshop.title}</h1>
      </div>
      <p className="card-text">{workshop.description}</p>
      <p className="card-text"><i className='bi-geo-alt-fill custom-icon'></i>{workshop.phone}</p>
      <p className="card-text"><i className="bi bi-telephone-fill custom-icon"></i>{workshop.address}</p>
      <p className="card-text"><i className="bi bi-clock-fill custom-icon"></i>{workshop.dateAndTime}</p>
      <p className="card-text"><i class="bi bi-egg-fried custom-icon"></i>{workshop.current} / {workshop.total}</p>
    </div>
  );
}

export default DetailCard;