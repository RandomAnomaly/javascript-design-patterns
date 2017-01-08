
var displayLogic = (function () {

    this.updateScreen = function (id, value) {
        document.getElementById(id).innerHTML = value;
    }

    return this;
} ());

var catclicker = (function () {
    var counter1 = 0;
    var counter2 = 0;

    var cat1name = "Cat One";
    var cat2name = "Cat Two";

    displayLogic.updateScreen("cat1name", cat1name);
    displayLogic.updateScreen("cat2name", cat2name);

    var element = document.getElementById("imgCat1");
    element.addEventListener('click', function () {
        counter1 += 1;
        displayLogic.updateScreen("counter1", counter1);
    }, false);

    element = document.getElementById("imgCat2");
    element.addEventListener('click', function () {
        counter2 += 1;
        displayLogic.updateScreen("counter2", counter2);
    }, false);

} ());