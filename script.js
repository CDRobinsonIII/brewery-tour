// Global variable to hold available breweries to generate brewery information divs so user and pick the ones they want to visit.
var breweryList = [];

// Global variable to track number of breweries on tour list. 
var numberOfBreweriesInTour = 0;

// Global variable to hold indexes of the breweries the user wants to visit.
var breweryTourList = [];

// Global variable to hold way points for the Google directions API call. 
var wayPointsArray = [];

// Create an empty array var to hold the breweries added to brewery tasting tour.
// Global variable to hold the breweries user has added to their brewery tasting tour list.
var breweriesVisited = [];

// Function to use Open Brewery DB API to get a list of breweries based on the city inputed by the user. 
// All breweries meeting the search criteria will be stored in the global breweryList var. 
function getBreweryList() {
  var UserCityInput = $("#city").val();

  // The encodeURIComponent method replaces any spaces in the city name with the correct URL code for a space (%20). 
  // Open Brewery DB doesn't allow spaces in their search terms.
  var queryCity = encodeURIComponent(UserCityInput);

  // Define queryURL to includes breweries are in the city inputed by the user, have the type as a micro brewery, and will return up to 25 results. 
  var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + queryCity + "&by_type=micro&per_page=25&page=1";

  // AJAX call to get breweries from the API.
  $.ajax({
    url: queryURL,
    method: "GET"
  })

    // Promise statement waiting for requested information to be processed and returned from API.
    .then(function (response) {

      var breweryCount = 0;
      // Create a for loop to go through the array and pick the breweries that have lat and lng details. 
      for (i = 0; i < response.length; i++) {

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
        var breweryIndex = breweryCount;

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
          }

          // Keeps track of number of breweries in list and index of each brewery. 
          breweryCount++;
          // Push brewery object to the breweryList array.
          breweryList.push(addBreweryToList);
        }

      }

    });
}

// On click event for when the user enters an input in the city search field. 
// It called the get breweries function and renders the breweries on the screen as buttons with on click events.
$("#search").on("click", function (c) {
  c.preventDefault();
  var whatCity = $("#city").val();

  // Makes sure the city input isn't empty. If it is, the return returns to the input field. 
  if (whatCity !== "") {

    $(".title").slideUp();

    // See if there are breweries in local storage. If there is display the divs here.
    if (breweriesVisited === null) {
      $("#breweryBadgeHeader").css("display","none");
      $("#breweryBadgeBoard").css("display","none");
    };

    $("#dbrewerieslist").fadeIn().css("display", "block");

    var whatCity = $("#city").val();

    // Call getBreweryList function to get list of breweries based off of id search.
    // There were some timing issues with the AJAX call, so we implemented a timer to delay the processing of the code that followed the AJAX.
    // This tip was provide to possible get around the timing issue, we never go around to trying ==> this function must return a promise then you do .then(() => {wrap the code here})d
    getBreweryList();

    // Timer to wait half of a second before the following code is processed. It fixed our timing issues. 
    setTimeout(() => {

      if (breweryList.length !== 0) {
        //Renders the breweries on the screen as buttons with on click events.
        for (i = 0; i < breweryList.length; i++) {
          breweryBtn = $("<button>");
          breweryNameToAdd = breweryList[i].name;
          var breweryName = breweryBtn.addClass("collapsible").text(breweryNameToAdd).attr("id", `${i}`).on("click", displayBreweryDetails);
          $("#dbrewerieslist").append(breweryName);
        }
      }

      // If Open Brewery API returns no results, let user know.
      else {
        $("#dbrewerieslist").css("display","none");
        $("#tryAgainSection").css("display","block");
        $("#breweryBadgeHeader").css("display","none");
        $("#breweryBadgeBoard").css("display","none");
      }
    }, 500);
    
  }

  // Returns to city search input if user didn't input a city.
  else {
    return
  };

<<<<<<< HEAD
    $("#newSearch").on("click", function() {
      location.reload();

=======
  // On click event for when the user clicks on the generate map button in the brewery tasting tour list. 
  $("#generateMap").on("click", addBreweriesToTourToWayPointArray);

  // On click event for when the user clicks on the start new search button on the map page.
  $("#newSearch").on("click", function () {
    location.reload();
  });
>>>>>>> ea14ebdde1e27d43d5b7bbda48335547d92d0947

})

// Function to add breweries the user wants to visit to the way points array - to send to the Google Maps Directions API.
// Function also adds the breweries to the stora breweries to local storage array. 
function addBreweriesToTourToWayPointArray(event) {
  event.preventDefault();

  for (i = 1; i < breweryTourList.length; i++) {

<<<<<<< HEAD
      
   

  })  
  // This will be used to build the wayPointsArray list. 
  // When user clicks on add to tour we grab the object details and add the index to the brewery tour list. 
  function addBreweryToTour() {

    // Using jQuery/DOM grab the brewery that the user wants to add to their tour.
    // Add the index of the brewery to the array for access later to generate Google maps info windows.
    var breweryIndexToAdd = $(this).indexInArray;
    breweryTourList.push(breweryIndexToAdd);
=======
    console.log("@@@@@@@@"+i);

    // Add the breweries that the user wants to visit to the way points array so they can be rendered on the map.
    var getIndex = breweryTourList[i];
>>>>>>> ea14ebdde1e27d43d5b7bbda48335547d92d0947

    // Add lat and lng of brewery to the way points array. 
    var breweryLatLngToAdd = breweryList[getIndex].latlng;
    console.log("$$$$$$$$$"+breweryLatLngToAdd);
    addBreweryToList = {
      location: breweryLatLngToAdd,
      stopover: true
    };

    // Push to ways point array.
    wayPointsArray.push(addBreweryToList);

    // Add brewery name and city to the breweries to the stora breweries to local storage array. 
    var breweryNameToAdd = breweryList[getIndex].name;
    var breweryCityToAdd = breweryList[getIndex].city;

    addBreweryToLocalStorageArray = {
      city: breweryCityToAdd,
      name: breweryNameToAdd
    };

    // Push to local storage array.
    breweriesVisited.push(addBreweryToLocalStorageArray);

  }

  // Change display properties of the various divs to show only the map section.
  $("#breweryDetails").css("display", "none");
  $("#breweryTourListDiv").css("display", "none");
  $("#breweryBadgeHeader").css("display","none");
  $("#breweryBadgeBoard").css("display","none");
  $("#mapSection").slideUp().css("display", "block");
  $(".title").css("display", "none");
  $("#dbrewerieslist").fadeOut().css("display", "none");

  // Because the way points array doesn't add the first index to the array (as it is the start and end point of the trip)...
  // We have to push the 0 index to the local storage array.
    breweryNameToAdd = breweryList[breweryTourList[0]].name;
    breweryCityToAdd = breweryList[breweryTourList[0]].city;

    addBreweryToLocalStorageArray = {
      city: breweryCityToAdd,
      name: breweryNameToAdd
    };

    breweriesVisited.push(addBreweryToLocalStorageArray);

  // Call function to store breweries added to the tasting tour list  (thus visited) to local storage.
  storageBreweriesVisited();

  // Call Google Maps Directions API function to get brewery tasting tour map.
  initMap();
}

// Function to create the map and directions panel for the user based off of the breweries they want to visit. 
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

  // For loop to create custom map markers and info windows for each stop in the tour. 
  for (i = 0; i < breweryTourList.length; i++) {

    var imageMarkerIndex = breweryTourList[i];

    //Variable to hold icon information and image for custom marker.
    var imageMarker = {
      url: "http://www.artwithlarisse.com/icon/pint.png",
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(45, 45),
      scaledSize: new google.maps.Size(27, 43)
    }

    var markerLat = parseFloat(breweryList[imageMarkerIndex].lat);
    var markerLng = parseFloat(breweryList[imageMarkerIndex].lng);
    var markerPosition = { lat: markerLat, lng: markerLng };

    var nameInfoWindow = breweryList[imageMarkerIndex].name;
    var streetInfoWindow = breweryList[imageMarkerIndex].street;
    var cityInfoWindow = breweryList[imageMarkerIndex].city;
    var stateInfoWindow = breweryList[imageMarkerIndex].state;
    var postalCodeInfoWindow = breweryList[imageMarkerIndex].zipCode;
    var phoneInfoWindow = breweryList[imageMarkerIndex].phone;
    var websiteInfoWindow = breweryList[imageMarkerIndex].website;
    var breweryInfoWindow = (streetInfoWindow + "; " + cityInfoWindow + "; " + stateInfoWindow + "; " + postalCodeInfoWindow);

    // Content (information) variable for the brewery info window. 
    var infoWindowContent =
      "</div>" +
      "<h1>" + nameInfoWindow + "</h1>" +
      '<div id="infoWindowContent">' +
      "<p ><b>Address: </b>" + breweryInfoWindow + "</p>" +
      "<p><b>Phone Number: </b>" + phoneInfoWindow + "</p>" +
      '<p><b>Website: </b> <a href="' + websiteInfoWindow + '" target="_blank">' + websiteInfoWindow + "</a></p>" +
      "</div>" +
      "</div>";

    // Create custom map markers and info windows for each brewery on the tour map.
    const infowindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    const marker = new google.maps.Marker({
      position: markerPosition,
      map,
      title: nameInfoWindow,
      icon: imageMarker,
      animation: google.maps.Animation.DROP
    });
    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
  }
}

// Function to calculate routes and display maps and directions. 
function calculateAndDisplayRoute(directionsService, directionsRenderer) {

  firstBreweryOnListIndex = breweryTourList[0];
  var startAndEnd = breweryList[firstBreweryOnListIndex].latlng;

  // Google Maps Directions API function to create map and directions. Send start and end points, and way points. 
  // The start and end points are the first brewery that the user adds to the tour list. 
  directionsService.route(

    {
      origin: startAndEnd,
      destination: startAndEnd,
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true,
      waypoints: wayPointsArray,
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

// Function to add brewery of the users choice to the brewery tasting tour. The can enter up to 5 breweries (no duplicates).
function addToBreweryTastingList(event) {

  event.preventDefault();

  // Get the index of the brewery that the user added to the brewery tasting map.
  var addBreweryNameToTour = event.target.id;

  // Conditional prevents user from add the same brewery to the list more than once. 
  if ($.inArray(addBreweryNameToTour, breweryTourList) > -1) {
    return
  }

  // Create a li tag to attach the name of the brewery that the user wants to add to the brewery tasting map. 
  var addLi = $("<li>").text(breweryList[addBreweryNameToTour].name);

  // Append li tag with the brewery name to the div with the breweryTourList Id.
  $("#breweryTourList").append(addLi);

  // Push the index of the brewery that the user wants to add to the brewery tasting map to the breweryTourList array.
  // This will be used by the map API functions to access breweries the user wants to visit.
  breweryTourList.push(addBreweryNameToTour);

  // This prevents the user from adding more than 5 breweries to the list. Once the count hits 5 the add to tour button is hidden!
  numberOfBreweriesInTour++;
  if (numberOfBreweriesInTour === 5) {
    $(".switch").css("display", "none");
  }
}

//This function displays the brewery details whenever the user clicks on one of the brewery buttons. 
function displayBreweryDetails(event) {
  event.preventDefault();

  // Clears out previous brewery information. Otherwise it would just keep appending.
  $("#breweryDetails").text("");
  var breweryDisplayId = event.target.id;

  // breweryDetailsDiv = $("<div>"); figure out what to do with this.
  var nameDisplay = breweryList[breweryDisplayId].name;
  var streetDisplay = breweryList[breweryDisplayId].street;
  var cityDisplay = breweryList[breweryDisplayId].city;
  var stateDisplay = breweryList[breweryDisplayId].state;
  var postalCodeDisplay = breweryList[breweryDisplayId].zipCode;
  var phoneDisplay = breweryList[breweryDisplayId].phone;
  var websiteDisplay = breweryList[breweryDisplayId].website;
  var breweryAddress = (streetDisplay + "; " + cityDisplay + "; " + stateDisplay + "; " + postalCodeDisplay);

  var header = $("<h1>").text("Brewery Details");
  var breweryName = $("<p>").text(nameDisplay);
  var breweryLocation = $("<p>").text(breweryAddress);
  var breweryPhone = $("<p>").text(phoneDisplay);

  // Added the target ='_blank' attribute so that link would open in a new window. 
  var breweryWebsite = $("<p>").append($("<a target='_blank'>").attr("href", websiteDisplay).text(websiteDisplay));


  var addToTourButton = $("<button>").addClass("addToTourButton switch").text("Add to Tour").attr("id", breweryDisplayId).on("click", addToBreweryTastingList);

  $("#breweryDetails").append(header, breweryName, breweryLocation, breweryPhone, breweryWebsite, addToTourButton);

  // Once the user clicks on one of the brewery buttons, the brewery detail div and brewery tour div is shown. 
  $("#breweryTourListDiv").css("display", "block");
  $("#breweryDetails").fadeIn().css("display", "block");

}

// Function to storage city search history to local storage. 
function storageBreweriesVisited () {
    localStorage.setItem("breweriesVisited", JSON.stringify(breweriesVisited));
}

// Function to see if there are any cities in the city search history stored in the local storage.
function renderBreweriesVisited () {

    // Retrieve stored breweries from local storage.
    var getStoredBreweriesVisited = JSON.parse(localStorage.getItem("breweriesVisited"));

    // If there are breweries in local storage, render them to the breweries visited div with id = breweryBadge.
    if (getStoredBreweriesVisited !== null) {
      breweriesVisited = getStoredBreweriesVisited;

    $("#breweryBadgeHeader").css("display","block");
    $("#breweryBadgeBoard").css("display","flex");

        // Loop through the stored breweries and render them in the breweries div with id = breweryBadge.
        for (i=0; i < breweriesVisited.length; i++) {
        
            // Create an button tag to attach the new city to. To append to the city history list.
            var breweryBadgeDiv= $('<div>').addClass(`breweryBadge${i} breweryBadgeDetails`);
            $("#breweryBadgeBoard").append(breweryBadgeDiv);

            // Create p tag to display brewery name in.
            var breweryName= $("<p>").text(breweriesVisited[i].name);

            // Create p tag to display brewery city in.
            var breweryCity= $("<p>").text(breweriesVisited[i].city);

            // Append the city name from local storage to the city history list. 
            $(`.breweryBadge${i}`).append(breweryName,breweryCity);
        }
    }
}

// Call function to show visited breweries that are in local storage on start page under city search input.
renderBreweriesVisited();


  // On click event for when the user clicks on try again search button.
  $("#tryAgainPlease").on("click", function () {
    location.reload();
  });
