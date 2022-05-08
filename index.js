const playerForm = document.querySelector("#player_form");
const playersListBlock = document.querySelector("#players_list");
const shuffleBtn = document.querySelector("#shuffle-btn");
const errorMsg = document.querySelector("#error");
const firstTeamBlock = document.querySelector("#team_1");
const secondTeamBlock = document.querySelector("#team_2");
const team1AvgBlock = document.querySelector("#team_1_avg");
const team2AvgBlock = document.querySelector("#team_2_avg");
const playerNumbersBlock = document.querySelector("#player_number");

const playersList = [];

playerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newPlayer = {};
  for (var i = 0; i < e.target.elements.length; i++) {
    var item = e.target.elements.item(i);
    newPlayer[item.name] = item.value;
  }

  const mmr = MMR_NUMBER[`${newPlayer.player_medal} ${newPlayer.medal_star}`];

  playersList.push({
    mmr: mmr,
    ...newPlayer,
  });

  const playerHtml = document.createElement("p");
  playerHtml.textContent = `
  Name: ${newPlayer.player_name} Rank: ${newPlayer.player_medal} ${newPlayer.medal_star}`;

  playersListBlock.append(playerHtml);
  playerNumbersBlock.textContent = playersList.length;
});

shuffleBtn.addEventListener("click", (e) => {
  if (playersList.length < 10) {
    errorMsg.textContent = "Not enough players! Minimum 10";
    return;
  }

  firstTeamBlock.textContent = "";
  secondTeamBlock.textContent = "";
  errorMsg.textContent = "";

  const sortedPlayers = playersList.sort((a, b) => b.mmr - a.mmr);

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

  firstTeam.forEach((player) => {
    const playerHtml = document.createElement("p");
    playerHtml.textContent = `
  Name: ${player.player_name} Rank: ${player.player_medal} ${player.medal_star}`;

    firstTeamBlock.append(playerHtml);

    const teamTotal = firstTeam.reduce((a, b) => a + b.mmr, 0);
    const teamAvg = teamTotal / firstTeam.length;
    team1AvgBlock.textContent = teamAvg;
  });

  secondTeam.forEach((player) => {
    const playerHtml = document.createElement("p");
    playerHtml.textContent = `
  Name: ${player.player_name} Rank: ${player.player_medal} ${player.medal_star}`;

    secondTeamBlock.append(playerHtml);
    const teamTotal = secondTeam.reduce((a, b) => a + b.mmr, 0);
    const teamAvg = teamTotal / secondTeam.length;
    team2AvgBlock.textContent = teamAvg;
  });
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
