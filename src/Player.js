const uniqid = require("uniqid");
export default class Player {
  constructor(name, mmr) {
    this.id = uniqid();
    this.name = name;
    this.mmr = mmr;
  }

  setMmr(newVal) {
    if(isNaN(+newVal)) return;

    this.mmr = +newVal;
  }
}
