const apiKey = "431e2ac00b05354a5b83c0a206cd8fba";

async function getWeather() {

    const city = document.getElementById("cityInput").value;

    if(city === ""){
        alert("Please enter city name");
        return;
    }

    const loader = document.getElementById("loader");
    const weatherCard = document.getElementById("weatherCard");

    loader.style.display = "block";
    weatherCard.style.display = "none";

    try{

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        loader.style.display = "none";

        if(data.cod !== 200){
            alert("City not found");
            return;
        }

        document.getElementById("city").innerText =
            `${data.name}, ${data.sys.country}`;

        document.getElementById("temp").innerText =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("condition").innerText =
            data.weather[0].description;

        document.getElementById("humidity").innerText =
            `${data.main.humidity}%`;

        document.getElementById("wind").innerText =
            `${data.wind.speed} km/h`;

        document.getElementById("icon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

        weatherCard.style.display = "block";

        changeBackground(data.weather[0].main);

    }
    catch(error){
        loader.style.display = "none";
        alert("Something went wrong");
    }
}

function changeBackground(weather){

    const body = document.body;

    switch(weather){

        case "Clear":
            body.style.background =
            "linear-gradient(135deg,#FFD200,#F7971E)";
            break;

        case "Clouds":
            body.style.background =
            "linear-gradient(135deg,#757F9A,#D7DDE8)";
            break;

        case "Rain":
            body.style.background =
            "linear-gradient(135deg,#4B79A1,#283E51)";
            break;

        case "Snow":
            body.style.background =
            "linear-gradient(135deg,#E6DADA,#274046)";
            break;

        default:
            body.style.background =
            "linear-gradient(135deg,#74ebd5,#9face6)";
    }
}