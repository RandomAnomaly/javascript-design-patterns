var ViewModel = function () {
    this.clickCount = ko.observable(0);
    this.name = ko.observable('Tabby');
    this.imgSrc = ko.observable('img/22252709_010df3379e_z.jpg');
    this.imgAttribution = ko.observable('');
    this.levels = ['Newborn', 'Toddler', 'Young Adult', 'Middle-Aged', 'Elderly', 'Very Old', 'Ancient', 'Eldritchian']
    this.nicknames = ko.observableArray(['a', 'b', 'c', 'd', 'e']);


    this.incrementCounter = function () {
        this.clickCount(this.clickCount() + 1);
    };

    this.level = ko.computed(function(){
        var index = this.clickCount() / 10;
        index = Math.floor(index);
        return this.levels[index];
    },this);
}

ko.applyBindings(new ViewModel());