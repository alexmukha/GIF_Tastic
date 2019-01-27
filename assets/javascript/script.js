var topics = ["cars", "funny-cars", "ferrari", "bugatti", "mcLaren"];
var apiKey = "LZotlBOPBSmy6eUopisIhqpfiIh00TgH";
var rating = "pg";
var limit = "10";
    
      function displayGifs() {

        var gifList = $(this).attr("data-name");
       console.log(this);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifList + "&api_key="+apiKey+"&rating="+rating+"&limit="+limit;
// console.log(queryURL);
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          var results = response.data;
          for (var i = 0; i<results.length; i++) {
            // var source = response.data[i].images;
            var stillURL = response.data[i].images.fixed_height_still.url;
            var animateURL = response.data[i].images.fixed_height.url;
            var frame = $("<div>");
            frame.attr("class", "alert btn-success pm-01 d-inline-block")
            var img = $("<img>");
          img.attr("src", stillURL);
          img.attr("data-still", stillURL);
          img.attr("data-animate", animateURL);
          img.attr("data-state", "still");
          img.attr("class", "gif");
                      // img.attr("data-src", response.data[1].images.fixed_height.url)
          console.log(response.data[i]);
          // $("#gifs-view").append(img);
          frame.append(img);
          $("#gifs-view").append(frame);
        
          }
        });
      }
    
      function renderButtons() {

        $("#buttons-view").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $("<button>");
          a.addClass("gifBtn btn btn-success m-1");
          a.attr("data-name", topics[i]);
          a.text(topics[i]);
          $("#buttons-view").append(a);
        }
      }

      $("#add-title").on("click", function(event) {
        event.preventDefault();
        console.log(this);
    
        var gifList = $("#title-input").val().trim();

        topics.push(gifList);
        // console.log(topics);

        renderButtons();
      });

      $(document).on("click", ".gifBtn", displayGifs);

      renderButtons();

            // $(".gif").on("click", function() {
              $(document).on("click", ".gif", function() {
        
                var state = $(this).attr("data-state");
                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
              });
