import res1 from "./assets/Restaurant1.jpg";
import res2 from "./assets/Restaurant2.jpg";
import res3 from "./assets/Restaurant3.jpg";
import res4 from "./assets/Restaurant4.jpg";
import res5 from "./assets/Restaurant5.jpg";
import res6 from "./assets/Restaurant6.jpg";
import p1 from "./assets/details1.jpg";
import p2 from "./assets/details2.jpg";
import p3 from "./assets/details3.jpg";
import p4 from "./assets/details4.jpg";
import p5 from "./assets/details5.jpg";
import p6 from "./assets/details6.jpg";
import p7 from "./assets/details7.jpg";
import review1 from "./assets/Review1.jpg";
import review2 from "./assets/Review2.jpeg";
import review3 from "./assets/Review3.webp";
import review4 from "./assets/Review4.jpeg";
import review5 from "./assets/Review5.jpeg";
import review6 from "./assets/Review6.jpeg";

const photos = [p1, p2, p3, p4, p5, p6, p7];

const restaurants = [
    {
      id: 1,
      name: "Miyabi - Sheraton Petaling Jaya",
      image: res1,
      description:
        "A dining venue where an a la carte selection of customary Japanese specialties takes center stage.",
      location: "Petaling Jaya",
      address:
        "2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur",
      phone: "03-22637434",
      openinghours: "Mon-Sat 12:00 pm – 10:30 pm",
      cuisine: "Steakhouse",
      resPhotos: photos,
      review: "3.5",
      tables: [
        {
          id: 1,
          status: "Available",
          pax: 4,
        },
        {
          id: 2,
          status: "Available",
          pax: 2,
        },
        {
          id: 3,
          status: "Unavailable",
          pax: 8,
        },
      ],
    },
    {
      id: 2,
      name: "Sala Bar - Sheraton Petaling Jaya",
      image: res2,
      description:
        "Conceived as a laidback haven for cigar and whisky connoisseurs to convene.",
      location: "Puchong",
      address:
        "2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur",
      phone: "03-22637434",
      openinghours: "Mon-Sat 12:00 pm – 10:30 pm",
      cuisine: "Wine",
      resPhotos: photos,
      review: "4.5",
      tables: [
        {
          id: 1,
          status: "Unavailable",
          pax: 4,
        },
        {
          id: 2,
          status: "Available",
          pax: 2,
        },
        {
          id: 3,
          status: "Available",
          pax: 8,
        },
      ],
    },
    {
      id: 3,
      name: "Colonial Cafe",
      image: res3,
      description:
        "The Colonial Cafe recreates the atmosphere of the halcyon days of the planters of Malaya.",
      location: "Kajang",
      address: "Colonial Cafe, The Majestic Hotel, 5, Jalan Sultan Hishamuddin",
      phone: "03-22637434",
      openinghours: "Mon-Sat 10:00 am – 8:30 pm",
      cuisine: "Malaysian",
      resPhotos: photos,
      review: "3.5",
      tables: [
        {
          id: 1,
          status: "Available",
          pax: 4,
        },
        {
          id: 2,
          status: "Unavailable",
          pax: 4,
        },
        {
          id: 3,
          status: "Available",
          pax: 4,
        },
      ],
    },
    {
      id: 4,
      name: "PRIME - Le Méridien Kuala Lumpur",
      image: res4,
      description:
        "Delight your palate with Australian cuts of beef, including tenderloin, sirloin, rib-eye and prime rib.",
      location: "Kuala Lumpur",
      address:
        "2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur",
      phone: "03-22637434",
      openinghours: "Mon-Sat 10:00 am – 11:00 pm",
      cuisine: "Steakhouse",
      resPhotos: photos,
      review: "4.5",
      tables: [
        {
          id: 1,
          status: "Available",
          pax: 4,
        },
        {
          id: 2,
          status: "Available",
          pax: 2,
        },
        {
          id: 3,
          status: "Available",
          pax: 8,
        },
      ],
    },
    {
      id: 5,
      name: "Yun House at Four Seasons Hotel",
      image: res5,
      description:
        "A Cantonese with an edge, Yun House stretches the boundaries with elevated Chinese favourites.",
      location: "Petaling Jaya",
      address: "Yue, Lorong Utara C, Pjs 52, 46200 Petaling Jaya, Selangor",
      phone: "03-22637434",
      openinghours: "Mon-Sat 10:00 am – 10:00 pm",
      cuisine: "Chinese",
      resPhotos: photos,
      review: "3.5",
      tables: [
        {
          id: 1,
          status: "Available",
          pax: 10,
        },
        {
          id: 2,
          status: "Available",
          pax: 6,
        },
        {
          id: 3,
          status: "Available",
          pax: 8,
        },
      ],
    },
    {
      id: 6,
      name: "Cinnamon Coffee House",
      image: res6,
      description:
        "Start your day with a perfect morning pick-me-up at our award-winning Cinnamon Coffee House!",
      location: "Petaling Jaya",
      address:
        "2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur",
      phone: "03-22637434",
      openinghours: "Mon-Sat 9:00 am – 8:30 pm",
      cuisine: "Dessert",
      resPhotos: photos,
      review: "3.5",
      tables: [
        {
          id: 1,
          status: "Available",
          pax: 4,
        },
        {
          id: 2,
          status: "Available",
          pax: 2,
        },
        {
          id: 3,
          status: "Available",
          pax: 4,
        },
      ],
    },
  ];
  
const reviews = [
    {
      userName: "Wendy",
      rating: "5",
      timePosted: "today",
      reviewDescription:
        "This is a wonderful place to relax with excellent food and service. Always have a memorable experience when I come to Gastro.",
      photoUrl: review1,
    },
    {
      userName: "Karen",
      rating: "4",
      timePosted: "today",
      reviewDescription:
        "Had a delightful evening at Gastro! The ambiance was soothing, and the food was top-notch. The staff was attentive and friendly. Definitely worth a visit.",
      photoUrl: review2,
    },
    {
      userName: "David",
      rating: "5",
      timePosted: "today",
      reviewDescription:
        "Gastro never disappoints! The cuisine is consistently delicious, and the service is impeccable. I highly recommend trying their specials—they're always a hit!",
      photoUrl: review3,
    },
    {
      userName: "Emily",
      rating: "5",
      timePosted: "today",
      reviewDescription:
        "I can't say enough good things about Gastro. From the moment you walk in, you're greeted with warmth. The food is exceptional, and the ambiance is perfect for a relaxed evening. Can't wait to return!",
      photoUrl: review4,
    },
    {
      userName: "Mark",
      rating: "4",
      timePosted: "today",
      reviewDescription:
        "Another fantastic meal at Gastro! The attention to detail in every dish is evident, and the flavors are exquisite. Whether you're a regular or it's your first time, you'll leave with a smile.",
      photoUrl: review5,
    },
    {
      userName: "Sarah",
      rating: "5",
      timePosted: "today",
      reviewDescription:
        "Gastro is a gem! The atmosphere is cozy, the food is divine, and the service is top-notch. It's the perfect spot for a romantic dinner or a gathering with friends. Always a pleasure to dine here.",
      photoUrl: review6,
    },
  ];

  export  { restaurants, reviews };