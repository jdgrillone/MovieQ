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
        $("#instructions").empty();
        $("#section-title").html("<h4>Recommendations</h4>");

        var movieID = $(this).attr("value");
        var queryURL = "https://api.themoviedb.org/3/movie/" + movieID + "/recommendations?api_key=cb3ac66f262794533540ec467d2c75f1&language=en-US&page=1";

    	setTimeout(function() {
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
    	}, 1000);
	}; // End of displayRecommendations function

    // displayGenraRecommendations function re-renders the HTML to display the appropriate content
    function displayGenreRecommendations() {
        $("#instructions").empty();
        $("#section-title").html("<h4>Recommendations</h4>");

        var genreID = $(this).attr("value");
        var queryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=" + genreID + "&page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=cb3ac66f262794533540ec467d2c75f1";

    	setTimeout(function() {
        $(".carousel").html("");
        $(".carousel").carousel("destroy");
        // Creating an AJAX call for the specific genre being clicked
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
    	}, 1000);
	};// End of displayGenreRecommendations fucntion

    // displayRecommendationInfo function re-renders the HTML to display the appropriate content
    function displayRecommendationInfo(event) {
    	event.preventDefault();
    	$("#recommendation-info").html("");
    	var movieID = $(this).attr("value");
    	var queryURL = "https://api.themoviedb.org/3/movie/" + movieID + "?language=en-US&api_key=cb3ac66f262794533540ec467d2c75f1";
    	var pFive;
    	var pTwo = $("<p>");

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
            if (response.homepage !== "") {
            	var pOne = $("<p>").html("<b>Title:</b> <a href='"+response.homepage+"' target='_blank'><u>" + title + "</u></a>");
            } else {
            	var pOne = $("<p>").html("<b>Title:</b> <a href='http://www.imdb.com/title/"+response.imdb_id+"/' target='_blank'><u>" + title + "</u></a>");
            }

            // Displaying the title
            movieDiv.append(pOne);

            // Ajax call to grab the MPAA rating
            $.ajax({
              url: "https://api.themoviedb.org/3/movie/"+movieID+"/release_dates?api_key=cb3ac66f262794533540ec467d2c75f1",
              method: "GET"
          }).done(function(response) {
              console.log(response);

              for (var i = 0; i < response.results.length; i++) {
               if (response.results[i].iso_3166_1 === "US") {
						// Filling the <p> with the rating
						pTwo.html("<b>Rated:</b> "+response.results[i].release_dates[0].certification);
						break;
					}
				}
			});// End of ajax.done function

          movieDiv.append(pTwo)

            // Storing the release year
            var released = response.release_date;
            var convertedDate = moment(released, "YYYY-MM-DD");
            released = convertedDate.format("MM/DD/YYYY");

            // Creating an element to hold the release year
            var pThree = $("<p>").html("<b>Released:</b> " + released);

            // Displaying the release year
            movieDiv.append(pThree);

            // Storing the plot
            var plot = response.overview;

            // Creating an element to hold the plot
            pFive = $("<p>").html("<b>Plot Summary:</b> " + plot);

            // Ajax call to grab the cast
            $.ajax({
            	url: "https://api.themoviedb.org/3/movie/"+movieID+"/credits?api_key=cb3ac66f262794533540ec467d2c75f1",
            	method: "GET"
        	}).done(function(response) {
            	console.log(response);

            	var pFour = $("<p>").html("<b>Cast:</b> ");

            	for (var i = 0; i<4; i++) {
                	var performerID = response.cast[i].id;

                	$.ajax({
                    	url: "https://api.themoviedb.org/3/person/"+performerID+"?language=en-US&api_key=cb3ac66f262794533540ec467d2c75f1",
                    	method: "GET"
                	}).done(function(response) {
                    	console.log(response);

                    	pFour.append("<a href='http://www.imdb.com/name/"+response.imdb_id+"/' target='_blank'>"+response.name+"</a>, ");
					});// End of ajax.done function
            	}

				// Appending the image
				movieDiv.append(pFour);

				// Appending the plot
				movieDiv.append(pFive);
			});// End of ajax.done function

			// Retrieving the URL for the image
			var imgURL = "https://image.tmdb.org/t/p/w185" + response.poster_path;

            // Creating an element to hold the image
            var image = $("<img class='col s3'>").attr("src", imgURL);

            // Appending the image
            movieDiv.prepend(image);

            // Storing the tagline
            var tagline = response.tagline;

            // Creating tagline element
            var hFive = $("<h5 id='tagline'>").text(tagline);
            hFive.css("padding", "0 .75rem");

            // Displaying tagline
            movieDiv.prepend(hFive);



            // Push info to Firebase
            database.ref("/movies").push({
                title: title,
                id: movieID,
                imgURL: imgURL,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });

            // Putting the entire movie above the previous movies
            $("#recommendation-info").append(movieDiv);

        });// End of ajax.done function

        // Clear old iframe and replace with default div
        $("#player-parent").html('<div id="player">');

      	// Ajax call for the movie trailer
        $.ajax({
          url: "https://api.themoviedb.org/3/movie/"+movieID+"/videos?language=en-US&api_key=cb3ac66f262794533540ec467d2c75f1",
          method: "GET"
    	}).done(function(response) {
    		console.log(response);

    		var player;
		    //function onYouTubeIframeAPIReady() {
			player = new YT.Player('player', {
            	height: '390',
            	width: '100%',
            	videoId: response.results[0].key,
            	events: {
                	'onReady': onPlayerReady,
                	'onStateChange': onPlayerStateChange
            	}
			});
		    //}

		    // The API will call this function when the video player is ready.
		    function onPlayerReady(event) {
              event.target.playVideo();
          }

		    //    The API calls this function when the player's state changes.
		    //    The function indicates that when playing a video (state=1),
		    //    the player should play for six seconds and then stop.
		    var done = false;
		    function onPlayerStateChange(event) {
              if (event.data === YT.PlayerState.PLAYING && !done) {
                 setTimeout(stopVideo, 23750);
                 done = true;
             }
         }
         function stopVideo() {
          player.stopVideo();
      }

		    //$("#player").css("margin", "0 50%");
	    });// End of trailer ajax call
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
    //sets variable to specific movie ID
    var movieID = snapshot.val().id;

    // Searches recentmovies array...
    for (i = 0; i < recentmovies.length; i++) {
        // If movieID exists in array..
        if (recentmovies[i].val().id === movieID) {
            // Sets indexOf to the index of the copy
            indexOf = i;
            break;
        }
    };
    // Checks if recentmovies has a value and if that value matches a child in Firebase
    if (recentmovies[indexOf] && movieID === recentmovies[indexOf].val().id) {
        // Removes copy from Firebase
        recentmovies[indexOf].ref.remove();
        // Removes copy from the recentmovies array
        recentmovies.splice(indexOf, 1);
    };
    // Adds Firebase object to the beginning of recentmovies array
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

    // Removes the latest Firebase child from database to limit data to 5
    if (recentmovies.length > 5) {
        for (i = 5; i < recentmovies.length; i++){
            recentmovies[i].ref.remove();

        }
        recentmovies = recentmovies.slice(0, 5);
    }
});

// Listens for child removed from Firebase, then removes that child from the DOM
database.ref("/movies").on("child_removed", function(snapshot) {
    console.log(snapshot.val());
    $("#" + snapshot.val().id).remove();
});
