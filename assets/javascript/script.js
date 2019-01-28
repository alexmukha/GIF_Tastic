var topics = ["cars", "funny-cars", "ferrari", "bugatti", "mcLaren"];
var apiKey = "LZotlBOPBSmy6eUopisIhqpfiIh00TgH";
var rating = "pg";

// Runs the ajax query to pull images
function displayGifs() {
  // Created a random 10 images
  var used = Math.floor(Math.random() * 99);
  var limit = 10+used;
    
  var gifList = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifList + "&api_key=" + apiKey + "&rating=" + rating + "&limit=" + limit;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var results = response.data;
    if (results == 0) {
      alert("Sorry, No results with the \""+gifList+"\" title");
    }
    for (var i = 0; i < results.length; i++) {
      var newGifs = i+used;
      var stillURL = response.data[newGifs].images.fixed_height_still.url;
      var animateURL = response.data[newGifs].images.fixed_height.url;
      var rated = response.data[newGifs].rating;
      var title = response.data[newGifs].title;

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
      frame.append("<br>" + title + "<br>Rating:<b> " + rated + "</b>&nbsp;");
      var favImg = $("<img>");
      favImg.attr("src", "./assets/images/Fave_0.png");
      favImg.attr("height", "20px");
      favImg.attr("fave-not", "./assets/images/Fave_0.png");
      favImg.attr("fave-yes", "./assets/images/Fave.png");
      favImg.attr("fave-state", "no");
      favImg.attr("title", "");
      favImg.attr("class", "favorite");
      frame.append(favImg);
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

$(document).on("click", ".gifBtn", displayGifs);
renderButtons();

// Mark gif as favorite
$(document).on("click", ".favorite", function () {
  var fave = $(this).attr("fave-state");
  if (fave === "no") {
    $(this).attr("src", $(this).attr("fave-yes"));
    $(this).attr("fave-state", "yes");
    $(this).attr("title", "My favorite");
  } else {
    $(this).attr("src", $(this).attr("fave-not"));
    $(this).attr("fave-state", "no");
    $(this).attr("title", "");
  }
});

// Animate and stop gifs
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

