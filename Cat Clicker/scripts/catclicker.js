var catclicker = (function () {

    // todo optim
    var pageFactory = (function () {
        for (var i = 0; i < cats.length; i += 1) {
            // build the navbar
            var listItem = document.createElement("li");
            listItem.id = "catButton" + i;
            listItem.role = "presentation";
            listItem.className = "NavButton";

            listItem.addEventListener('click', (function (numCopy) {
                return function () {
                    activateTab(numCopy);
                };
            })(i));

            var innerLink = document.createElement("a");
            innerLink.href = "#";
            innerLink.innerText = cats[i].name;
            listItem.appendChild(innerLink);
            document.getElementById("navBar").appendChild(listItem);

            var displayArea = document.getElementById("display");
            var innerDiv = document.createElement("div");
            innerDiv.id = "catDisplay" + i;
            innerDiv.className = "CatDisplay"
            innerDiv.hidden = true;

            var catName = document.createElement("div");
            catName.innerText = cats[i].name;
            innerDiv.appendChild(catName);

            var catPhoto = document.createElement("img");
            catPhoto.src = cats[i].imageSrc;

            catPhoto.addEventListener('click', (function(numCopy){
                return function(){
                    incrementCounter(numCopy);
                };
            })(i));

            innerDiv.appendChild(catPhoto);

            var catCounter = document.createElement("div");
            catCounter.innerText = cats[i].counter;
            catCounter.id = "catCounter" + i;
            innerDiv.appendChild(catCounter);

            displayArea.appendChild(innerDiv);
        }


        //activate a tab
    } ());


    var incrementCounter = function(toIncrement){
        cats[toIncrement].counter += 1;
        document.getElementById("catCounter" +  toIncrement).innerText = cats[toIncrement].counter;
    }

    var activateTab = function (toActivate) {
        // deactivate all tabs
        var navs = document.getElementsByClassName("NavButton");
        for (var i = 0; i < navs.length; i += 1) {
            navs[i].className = "NavButton";
        }

        // hide all displays
        var displays = document.getElementsByClassName("CatDisplay");
        for (var i = 0; i < displays.length; i += 1) {
            displays[i].hidden = true;
        }

        // activate the new one
        document.getElementById("catButton" + toActivate).className = "active NavButton";

        // show the relevant display
        document.getElementById("catDisplay" + toActivate).hidden = false;
    }

} ());