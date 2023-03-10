// Emmanuel
// Dictionary API Fetch Function below
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

            var definition = data[0].meanings[0].definitions[0].definition;
            var phoneticText = data[0].phonetics[0].text;
            var phoneticAudio = data[0].phonetics[0].audio[1,2,3,4];
            console.log(definition);
            console.log(phoneticAudio);
            
            $("#generated-word").html("<h2>" + word + "</h2><p>" + phoneticText + phoneticAudio + "</p><p>" + definition + "<p>");

        });

}
// Random Word generator API from API Ninjas
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
            $("#new-word").val(result.word);
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
// Running jQuery after page loads
$(function() {
    console.log("init");
    initListeners();
    addWords();
    addPage();
});
// Emmanuel