/**
 *	api.js
 */


var Todo = require('../models/todo.js');

exports.index = function(req, res){
  console.log('loading items');
  Todo.find({}, function(err, _items) {
    res.render('index', { title: 'Express', items: _items });
  });
};

exports.create = function(req, res){
  new Todo({
    name: req.body.add, 
    status: 'in-progress'
  }).save();
  res.redirect('/');
};

exports.mark_completed = function(req, res){
  var id = req.params.id;
  Todo.findById(id, function(err, item) {
    item.status = 'complete';
    item.save();
  });
  res.redirect('/');
}

exports.mark_inprogress = function(req, res){
  var id = req.params.id;
  Todo.findById(id, function(err, item) {
    item.status = 'in-progress';
    item.save();
  });
  res.redirect('/');
}
exports.remove = function(req, res){
  var id = req.params.id;
  Todo.findById(id, function(err, item) {
    item.remove();
  });
  res.redirect('/');
}

exports.empty = function(req, res) {
  Todo.find({}).remove();
  res.redirect('/');
}