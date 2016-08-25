/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Medicine = require('./medicine.model');

exports.register = function(socket) {
  Medicine.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Medicine.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('medicine:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('medicine:remove', doc);
}