// ================= EMERGENCY DISPATCH MAP =================


// Map Initialize

let emergencyMap = L.map('emergencyMap')
    .setView([26.8467, 80.9462], 13);



// OpenStreetMap Layer

L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '© OpenStreetMap'
    }
).addTo(emergencyMap);





// ================= POLICE STATIONS =================


const policeStations = [

    {
        name: "Hazratganj Police Station",
        lat: 26.8480,
        lng: 80.9425
    },


    {
        name: "Gomti Nagar Police Station",
        lat: 26.8520,
        lng: 81.0000
    },


    {
        name: "Alambagh Police Station",
        lat: 26.8215,
        lng: 80.9140
    }

];





// Police Icon

let policeIcon = L.icon({

    iconUrl:
        'https://cdn-icons-png.flaticon.com/512/3063/3063176.png',

    iconSize: [40, 40]

});





// Add Police Markers


policeStations.forEach(station => {


    L.marker(
        [station.lat, station.lng],
        {
            icon: policeIcon
        }
    )
        .addTo(emergencyMap)
        .bindPopup(

            `
<h3>🚓 ${station.name}</h3>
<p>Available Unit: YES</p>
<p>Status: Ready</p>
`

        );


});







// ================= USER LOCATION =================



let userMarker;



function getEmergencyLiveLocation() {


    if (navigator.geolocation) {



        navigator.geolocation.watchPosition(

            function (position) {


                let lat =
                    position.coords.latitude;


                let lng =
                    position.coords.longitude;



                if (userMarker) {


                    userMarker.setLatLng(
                        [lat, lng]
                    );


                }

                else {


                    userMarker =
                        L.marker(
                            [lat, lng]
                        )
                            .addTo(emergencyMap)
                            .bindPopup(
                                "📍 Emergency Location"
                            )
                            .openPopup();


                }



                emergencyMap.setView(
                    [lat, lng],
                    15
                );



                document.getElementById(
                    "dispatchLocation"
                ).innerHTML =

                    "Location : "
                    +
                    lat.toFixed(5)
                    +
                    " , "
                    +
                    lng.toFixed(5);



            }

        );



    }

    else {


        alert(
            "GPS Not Supported"
        );


    }



}





// Start GPS

getEmergencyLiveLocation();









// ================= SOS ALERT =================



function activateEmergencyDispatch() {



    document.getElementById(
        "dispatchStatus"
    ).innerHTML =

        "🚨 SOS Received - Police Unit Dispatching";





    if (userMarker) {


        L.circle(
            userMarker.getLatLng(),
            {
                radius: 500
            }
        )
            .addTo(emergencyMap)
            .bindPopup(
                "Emergency Area"
            )
            .openPopup();



    }



    alert(
        "Emergency Team Notified"
    );



}





// ================= DEMO AUTO ALERT =================



setTimeout(() => {


    activateEmergencyDispatch();


}, 8000);