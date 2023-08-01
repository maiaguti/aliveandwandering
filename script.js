"use strict";


// web storage
function storeForm(e) { 
    e.preventDefault();
    let formOutput = document.getElementById("formMsg");
    if(localStorage.getItem("fName")){
        formOutput.innerHTML = `Hey ${localStorage.getItem("fName")}, welcome back!`;
    } else {
        localStorage.setItem("fName", fName.value);
        formOutput.innerHTML = `Welcome ${localStorage.getItem("fName")}. Nice to meet you!`;
        fName.value = "";
    }
}
// event handler for web storage portion
document.getElementById("introSubmit").addEventListener("click", storeForm);




// jQuery Widget date picker - https://jqueryui.com/datepicker/#date-range
$( function() {
    var dateFormat = "DD, MM d, yy",
      from = $("#from")
        .datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          numberOfMonths: 1
        })
        .on("change", function() {
          to.datepicker( "option", "minDate", getDate(this));
        }),
      to = $("#to").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1
      })
      .on("change", function() {
        from.datepicker( "option", "maxDate", getDate(this));
      });
      
 
    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }
      return date;
    }

  });
function displayDate(){
    let chosenDate = document.getElementById("displayDate");
    chosenDate.innerHTML = `Requested Stay: ${document.getElementById("from").value} - ${document.getElementById("to").value} <br> We'll send an email regarding availability to:  ${document.getElementById("email").value}`;
}
//event handler for jQuery Widget date picker portion
document.getElementById("datesSubmit").addEventListener("click", displayDate);




// API
function getWeather(lat, long){
    let weatherSection = document.getElementById("showSCWeather");
    let output = "";
    weatherSection.innerHTML = "";

    let apiKey = "c9b581467935864e19d835de964321bc";
    let endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`;

    let xhr = new XMLHttpRequest();

    //add an event listener for the load event on the object
    xhr.addEventListener("load", function(){
        //for successful response, display weather
        if(this.status == 200){
            console.log(this.response);
            output += `<h3>Today's Weather in ${this.response.name}</h3>
            <dl>
                <dt>Current Conditions:</dt>
                <dd>${this.response.weather[0].description}</dd>
                <dt>Current Temp:</dt>
                <dd>${Math.round(this.response.main.temp)}&deg;</dd>
                <dt>Local Max Temp:</dt>
                <dd>${Math.round(this.response.main.temp_max)}&deg;</dd>
                <dt>Local Min Temp:</dt>
                <dd>${Math.round(this.response.main.temp_min)}&deg;</dd>
            </dl>`;

            weatherSection.classList.remove("hidden");
            weatherSection.classList.add("display");
            weatherSection.innerHTML = output; 
        } else {
            weatherSection.innerHTML = "There was an issue with the call to the Open Weather API."
        }
    });

    //set expected response type
    xhr.responseType = "json";
    xhr.open("GET", endpoint);
    xhr.send();
}

function getLocation(e) {
    e.preventDefault();
    let city = e.target.id;
    let lat = 0;
    let long = 0;
    if (city === "getWeatherSC"){
        lat = 33.427;
        long = -117.612;
    } else if(city === "getWeatherPS") {
        lat = 33.831;
        long = -116.609;
    } else if(city === "getWeatherID") {
        lat = 47.674;
        long = -116.797;
    }
    getWeather(lat, long);
}
// event handler for weather associated button
document.getElementById("getWeatherSC").addEventListener("click", getLocation);
document.getElementById("getWeatherPS").addEventListener("click", getLocation);
document.getElementById("getWeatherID").addEventListener("click", getLocation);


