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
            li.addEventListener('click', function () {
                octopus.selectCat(id);
            })
            return li;
        }
    };

    var catAreaView = {
        render: function () {
            var activeCat = octopus.getCat(octopus.getActiveCat());
            document.getElementById("catName").innerText = activeCat.name;
            document.getElementById("catPhoto").removeChild(document.getElementById("catPhoto").firstChild);
            document.getElementById("catPhoto").appendChild(this.createPhoto(activeCat.imageSrc));
            this.updateClicker(activeCat.counter);
        },
        createPhoto: function (imageSrc) {
            var photo = document.createElement("img");
            photo.src = imageSrc;
            photo.addEventListener('click', function () {
                octopus.incrementClicker(model.selectedCat);
            });
            return photo;
        },
        updateClicker: function (value) {
            document.getElementById("catTicker").innerText = value;
        }
    }

    var octopus = {
        init: function () {
            navView.init();

            this.selectCat(0);
        },
        getActiveCat: function () {
            return model.selectedCat;
        },
        getCat: function(index){
            return model.data[index];
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
            catAreaView.render();
        },
        incrementClicker: function () {
            model.data[model.selectedCat].counter += 1;
            catAreaView.updateClicker(model.data[model.selectedCat].counter);
        }
    };

    octopus.init();
} ());
