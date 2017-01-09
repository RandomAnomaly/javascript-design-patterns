var catClicker = (function () {

    var model = {
        data: [
            {
                "name": "Scrunchie",
                "imageSrc": "bin/cat.jpg",
                "counter": 0
            },
            {
                "name": "Schrodinger",
                "imageSrc": "bin/cat2.jpg",
                "counter": 0
            },
            {
                "name": "Snuggles",
                "imageSrc": "bin/cat3.jpg",
                "counter": 0
            },
            {
                "name": "Wobbles",
                "imageSrc": "bin/cat4.jpg",
                "counter": 0
            },
            {
                "name": "Burrcato",
                "imageSrc": "bin/cat5.jpg",
                "counter": 0
            }
        ],
        selectedCat: 0
    };

    var navView = {
        init: function () {
            var names = octopus.getCatNames();
            for (var i = 0; i < names.length; i += 1) {
                var button = this.createButton(names[i]);
                
                document.getElementById("navbar").appendChild(this.createButton(names[i], i));
            }
        },
        deselectButton: function (id) {
            document.getElementById("btn" + id).className = "";
        },
        selectButton: function (id) {
            document.getElementById("btn" + id).className = "active";
        },
        // creates a li for use as a nav button
        createButton: function (name, id) {
            var li = document.createElement("li");
            li.role = "presentation";
            li.id = "btn" + id;
            var innerLink = document.createElement("a");
            innerLink.href = "#";
            innerLink.innerText = name;
            li.appendChild(innerLink);
            li.addEventListener('click', function(){
                octopus.selectCat(id);
            })
            return li;
        }
    };

    var catAreaView = {
        render: function (name, imageSrc, counterValue) {
            document.getElementById("catName").innerText = name;
            document.getElementById("catPhoto").removeChild(document.getElementById("catPhoto").firstChild);
            document.getElementById("catPhoto").appendChild(this.createPhoto(imageSrc));
            document.getElementById("catTicker").innerText = counterValue;
        },
        createPhoto: function (imageSrc) {
            var photo = document.createElement("img");
            photo.src = imageSrc;
            return photo;
        }
    }

    var octopus = {
        init: function () {
            navView.init();

            this.selectCat(0);
        },
        getCatNames: function () {
            var names = [];
            for (var i = 0; i < model.data.length; i += 1) {
                names.push(model.data[i].name);
            }
            return names;
        },
        selectCat: function (id) {
            navView.deselectButton(model.selectedCat);
            model.selectedCat = id;
            navView.selectButton(model.selectedCat);
            var cat = model.data[id];
            catAreaView.render(cat.name, cat.imageSrc, cat.counter);
        }
    };

    octopus.init();
} ());
// var catclicker = (function () {

//     // todo optim
//     var pageFactory = (function () {
//         for (var i = 0; i < cats.length; i += 1) {
//             // build the navbar
//             var listItem = document.createElement("li");
//             listItem.id = "catButton" + i;
//             listItem.role = "presentation";
//             listItem.className = "NavButton";

//             listItem.addEventListener('click', (function (numCopy) {
//                 return function () {
//                     activateTab(numCopy);
//                 };
//             })(i));

//             var innerLink = document.createElement("a");
//             innerLink.href = "#";
//             innerLink.innerText = cats[i].name;
//             listItem.appendChild(innerLink);
//             document.getElementById("navBar").appendChild(listItem);

//             var displayArea = document.getElementById("display");
//             var innerDiv = document.createElement("div");
//             innerDiv.id = "catDisplay" + i;
//             innerDiv.className = "CatDisplay"
//             innerDiv.hidden = true;

//             var catName = document.createElement("div");
//             catName.innerText = cats[i].name;
//             innerDiv.appendChild(catName);

//             var catPhoto = document.createElement("img");
//             catPhoto.src = cats[i].imageSrc;

//             catPhoto.addEventListener('click', (function (numCopy) {
//                 return function () {
//                     incrementCounter(numCopy);
//                 };
//             })(i));

//             innerDiv.appendChild(catPhoto);

//             var catCounter = document.createElement("div");
//             catCounter.innerText = cats[i].counter;
//             catCounter.id = "catCounter" + i;
//             innerDiv.appendChild(catCounter);

//             displayArea.appendChild(innerDiv);
//         }

//     } ());


//     var incrementCounter = function (toIncrement) {
//         cats[toIncrement].counter += 1;
//         document.getElementById("catCounter" + toIncrement).innerText = cats[toIncrement].counter;
//     }

//     var activateTab = function (toActivate) {
//         // deactivate all tabs
//         var navs = document.getElementsByClassName("NavButton");
//         for (var i = 0; i < navs.length; i += 1) {
//             navs[i].className = "NavButton";
//         }

//         // hide all displays
//         var displays = document.getElementsByClassName("CatDisplay");
//         for (var i = 0; i < displays.length; i += 1) {
//             displays[i].hidden = true;
//         }

//         // activate the new one
//         document.getElementById("catButton" + toActivate).className = "active NavButton";

//         // show the relevant display
//         document.getElementById("catDisplay" + toActivate).hidden = false;
//     }

// } ());