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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\nconst uniqid = __webpack_require__(/*! uniqid */ \"./node_modules/uniqid/index.js\");\r\nclass Player {\r\n  constructor(name, mmr) {\r\n    this.id = uniqid();\r\n    this.name = name;\r\n    this.mmr = mmr;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://dota-shuffle-players/./src/Player.js?");

/***/ }),

/***/ "./src/PlayerList.js":
/*!***************************!*\
  !*** ./src/PlayerList.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PlayerList)\n/* harmony export */ });\n/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/common */ \"./src/utils/common.js\");\n\r\n\r\nclass PlayerList {\r\n  constructor() {\r\n    if (PlayerList._instance) {\r\n      return PlayerList._instance;\r\n    }\r\n    PlayerList._instance = this;\r\n\r\n    this.players = [];\r\n  }\r\n\r\n  addPlayer(player) {\r\n    this.players.push(player);\r\n  }\r\n\r\n  removePlayer(playerId) {\r\n    this.players = this.players.filter((player) => player.id !== playerId);\r\n  }\r\n\r\n  shufflePlayer() {\r\n    const sortedPlayers = this.players.sort((a, b) => b.mmr - a.mmr);\r\n\r\n    const firstTeam = [];\r\n    const secondTeam = [];\r\n\r\n    sortedPlayers.forEach((player, index) => {\r\n      const getTeam = (0,_utils_common__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(1, 2);\r\n\r\n      if (index % 2 === 0) {\r\n        getTeam === 1 ? firstTeam.push(player) : secondTeam.push(player);\r\n      } else {\r\n        firstTeam.length > secondTeam.length\r\n          ? secondTeam.push(player)\r\n          : firstTeam.push(player);\r\n      }\r\n    });\r\n\r\n    return [firstTeam, secondTeam];\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://dota-shuffle-players/./src/PlayerList.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _PlayerList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlayerList */ \"./src/PlayerList.js\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ \"./src/Player.js\");\n/* harmony import */ var _Team__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Team */ \"./src/Team.js\");\n/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/constants */ \"./src/utils/constants.js\");\n\r\n\r\n\r\n\r\n\r\nclass Main {\r\n  constructor() {\r\n    this.playerForm = {};\r\n    this.firstTeam = [];\r\n    this.secondTeam = [];\r\n    this.playerList = new _PlayerList__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n  }\r\n\r\n  init() {\r\n    this.storeDoms();\r\n    this.bindEvents();\r\n  }\r\n\r\n  storeDoms() {\r\n    this.playerForm = {\r\n      name: document.querySelector(\"#new-player-name\"),\r\n      medal: document.querySelector(\"#new-player-medal\"),\r\n      star: document.querySelector(\"#new-player-medal-star\"),\r\n      mmr: document.querySelector(\"#new-player-mmr\"),\r\n      btn: document.querySelector(\"#insert-btn\"),\r\n    };\r\n    this.playerListingDom = document.querySelectorAll(\r\n      \"#players-listing .player-item\"\r\n    );\r\n    this.shufflePlayerBtn = document.querySelector(\"#shuffle-btn\");\r\n\r\n    this.firstTeamPlayerDom = document.querySelectorAll(\r\n      \"#team-1-players .player-item\"\r\n    );\r\n    this.firstTeamAvgDom = document.querySelector(\"#team-1-avg\");\r\n\r\n    this.secondTeamPlayerDom = document.querySelectorAll(\r\n      \"#team-2-players .player-item\"\r\n    );\r\n    this.secondTeamAvgDom = document.querySelector(\"#team-2-avg\");\r\n  }\r\n\r\n  bindEvents() {\r\n    this.playerForm.btn.addEventListener(\r\n      \"click\",\r\n      this.createNewPlayer.bind(this)\r\n    );\r\n\r\n    this.playerListingDom.forEach((item) => {\r\n      item.addEventListener(\"click\", this.removePlayer.bind(this));\r\n    });\r\n\r\n    this.shufflePlayerBtn.addEventListener(\r\n      \"click\",\r\n      this.shufflePlayer.bind(this)\r\n    );\r\n  }\r\n\r\n  // DOM RENDERING\r\n\r\n  renderPlayersListing() {\r\n    this.playerListingDom.forEach((item) => {\r\n      const getIdDOM = item.querySelector(\".player-id\");\r\n      const getNameDOM = item.querySelector(\".player-name\");\r\n      const getRankDOM = item.querySelector(\".player-rank\");\r\n\r\n      getIdDOM.value = \"\";\r\n      getNameDOM.textContent = \"\";\r\n      getRankDOM.textContent = ``;\r\n    });\r\n\r\n    this.playerList.players.forEach((player, index) => {\r\n      const getRowDOM = this.playerListingDom[index];\r\n      const getIdDOM = getRowDOM.querySelector(\".player-id\");\r\n      const getNameDOM = getRowDOM.querySelector(\".player-name\");\r\n      const getRankDOM = getRowDOM.querySelector(\".player-rank\");\r\n\r\n      getIdDOM.value = player.id;\r\n      getNameDOM.textContent = player.name;\r\n      getRankDOM.textContent = `~ ${player.mmr}`;\r\n    });\r\n  }\r\n\r\n  renderError(elementId, errorMsg) {\r\n    if (!elementId) return;\r\n\r\n    const element = document.querySelector(`#${elementId}`);\r\n    if (element) {\r\n      element.textContent = errorMsg;\r\n      element.style.display = \"inline-block\";\r\n    }\r\n\r\n    setTimeout(() => {\r\n      element.textContent = \"\";\r\n      element.style.display = \"none\";\r\n    }, 1000);\r\n  }\r\n\r\n  renderTeams() {\r\n    this.firstTeamAvgDom.textContent = this.firstTeam.avgMMR;\r\n    this.firstTeam.players.forEach((player, index) => {\r\n      const getRowDOM = this.firstTeamPlayerDom[index];\r\n      const getIdDOM = getRowDOM.querySelector(\".player-id\");\r\n      const getNameDOM = getRowDOM.querySelector(\".player-name\");\r\n      const getRankDOM = getRowDOM.querySelector(\".player-rank\");\r\n\r\n      getIdDOM.value = player.id;\r\n      getNameDOM.textContent = player.name;\r\n      getRankDOM.textContent = `~ ${player.mmr}`;\r\n    });\r\n\r\n    this.secondTeamAvgDom.textContent = this.secondTeam.avgMMR;\r\n    this.secondTeam.players.forEach((player, index) => {\r\n      const getRowDOM = this.secondTeamPlayerDom[index];\r\n      const getIdDOM = getRowDOM.querySelector(\".player-id\");\r\n      const getNameDOM = getRowDOM.querySelector(\".player-name\");\r\n      const getRankDOM = getRowDOM.querySelector(\".player-rank\");\r\n\r\n      getIdDOM.value = player.id;\r\n      getNameDOM.textContent = player.name;\r\n      getRankDOM.textContent = `~ ${player.mmr}`;\r\n    });\r\n  }\r\n\r\n  resetForm() {\r\n    this.playerForm.name.value = \"\";\r\n    this.playerForm.mmr.value = \"\";\r\n  }\r\n\r\n  // DOM LOGIC\r\n  createNewPlayer(event) {\r\n    event.preventDefault();\r\n    if (this.playerList.players.length === 10) {\r\n      this.renderError(\"playerlist-error\", \"Maximum player is 10!\");\r\n      return;\r\n    }\r\n\r\n    if (!this.playerForm.name.value) {\r\n      this.renderError(\"playerlist-error\", \"Player name is required!\");\r\n      return;\r\n    }\r\n\r\n    const playerName = this.playerForm.name.value;\r\n    const playerRank = `${this.playerForm.medal.value} ${this.playerForm.star.value}`;\r\n    const mmr = this.playerForm.mmr.value\r\n      ? +this.playerForm.mmr.value\r\n      : +_utils_constants__WEBPACK_IMPORTED_MODULE_3__.MMR_NUMBER[playerRank];\r\n\r\n    const player = new _Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](playerName, mmr);\r\n    this.playerList.addPlayer(player);\r\n    this.renderPlayersListing();\r\n    this.resetForm()\r\n  }\r\n\r\n  removePlayer(event) {\r\n    const getId = event.target.querySelector(\".player-id\").value;\r\n\r\n    if (getId) {\r\n      this.playerList.removePlayer(getId);\r\n      this.renderPlayersListing();\r\n    }\r\n  }\r\n\r\n  shufflePlayer() {\r\n    if (this.playerList.players.length < 10) {\r\n      this.renderError(\"shuffle-error\", \"Not enough player!\");\r\n      return;\r\n    }\r\n\r\n    const [firstTeamPlayers, secondTeamPlayers] =\r\n      this.playerList.shufflePlayer();\r\n\r\n    this.firstTeam = new _Team__WEBPACK_IMPORTED_MODULE_2__[\"default\"](firstTeamPlayers);\r\n    this.secondTeam = new _Team__WEBPACK_IMPORTED_MODULE_2__[\"default\"](secondTeamPlayers);\r\n    this.renderTeams();\r\n  }\r\n}\r\n\r\nconst app = new Main();\r\napp.init();\r\n\n\n//# sourceURL=webpack://dota-shuffle-players/./src/index.js?");

/***/ }),

/***/ "./src/utils/common.js":
/*!*****************************!*\
  !*** ./src/utils/common.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"capitalizeString\": () => (/* binding */ capitalizeString),\n/* harmony export */   \"getRandomInt\": () => (/* binding */ getRandomInt)\n/* harmony export */ });\nconst getRandomInt = (min, max) => {\r\n  min = Math.ceil(min);\r\n  max = Math.floor(max);\r\n  return Math.floor(Math.random() * (max - min + 1)) + min;\r\n};\r\n\r\nconst capitalizeString = (string) => {\r\n  return string[0].toUpperCase() + string.substring(1);\r\n};\r\n\n\n//# sourceURL=webpack://dota-shuffle-players/./src/utils/common.js?");

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MMR_NUMBER\": () => (/* binding */ MMR_NUMBER)\n/* harmony export */ });\nconst MMR_NUMBER = {\r\n  \"herald 1\": 0,\r\n  \"herald 2\": 154,\r\n  \"herald 3\": 308,\r\n  \"herald 4\": 462,\r\n  \"herald 5\": 616,\r\n\r\n  \"guardian 1\": 770,\r\n  \"guardian 2\": 924,\r\n  \"guardian 3\": 1078,\r\n  \"guardian 4\": 1232,\r\n  \"guardian 5\": 1386,\r\n\r\n  \"crusader 1\": 1540,\r\n  \"crusader 2\": 1694,\r\n  \"crusader 3\": 1848,\r\n  \"crusader 4\": 2002,\r\n  \"crusader 5\": 2156,\r\n\r\n  \"archon 1\": 2310,\r\n  \"archon 2\": 2464,\r\n  \"archon 3\": 2618,\r\n  \"archon 4\": 2772,\r\n  \"archon 5\": 2926,\r\n\r\n  \"legend 1\": 3080,\r\n  \"legend 2\": 3234,\r\n  \"legend 3\": 3388,\r\n  \"legend 4\": 3542,\r\n  \"legend 5\": 3696,\r\n\r\n  \"ancient 1\": 3850,\r\n  \"ancient 2\": 4004,\r\n  \"ancient 3\": 4158,\r\n  \"ancient 4\": 4312,\r\n  \"ancient 5\": 4466,\r\n\r\n  \"divine 1\": 4620,\r\n  \"divine 2\": 4820,\r\n  \"divine 3\": 5020,\r\n  \"divine 4\": 5220,\r\n  \"divine 5\": 5420,\r\n};\r\n\n\n//# sourceURL=webpack://dota-shuffle-players/./src/utils/constants.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);