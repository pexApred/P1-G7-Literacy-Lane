// Deion Modal Script
function closeModal(modal) {
    modal.classList.remove('is-active');
  }
 
  window.addEventListener('load', function() {
    var modal = document.querySelector('.modal');
    modal.classList.add('is-active');
 
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  });
 
// Emmanuel
// Spinner variable deined using jQuery to select element with class
const spinner = $(".giphy-embed");

// Defined the initial word to search for as "Literacy" to avoid error on load, until a new input 
var word = $("#new-word") || "Literacy";
var genWordsArray = [];
var ranWordsArray = []; 
// Using dictionaryAPI to get information of words from input field
const addWords = function() {
    console.log("addWords");
    // Hides the previous search results and shows spinner
    $("#generated-sentence").html("");
    $("#generated-word").hide();
    spinner.show();

    // Updated the word variable to be the input in text field or stay as literacy
    word = $("#new-word").val() || "Literacy";
    // URL construct for dictionary API
    var wordUrl = "https://api.dictionaryapi.dev/api/v2/entries/en_US/" + word;
    // Fetch data from the API
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

            // Extract relevant information from the API
            var partOfSpeech = data[0].meanings[0].partOfSpeech;
            var definition = data[0].meanings[0].definitions[0].definition;
            var phoneticText = data[0].phonetics.filter(function(phonetics) {
                return phonetics.text;
            })[0].text;
            var phoneticAudio = data[0].phonetics.filter(function(phonetics) {
                return /mp3$/.test(phonetics.audio);
            })[0].audio;
            // If all necessary information is available, display it in the generated-word div
            if(word && partOfSpeech && definition && phoneticText && phoneticAudio) {
                var audioEl = document.createElement("audio");
                audioEl.src = phoneticAudio;
                audioEl.controls = true;

                $("#generated-word").html("<h2>" + word + "</h2><p>Phonetics: " + phoneticText + "</p><p>Part of Speech: " + partOfSpeech + "</p><p>Definition: " + definition + "<p>");
                 
                genWordsArray.push(word);
                var literacySplice = genWordsArray.indexOf("Literacy");
                if(literacySplice !== -1){
                    genWordsArray.splice(literacySplice, 1);
                }
                localStorage.setItem('genWordsArray', JSON.stringify(genWordsArray));
                displayGenWords();
                $("#generated-word").append(audioEl);
                
                // Hide the spinner & show the generated-word div
                spinner.hide();
                $("#generated-word").show();

            } else {
                // If any necessary info is missing, generate a random word instead
                addRandomWords();
            }
        })
        .catch(function(error){
            // if there is an error with the API call, display an error message and show the generated-word div
            console.error('Error:', error);
            spinner.hide();
            $("#generated-word").html("<p>Information not available. Please try again.</p>");
            $("#generated-word").show();
        
        });
       
}
// Generating a Random Word using API Ninjas random word generator
const addRandomWords = function() {
    console.log("add random words")
    // Show the spinner
    spinner.show();
    // Make a request to the API to get random word
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/randomword?maxLength=5',
        headers: { 'X-Api-Key': "rbypcBezrmrt/yj6k+bxXg==JjPS9OzXlA7lAUl8"},
        contentType: 'application/json',
        success: function(result) {
            console.log(result);
            // API endpoint for retrieving the dictionary info of the random word
            var wordUrl = "https://api.dictionaryapi.dev/api/v2/entries/en_US/" + result.word;
            fetch(wordUrl)
                // Throw error if unsuccessful
                .then(function(response){
                    if (!response.ok) {
                        throw new Error(response.status);
                    }
                    // If successful, add a random word to input field and generate words using it
                    if (response.ok) {                   
                        $("#new-word").val(result.word); 
                        
                        ranWordsArray.push(result.word)
                        localStorage.setItem('ranWordsArray', JSON.stringify(ranWordsArray));
                        displayRanWords();
                        addWords();
                    } else {
                        // If response not successful, re-generate a word
                        addRandomWords();
                    }return response.json();
                })
                .catch(function(error){
                    console.error('Error:', error);
                });
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
            // Hide Spinner and display an error message
            spinner.hide();
            $("#generated-word").html("<p>Information not available. Please try again.</p>");
            $("#generated-word").show();
            // Generate another random word
            addRandomWords();
        },
        complete: function() {
            // Once request is completed, hide the spinner
            spinner.hide();
        }
        
    });
    
};
// Generating sentence using OpenAI API Q/A ---May come back to this later
// const generateSentence = function() {
//     console.log("Generating Sentence");

//     spinner.show();

//     var apiUrl = "https://api.openai.com/v1/completions";
//     var apiKey = "";
  
//     var data = {
//       "model": "text-davinci-003",
//       "prompt": "\nQ: Can you write a sentence with the exact word," + word + ", and in a way a child learning how to read can understand.?\nA:",
//       "temperature": 0,
//       "max_tokens": 100,
//       "top_p": 1,
//       "frequency_penalty": 0.0,
//       "presence_penalty": 0.0,
//       "stop": ["\n"]
//     };

//     fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer ' + apiKey,
//         },
//         body: JSON.stringify(data),
//     })
//     .then(function(response) {
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         return response.json();
//     })
//     .then(function(data) {
//         console.log("Generated sentence:", data.choices[0].text);
//         spinner.hide();
//         var sentence = data.choices[0].text;
        
//         $("#generated-sentence").html("<p>" + sentence + "</p>");
        
//     })
//     .catch(function(error) {
//         console.error('Error:', error);
//         spinner.hide();
//     });
// };

// Sets up listeners for various button clicks and form submissions
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

    // $("#generate-sentence-button").click(function() {
    //     generateSentence();
    // });
}

// Running jQuery after page loads
$(function() {
    console.log("init");
    initListeners();
    addWords();
});
// Emmanuel

// Commented out Excess search History 
var  displayRanWords = function(){
    var ranWords = JSON.parse(localStorage.getItem("ranWordsArray"));
    console.log(ranWords);
    var ul = document.createElement("ul");
    for (var i=0; i<5; i++) {
        if(ranWords.length > 5){
          ranWords.splice(0, ranWords.length -5);
        }
        var li = document.createElement("li");
        li.textContent = ranWords[i];
        ul.appendChild(li);
    }
    document.getElementById("ranWordsLocal").innerHTML = ""; 
}


var displayGenWords = function(){
    var genWords = JSON.parse(localStorage.getItem("genWordsArray"));
    console.log(genWords);
    var ul = document.createElement("ul");
    for (var i=0; i<5; i++) {
        
        if(genWords.length > 5){
            genWords.splice(0, genWords.length -5);
        }
        var li = document.createElement("li");
        li.textContent = genWords[i];
        ul.appendChild(li);
    }
    document.getElementById("genWordsLocal").innerHTML = ""; 
    document.getElementById("genWordsLocal").appendChild(ul);
}



    displayRanWords();
    displayGenWords();
