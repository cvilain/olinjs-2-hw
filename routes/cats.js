mongoose = require('mongoose');

var catSchema = mongoose.Schema({
    name: String,
    age: Number,
    colors: Array  
})
var Cat = mongoose.model('Cat', catSchema);

exports.list = function(req, res){
  //Cat.find.sort(Cat.age);
  //sort cats
  Cat.find({}).sort('-age').exec(function (err, cats) {
    if (err) {
      return console.log(err);
    };
    res.render('catList.jade', {title: 'Cats', catObject: cats});
  });
};

exports.newCat = function(req, res){
  var catColors = ['white', 'black', 'brown', 'beige', 'orange', 'grey'];
  var catNames = ['Lucy', 'Paws', 'Mr.Mittens', 'Micky', 'Tiger','Francine'];
  var color1 = Math.floor(Math.random()*6);
  assignColor = function(){
    var colorNew = Math.floor(Math.random()*6)
    if (colorNew == color1) {
      return assignColor();
    };
    return colorNew;
  };
  var color2 = assignColor();
  var myCatAge = Math.ceil(Math.random()*15);
  var myCatName = catNames[Math.floor((Math.random()*6))];
  var myCatColors = [catColors[color1], catColors[color2]]
  
  var myCat = new Cat({name: myCatName, age: myCatAge, colors: myCatColors});
  myCat.save(function (err) {
  if (err)
    console.log("Problem saving myCat", err);
  });
  res.send("A new cat named "+myCatName + " of age "+myCatAge+" and colors " + myCatColors+ " has joined the family" );
};

exports.color = function(req, res){
  //sudo code
  /*catlist = []
  for cat in cats
    if color in cat.colors
    catlist.append (cat)
  catlist.show
  */
  
  var catList = [];
  Cat.find({}).exec(function(err, doc) {
    if (err) {
      console.log(err);
    };
    doc.forEach(function(cat) {
      colors = cat.colors
      if (colors.indexOf(req.params['color']) != -1) {
        catList.push(cat); 
      };
    });
    console.log(catList);
    res.render('catColors.jade', {title: 'Cats', catObject: catList});
  });
};


exports.deleteOld = function(req, res){
  //sudo code
  /*
  cats.sort
  cats.last.remove
  */
  var oldCat = Cat.find({}).sort('-age').exec(function (err, doc) {
    if (err) {
      console.log(err);
    }
    var oldCat = doc[0];
    console.log(oldCat._id);
    Cat.remove({"_id" : oldCat._id}).exec(function (err, doc) {
      console.log('removed');
      console.log(doc);
    });
  });
  res.send("old cat has died");
};



