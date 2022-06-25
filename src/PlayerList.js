import { getRandomInt } from "./utils/common";

export default class PlayerList {
  constructor() {
    if (PlayerList._instance) {
      return PlayerList._instance;
    }
    PlayerList._instance = this;

    this.players = [];
  }

  addPlayer(player) {
    this.players.push(player);
  }

  removePlayer(playerId) {
    this.players = this.players.filter((player) => player.id !== playerId);
  }

  findPlayer(playerId) {
    return this.players.find((player) => player.id == playerId);
  }

  sortPlayer() {
    this.players.sort((a, b) => b.mmr - a.mmr);
  }

  shufflePlayer() {
    const sortedPlayers = this.players.sort((a, b) => b.mmr - a.mmr);

    const firstTeam = [];
    const secondTeam = [];

    sortedPlayers.forEach((player, index) => {
      const getTeam = getRandomInt(1, 2);

      if (index % 2 === 0) {
        getTeam === 1 ? firstTeam.push(player) : secondTeam.push(player);
      } else {
        firstTeam.length > secondTeam.length
          ? secondTeam.push(player)
          : firstTeam.push(player);
      }
    });

    return [firstTeam, secondTeam];
  }

  // This is a variation of shufflePlayer
  // it tries to find the smallest diff instead of completely random
  balancePlayer() {
    let firstTeam = [];
    let secondTeam = [];
    let targetDiff = 750;

    for (let i = 0; i < 100; i++) {
      const [first, second] = this.shufflePlayer();
      const diff = Math.abs(
        first.reduce((a, b) => a + b.mmr, 0) / first.length -
          second.reduce((a, b) => a + b.mmr, 0) / second.length
      );

      if (diff < targetDiff) {
        targetDiff = diff;
        firstTeam = first;
        secondTeam = second;
      }
    }

    return [firstTeam, secondTeam];
  }
}
