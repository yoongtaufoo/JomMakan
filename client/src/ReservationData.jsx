import { restaurants } from "./RestaurantData"

const reservations = [
    {
        id: 1,
        date: "2024-05-20",
        name: "LeBron",
        phone: "0112033828",
        pax: "3",
        tableid: "m1",
        restaurantid: 1,
        status: "D",
        //userid:
    },
    {
        id: 2,
        date: "2024-05-21 ",
        name: "LeBron",
        phone: "0112033828",
        pax: "4",
        tableid: "m2",
        restaurantid: 1,
        status: "U",
    },
    {
        id: 3,
        date: "2024-05-22 5.00pm",
        name: "Lily",
        phone: "0112033828",
        pax: "2",
        tableid: "m3",
        restaurantid: 1,
        status: "U",
    },
    {
        id: 4,
        date: "2024-05-22",
        name: "Lily",
        phone: "0112033828",
        pax: "2",
        tableid: "c1",
        restaurantid: 2,
        status: "U",
    },
]

const tables = [
    {
        id: "m1",
        status: "Available",
        pax: 4,
        // restaurantid: "1"
    },
    {
        id: "m2",
        status: "Available",
        pax: 2,
        // restaurantid: "1"
    },
    {
        id: "m3",
        status: "Available",
        pax: 8,
        // restaurantid: "1"
    },
    {
        id: "c1",
        status: "Available",
        pax: 8,
        // restaurantid: "2"
    },
]

export { reservations, tables }