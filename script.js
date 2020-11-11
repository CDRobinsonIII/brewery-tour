// Stores openbrewerydb API in a variable
var queryURL = "https://api.openbrewerydb.org/breweries?by_city=";
// Onclick function stores input into variable
var input = document.getElementsById("city").value;
console.log(input);

// Calls the openbrewerydb API then console logs the response
$.ajax({
    url: queryURL,
    method: "GET"
})
.then(function(response) {
    console.log(response);
})
