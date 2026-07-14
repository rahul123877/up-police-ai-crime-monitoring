// =========================================
// NEAREST POLICE STATION FINDER
// =========================================

import { policeStations } from "./policeStations.js";

// Haversine Formula
function distance(lat1, lon1, lat2, lon2) {

    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;

    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;

}

export function getNearestPoliceStation(userLat, userLng) {

    let nearest = null;

    let shortest = Number.MAX_VALUE;

    policeStations.forEach((station) => {

        const d = distance(

            userLat,

            userLng,

            station.latitude,

            station.longitude

        );

        if (d < shortest) {

            shortest = d;

            nearest = {

                ...station,

                distance: d.toFixed(2)

            };

        }

    });

    return nearest;

}