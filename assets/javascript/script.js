var apiKey = "LZotlBOPBSmy6eUopisIhqpfiIh00TgH";


      var btnList = ["cats", "dogs", "emoji", "The Lion King", "charkie cat"];
    /
      function displayGifs() {

        var gifList = $(this).attr("data-name");
       
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifList + "&api_key=dc6zaTOxFJmzC&limit=20";
console.log(queryURL);
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            var results = response.data;
            for (var i = 0; i<results.length; i++) {
            var img = $("<img src="+response.data[i].images.fixed_height.url+">");
            // img.attr("data-src", response.data[1].images.fixed_height.url)
            console.log(img);
          $("#gifs-view").append(img);
        //   gif = (response.data[1].images.fixed_height.url);
            }
        });
      }
      // Function for displaying movie data
      function renderButtons() {

        // Deleting the buttons prior to adding new btnList
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        for (var i = 0; i < btnList.length; i++) {

          var a = $("<button>");
         
          a.addClass("gifBtn btn btn-success m-1");
         
          a.attr("data-name", btnList[i]);
         
          a.text(btnList[i]);
         
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where one button is clicked
      $("#add-title").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var gifList = $("#title-input").val().trim();

        // Adding the gifs from the textbox to our array
        btnList.push(gifList);
        console.log(btnList);

        // Calling renderButtons which handles the processing of our gif array
        renderButtons();
      });

      // Function for displaying the gif info
      // Using $(document).on instead of $(".gifBtn").on to add event listeners to dynamically generated elements
      $(document).on("click", ".gifBtn", displayGifs);

      // Calling the renderButtons function to display the initial buttons
      renderButtons();