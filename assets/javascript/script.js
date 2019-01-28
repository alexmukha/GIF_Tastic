var topics = ["cars", "funny-cars", "ferrari", "bugatti", "mcLaren"];
var apiKey = "LZotlBOPBSmy6eUopisIhqpfiIh00TgH";
var rating = "pg";
var limit = "10";
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
      var frame = $("<div>");
      frame.attr("class", "alert btn-success pm-01 d-inline-block text-center")
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
$("#add-title").on("click", function (event) {
  event.preventDefault();
  if ($("#title-input").val().trim() === "" || $("#title-input").val().trim() === " ") {
    alert("Cannot create empty buton!");
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
// $(".gif").on("click", function() {
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
