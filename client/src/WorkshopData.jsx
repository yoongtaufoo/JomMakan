import workshopPic1 from "./assets/workshop-1.png";
import workshopPic2 from "./assets/workshop-2.png";
import workshopPic3 from "./assets/workshop-3.png";
import workshopPic4 from "./assets/workshop-4.png";
import workshopPic5 from "./assets/workshop-5.png";
import workshopPic6 from "./assets/workshop-6.png";

const WorkshopData = [];

const workshopPic = [
  workshopPic1,
  workshopPic2,
  workshopPic3,
  workshopPic4,
  workshopPic5,
  workshopPic6,
  workshopPic1,
  workshopPic2,
  workshopPic3,
  workshopPic4,
  workshopPic5,
  workshopPic6,
];

// isFresh = 1 mean fresh addition, 0 means not
// isFavourite = 1 mean fav, 0 means not
// const status = ["T", "T", "F", "F", "T", "T", "F", "T", "T", "T", "F", "F"];
const isFav = [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1];
const isFresh = [0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0];

for (let i = 0; i < workshopPic.length; i++) {
  WorkshopData.push({
    id: i + 1,
    photo: workshopPic[i],
    title: `Workshop ${i + 1}`,
    description: `Description of Workshop ${i + 1}`,
    phone: "03-1234567",
    address: "123,Jalan Sedap,47098 Petaling Jaya,Selangor",
    dateAndTime: `12.00-5.00 pm, ${i + 1} May 2024`,
    current: Math.floor(Math.random() * 50), // Remove ${} from Math.floor
    total: Math.floor(Math.random() * 100), // Remove ${} from Math.floor
    isFav: isFav[i],
    isFresh: isFresh[i],
  });
}

export default WorkshopData;
