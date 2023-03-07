
var addWords = function() {
    console.log("addWords");
    var word = $("#new-word").val();
    
    var wordUrl = "https://api.dictionaryapi.dev/api/v2/entries/en_US/" + word;
    var randomWordUrl = "https://api.api-ninjas.com/v1/randomword";

    fetch(randomWordUrl)
        .then( function(response) {
            return response.json();
        })
        .then( function(data){
            console.log("fetched word", data);
        });

}

var initListeners = function(){
    console.log("init listeners");

    $("#new-word-search").submit(function(event){
        event.preventDefault();
        console.log("submitted form");

    });

    $("#new-word-search-button").click(addWords);
}

$(function() {
    console.log("init");
    initListeners();
    addWords();
});