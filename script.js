const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sort = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDom();
}

function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDom();
}

function showMillioniers() {
  data = data.filter((item) => item.money > 1000000);
  updateDom();
}

function calculateWealth() {
  const wealth = data.reduce((acc, item) => (acc += item.money), 0);
  const WealthEl = document.createElement("div");
  WealthEl.innerHTML = `<h3><strong>Total Wealth: </strong>${formatMoney(
    wealth
  )}</h3>`;
  main.appendChild(WealthEl);
}

//Add new obj to data arr
function addData(obj) {
  data.push(obj);
  updateDom();
}

//update Dom
function updateDom(providedData = data) {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name.toUpperCase()}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//Format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//add event listener
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sort.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillioniers);
calculateWealthBtn.addEventListener("click", calculateWealth);
