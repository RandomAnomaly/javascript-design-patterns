var catclicker = (function(){
    var counter = 0;

    var updateScreen = function(){
        document.getElementById("counter").innerHTML = counter;
    }

    var element = document.getElementById("imgCat");
    element.addEventListener('click', function(){
        counter += 1;
        updateScreen();
    }, false);
}())