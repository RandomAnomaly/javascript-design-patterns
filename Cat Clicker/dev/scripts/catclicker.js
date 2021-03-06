/**
 * Javascript for the catclicker app, set out in a MVC style
 * @author Jack Gammon
 */
var catClicker = (function () {
    /* ================================================================ */
    /* MODELS                                                           */
    /* ================================================================ */
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
        selectedCat: 0,
        adminOpen: false
    };

    /* ================================================================ */
    /* VIEWS                                                            */
    /* ================================================================ */
    // View for the navigation bar
    var navView = {
        // Creates a set of li buttons from the cat names and attaches it to the DOM
        init: function () {
            this.render();
        },
        // Sets the given button to inactive
        deselectButton: function (id) {
            document.getElementById("btn" + id).className = "";
        },
        // Sets the given button to active
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
            li.addEventListener('click', function () {
                octopus.selectCat(id);
            })
            return li;
        },
        // redraw the navbar onscreen
        render: function () {
            // clear the buttons first
            document.getElementById("navbar").innerHTML = "";

            var names = octopus.getCatNames();
            for (var i = 0; i < names.length; i += 1) {
                document.getElementById("navbar").appendChild(this.createButton(names[i], i));
            }


        }
    };

    // View for the main display area
    var catAreaView = {
        // Initialise the view - binding etc
        init: function () {
            document.getElementById("catPhoto").addEventListener('click', function () {
                octopus.incrementClicker();
            });
            document.getElementById("adminButton").addEventListener('click', function () {
                octopus.toggleAdminDisplay();
            });
            document.getElementById("submitButton").addEventListener('click', function () {
                var name = document.getElementById("catNameTextbox").value;
                var imageSrc = document.getElementById("catPhotoTextbox").value;
                var counter = document.getElementById("catTickerTextbox").value;
                octopus.submitAdmin(name, counter, imageSrc);
            });
            document.getElementById("cancelButton").addEventListener('click', function(){
                octopus.toggleAdminDisplay();
            });
        },
        // Render the currently selected cat, updates the name, clicker and photo from the json
        render: function () {
            var activeCat = octopus.getActiveCat();
            document.getElementById("catName").innerText = activeCat.name;
            var photo = document.getElementById("catPhoto");
            photo.src = activeCat.imageSrc;
            this.updateClicker(activeCat.counter);

            document.getElementById("formAdminArea").hidden = !octopus.getAdminDisplayStatus();
            document.getElementById("catNameTextbox").value = activeCat.name;
            document.getElementById("catPhotoTextbox").value = activeCat.imageSrc;
            document.getElementById("catTickerTextbox").value = activeCat.counter;

            var adminButton = document.getElementById("adminButton");
            !octopus.getAdminDisplayStatus() ? adminButton.style.display = "" : adminButton.style.display = "none";
        },
        // Sets the clicker on screen to the given value
        updateClicker: function (value) {
            document.getElementById("catTicker").innerText = value;
        }
    }

    /* ================================================================ */
    /* CONTROLLER                                                       */
    /* ================================================================ */
    var octopus = {
        // Initiallise the nav view, cat area view and set the selected cat to zero
        // in the model
        init: function () {
            navView.init();
            catAreaView.init();
            this.selectCat(0);
        },
        // Returns an object representing the currently selected cat
        getActiveCat: function () {
            return model.data[model.selectedCat];
        },
        // Returns an array of the names of the cats in the cats collection
        getCatNames: function () {
            var names = [];
            for (var i = 0; i < model.data.length; i += 1) {
                names.push(model.data[i].name);
            }
            return names;
        },
        // Sets the active cat and deactivates / activates the corresponding buttons
        selectCat: function (id) {
            navView.deselectButton(model.selectedCat);
            model.selectedCat = id;
            navView.selectButton(model.selectedCat);
            var cat = model.data[id];
            catAreaView.render();
        },
        // Increments the clicker and updates the view to relfect this
        incrementClicker: function () {
            model.data[model.selectedCat].counter += 1;
            catAreaView.updateClicker(model.data[model.selectedCat].counter);
        },
        // Toggles the admin display, and calls the render method to redraw the view
        toggleAdminDisplay: function () {
            model.adminOpen = !model.adminOpen;
            catAreaView.render();
        },
        // Get the current 'open' status for the admin screen
        getAdminDisplayStatus: function () {
            return model.adminOpen;
        },
        cancelAdmin: function () {
            this.toggleAdminDisplay();
        },
        // Updates the model with the values in the admin form
        submitAdmin: function (name, counter, imageSrc) {
            var cat = model.data[model.selectedCat];
            cat.name = name;
            cat.counter = counter;
            cat.imageSrc = imageSrc;

            model.data[model.selectedCat] = cat;
            this.toggleAdminDisplay();
            navView.render();

            this.selectCat(model.selectedCat);
        }

    };
    // kick everything off (:
    octopus.init();
} ());
