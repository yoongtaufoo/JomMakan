import workshopPic from "./assets/workshop.png";


const WorkshopDetails = [];

for (let i = 0; i < 6; i++) {
  WorkshopDetails.push({
    id: i + 1,
    photo: workshopPic,
    title: `Workshop ${i + 1}`,
    description: `Description of Workshop ${i + 1}`,
    phone:"03-1234567",
    address:"123,Jalan Sedap,47098 Petaling Jaya,Selangor",
    dateAndTime: `12.00-5.00 pm, ${i + 1} May 2024`,
    current: Math.floor(Math.random() * 50), // Remove ${} from Math.floor
    total: Math.floor(Math.random() * 100), // Remove ${} from Math.floor
  });
}

export default WorkshopDetails;