import { restaurants } from "./RestaurantData"

const reservations = [
    {
        id: 1,
        date: "2024-05-20",
        name: "LeBron",
        phoneno: "0112033828",
        paxno: "3",
        tableid: "m1",
        restaurantid: 1,
        status: "D",
        //userid:
    },
    {
        id: 2,
        date: "2024-05-21",
        name: "LeBron",
        phoneno: "0112033828",
        paxno: "4",
        tableid: "m2",
        status: "U",
    },
    {
        id: 3,
        date: "2024-05-22",
        name: "Lily",
        phoneno: "0112033828",
        paxno: "2",
        tableid: "m3",
        status: "U",
    },
    {
        id: 3,
        date: "2024-05-22",
        name: "Lily",
        phoneno: "0112033828",
        paxno: "2",
        tableid: "c1",
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