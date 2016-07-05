blueberry.start(function () {
    var berries = berryObject.findObjectsWithName('test');
    berries.forEach(berry => {
        berry.addComponent(effects);
    });
});