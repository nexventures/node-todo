
/*
 * GET home page.
 */

var items = {
  1: {id: 1, name: 'blah', status: 'in-progress', order: 1}
};

exports.index = function(req, res){
  res.render('index', { title: 'Express', items: items })
};

exports.create = function(req, res){
  var id = new Date().getTime();
  items[id] = {id: id, name: req.body.add, status: 'in-progress', order: items.length};
  res.render('index', { title: 'Express', items: items })
};

exports.remove = function(req, res){
  var id = req.params.id;
  if (items[id] != undefined) {
    delete items[id];
  }
  res.redirect('/');
}

exports.mark_completed = function(req, res){
  var id = req.params.id;
  if (items[id] != undefined) {
    items[id].status = 'complete';
  }
  res.redirect('/');
}

exports.mark_inprogress = function(req, res){
  var id = req.params.id;
  if (items[id] != undefined) {
    items[id].status = 'in-progress';
  }
  res.redirect('/');
}