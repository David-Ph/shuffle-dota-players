export default class Team {
  constructor(players) {
    this.players = players;
    this.avgMMR = players.reduce((a, b) => a + b.mmr, 0) / players.length;
  }
}
