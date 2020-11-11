//API Brewerey DB
var queryURL = "https://api.openbrewerydb.org/breweries?by_postal=94550";
$.ajax({
    url: queryURL,
    method: "GET"
})
.then(function(response) {
    console.log(response);


//City Validation use of promise or any other HTML validation call
//Search City Function

//Display data on $dbreweries
//Map Shows Direstion when brewery is clicked
}) 


//Collapse Function
$("#search").on("click", function(c){
    c.preventDefault;
    $(".title").slideUp();
    $("#dbrewerieslist").fadeIn().css("display", "block");
    //$("#dmap").css("display", "block");

    var coll = $(".collapsible");
    var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
      $("#dmap").fadeOut().css("display", "none");
     
    } else {
      content.style.display = "block";
      $("#dmap").fadeIn().css("display", "block");
    }
  });
}return(coll)

})