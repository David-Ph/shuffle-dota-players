export default class Team {
  constructor(players) {
    this.players = players;
    this.avgMMR = players.reduce((a, b) => a + b.mmr, 0) / players.length;
  }

  getPlayerData(id) {
    return this.players.find((player) => player.id == id);
  }

  getPlayerNames() {
    return this.players.map((player) => player.name);
  }

  swapPlayer(targetPlayer, newPlayer) {
    this.players = this.players.map((player) => {
      if (player.id === targetPlayer.id) {
        return newPlayer;
      }
      return player;
    });
    console.log(this.players);
    this.avgMMR = this.players.reduce((a, b) => a + b.mmr, 0) / this.players.length;
  }
}
