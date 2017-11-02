$(document).ready(function(){

      // This function handles events where a movie button is clicked
      $("#movie-search").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var movie = $("#movie-input").val().trim();

        var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=cb3ac66f262794533540ec467d2c75f1&query=" + movie;

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);

          for (var i = 0; i < 3; i++) {
            // Creating a div to hold the movie
            var movieDiv = $("<div class='movie'>");
            movieDiv.attr("value", response.results[i].id);
          
            // Storing the rating data
            var title = response.results[i].title;
          
            // // Creating an element to have the rating displayed
            // var pOne = $("<p>").text("Title: " + title);
          
            // // Displaying the rating
                    // movieDiv.append(pOne);
          
            // Storing the release year
            var released = response.results[i].release_date.substring(0, 4);
          
            // Creating an element to hold the release year
            var pTwo = $("<p>").text('"' + title + '" -- ' + released);
          
            // Displaying the release year
            movieDiv.append(pTwo);
          
            // Putting the entire movie above the previous movies
            $(".results").append(movieDiv);
          }
        });
      });

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayMovieInfo() {

        var movieID = $(this).attr("value");
        var queryURL = "https://api.themoviedb.org/3/movie/" + movieID + "/recommendations?api_key=cb3ac66f262794533540ec467d2c75f1&language=en-US&page=1";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);

          for (var i = 0; i < 10; i++) {
            // Creating a div to hold the movie
            var movieDiv = $("<a class='carousel-item recommend'>");

            // // Storing the rating data
            // var rating = response.Rated;

            // // Creating an element to have the rating displayed
            // var pOne = $("<p>").text("Rating: " + rating);

            // // Displaying the rating
            // movieDiv.append(pOne);

            // // Storing the release year
            // var released = response.results[0].release_date;

            // // Creating an element to hold the release year
            // var pTwo = $("<p>").text("Released: " + released);

            // // Displaying the release year
            // movieDiv.append(pTwo);

            // // Storing the plot
            // var plot = response.results[0].overview;

            // // Creating an element to hold the plot
            // var pThree = $("<p>").text("Plot: " + plot);

            // // Appending the plot
            // movieDiv.append(pThree);

            // Retrieving the URL for the image
            var imgURL = "https://image.tmdb.org/t/p/w185" + response.results[i].poster_path;

            // Creating an element to hold the image
            var image = $("<img>").attr("src", imgURL);

            // Appending the image
            movieDiv.append(image);

            // Putting the entire movie above the previous movies
            $(".carousel").append(movieDiv);

          }
          
      $('.carousel').carousel();
        });

      }

      // Adding a click event listener to all elements with a class of "movie"
      $(document).on("click", ".movie", displayMovieInfo);
    });