//POST
document.getElementById("tank-submit").addEventListener("click", function(event){
    event.preventDefault();
    
    let location = document.getElementById("location").value;
    let latitude = document.getElementById("latitude").value;
    let longitude = document.getElementById("longitude").value;
    let percentage_full = document.getElementById("percentage_full").value;

    let jsonBody = {
        "location": location,
        "latitude": latitude,
        "longitude": longitude,
        "percentage_full": percentage_full,
    };

    fetch("http://127.0.0.1:5000/data", {
        method: "POST",
        body: JSON.stringify(jsonBody),
        headers:{
            "Content-type": "application/json",
        },
    })
    .then((res) => res.json)
    .then((json) => console.log(json));
});

//GET --> Create Cards
function createTankCard(tank){
    //Card Container:
    var tankCardDiv = document.createElement("DIV");
    tankCardDiv.classList.add("tank-cards");
    
    var tankContentCardDiv = document.createElement("DIV");
    tankContentCardDiv.classList.add("card-content");

    //Location:
    var tankLabelLocation = document.createElement("H4");
    tankLabelLocation.classList.add("location-label");
    tankLabelLocation.innerHTML = "Location: ";

    var tankValueLocation = document.createElement("SPAN");
    tankValueLocation.classList.add("location-value");
    tankValueLocation.innerHTML = tank.location;

    tankLabelLocation.append(tankValueLocation);

    //Latitude:
    var tankLabelLatitude = document.createElement("H4");
    tankLabelLatitude.classList.add("latitude-label");
    tankLabelLatitude.innerHTML = "Latitude: ";

    var tankValueLatitude = document.createElement("SPAN");
    tankValueLatitude.classList.add("latitude-value");
    tankValueLatitude.innerHTML = tank.latitude;

    tankLabelLatitude.append(tankValueLatitude);
    
    //Longitude:
    var tankLabelLongitude = document.createElement("H4");
    tankLabelLongitude.classList.add("longitude-label");
    tankLabelLongitude.innerHTML = "Longitude: ";

    var tankValueLongitude = document.createElement("SPAN");
    tankValueLongitude.classList.add("longitude-value");
    tankValueLongitude.innerHTML = tank.longitude;

    tankLabelLongitude.append(tankValueLongitude);
    
    //Percentage Full:
    var tankLabelPercentageFull = document.createElement("H4");
    tankLabelPercentageFull.classList.add("percentageFull-label");
    tankLabelPercentageFull.innerHTML = "Percentage Full: ";

    var tankValuePercentageFull = document.createElement("SPAN");
    tankValuePercentageFull.classList.add("percentageFull-value");
    tankValuePercentageFull.innerHTML = tank.percentage_full;

    tankLabelPercentageFull.append(tankValuePercentageFull);
    
    tankContentCardDiv.append(tankLabelLocation);
    tankContentCardDiv.append(tankLabelLatitude);
    tankContentCardDiv.append(tankLabelLongitude);
    tankContentCardDiv.append(tankLabelPercentageFull);

    tankCardDiv.append(tankContentCardDiv);

    return tankCardDiv;
}

function getTanks(){
    return fetch("http://127.0.0.1:5000/data")
    .then((res) => res.json())
    .then((json) => json);
}

async function drawCard(){
    let tanks = await getTanks();
    console.log(tanks);
    tanks.forEach((tank) => {
        var container = document.querySelector(".container");
        container.append(createTankCard(tank));
    });
}

var container = document.querySelector(".container");

window.onload = function () {
  drawCard();
};