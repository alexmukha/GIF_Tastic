var topics = ["cars", "funny-cars", "ferrari", "bugatti", "mcLaren"];
var apiKey = "LZotlBOPBSmy6eUopisIhqpfiIh00TgH";
var rating = "pg";
var limit = "10";
var favorites = [];

// Runs the ajax query to pull images
function displayGifs() {
  
  var gifList = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifList + "&api_key=" + apiKey + "&rating=" + rating + "&limit=" + limit;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var stillURL = response.data[i].images.fixed_height_still.url;
      var animateURL = response.data[i].images.fixed_height.url;
      var rated = response.data[i].rating;
      var title = response.data[i].title;

      // Create frame around each gif
      var frame = $("<div>");
      frame.attr("class", "alert btn-success pm-01 d-inline-block text-center")

      // Populate <img> with gif and info
      var img = $("<img>");
      img.attr("src", stillURL);
      img.attr("data-still", stillURL);
      img.attr("data-animate", animateURL);
      img.attr("data-state", "still");
      img.attr("class", "gif");
      frame.append(img);
      frame.append("<br>" + title + "<br>Rating:<b> " + rated + "</b>");
      $("#gifs-view").append(frame);
    }
  });
}

// Display buttons from an array on the screen
function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < topics.length; i++) {
    var btn = $("<button>");
    btn.addClass("gifBtn btn btn-success m-1");
    btn.attr("data-name", topics[i]);
    btn.text(topics[i]);
    $("#buttons-view").append(btn);
  }
}

// Add a custom button with a new name
$("#add-title").on("click", function (event) {
  event.preventDefault();

  // Prevent creating alredy existant button
  for (var i = 0; i < topics.length; i++ ) {
    if ($("#title-input").val().trim().toLowerCase() === topics[i].toLowerCase() ) {
      alert("This button alredy exist");
      $("#title-input").val("")
      return;
       }
  }
   // Prevent creating empty buttons
   if ($("#title-input").val().trim() === "" || $("#title-input").val().trim() === " ") {
    alert("Cannot create empty button!");
    $("#title-input").val("")
  } else {
    var gifList = $("#title-input").val().trim();
    topics.push(gifList);
    renderButtons();
    $("#title-input").val("")
  }

});

// Animate and stop gifs
$(document).on("click", ".gifBtn", displayGifs);
renderButtons();
$(document).on("click", ".gif", function () {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
