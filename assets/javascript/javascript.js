$( document ).ready(function() {

var actions = ["My Neighbor Totoro", "Tokyo Ghoul", "Food Wars Anime", "Guilty Crown", "Sword Art Online", "Kiki's Delivery Service", "Your Lie in April", "Ponyo", "Howl's Moving Castle", "Ouran Host Club","Naruto", "Bleach Anime", "Angel Beats"];
function displayGifButtons(){
    
    $("#gifButtonsView").empty(); 
    for (var i = 0; i < actions.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("action");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", actions[i]);
        gifButton.text(actions[i]);
        $("#gifButtonsView").append(gifButton);
    }
}
// new action button
function addNewButton(){
    $("#addGif").on("click", function(){
    var action = $("#action-input").val().trim();
    if (action == ""){
      return false; 
    }
    actions.push(action);

    displayGifButtons();
    return false;
    });
}


//remove last button
function removeLastButton(){
    $("removeGif").on("click", function(){
    actions.pop(action);
    displayGifButtons();
    return false;
    });
}


// displays gifs
function displayGifs(){
    var action = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";
    
    console.log(queryURL); 
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
   

    .done(function(response) {
       
        console.log(response); 
        $("#gifsView").empty(); 
        var results = response.data; 
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
            // ratings
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            // gifs
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image of gif
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); // set the image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            // pulling still image of gif
            // adding div of gifs to gifsView div
            $("#gifsView").prepend(gifDiv);
        }
    });
}

displayGifButtons(); 
addNewButton();
removeLastButton();

$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});
