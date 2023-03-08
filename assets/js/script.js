
var addWords = function() {
    console.log("addWords");
    var word = $("#new-word").val();
    
    var wordUrl = "https://api.dictionaryapi.dev/api/v2/entries/en_US/" + word;

    fetch(wordUrl)
        .then( function(response) {
            return response.json();
        })
        .then( function(data){
            console.log("fetched word", data);
        });

}

var addRandomWords = function() {
    console.log("add random words")
    var randomWord =$("#random-word-search-button");
   
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/randomword',
        headers: { 'X-Api-Key': "rbypcBezrmrt/yj6k+bxXg==JjPS9OzXlA7lAUl8"},
        contentType: 'application/json',
        success: function(result) {
            console.log(result);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });

}

var addPage = function(){
    console.log("add page");
}

var initListeners = function(){
    console.log("init listeners");

    $("#new-word-search").submit(function(event){
        event.preventDefault();
        console.log("submitted form");

    });

    $("#new-word-search-button").click(addWords);
    $("#random-word-search-button").click(addRandomWords);
    $("#page").click(addPage);
}
// 
$(function() {
    console.log("init");
    initListeners();
    addWords();
    addRandomWords();
    addPage();
});