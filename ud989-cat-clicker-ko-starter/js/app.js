var initialCats = [{
    "name": "Scrunchie",
    "imgSrc": "img/1413379559_412a540d29_z.jpg",
    "counter": 0,
    "imgAttribution": "",
    "nicknames": []
},
{
    "name": "Schrodinger",
    "imgSrc": "img/22252709_010df3379e_z.jpg",
    "counter": 0,
    "imgAttribution": "",
    "nicknames": []
},
{
    "name": "Snuggles",
    "imgSrc": "img/4154543904_6e2428c421_z.jpg",
    "counter": 0,
    "imgAttribution": "",
    "nicknames": []
},
{
    "name": "Wobbles",
    "imgSrc": "img/434164568_fea0ad4013_z.jpg",
    "counter": 0,
    "imgAttribution": "",
    "nicknames": []
},
{
    "name": "Burrcato",
    "imgSrc": "img/9648464288_2516b35537_z.jpg",
    "counter": 0,
    "imgAttribution": "",
    "nicknames": []
}
];

var Cat = function (data) {
    this.clickCount = ko.observable(data.counter);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    this.imgAttribution = ko.observable(data.imgAttribution);
    this.levels = ['Newborn', 'Toddler', 'Young Adult', 'Middle-Aged', 'Elderly', 'Very Old', 'Ancient', 'Eldritchian']
    this.nicknames = ko.observableArray(data.nicknames);

    this.level = ko.computed(function () {
        var index = this.clickCount() / 10;
        index = Math.floor(index);
        return this.levels[index];
    }, this);
}


var ViewModel = function () {
    var self = this; // for storing the ViewModel context

    this.catList = ko.observableArray([]);

    initialCats.forEach(function (catItem) {
        self.catList.push(new Cat(catItem));
    });



    this.currentCat = ko.observable(this.catList()[0]);

    this.incrementCounter = function () {
        self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    };

    this.changeCat = function (cat) {
        console.log(cat);
        self.currentCat(cat);
    }
}

ko.applyBindings(new ViewModel());