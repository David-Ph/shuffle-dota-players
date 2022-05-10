const uniqid = require("uniqid");
export default class Player {
  constructor(name, mmr) {
    this.id = uniqid();
    this.name = name;
    this.mmr = mmr;
  }
}
