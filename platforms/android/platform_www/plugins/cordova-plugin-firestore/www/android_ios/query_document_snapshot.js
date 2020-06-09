cordova.define("cordova-plugin-firestore.query_document_snapshot", function(require, exports, module) {
var DocumentSnapshot = require("./document_snapshot");

function QueryDocumentSnapshot(data) {
  DocumentSnapshot.call(this, data);
}

QueryDocumentSnapshot.prototype = Object.create(DocumentSnapshot.prototype);
QueryDocumentSnapshot.prototype.constructor = QueryDocumentSnapshot;

module.exports = QueryDocumentSnapshot;

});
