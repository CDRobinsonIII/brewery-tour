# Title
    Brewery Tasting Tour
    
# Description
For this group project we were tasked with creating a web application from scratch. The main requirements were to use two server side APIs and provide an interactive website experience for the user based off their input. Our group created a web application that searched for local micro breweries in the city the user typed in the search box. The goal of the web application was to generate a brewery tasting tour map based on the user's choices from the list of breweries provided. Our brewery tasting tour map application performs the following tasks.
   + Asks for the city input from the user.
   + Generate an array of breweries using the Open Brewery DB API. We use the following search criteria: we only look for micro breweries in the city entered, and limit the          search return to 25 breweries.
   + The brewery names are displayed on the screen as buttons.
   + When the user clicks on a brewery name, the information for that brewery is rendered on the screen for the user to view to help them make a decision on whether to the            brewery to their brewery tasting tour list. The information displayed on the screen: brewery name, address, phone number, and website.
   + On the rendered brewery display there is an "add to tour" button. The user is able to add up to 5 breweries to their tour list.
   + Once the user is finished adding breweries to their tour list, they click on the "generate map" button to generate their brewery tasting tour map.
   + Google Maps Direction API is used to generate a map with multiple stops. The Google Maps API directionsDisplay and directionsRenderer functions are used to render and            display tour map to the maps div in the index file. Google Maps Directions API optimizes the route to reduce drive time.
   + Once the map is displayed, the user can click on custom map markers for the individual breweries on their tasting route and get the information for each brewery
   + At the bottom of the map the user has the option to start a new search. The start search button takes the user back to the start of the web application.
   + Save any breweries the user adds to their brewery tasting tour list to local storage to reference them later as breweries they "have visited".

# Getting Started
This project has been deployed to GitHub Pages. To get this project up and running, you can follow the deployment link.
   + [GitHub Respository](https://github.com/CDRobinsonIII/brewery-tour.git) 
   + [Deployed GitHub IO](https://cdrobinsoniii.github.io/brewery-tour/)

# Prerequisites
To install this application, you will need a text editor. I recommend Visual Studio Code.

# Summary
This project emphasizes the use of using CSS Framework, Javascript, jQuery, AJAX, API & Local Storage to make dynamic changes to an HMTL document
  ![ScreenshotIntro](./ScreenShot_Brewery_Tasting_Tour.jpg)
  
# This project has the following features:
+ A Search button
    - This will trigger API call to search available Brewery based on user's city.
    - After user inputted and searched, a display of Breweries would be displayed.
    ![ScreenshotSelect]()
+ A Breweries List 
    - This will list selected breweries based on the city.
    - When clicked of the users desired brewery, display details of  selected breweries
     ![Screenshotdisplay]()
+ A Add Tour button
    - This will list selected breweries user would like to visit.
    - When clicked of the users desired brewery, display list of users Breweries Tour List.
     ![Screenshotdisplay]()
 + A Generate Map butoon
    - This displat map route of breweries selecred
    - When clicked based on the number of breweries selected, it would display a map route using google maps.
     ![Screenshotdisplay]()

# The tasks for the web application were accomplished by:
 + Using the Open Brewery DB API to get brewery data for specific cities
 + Using the Google Maps Directions API to get map data for the brewery tour based off of the users input.
 + Using jQuery to manipulate the DOM of the index.html.
 + Using jQuery on click events for the city input button, the individual brewery buttons, the "add to tour" button, and the "generate map" button
 + Using functions to:
    - Make API calls to Open Brewery DB API
    - Make API calls to Google Maps Directions API
    - Render list of breweries retrieved from API to the screen.
    - Render individual brewery details on screen based on brewery button the user clicks on.
    - Generate brewery tasting tour list based off of user input.
    - Generate map and directions panel.
    - Store breweries added to tasting tour to local straoge.
    - Retrieve breweries "visited" from local storage.
    

# Technologies/Languages Used
   + APIs/AJAX Calls
   + HTML
   + CSS
   + jQuery
   + DOM Manipulation
   + Local Storage
   + Functions
    
# What We Learned

While working on this project, we learned how to work together as a team to create a working web application. We used Github to create and manage tasks as well as our overall project. We learned how to use multiple APIs to create an interactive experience for our users. This project required a lot of psuedo-coding and time outside of class to complete. 

# Author's
  Charles Robinson
  Erick Salgado
  Sanjay Gonsalves
  
  Student-UCSD Extension/
  Web Development Boot Camp

