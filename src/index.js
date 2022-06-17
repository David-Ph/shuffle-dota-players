import PlayerList from "./PlayerList";
import Player from "./Player";
import Team from "./Team";
import { MMR_NUMBER, TEAM_COPY_BTN, REGULAR_PLAYERS } from "./utils/constants";
import { copyToClipBoard, autocomplete } from "./utils/common";

class Main {
  constructor() {
    this.playerForm = {};
    this.firstTeam = [];
    this.secondTeam = [];
    this.playerList = new PlayerList();
  }

  init() {
    this.storeDoms();
    this.bindEvents();
    this.bindAutoComplete();
  }

  storeDoms() {
    this.playerForm = {
      name: document.querySelector("#new-player-name"),
      medal: document.querySelector("#new-player-medal"),
      star: document.querySelector("#new-player-medal-star"),
      mmr: document.querySelector("#new-player-mmr"),
      btn: document.querySelector("#insert-btn"),
    };
    this.playerListingDom = document.querySelectorAll(
      "#players-listing .player-item"
    );
    this.shufflePlayerBtn = document.querySelector("#shuffle-btn");

    this.firstTeamPlayerDom = document.querySelectorAll(
      "#team-1-players .player-item"
    );
    this.firstTeamAvgDom = document.querySelector("#team-1-avg");

    this.secondTeamPlayerDom = document.querySelectorAll(
      "#team-2-players .player-item"
    );
    this.secondTeamAvgDom = document.querySelector("#team-2-avg");

    this.copyBtns = document.querySelectorAll(".copy-btn");

    this.findPlayerInput = document.getElementById("findPlayerInput");
    this.findPlayerSubmit = document.getElementById("findPlayerSubmit");
  }

  bindEvents() {
    this.playerForm.btn.addEventListener(
      "click",
      this.createNewPlayer.bind(this)
    );

    this.playerListingDom.forEach((item) => {
      item.addEventListener("click", this.removePlayer.bind(this));
    });

    this.shufflePlayerBtn.addEventListener(
      "click",
      this.shufflePlayer.bind(this)
    );

    this.copyBtns.forEach((btn) => {
      btn.addEventListener("click", this.copyTeamToClipboard.bind(this));
    });

    this.findPlayerSubmit.addEventListener(
      "click",
      this.insertFoundPlayer.bind(this)
    );
  }

  bindAutoComplete() {
    console.log("HELLO FROM BIND AUTO COMPLETE")
    const playerNames = REGULAR_PLAYERS.map((player) => player.name);
    autocomplete(this.findPlayerInput, playerNames);
  }

  // DOM RENDERING

  renderPlayersListing() {
    this.playerListingDom.forEach((item) => {
      const getIdDOM = item.querySelector(".player-id");
      const getNameDOM = item.querySelector(".player-name");
      const getRankDOM = item.querySelector(".player-rank");

      getIdDOM.value = "";
      getNameDOM.textContent = "";
      getRankDOM.textContent = ``;
    });

    this.playerList.players.forEach((player, index) => {
      const getRowDOM = this.playerListingDom[index];
      const getIdDOM = getRowDOM.querySelector(".player-id");
      const getNameDOM = getRowDOM.querySelector(".player-name");
      const getRankDOM = getRowDOM.querySelector(".player-rank");

      getIdDOM.value = player.id;
      getNameDOM.textContent = player.name;
      getRankDOM.textContent = `~ ${player.mmr}`;
    });
  }

  renderError(elementId, errorMsg) {
    if (!elementId) return;

    const element = document.querySelector(`#${elementId}`);
    if (element) {
      element.textContent = errorMsg;
      element.style.display = "inline-block";
    }

    setTimeout(() => {
      element.textContent = "";
      element.style.display = "none";
    }, 1000);
  }

  renderTeams() {
    this.firstTeamAvgDom.textContent = this.firstTeam.avgMMR;
    this.firstTeam.players.forEach((player, index) => {
      const getRowDOM = this.firstTeamPlayerDom[index];
      const getIdDOM = getRowDOM.querySelector(".player-id");
      const getNameDOM = getRowDOM.querySelector(".player-name");
      const getRankDOM = getRowDOM.querySelector(".player-rank");

      getIdDOM.value = player.id;
      getNameDOM.textContent = player.name;
      getRankDOM.textContent = `~ ${player.mmr}`;
    });

    this.secondTeamAvgDom.textContent = this.secondTeam.avgMMR;
    this.secondTeam.players.forEach((player, index) => {
      const getRowDOM = this.secondTeamPlayerDom[index];
      const getIdDOM = getRowDOM.querySelector(".player-id");
      const getNameDOM = getRowDOM.querySelector(".player-name");
      const getRankDOM = getRowDOM.querySelector(".player-rank");

      getIdDOM.value = player.id;
      getNameDOM.textContent = player.name;
      getRankDOM.textContent = `~ ${player.mmr}`;
    });
  }

  resetForm() {
    this.playerForm.name.value = "";
    this.playerForm.mmr.value = "";
  }

  // DOM LOGIC
  createNewPlayer(event, foundPlayer = null) {
    event.preventDefault();
    if (this.playerList.players.length === 10) {
      this.renderError("playerlist-error", "Maximum player is 10!");
      this.renderError("playerlist-modal-error", "Maximum player is 10!");
      return;
    }

    if (!foundPlayer && !this.playerForm.name.value) {
      this.renderError("playerlist-error", "Player name is required!");
      return;
    }

    const playerName = foundPlayer?.name || this.playerForm.name.value;
    const playerRank = `${this.playerForm.medal.value} ${this.playerForm.star.value}`;
    const mmr = foundPlayer?.mmr
      ? foundPlayer.mmr
      : this.playerForm.mmr.value
      ? +this.playerForm.mmr.value
      : +MMR_NUMBER[playerRank];

    const player = new Player(playerName, mmr);

    this.playerList.addPlayer(player);
    this.renderPlayersListing();
    this.resetForm();
  }

  removePlayer(event) {
    const getId = event.target.querySelector(".player-id").value;

    if (getId) {
      this.playerList.removePlayer(getId);
      this.renderPlayersListing();
    }
  }

  shufflePlayer() {
    if (this.playerList.players.length < 10) {
      this.renderError("shuffle-error", "Not enough player!");
      return;
    }

    const [firstTeamPlayers, secondTeamPlayers] =
      this.playerList.shufflePlayer();

    this.firstTeam = new Team(firstTeamPlayers);
    this.secondTeam = new Team(secondTeamPlayers);
    this.renderTeams();
  }

  copyTeamToClipboard({ target }) {
    if (target.id === TEAM_COPY_BTN.first) {
      const text = `Team 1 is: ${this.firstTeam.getPlayerNames().join(", ")}`;
      copyToClipBoard(text);
    } else {
      const text = `Team 2 is: ${this.secondTeam.getPlayerNames().join(", ")}`;
      copyToClipBoard(text);
    }
  }

  insertFoundPlayer(event) {
    console.log("HELLO FROM INSERT FOUND PLAYER");
    const findPlayer = REGULAR_PLAYERS.find(
      (player) => player.name === this.findPlayerInput.value
    );
    this.createNewPlayer(event, findPlayer);
    this.findPlayerInput.value = "";
  }
}

const app = new Main();
app.init();
