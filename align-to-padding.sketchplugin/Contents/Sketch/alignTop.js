var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/alignTop.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/alignTop.js":
/*!*************************!*\
  !*** ./src/alignTop.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main */ "./src/main.js");


/* harmony default export */ __webpack_exports__["default"] = (function () {
  var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  var selectedLayers = document.selectedLayers;
  var run = Object(_main__WEBPACK_IMPORTED_MODULE_1__["default"])().run();

  if (run.complete === true) {
    selectedLayers.forEach(function (item) {
      item.frame.y = run.lastLayer.frame.y + Number(run.padding[0]);
    });
    run.group.adjustToFit();
  }
});

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  var selectedLayers = document.selectedLayers;
  var selectedCount = selectedLayers.length;

  var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

  var validElements = true;
  var group = null;
  var lastLayer = null;
  var padding = [];
  var string = null;
  var message = "Enter padding eg: 12 or 12 12 12 12";
  var complete = true;

  var run = function run() {
    if (selectedCount === 0) {
      UI.message("Select a layer");
      validElements = false;
      return;
    }

    selectedLayers.forEach(function (item) {
      if (item.parent.type !== "Group") {
        UI.message("Select a layer in a Group");
        validElements = false;
        return;
      }

      if (item.parent.type === "Group" && item.parent.layers.length < 2) {
        UI.message("Need to create at least 2 layers");
        validElements = false;
        return;
      }

      item.parent.layers.forEach(function (i, index) {
        if (item.id === i.id) {
          if (index === 0) {
            UI.message("Can't select the bottom layer");
            validElements = false;
            return;
          }
        }
      });

      if (validElements) {
        var paddingCorrect = false;
        lastLayer = item.parent.layers[0];
        string = lastLayer.name;
        padding = lastLayer.name.split(" ");
        group = lastLayer.parent;

        while (!paddingCorrect) {
          var onlyNumbers = /(^[0-9 ]*$)/g;
          var separateNums = /([0-9]+)/g;
          var otherCharacters = /[^0-9 ]/g;
          var whiteSpace = /\s+/g;
          var bigNumber = /([0-9]{4,})/g;

          if (string.match(onlyNumbers) && string.match(separateNums).length === 4 && string.match(bigNumber) == null) {
            paddingCorrect = true;
            return;
          }

          var inputValidation = function inputValidation() {
            if (string.match(onlyNumbers) && string.match(separateNums).length === 4 && string.match(bigNumber) == null) {
              paddingCorrect = true;
              lastLayer.name = string.replace(whiteSpace, " ");
              padding = lastLayer.name.split(" ");
            }

            if (string.match(onlyNumbers) && string.match(separateNums).length === 1 && string.match(bigNumber) == null) {
              paddingCorrect = true;
              var firstNum = string.match(separateNums)[0];
              lastLayer.name = firstNum + " " + firstNum + " " + firstNum + " " + firstNum;
              padding = lastLayer.name.split(" ");
            }

            if (string.match(onlyNumbers) && string.match(separateNums).length === 2 && string.match(bigNumber) == null) {
              paddingCorrect = true;
              var firstNum = string.match(separateNums)[0];
              var secondNum = string.match(separateNums)[1];
              lastLayer.name = firstNum + " " + secondNum + " " + firstNum + " " + secondNum;
              padding = lastLayer.name.split(" ");
            }

            if (string.match(onlyNumbers) && string.match(separateNums).length === 3 && string.match(bigNumber) == null) {
              paddingCorrect = true;
              var firstNum = string.match(separateNums)[0];
              var secondNum = string.match(separateNums)[1];
              var thirdNum = string.match(separateNums)[2];
              lastLayer.name = firstNum + " " + secondNum + " " + thirdNum + " " + secondNum;
              padding = lastLayer.name.split(" ");
            }

            if (string.match(bigNumber) != null) {
              message = "Maximum of 3 digits for each padding";
            }

            if (string.match(onlyNumbers) && string.match(separateNums).length > 4) {
              message = "Enter 4 numbers or less";
            }

            if (string.match(otherCharacters)) {
              message = "Enter numbers only";
            }

            if (string === "null") {
              paddingCorrect = true;
            }
          };

          UI.getInputFromUser(message, {
            initialValue: string
          }, function (err, value) {
            if (err) {
              paddingCorrect = true;
              complete = false;
              return;
            }

            string = value;
            inputValidation();
          });
        }
      }
    });
    return {
      complete: complete,
      padding: padding,
      lastLayer: lastLayer,
      group: group
    };
  };

  return {
    run: run
  };
});

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),

/***/ "sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=alignTop.js.map