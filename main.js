/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkdota_shuffle_players"] = self["webpackChunkdota_shuffle_players"] || []).push([["main"],{

/***/ "./node_modules/uniqid/index.js":
/*!**************************************!*\
  !*** ./node_modules/uniqid/index.js ***!
  \**************************************/
/***/ ((module) => {

eval("/* \n(The MIT License)\nCopyright (c) 2014-2021 Halász Ádám <adam@aimform.com>\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n*/\n\n//  Unique Hexatridecimal ID Generator\n// ================================================\n\n//  Dependencies\n// ================================================\nvar pid = typeof process !== 'undefined' && process.pid ? process.pid.toString(36) : '' ;\nvar address = '';\nif(false){ var i, networkInterfaces, mac, os; } \n\n//  Exports\n// ================================================\nmodule.exports = module.exports[\"default\"] = function(prefix, suffix){ return (prefix ? prefix : '') + address + pid + now().toString(36) + (suffix ? suffix : ''); }\nmodule.exports.process = function(prefix, suffix){ return (prefix ? prefix : '') + pid + now().toString(36) + (suffix ? suffix : ''); }\nmodule.exports.time    = function(prefix, suffix){ return (prefix ? prefix : '') + now().toString(36) + (suffix ? suffix : ''); }\n\n//  Helpers\n// ================================================\nfunction now(){\n    var time = Date.now();\n    var last = now.last || time;\n    return now.last = time > last ? time : last + 1;\n}\n\n\n//# sourceURL=webpack://dota-shuffle-players/./node_modules/uniqid/index.js?");

/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\nconst uniqid = __webpack_require__(/*! uniqid */ \"./node_modules/uniqid/index.js\");\r\n\r\nclass Player {\r\n  constructor(name, mmr) {\r\n    this.id = uniqid();\r\n    this.name = name;\r\n    this.mmr = mmr;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://dota-shuffle-players/./src/Player.js?");

/***/ }),

/***/ "./src/PlayerList.js":
/*!***************************!*\
  !*** ./src/PlayerList.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PlayerList)\n/* harmony export */ });\nclass PlayerList {\r\n  constructor() {\r\n    if (PlayerList._instance) {\r\n      return PlayerList._instance;\r\n    }\r\n    PlayerList._instance = this;\r\n\r\n    this.players = [];\r\n  }\r\n\r\n  addPlayer(player) {\r\n    this.players.push(player);\r\n  }\r\n\r\n  removePlayer(playerId) {\r\n    this.players = this.players.filter((player) => player.id !== playerId);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://dota-shuffle-players/./src/PlayerList.js?");

/***/ }),

/***/ "./src/Team.js":
/*!*********************!*\
  !*** ./src/Team.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Team)\n/* harmony export */ });\nclass Team {\r\n  constructor(players) {\r\n    this.players = players;\r\n    this.avgMMR = players.reduce((a, b) => a + b.mmr, 0) / players.length;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://dota-shuffle-players/./src/Team.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _PlayerList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlayerList */ \"./src/PlayerList.js\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ \"./src/Player.js\");\n/* harmony import */ var _Team__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Team */ \"./src/Team.js\");\n\r\n\r\n\r\n\r\nclass Main {\r\n  constructor() {\r\n    this.newPlayerForm = {};\r\n  }\r\n\r\n  init() {\r\n    this.storeDoms();\r\n    this.bindEvents();\r\n  }\r\n\r\n  storeDoms() {\r\n    this.newPlayerForm = {\r\n      name: document.querySelector(\"#new-player-name\"),\r\n      medal: document.querySelector(\"#new-player-medal\"),\r\n      medalStar: document.querySelector(\"#new-player-medal-star\"),\r\n      mmr: document.querySelector(\"#new-player-mmr\"),\r\n      btn: document.querySelector(\"#insert-btn\"),\r\n    };\r\n  }\r\n\r\n  bindEvents() {\r\n    console.log(this.newPlayerForm);\r\n  }\r\n}\r\n\r\nconst app = new Main();\r\napp.init();\r\nconsole.log(\"HELLOOO\");\r\n\n\n//# sourceURL=webpack://dota-shuffle-players/./src/index.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);