$(document).ready(function() {

// Global variable to hold available breweries to generate brewery information divs so user and pick the ones they want to visit.
var breweryList = [];

// Global variable to hold indexes of the breweries the user wants to visit.
var breweryTourList = [3, 9, 14];

// Global variable to hold way points for the Google directions API call. 
var wayPointsArray = [];

// Function to use Open Brewery DB API to get a list of breweries based on the city inputed by the user. 
// All breweries meeting the search criteria will be stored in the global breweryList var. 
$("#search").on("click", function (c) {
  c.preventDefault();
  $(".title").slideUp();
  $("#dbrewerieslist").fadeIn().css("display", "block");
  //$("#dmap").css("display", "block");
  var whatCity = $("#city").val();
  console.log("The city typed in is: " + whatCity);
  // Call getBreweryList function to get list of breweries based off of id search
  console.log("*********before the for loop: " + breweryList.length);

  for (i = 0; i < breweryList.length; i++) {
    breweryBtn = $("<button>");
    // var breweryArrayName=breweryList[i].name;
    var breweryName = breweryBtn.addClass("collapsible mb-2 rounded").text(whatCity).attr("id", `brewery${i}`);
    console.log(breweryName);
    $("#dbrewerieslist").append(breweryName);
  }
  
function getBreweryList() {
  var UserCityInput = $("#city").val();

  // The encodeURIComponent method replaces any spaces in the city name with the correct URL code for a space (%20). 
  // Open Brewery DB doesn't allow spaces in their search terms.
  var queryCity = encodeURIComponent(UserCityInput);
  console.log("This is the city in correct URL format: " + queryCity);

  // Define queryURL to includes breweries are in the city inputed by the user, have the type as a micro brewery, and will return up to 25 results. 
  var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + queryCity + "&by_type=micro&per_page=25&page=1";

  // AJAX call to get breweries from the API.
  $.ajax({
    url: queryURL,
    method: "GET"
  })

    // Promise statement waiting for requested information to be processed and returned from API.
    .then(function (response) {
      console.log(response);

      // Create a for loop to go through the array and pick the breweries that have lat and lng details. 
      for (i = 0; i < response.length; i++) {

        // console.log("The brewery's name is: " + response[i].name);
        // console.log("The latitude is: " + response[i].latitude);
        // console.log("The longitude is: " + response[i].longitude);
        // console.log("The postal code is: " + response[i].postal_code);
        // console.log("The street address is: " + response[i].street);

        //Declare variables for each brewery. 
        var breweryName = response[i].name;
        var breweryLat = response[i].latitude;
        var breweryLng = response[i].longitude;
        var breweryLatLng = response[i].latitude + "," + response[i].longitude;
        var breweryStreet = response[i].street;
        var breweryCity = response[i].city;
        var breweryState = response[i].state;
        var breweryPostalCode = response[i].postal_code;
        var breweryPhone = response[i].phone;
        var breweryWebsite = response[i].website_url;
        var breweryIndex = i;

        // console.log(breweryName);
        // console.log(breweryLat);
        // console.log(breweryLng);
        // console.log(breweryLatLng);
        // console.log(breweryStreet);
        // console.log(breweryCity);
        // console.log(breweryState);
        // console.log(breweryPostalCode);
        // console.log(breweryPhone);
        // console.log(breweryWebsite);
        // console.log(breweryIndex);

        // If brewery has lat and lng coordinates (not null) then add their details (as an object) to the breweryList array. 
        if (breweryLat !== null) {
          addBreweryToList = {
            name: breweryName,
            lat: breweryLat,
            lng: breweryLng,
            street: breweryStreet,
            city: breweryCity,
            state: breweryState,
            zipCode: breweryPostalCode,
            latlng: breweryLatLng,
            phone: breweryPhone,
            website: breweryWebsite,
            indexInArray: breweryIndex
          };
          // Push brewery object to the breweryList array.
          breweryList.push(addBreweryToList);
        }
      }

    })

    console.log("Array length after push all breweries: " + breweryList.length);
    console.log(breweryList[3].name);

};
  

  
    // var coll = $(".collapsible");
    // var i;

    // for (i = 0; i < coll.length; i++) {
    //   coll[i].addEventListener("click", function() {
    //     this.classList.toggle("active");
    //     var content = this.nextElementSibling;
    //     if (content.style.display === "block") {
    //       content.style.display = "none";
    //       $("#dmap").fadeOut().css("display", "none");

    //     } else {
    //       content.style.display = "block";
    //       $("#dmap").fadeIn().css("display", "block");
    //     }
    //   });
    // }return(coll)
  })
  
})
// This will be used to build the wayPointsArray list. 
// When user clicks on add to tour we grab the object details and add the index to the brewery tour list. 
function addBreweryToTour() {

  // Using jQuery/DOM grab the brewery that the user wants to add to their tour.
  // Add the index of the brewery to the array for access later to generate Google maps info windows.
  var breweryIndexToAdd = $(this).indexInArray;
  breweryTourList.push(breweryIndexToAdd);

  // Add lat and lng of brewery to the way points array. 
  var breweryLatLngToAdd = $(this).latlng;
  addBreweryToList = {
    location: breweryLatLngToAdd,
    stopover: true
  };

  wayPointsArray.push(addBreweryToList);

  // This code is in case we want to try to add breweries without lat and lng details. If we have time we can add.
  // If we decide to implement this we will have to modify the if statement in the getBreweryList function, because it doesn't add breweries without lat & lng.
  //   else if ((breweryLat === null) & (breweryPostalCode !== null)) {
  //     console.log("There are no coordnates but there is a postal code!");
  //     addBreweryToList = {
  //     location: breweryName+" "+breweryPostalCode,
  //     stopover: true
  //   };

  //   breweryList.push(addBreweryToList);


  //   console.log("The brewery list to display on map is this long: " + breweryList.length);
  //   console.log(breweryList);
  // }

}

// This is a test function to see if code works before merging. Delete after confirming.
function addBreweryToTourTest() {

  console.log(breweryList);

<<<<<<< HEAD
  console.log("2 Array length after push all breweries: " + breweryList.length);
=======
      });
    }
            

  // This will be used to build the wayPointsArray list. 
  // When user clicks on add to tour we grab the object details and add the index to the brewery tour list. 
  function addBreweryToTour() {
>>>>>>> 7dda0ca1670dc26afbfb9b1217a8c3fac912608a

  for (i = 0; i < breweryTourList.length; i++) {
    // Using jQuery/DOM grab the brewery that the user wants to add to their tour.
    // Add the index of the brewery to the array for access later to generate Google maps info windows.

    console.log(breweryList);
    console.log("yo " + breweryList.length);

    var getIndex = breweryTourList[i];
    console.log("Index = " + getIndex);
    console.log("hello " + breweryList.length);
    // console.log("Index = "+brewery);


    // Add lat and lng of brewery to the way points array. 
    var breweryLatLngToAdd = breweryList[3].latlng;
    addBreweryToList = {
      location: breweryLatLngToAdd,
      stopover: true
    };

    wayPointsArray.push(addBreweryToList);

  }
}

// var wayPointsArray = [        
//   {
//     location: 'Los Anageles, CA',
//     stopover: true
//   },{
//     location: 'Solvang, CA',
//     stopover: true
//   },{
//     location: 'Irvine, CA',
//     stopover: true
//   },{
//     location: '32.8908008085346,-117.151828378447',
//     stopover: true
//   },{
//     location: 'Ballast Point Brewing Co 92110-2402',
//     stopover: true
//   },{
//     location: '9990 Alesmith Ct',
//     stopover: true
//   }
// ]


function initMap() {
  const laMesa = { lat: 32.772404, lng: -117.029327 };
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const directionsService = new google.maps.DirectionsService();
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 32.7157, lng: -117.1611 },
    zoom: 10,
  });
  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(document.getElementById("right-panel"));
  calculateAndDisplayRoute(directionsService, directionsRenderer);
  // const infowindow = new google.maps.InfoWindow({
  //   content: "Hello",
  // });
  // const marker = new google.maps.Marker({
  //   position: laMesa,
  //   map,
  //   title: "Happy Town",
  // });
  // marker.addListener("click", () => {
  //   infowindow.open(map, marker);
  // });
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  console.log("This is what the wayPointsArray looks like:");
  // console.log("Hello"+wayPointsArray);
  directionsService.route(

    {
      origin: { lat: 32.772404, lng: -117.029327 },
      destination: { lat: 32.772404, lng: -117.029327 },
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true,
      waypoints: wayPointsArray
    },
    (response, status) => {
      if (status == "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}

// getBreweryList();
// addBreweryToTourTest();
// initMap();


<<<<<<< HEAD
// Create an on click event for when user enters a city in the search box. Call function getBreweryList to generate available breweries.
// $("#cityBrewerySearch").on("click", getBreweryList);
=======
function breweryButtonsWorking (event) {
  event.preventDefault();
  var breweryClickedOn = event.target.id;
  alert("The brewery info buttons are working! "+breweryList[breweryClickedOn].name);
}

  // getBreweryList();
  // addBreweryToTourTest();
  // initMap();
>>>>>>> 7dda0ca1670dc26afbfb9b1217a8c3fac912608a

// // Create an on click event for when user wants to add a brewery to their tour. Call function addBreweryToTour to push selected brewery to tour list.
// $("#addToTour").on("click", addBreweryToTour);

<<<<<<< HEAD
// // Create an on click event for when user wants to generate their tour of the breweries. Call function "         " to generate the map.
// $("#addToTour").on("click", initMap);
=======
  $("#search").on("click", function (c) {
    c.preventDefault();
    $(".title").slideUp();
    $("#dbrewerieslist").fadeIn().css("display", "block");
    //$("#dmap").css("display", "block");
    var whatCity = $("#city").val();
    console.log("The city typed in is: " + whatCity);
    // Call getBreweryList function to get list of breweries based off of id search
    getBreweryList()// *** this function must return a promise then you do .then(() => {wrap the code here})d

    setTimeout(() => {  
      for (i = 0; i < breweryList.length; i++) {
        breweryBtn = $("<button>");
        breweryNameToAdd = breweryList[i].name;
        // var breweryArrayName=breweryList[i].name;
        var breweryName = breweryBtn.addClass("collapsible m-2 rounded").text(breweryNameToAdd).attr("id", `${i}`).on("click", breweryButtonsWorking);
        $("#dbrewerieslist").append(breweryName);
        // addBreweryToTourTest();
        // initMap();
      }
    }, 500);
      
    
    // var coll = $(".collapsible");
    // var i;

    // for (i = 0; i < coll.length; i++) {
    //   coll[i].addEventListener("click", function() {
    //     this.classList.toggle("active");
    //     var content = this.nextElementSibling;
    //     if (content.style.display === "block") {
    //       content.style.display = "none";
    //       $("#dmap").fadeOut().css("display", "none");

    //     } else {
    //       content.style.display = "block";
    //       $("#dmap").fadeIn().css("display", "block");
    //     }
    //   });
    // }return(coll)

  })


  // Create an on click event for when user enters a city in the search box. Call function getBreweryList to generate available breweries.
  // $("#cityBrewerySearch").on("click", getBreweryList);
>>>>>>> 7dda0ca1670dc26afbfb9b1217a8c3fac912608a


//City Validation use of promise or any other HTML validation call
//Search City Function

//Display data on $dbreweries
//Map Shows Direstion when brewery is clicked



//Collapse Function



