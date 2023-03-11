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

            var partOfSpeech = data[0].meanings[0].partOfSpeech;
            var definition = data[0].meanings[0].definitions[0].definition;
            var phoneticText = data[0].phonetics.find(function(phonetics) {
                return phonetics.text;
            }).text;
            var phoneticAudio = data[0].phonetics.find(function(phonetics) {
                return /mp3$/.test(phonetics.audio);
            }).audio;
            console.log(definition);
            console.log(phoneticAudio);
            
            if(partOfSpeech && definition && phoneticText && phoneticAudio) {
                var audioEl = document.createElement("audio");
                audioEl.src = phoneticAudio;
                audioEl.controls = true;

                $("#generated-word").html("<h2>" + word + "</h2><p>Phonetics: " + phoneticText + "</p><p>Part of Speech: " + partOfSpeech + "</p><p>Definition: " + definition + "<p>");
                $("#generated-word").append(audioEl);
            } else {
                addRandomWords();
            }
        });

}
// Random Word generator API from API Ninjas
var addRandomWords = function() {
    console.log("add random words")
    // var randomWord =$("#random-word-search-button");
   
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/randomword?maxLength=5',
        headers: { 'X-Api-Key': "rbypcBezrmrt/yj6k+bxXg==JjPS9OzXlA7lAUl8"},
        contentType: 'application/json',
        success: function(result) {
            console.log(result);

            var wordUrl = "https://api.dictionaryapi.dev/api/v2/entries/en_US/" + result.word;
            fetch(wordUrl)
                .then(function(response){
                    if (response.ok) {                   
                        $("#new-word").val(result.word); 
                        addWords();
                    } else {
                        addRandomWords();
                    }
                })
                .catch(function(error){
                    console.error('Error:', error);
                });
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
            addRandomWords();
        }
    });

};

var addPage = function(){
    console.log("add page");
}


var initListeners = function(){
    console.log("init listeners");

    $("#new-word-search").submit(function(event){
        event.preventDefault();
        console.log("submitted form");

    });
    $("#new-word").on("keypress", function(event) {
        if (event.which === 13) {
            addWords();
        }
    })
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

