// Emmanuel
// Dictionary API Fetch Function below
var spinner = $(".giphy-embed");

var word = $("#new-word").val() || "Literacy";

var addWords = function() {
    console.log("addWords");
    $("#generated-sentence").html("");
    $("#generated-word").hide();
    spinner.show();

    word = $("#new-word").val() || "Literacy";
    var wordUrl = "https://api.dictionaryapi.dev/api/v2/entries/en_US/" + word;

    fetch(wordUrl)
        .then( function(response) {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then( function(data){
            console.log("fetched word", data);
            spinner.hide();

            var partOfSpeech = data[0].meanings[0].partOfSpeech;
            var definition = data[0].meanings[0].definitions[0].definition;
            var phoneticText = data[0].phonetics.find(function(phonetics) {
                return phonetics.text;
            }).text;
            var phoneticAudio = data[0].phonetics.find(function(phonetics) {
                return /mp3$/.test(phonetics.audio);
            }).audio;
            
            if(word && partOfSpeech && definition && phoneticText && phoneticAudio) {
                var audioEl = document.createElement("audio");
                audioEl.src = phoneticAudio;
                audioEl.controls = true;

                $("#generated-word").html("<h2>" + word + "</h2><p>Phonetics: " + phoneticText + "</p><p>Part of Speech: " + partOfSpeech + "</p><p>Definition: " + definition + "<p>");
                $("#generated-word").append(audioEl);

                spinner.hide();
                $("#generated-word").show();

            } else {
                addRandomWords();
            }
        })
        .catch(function(error){
            console.error('Error:', error);
            spinner.hide();
            $("#generated-word").html("<p>Information not available. Please try again.</p>");
            $("#generated-word").show();
        
        });

}
// Random Word generator API from API Ninjas
var addRandomWords = function() {
    console.log("add random words")

    spinner.show();
   
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
                    if (!response.ok) {
                        throw new Error(response.status);
                    }
                    
                    if (response.ok) {                   
                        $("#new-word").val(result.word); 
                        addWords();
                    } else {
                        addRandomWords();
                    }return response.json();
                })
                .then(function(data){
                    console.log
                })
                .catch(function(error){
                    console.error('Error:', error);
                });
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);

            spinner.hide();
            $("#generated-word").html("<p>Information not available. Please try again.</p>");
            $("#generated-word").show();
            addRandomWords();
        },
        complete: function() {
            spinner.hide();
        }
        
    });

};
// testing sentence generator rapidAPI: Linguatools Sentence Generator
var generateSentence = function() {
    console.log("Generating Sentence");

    var apiUrl = "https://api.openai.com/v1/completions";
    var apiKey = "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";
  
    var data = {
      "model": "text-davinci-003",
      "prompt": "\nQ: Can you write a sentence with the exact word," + word + ", and in a way a child learning how to read can understand.?\nA:",
      "temperature": 0,
      "max_tokens": 100,
      "top_p": 1,
      "frequency_penalty": 0.0,
      "presence_penalty": 0.0,
      "stop": ["\n"]
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey,
        },
        body: JSON.stringify(data),
    })
    .then(function(response) {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
    })
    .then(function(data) {
        console.log("Generated sentence:", data.choices[0].text);

        var sentence = data.choices[0].text;
        
        $("#generated-sentence").html("<p>" + sentence + "</p>");
        
    })
    .catch(function(error) {
        console.error('Error:', error);
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
    $("#generate-sentence-button").click(function() {
        generateSentence();
    });
}
// Running jQuery after page loads

$(function() {
    console.log("init");
    initListeners();
    addWords();
    addPage();
});
// Emmanuel

