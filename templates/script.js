document.getElementById("tank-submit").addEventListener("click", function(event){
    event.preventDefault();
    let form = document.forms.tankForm;
    let formData = new FormData(form);
    
    let location = formData.get('location');
    let latitude = formData.get('latitude');
    let longitude = formData.get('longitude');
    let percentage_full = formData.get('percentage_full');

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