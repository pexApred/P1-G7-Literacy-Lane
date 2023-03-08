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


