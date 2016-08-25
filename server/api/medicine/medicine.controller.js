'use strict';

var _ = require('lodash');
var Medicine = require('./medicine.model');

// Get list of medicines
exports.index = function(req, res) {
  Medicine.find(function (err, medicines) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(medicines);
  });
};

// Get a single medicine
exports.show = function(req, res) {
  Medicine.findById(req.params.id, function (err, medicine) {
    if(err) { return handleError(res, err); }
    if(!medicine) { return res.status(404).send('Not Found'); }
    return res.json(medicine);
  });
};

// Creates a new medicine in the DB.
exports.create = function(req, res) {
  Medicine.create(req.body, function(err, medicine) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(medicine);
  });
};

// Updates an existing medicine in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Medicine.findById(req.params.id, function (err, medicine) {
    if (err) { return handleError(res, err); }
    if(!medicine) { return res.status(404).send('Not Found'); }
    var updated = _.merge(medicine, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(medicine);
    });
  });
};

// Deletes a medicine from the DB.
exports.destroy = function(req, res) {
  Medicine.findById(req.params.id, function (err, medicine) {
    if(err) { return handleError(res, err); }
    if(!medicine) { return res.status(404).send('Not Found'); }
    medicine.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}