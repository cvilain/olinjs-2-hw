
exports.list = function(req, res){
  res.send("list the cats");
};

exports.newCat = function(req, res){
  res.send("new cat");
};

exports.color = function(req, res){
  res.send("cat color");
};

exports.deleteOld = function(req, res){
  res.send("delete cat");
};
