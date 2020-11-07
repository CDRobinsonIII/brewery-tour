var queryURL = "https://api.openbrewerydb.org/breweries?by_postal=94550";
$.ajax({
    url: queryURL,
    method: "GET"
})
.then(function(response) {
    console.log(response);
})
