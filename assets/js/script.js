
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

const button = document.querySelector('#random-btn')


function getLibary () {
  console.log('got it'); 
    var OpenLibraryUrl = 'https://d1800204.us.archive.org/details/contoursofcity0000mohy'
   
    fetch(OpenLibraryUrl)
    .then(function (response) {
      console.log (response.json());
     
    })
    .then(function (data) {
      console.log(data.matches[0].text);  
    });
};

  // const query = ""; // the search query
  // const url = 'https://openlibrary.org/search.json?q=' + query; // the API endpoint
  
  // fetch(url)
  //   .then(response => response.json()) // parse the response as JSON
  //   .then(data => {
  //     console.log(data.docs[0].first_sentence[6]); // log the title of the first book in the response
  //     console.log(data)
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
  
  button.addEventListener('click',getLibary)



