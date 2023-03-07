
var addWords = function() {
    console.log("addWords");
    var word = $("#new-word").val();
    console.log(word);



}

var initListeners = function(){
    console.log("init listeners");
    
}

$(function() {
    console.log("init");
    initListeners();
    addWords();
});