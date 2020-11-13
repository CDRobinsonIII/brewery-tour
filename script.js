  // Global variable to hold available breweries to generate brewery information divs so user and pick the ones they want to visit.
  var breweryList = [];

  // Global variable to hold indexes of the breweries the user wants to visit.
  var breweryTourList = [];

  // Global variable to hold way points for the Google directions API call. 
  var wayPointsArray = [];

  // Function to use Open Brewery DB API to get a list of breweries based on the city inputed by the user. 
  // All breweries meeting the search criteria will be stored in the global breweryList var. 
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
      console.log(breweryList);

    }

  // This is a test function to see if code works before merging. Delete after confirming.
  function addBreweriesToTourToWayPointArray(event) {

    event.preventDefault();

    for (i = 1; i < breweryTourList.length; i++) {

      // Add the breweries that the user wants to visit to the way points array so they can be rendered on the map.

      var getIndex = breweryTourList[i];
     
      // Add lat and lng of brewery to the way points array. 
      var breweryLatLngToAdd = breweryList[getIndex].latlng;
      addBreweryToList = {
        location: breweryLatLngToAdd,
        stopover: true
      };

      wayPointsArray.push(addBreweryToList);

    }
    $("#map").css("display","block");
    $("#right-panel").css("display","block");
    $(".title").css("display","block");
    $("#dbrewerieslist").css("display","none");
    $("#breweryDetails").css("display","none");
    $("#breweryTourList").css("display","none");

    breweryTourList

    initMap();
  }

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

    for (i = 0; i<breweryTourList.length; i++) {

      var imageMarkerIndex = breweryTourList[i];
      var imageMarker = { 
        url : "http://www.artwithlarisse.com/icon/pint.png",
        scaledSize: new google.maps.Size(27,43)  
      } 
      var markerLat = parseFloat(breweryList[imageMarkerIndex].lat);
      var markerLng = parseFloat(breweryList[imageMarkerIndex].lng);
      console.log(markerLat+", "+markerLng);
      var markerPosition = {lat: markerLat, lng: markerLng};

      var nameInfoWindow = breweryList[imageMarkerIndex].name;
      var streetInfoWindow = breweryList[imageMarkerIndex].street;
      var cityInfoWindow = breweryList[imageMarkerIndex].city;
      var stateInfoWindow = breweryList[imageMarkerIndex].state;
      var postalCodeInfoWindow = breweryList[imageMarkerIndex].zipCode;
      var phoneInfoWindow = breweryList[imageMarkerIndex].phone;
      var websiteInfoWindow = breweryList[imageMarkerIndex].website;
      var breweryInfoWindow = (streetInfoWindow+"; "+cityInfoWindow+"; "+stateInfoWindow+"; "+postalCodeInfoWindow);
      var infoWindowContent =
            "</div>" +
              "<h1>"+nameInfoWindow+"</h1>" +
            '<div id="infoWindowContent">' +
                "<p ><b>Address: </b>"+breweryInfoWindow+"</p>" +
                "<p><b>Phone Number: </b>"+phoneInfoWindow+"</p>" +
                '<p><b>Website: </b> <a href="'+websiteInfoWindow+'"/ target="_blank">' + websiteInfoWindow +
            "</div>" +
            "</div>";

      const infowindow = new google.maps.InfoWindow({
        content: infoWindowContent
      });
      const marker = new google.maps.Marker({
        position: markerPosition,
        map,
        title: nameInfoWindow,
        icon: imageMarker
      });
      marker.addListener("click", () => {
        infowindow.open(map, marker);
      });
    }
  }

  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
   
    firstBreweryOnListIndex = breweryTourList[0];
    var startAndEnd = breweryList[firstBreweryOnListIndex].latlng;
    console.log("The first brewery on the list coordinates are: "+startAndEnd)
    
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

function addToBreweryTastingList (event) {

  event.preventDefault();

  // Get the index of the brewery that the user added to the brewery tasting map.
  var addBreweryNameToTour = event.target.id;

  // Create a li tag to attach the name of the brewery that the user wants to add to the brewery tasting map. 
  var addLi = $("<li>").text(breweryList[addBreweryNameToTour].name);

  // Append li tag with the brewery name to the div with the breweryTourList Id.
  $("#breweryTourList").append(addLi);

  // Push the index of the brewery that the user wants to add to the brewery tasting map to the breweryTourList array.
  // This will be used by the map API functions to access breweries the user wants to visit.
  breweryTourList.push(addBreweryNameToTour);
}

function displayBreweryDetails(event) {
  event.preventDefault();
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
  var breweryAddress = (streetDisplay+"; "+cityDisplay+"; "+stateDisplay+"; "+postalCodeDisplay);

  var header = $("<h1>").text("Brewery Details");
  var breweryName = $("<p>").text(nameDisplay);
  var breweryLocation = $("<p>").text(breweryAddress);
  var breweryPhone = $("<p>").text(phoneDisplay);
  var breweryWebsite = $("<p>").text(websiteDisplay);

  var addToTourButton = $("<button>").addClass("btn btn-success").text("Add to Tour").attr("id",breweryDisplayId).on("click",addToBreweryTastingList);

  $("#breweryDetails").append(header,breweryName,breweryLocation,breweryPhone,breweryWebsite,addToTourButton);
  console.log(breweryWebsite);
  
  $("#breweryTourListDiv").css("display","block");


}


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
        var breweryName = breweryBtn.addClass("collapsible m-2 rounded").text(breweryNameToAdd).attr("id", `${i}`).on("click", displayBreweryDetails);
        $("#dbrewerieslist").append(breweryName);
        // addBreweryToTourTest();
        // initMap();
      }
    }, 500);

    $("#generateMap").on("click",addBreweriesToTourToWayPointArray);
      
    
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

  // // Create an on click event for when user wants to add a brewery to their tour. Call function addBreweryToTour to push selected brewery to tour list.
  // $("#addToTour").on("click", addBreweryToTour);

  // // Create an on click event for when user wants to generate their tour of the breweries. Call function "         " to generate the map.
  // $("#addToTour").on("click", initMap);


  //City Validation use of promise or any other HTML validation call
  //Search City Function

  //Display data on $dbreweries
  //Map Shows Direstion when brewery is clicked



  //Collapse Function
  


