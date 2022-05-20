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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\nconst uniqid = __webpack_require__(/*! uniqid */ \"./node_modules/uniqid/index.js\");\nclass Player {\n  constructor(name, mmr) {\n    this.id = uniqid();\n    this.name = name;\n    this.mmr = mmr;\n  }\n}\n\n\n//# sourceURL=webpack://dota-shuffle-players/./src/Player.js?");

/***/ }),

/***/ "./src/PlayerList.js":
/*!***************************!*\
  !*** ./src/PlayerList.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PlayerList)\n/* harmony export */ });\n/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/common */ \"./src/utils/common.js\");\n\n\nclass PlayerList {\n  constructor() {\n    if (PlayerList._instance) {\n      return PlayerList._instance;\n    }\n    PlayerList._instance = this;\n\n    this.players = [];\n  }\n\n  addPlayer(player) {\n    this.players.push(player);\n  }\n\n  removePlayer(playerId) {\n    this.players = this.players.filter((player) => player.id !== playerId);\n  }\n\n  shufflePlayer() {\n    const sortedPlayers = this.players.sort((a, b) => b.mmr - a.mmr);\n\n    const firstTeam = [];\n    const secondTeam = [];\n\n    sortedPlayers.forEach((player, index) => {\n      const getTeam = (0,_utils_common__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(1, 2);\n\n      if (index % 2 === 0) {\n        getTeam === 1 ? firstTeam.push(player) : secondTeam.push(player);\n      } else {\n        firstTeam.length > secondTeam.length\n          ? secondTeam.push(player)\n          : firstTeam.push(player);\n      }\n    });\n\n    return [firstTeam, secondTeam];\n  }\n}\n\n\n//# sourceURL=webpack://dota-shuffle-players/./src/PlayerList.js?");

/***/ }),

/***/ "./src/Team.js":
/*!*********************!*\
  !*** ./src/Team.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Team)\n/* harmony export */ });\nclass Team {\n  constructor(players) {\n    this.players = players;\n    this.avgMMR = players.reduce((a, b) => a + b.mmr, 0) / players.length;\n  }\n\n  getPlayerNames() {\n    return this.players.map((player) => player.name);\n  }\n}\n\n\n//# sourceURL=webpack://dota-shuffle-players/./src/Team.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _PlayerList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlayerList */ \"./src/PlayerList.js\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ \"./src/Player.js\");\n/* harmony import */ var _Team__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Team */ \"./src/Team.js\");\n/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/constants */ \"./src/utils/constants.js\");\n/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/common */ \"./src/utils/common.js\");\n\n\n\n\n\n\nclass Main {\n  constructor() {\n    this.playerForm = {};\n    this.firstTeam = [];\n    this.secondTeam = [];\n    this.playerList = new _PlayerList__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  }\n\n  init() {\n    this.storeDoms();\n    this.bindEvents();\n  }\n\n  storeDoms() {\n    this.playerForm = {\n      name: document.querySelector(\"#new-player-name\"),\n      medal: document.querySelector(\"#new-player-medal\"),\n      star: document.querySelector(\"#new-player-medal-star\"),\n      mmr: document.querySelector(\"#new-player-mmr\"),\n      btn: document.querySelector(\"#insert-btn\"),\n    };\n    this.playerListingDom = document.querySelectorAll(\n      \"#players-listing .player-item\"\n    );\n    this.shufflePlayerBtn = document.querySelector(\"#shuffle-btn\");\n\n    this.firstTeamPlayerDom = document.querySelectorAll(\n      \"#team-1-players .player-item\"\n    );\n    this.firstTeamAvgDom = document.querySelector(\"#team-1-avg\");\n\n    this.secondTeamPlayerDom = document.querySelectorAll(\n      \"#team-2-players .player-item\"\n    );\n    this.secondTeamAvgDom = document.querySelector(\"#team-2-avg\");\n\n    this.copyBtns = document.querySelectorAll(\".copy-btn\");\n  }\n\n  bindEvents() {\n    this.playerForm.btn.addEventListener(\n      \"click\",\n      this.createNewPlayer.bind(this)\n    );\n\n    this.playerListingDom.forEach((item) => {\n      item.addEventListener(\"click\", this.removePlayer.bind(this));\n    });\n\n    this.shufflePlayerBtn.addEventListener(\n      \"click\",\n      this.shufflePlayer.bind(this)\n    );\n\n    this.copyBtns.forEach((btn) => {\n      btn.addEventListener(\"click\", this.copyTeamToClipboard.bind(this));\n    });\n  }\n\n  // DOM RENDERING\n\n  renderPlayersListing() {\n    this.playerListingDom.forEach((item) => {\n      const getIdDOM = item.querySelector(\".player-id\");\n      const getNameDOM = item.querySelector(\".player-name\");\n      const getRankDOM = item.querySelector(\".player-rank\");\n\n      getIdDOM.value = \"\";\n      getNameDOM.textContent = \"\";\n      getRankDOM.textContent = ``;\n    });\n\n    this.playerList.players.forEach((player, index) => {\n      const getRowDOM = this.playerListingDom[index];\n      const getIdDOM = getRowDOM.querySelector(\".player-id\");\n      const getNameDOM = getRowDOM.querySelector(\".player-name\");\n      const getRankDOM = getRowDOM.querySelector(\".player-rank\");\n\n      getIdDOM.value = player.id;\n      getNameDOM.textContent = player.name;\n      getRankDOM.textContent = `~ ${player.mmr}`;\n    });\n  }\n\n  renderError(elementId, errorMsg) {\n    if (!elementId) return;\n\n    const element = document.querySelector(`#${elementId}`);\n    if (element) {\n      element.textContent = errorMsg;\n      element.style.display = \"inline-block\";\n    }\n\n    setTimeout(() => {\n      element.textContent = \"\";\n      element.style.display = \"none\";\n    }, 1000);\n  }\n\n  renderTeams() {\n    this.firstTeamAvgDom.textContent = this.firstTeam.avgMMR;\n    this.firstTeam.players.forEach((player, index) => {\n      const getRowDOM = this.firstTeamPlayerDom[index];\n      const getIdDOM = getRowDOM.querySelector(\".player-id\");\n      const getNameDOM = getRowDOM.querySelector(\".player-name\");\n      const getRankDOM = getRowDOM.querySelector(\".player-rank\");\n\n      getIdDOM.value = player.id;\n      getNameDOM.textContent = player.name;\n      getRankDOM.textContent = `~ ${player.mmr}`;\n    });\n\n    this.secondTeamAvgDom.textContent = this.secondTeam.avgMMR;\n    this.secondTeam.players.forEach((player, index) => {\n      const getRowDOM = this.secondTeamPlayerDom[index];\n      const getIdDOM = getRowDOM.querySelector(\".player-id\");\n      const getNameDOM = getRowDOM.querySelector(\".player-name\");\n      const getRankDOM = getRowDOM.querySelector(\".player-rank\");\n\n      getIdDOM.value = player.id;\n      getNameDOM.textContent = player.name;\n      getRankDOM.textContent = `~ ${player.mmr}`;\n    });\n  }\n\n  resetForm() {\n    this.playerForm.name.value = \"\";\n    this.playerForm.mmr.value = \"\";\n  }\n\n  // DOM LOGIC\n  createNewPlayer(event) {\n    event.preventDefault();\n    if (this.playerList.players.length === 10) {\n      this.renderError(\"playerlist-error\", \"Maximum player is 10!\");\n      return;\n    }\n\n    if (!this.playerForm.name.value) {\n      this.renderError(\"playerlist-error\", \"Player name is required!\");\n      return;\n    }\n\n    const playerName = this.playerForm.name.value;\n    const playerRank = `${this.playerForm.medal.value} ${this.playerForm.star.value}`;\n    const mmr = this.playerForm.mmr.value\n      ? +this.playerForm.mmr.value\n      : +_utils_constants__WEBPACK_IMPORTED_MODULE_3__.MMR_NUMBER[playerRank];\n\n    const player = new _Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](playerName, mmr);\n    this.playerList.addPlayer(player);\n    this.renderPlayersListing();\n    this.resetForm();\n  }\n\n  removePlayer(event) {\n    const getId = event.target.querySelector(\".player-id\").value;\n\n    if (getId) {\n      this.playerList.removePlayer(getId);\n      this.renderPlayersListing();\n    }\n  }\n\n  shufflePlayer() {\n    if (this.playerList.players.length < 10) {\n      this.renderError(\"shuffle-error\", \"Not enough player!\");\n      return;\n    }\n\n    const [firstTeamPlayers, secondTeamPlayers] =\n      this.playerList.shufflePlayer();\n\n    this.firstTeam = new _Team__WEBPACK_IMPORTED_MODULE_2__[\"default\"](firstTeamPlayers);\n    this.secondTeam = new _Team__WEBPACK_IMPORTED_MODULE_2__[\"default\"](secondTeamPlayers);\n    this.renderTeams();\n  }\n\n  copyTeamToClipboard({ target }) {\n    if (target.id === _utils_constants__WEBPACK_IMPORTED_MODULE_3__.TEAM_COPY_BTN.first) {\n      const text = `Team 1 is: ${this.firstTeam.getPlayerNames().join(\", \")}`;\n      (0,_utils_common__WEBPACK_IMPORTED_MODULE_4__.copyToClipBoard)(text);\n    } else {\n      const text = `Team 2 is: ${this.secondTeam.getPlayerNames().join(\", \")}`;\n      (0,_utils_common__WEBPACK_IMPORTED_MODULE_4__.copyToClipBoard)(text);\n    }\n  }\n}\n\nconst app = new Main();\napp.init();\n\n\n//# sourceURL=webpack://dota-shuffle-players/./src/index.js?");

/***/ }),

/***/ "./src/utils/common.js":
/*!*****************************!*\
  !*** ./src/utils/common.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"capitalizeString\": () => (/* binding */ capitalizeString),\n/* harmony export */   \"copyToClipBoard\": () => (/* binding */ copyToClipBoard),\n/* harmony export */   \"getRandomInt\": () => (/* binding */ getRandomInt)\n/* harmony export */ });\nconst getRandomInt = (min, max) => {\n  min = Math.ceil(min);\n  max = Math.floor(max);\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n};\n\nconst capitalizeString = (string) => {\n  return string[0].toUpperCase() + string.substring(1);\n};\n\nconst copyToClipBoard = (text) => {\n  navigator.clipboard.writeText(text);\n};\n\n\n//# sourceURL=webpack://dota-shuffle-players/./src/utils/common.js?");

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MMR_NUMBER\": () => (/* binding */ MMR_NUMBER),\n/* harmony export */   \"TEAM_COPY_BTN\": () => (/* binding */ TEAM_COPY_BTN)\n/* harmony export */ });\nconst MMR_NUMBER = {\n  \"herald 1\": 0,\n  \"herald 2\": 154,\n  \"herald 3\": 308,\n  \"herald 4\": 462,\n  \"herald 5\": 616,\n\n  \"guardian 1\": 770,\n  \"guardian 2\": 924,\n  \"guardian 3\": 1078,\n  \"guardian 4\": 1232,\n  \"guardian 5\": 1386,\n\n  \"crusader 1\": 1540,\n  \"crusader 2\": 1694,\n  \"crusader 3\": 1848,\n  \"crusader 4\": 2002,\n  \"crusader 5\": 2156,\n\n  \"archon 1\": 2310,\n  \"archon 2\": 2464,\n  \"archon 3\": 2618,\n  \"archon 4\": 2772,\n  \"archon 5\": 2926,\n\n  \"legend 1\": 3080,\n  \"legend 2\": 3234,\n  \"legend 3\": 3388,\n  \"legend 4\": 3542,\n  \"legend 5\": 3696,\n\n  \"ancient 1\": 3850,\n  \"ancient 2\": 4004,\n  \"ancient 3\": 4158,\n  \"ancient 4\": 4312,\n  \"ancient 5\": 4466,\n\n  \"divine 1\": 4620,\n  \"divine 2\": 4820,\n  \"divine 3\": 5020,\n  \"divine 4\": 5220,\n  \"divine 5\": 5420,\n};\n\nconst TEAM_COPY_BTN = {\n  first: \"copy-team-1\",\n  second: \"copy-team-2\",\n};\n\n\n//# sourceURL=webpack://dota-shuffle-players/./src/utils/constants.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);