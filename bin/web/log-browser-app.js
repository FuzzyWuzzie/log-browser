(function (console) { "use strict";
var App = function() { };
App.main = function() {
};
App.console = window.console;
App.main();
})(typeof console != "undefined" ? console : {log:function(){}});
