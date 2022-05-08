const playerForm = document.querySelector("#player_form");

playerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const obj = {};
  for (var i = 0; i < e.target.elements.length; i++) {
    var item = e.target.elements.item(i);
    obj[item.name] = item.value;
  }

  console.log(obj);
});
