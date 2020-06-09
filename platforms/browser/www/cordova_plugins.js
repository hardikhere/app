cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-firestore/www/browser/firestore.js",
        "id": "cordova-plugin-firestore.Firestore",
        "pluginId": "cordova-plugin-firestore",
        "clobbers": [
            "Firestore"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-firestore": "3.0.0"
}
// BOTTOM OF METADATA
});