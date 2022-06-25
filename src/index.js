import PlayerList from "./PlayerList";
import Player from "./Player";
import Team from "./Team";
import {
  MMR_NUMBER,
  TEAM_COPY_BTN,
  REGULAR_PLAYERS,
  TEAM_DATASET,
} from "./utils/constants";
import { copyToClipBoard, autocomplete } from "./utils/common";

class Main {
  constructor() {
    this.playerForm = {};
    this.firstTeam = [];
    this.secondTeam = [];
    this.playerList = new PlayerList();

    this.swapPlayerTemp = null;
    this.swapPlayerTempTwo = null;
    this.swapPlayerTempDom = null;
    this.swapPlayerTempTwoDom = null;
    this.swapPlayerTempTeam = null;
    this.swapPlayerTempTwoTeam = null;
  }

  init() {
    this.storeDoms();
    this.bindEvents();
    this.bindAutoComplete();
  }

  storeDoms() {
    // ? Player listing section
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
    this.playerListingMmr = document.querySelectorAll(
      "#players-listing .player-item .player-rank"
    );
    this.shufflePlayerBtn = document.querySelector("#shuffle-btn");
    this.balancePlayerBtn = document.querySelector("#balance-btn");
    this.sortPlayerBtn = document.querySelector("#sort-btn");

    // ? Team Section
    this.teamPlayersDom = document.querySelectorAll(
      "#team-section .player-item"
    );
    this.firstTeamPlayerDom = document.querySelectorAll(
      "#team-1-players .player-item"
    );
    this.firstTeamAvgDom = document.querySelector("#team-1-avg");
    this.secondTeamPlayerDom = document.querySelectorAll(
      "#team-2-players .player-item"
    );
    this.secondTeamAvgDom = document.querySelector("#team-2-avg");
    this.copyBtns = document.querySelectorAll(".copy-btn");

    // ? Modal section
    this.findPlayerInput = document.getElementById("findPlayerInput");
    this.findPlayerSubmit = document.getElementById("findPlayerSubmit");

    this.editMmrModal = document.getElementById("player-mmr-modal");
    this.editMmrModalSubmit = document.getElementById("edit-mmr-btn");
  }

  bindEvents() {
    // ? Player Listing section
    this.playerForm.btn.addEventListener(
      "click",
      this.createNewPlayer.bind(this)
    );
    this.playerListingDom.forEach((item) => {
      item.addEventListener("click", this.removePlayer.bind(this));
    });
    this.playerListingMmr.forEach((item) => {
      item.addEventListener("click", this.setMmr.bind(this));
    });
    this.shufflePlayerBtn.addEventListener(
      "click",
      this.shufflePlayer.bind(this)
    );
    this.sortPlayerBtn.addEventListener("click", this.sortPlayer.bind(this));
    this.balancePlayerBtn.addEventListener(
      "click",
      this.balancePlayer.bind(this)
    );

    // ? Team Section
    this.copyBtns.forEach((btn) => {
      btn.addEventListener("click", this.copyTeamToClipboard.bind(this));
    });
    this.teamPlayersDom.forEach((playerDom) => {
      playerDom.addEventListener("click", this.swapPlayers.bind(this));
    });

    // ? Modal Section
    this.findPlayerSubmit.addEventListener(
      "click",
      this.insertFoundPlayer.bind(this)
    );

    this.editMmrModalSubmit.addEventListener("click", this.saveMmr.bind(this));

    this.focusInputOnModalOpen();
  }

  bindAutoComplete() {
    const playerNames = REGULAR_PLAYERS.map((player) => player.name);
    autocomplete(this.findPlayerInput, playerNames);
  }

  // DOM RENDERING

  renderPlayersListing() {
    this.playerListingDom.forEach((item) => {
      const getIdDOM = item.querySelector(".player-id");
      const getNameDOM = item.querySelector(".player-name");
      const getRankDOM = item.querySelector(".player-rank");
      const getActionContainer = item.querySelector(".action");

      getActionContainer.style.visibility = "hidden";
      getIdDOM.value = "";
      getNameDOM.textContent = "";
      getRankDOM.textContent = ``;
    });

    this.playerList.players.forEach((player, index) => {
      const getRowDOM = this.playerListingDom[index];
      const getIdDOM = getRowDOM.querySelector(".player-id");
      const getNameDOM = getRowDOM.querySelector(".player-name");
      const getRankDOM = getRowDOM.querySelector(".player-rank");
      const getActionContainer = getRowDOM.querySelector(".action");

      getActionContainer.style.visibility = "visible";
      getIdDOM.value = player.id;
      getNameDOM.textContent = player.name;
      getRankDOM.textContent = player.mmr;
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
      const getIndex = this.playerList.players.findIndex(
        (el) => el.id === player.id
      );
      const getIndexDom = getRowDOM.querySelector(".player-index");

      getIdDOM.value = player.id;
      getNameDOM.textContent = player.name;
      getRankDOM.textContent = player.mmr;
      getIndexDom.textContent = +getIndex + 1;
    });

    this.secondTeamAvgDom.textContent = this.secondTeam.avgMMR;
    this.secondTeam.players.forEach((player, index) => {
      const getRowDOM = this.secondTeamPlayerDom[index];
      const getIdDOM = getRowDOM.querySelector(".player-id");
      const getNameDOM = getRowDOM.querySelector(".player-name");
      const getRankDOM = getRowDOM.querySelector(".player-rank");
      const getIndex = this.playerList.players.findIndex(
        (el) => el.id === player.id
      );
      const getIndexDom = getRowDOM.querySelector(".player-index");

      getIdDOM.value = player.id;
      getNameDOM.textContent = player.name;
      getRankDOM.textContent = player.mmr;
      getIndexDom.textContent = +getIndex + 1;
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

  removePlayer({ target }) {
    if (!target.classList.contains("delete-btn")) return;

    const playerRow = target.parentElement.parentElement;
    const getId = playerRow.querySelector(".player-id")?.value;

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

  sortPlayer() {
    this.playerList.sortPlayer();
    this.renderPlayersListing();
  }

  balancePlayer() {
    if (this.playerList.players.length < 10) {
      this.renderError("shuffle-error", "Not enough player!");
      return;
    }

    const [firstTeamPlayers, secondTeamPlayers] =
      this.playerList.balancePlayer();

    if (!firstTeamPlayers?.length || !secondTeamPlayers?.length) {
      this.renderError("shuffle-error", "No balanced variations found!");
      return;
    }

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

  swapPlayers({ currentTarget }) {
    // Guard clause
    if (!currentTarget.querySelector(".player-id").value) return;

    // Get selected player data
    const targetPlayerId = currentTarget.querySelector(".player-id").value;
    const selectedPlayerTeam =
      currentTarget.dataset.team === TEAM_DATASET.one
        ? this.firstTeam
        : this.secondTeam;

    // Selecting First Player
    if (!this.swapPlayerTemp) {
      this.swapPlayerTempDom = currentTarget;
      this.swapPlayerTempDom.classList.add("selectedRow");
      this.swapPlayerTemp = selectedPlayerTeam.getPlayerData(targetPlayerId);
      this.swapPlayerTempTeam = selectedPlayerTeam;
      return;
    }

    // Reset swap if same player is selected twice
    if (targetPlayerId === this.swapPlayerTemp.id) {
      this.resetSwap();
      return;
    }

    // Set the second player
    this.swapPlayerTempDomTwo = currentTarget;
    this.swapPlayerTempTwo = selectedPlayerTeam.getPlayerData(targetPlayerId);
    this.swapPlayerTempTwoTeam = selectedPlayerTeam;

    // Reset swap if players from the same teams are selected twice
    if (this.swapPlayerTempTeam === this.swapPlayerTempTwoTeam) {
      this.resetSwap();
      return;
    }

    // Get team data
    this.swapPlayerTempTeam.swapPlayer(
      this.swapPlayerTemp,
      this.swapPlayerTempTwo
    );
    this.swapPlayerTempTwoTeam.swapPlayer(
      this.swapPlayerTempTwo,
      this.swapPlayerTemp
    );

    // Render New Teams
    this.renderTeams();

    // Reset everything after swapping
    this.resetSwap();
  }

  resetSwap() {
    this.swapPlayerTempDom?.classList.remove("selectedRow");
    this.swapPlayerTempTwoDom?.classList.remove("selectedRow");

    this.swapPlayerTemp = null;
    this.swapPlayerTempTwo = null;
    this.swapPlayerTempDom = null;
    this.swapPlayerTempTwoDom = null;
    this.swapPlayerTempTeam = null;
    this.swapPlayerTempTwoTeam = null;
  }

  insertFoundPlayer(event) {
    const findPlayer = REGULAR_PLAYERS.find(
      (player) => player.name === this.findPlayerInput.value
    );
    this.createNewPlayer(event, findPlayer);
    this.findPlayerInput.value = "";
    $("#findPlayerInput").focus();
  }

  setMmr({ target }) {
    const parent = target.parentElement.parentElement;
    const mmr = target.textContent;
    const name = parent.querySelector(".player-name")?.textContent;
    const id = parent.querySelector(".player-id")?.value;

    const modal = this.editMmrModal;
    modal.querySelector("#player-mmr-modal-label").textContent = name;
    modal.querySelector("#edit-player-mmr").value = mmr;
    modal.querySelector("#edit-player-id").value = id;
  }

  saveMmr() {
    const modal = this.editMmrModal;
    const mmr = modal.querySelector("#edit-player-mmr").value;
    const id = modal.querySelector("#edit-player-id").value;

    const getPlayer = this.playerList.findPlayer(id);
    getPlayer.setMmr(mmr);
    this.renderPlayersListing();
    $("#player-mmr-modal").modal("toggle");
  }

  focusInputOnModalOpen() {
    $("#player-mmr-modal").on("shown.bs.modal", function () {
      $("#edit-player-mmr").focus();
    });
    $("#find-player-modal").on("shown.bs.modal", function () {
      $("#findPlayerInput").focus();
    });
  }
}

const app = new Main();
app.init();
