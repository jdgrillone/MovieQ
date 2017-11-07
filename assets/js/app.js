// Initialize Firebase
var config = {
    apiKey: "AIzaSyDDKTaqtZzvPCFh-pyUS1qE10U98Gd3IjQ",
    authDomain: "movieq-a6081.firebaseapp.com",
    databaseURL: "https://movieq-a6081.firebaseio.com",
    projectId: "movieq-a6081",
    storageBucket: "movieq-a6081.appspot.com",
    messagingSenderId: "921826093279"
};
firebase.initializeApp(config);

var database = firebase.database();

var recentmovies = [];
var indexOf = 0;

$(document).ready(function(){


	var movie = "";
	var offset = 0;
	function movieSearch() {
		var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=cb3ac66f262794533540ec467d2c75f1&query=" + movie;
		$(".results").html("");
	        // Creating an AJAX call for the specific movie being searched
	        $.ajax({
             url: queryURL,
             method: "GET"
         }).done(function(response) {

          console.log(response);

          if (offset >= 3) {
            $("#prev").attr("class", "btn-floating blue");
        }
        if (offset < 15) {
            $("#next").attr("class", "btn-floating blue");
        }

        for (var i = 0; i < 3; i++) {
		            // Creating a div to hold the movie
		            var movieDiv = $("<div class='movie'>");
		            movieDiv.attr("value", response.results[i + offset].id);

		            // Storing the title data
		            var title = response.results[i + offset].title;

		            // Storing the release year
		            var released = response.results[i + offset].release_date.substring(0, 4);

		            // Creating an element to hold the release year
		            var pTwo = $("<p>").text('"' + title + '" -- ' + released);

		            // Displaying the release year
		            movieDiv.append(pTwo);

		            // Putting the entire movie in the search results
		            $(".results").append(movieDiv);
              }

              if (offset < 3) {
                $("#prev").attr("class", "btn-floating blue disabled");
            }
            if (offset >= 15) {
                $("#next").attr("class", "btn-floating blue disabled");
            }
	    });// End of ajax.done function
	};// End of movieSearch function

    // This function handles events where the search button is clicked
    $("#movie-search").on("click", function(event) {
    	event.preventDefault();
        // This line grabs the input from the textbox
        movie = $("#movie-input").val().trim();
        offset = 0;
        movieSearch();
        $("#movie-input").val("")
    });

    $("#prev").on("click", function(event) {
     event.preventDefault();

     if (offset >= 3) {
       offset -= 3;
       movieSearch();
   }
});

    $("#next").on("click", function(event) {
    	event.preventDefault();

    	if (offset < 15) {
           offset += 3;
           movieSearch();
       }
   });

    // displayRecommendations function re-renders the HTML to display the appropriate content
    function displayRecommendations() {

        var movieID = $(this).attr("value");
        var queryURL = "https://api.themoviedb.org/3/movie/" + movieID + "/recommendations?api_key=cb3ac66f262794533540ec467d2c75f1&language=en-US&page=1";

        $(".carousel").html("");
        $(".carousel").attr("class", "carousel");
        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
        	url: queryURL,
        	method: "GET"
        }).done(function(response) {
        	console.log(response);

        	if (response.results.length < 1) {
               nodisplay();
           } else {

              $("#message").text("");

              for (var i = 0; i < 10; i++) {
		            // Creating a div to hold the movie
		            var movieDiv = $("<div class='carousel-item recommend'>");
		            movieDiv.attr("value", response.results[i].id);

		            // Retrieving the URL for the image
		            var imgURL = "https://image.tmdb.org/t/p/w185" + response.results[i].poster_path;

		            // Creating an element to hold the image
		            var image = $("<img>").attr("src", imgURL);

		            // Appending the image
		            movieDiv.append(image);

		            // Putting the entire movie above the previous movies
		            $(".carousel").append(movieDiv);

              }

              $(".carousel").carousel();
          }
		});// End of ajax.done function

	}; // End of displayRecommendations function

    // displayGenraRecommendations function re-renders the HTML to display the appropriate content
    function displayGenreRecommendations() {

        var genreID = $(this).attr("value");
        var queryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=" + genreID + "&page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=cb3ac66f262794533540ec467d2c75f1";

        $(".carousel").html("");
        $(".carousel").carousel("destroy");
        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
        	url: queryURL,
        	method: "GET"
        }).done(function(response) {
        	console.log(response);

        	if (response.results.length < 1) {
               nodisplay();
           } else {

              $("#message").text("");

              for (var i = 0; i < 10; i++) {
		            // Creating a div to hold the movie
		            var movieDiv = $("<div class='carousel-item recommend'>");
		            movieDiv.attr("value", response.results[i].id);

		            // Retrieving the URL for the image
		            var imgURL = "https://image.tmdb.org/t/p/w185" + response.results[i].poster_path;

		            // Creating an element to hold the image
		            var image = $("<img>").attr("src", imgURL);

		            // Appending the image
		            movieDiv.append(image);

		            // Putting the entire movie above the previous movies
		            $(".carousel").append(movieDiv);

		        }

		        $(".carousel").carousel();
		    }
		});// End of ajax.done function

	};// End of displayGenreRecommendations fucntion

    // displayRecommendationInfo function re-renders the HTML to display the appropriate content
    function displayRecommendationInfo(event) {
    	event.preventDefault();
    	$("#recommendation-info").html("");
    	var movieID = $(this).attr("value");
    	var queryURL = "https://api.themoviedb.org/3/movie/" + movieID + "?language=en-US&api_key=cb3ac66f262794533540ec467d2c75f1";

        // Creating an AJAX call for the specific recommendation button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
      	}).done(function(response) {
        	console.log(response);

            // Creating a div to hold the movie
            var movieDiv = $("<div class='row recommend-info'>");

            // Storing the title data
            var title = response.title;

            // Creating an element to have the rating displayed
            var pOne = $("<p>").text("Title: " + title);

            // Displaying the title
            movieDiv.append(pOne);

            // Storing the release year
            var released = response.release_date;

            // Creating an element to hold the release year
            var pTwo = $("<p>").text("Released: " + released);

            // Displaying the release year
            movieDiv.append(pTwo);

            // Storing the plot
            var plot = response.overview;

            // Creating an element to hold the plot
            var pThree = $("<p>").text("Plot Summary: " + plot);

            // Appending the plot
            movieDiv.append(pThree);

            // Retrieving the URL for the image
            var imgURL = "https://image.tmdb.org/t/p/w185" + response.poster_path;

            // Creating an element to hold the image
            var image = $("<img class='col s3'>").attr("src", imgURL);

            // Appending the image
            movieDiv.prepend(image);



            // Push info to Firebase
            database.ref("/movies").push({
                title: title,
                id: movieID,
                imgURL: imgURL,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });

            // Putting the entire movie above the previous movies
            $("#recommendation-info").prepend(movieDiv);

        });// End of ajax.done function
        // 2. This code loads the IFrame Player API code asynchronously.
	    var tag = document.createElement('script');

	    tag.src = "https://www.youtube.com/iframe_api";
	    var firstScriptTag = document.getElementsByTagName('script')[0];
	    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	    // 3. This function creates an <iframe> (and YouTube player)
	    //    after the API code downloads.
	    var player;
	    function onYouTubeIframeAPIReady() {
	        player = new YT.Player('player', {
	        	height: '390',
	        	width: '640',
	        	videoId: 'M7lc1UVf-VE',
	        	events: {
	            	'onReady': onPlayerReady,
	            	'onStateChange': onPlayerStateChange
	        	}
	        });
	    }

	    // 4. The API will call this function when the video player is ready.
	    function onPlayerReady(event) {
	        event.target.playVideo();
	    }

	    // 5. The API calls this function when the player's state changes.
	    //    The function indicates that when playing a video (state=1),
	    //    the player should play for six seconds and then stop.
	    var done = false;
	    function onPlayerStateChange(event) {
	        if (event.data == YT.PlayerState.PLAYING && !done) {
	        	setTimeout(stopVideo, 6000);
	        	done = true;
	        }
	    }
	    function stopVideo() {
	        player.stopVideo();
	    }
	};// End of displayRecommendationInfo function

    // Adding a click event listener to all elements with a class of "movie"
    $(document).on("click", ".movie", displayRecommendations);

    // Adding a click event listener to all elements with a class of "genre"
    $(document).on("click", ".genre", displayGenreRecommendations);

    // Adding a click event listener to all elements with a class of "recommend"
    $(document).on("click", ".recommend", displayRecommendationInfo);

});// End of document.ready function

// Function to display text if there are no recommendations
function nodisplay() {
	$("#message").text("Sorry, there are no results for that")
};




// Pulls last 5 items from database and appends them to #recently-viewed
database.ref("/movies").orderByChild("dateAdded").limitToLast(5).on("child_added", function(snapshot) {

    var movieID = snapshot.val().id;

    for (i = 0; i < recentmovies.length; i++) {
        if (recentmovies[i].val().id === movieID) {
            indexOf = i;
            break;
        }
    };
    if (recentmovies[indexOf] && movieID === recentmovies[indexOf].val().id) {
        recentmovies[indexOf].ref.remove();
        recentmovies.splice(indexOf, 1);
    };

    recentmovies.unshift(snapshot);

    var recentItem = $("<span>");
    //adds class for styling purposes
    recentItem.attr("class", "recent")
    var image = $("<img>").attr("src", snapshot.val().imgURL);
    //data value for displayRecommendationInfo function
    image.attr("value", snapshot.val().id);
    recentItem.attr("id", snapshot.val().id);
    //classes for event listener and styling
    image.attr("class", "recommend imagesmall");
    recentItem.append(image);
    $("#recently-viewed").prepend(recentItem);

    //set up a listener on snapshot for on remove


    if (recentmovies.length > 5) {
        for (i = 5; i < recentmovies.length; i++){
            recentmovies[i].ref.remove();

        }
        recentmovies = recentmovies.slice(0, 5);
    }
});

database.ref("/movies").on("child_removed", function(snapshot) {
    console.log(snapshot.val());
    $("#" + snapshot.val().id).remove();
});