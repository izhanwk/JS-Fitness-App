let selectButton = document.querySelector(".searchbar");
let searchMenu = document.querySelector(".menu");
let downButton = document.querySelector(
  "#container #calculator2 .selectsearch .fa-caret-down"
);
let options = document.querySelector(".options");
let fSelect = document.querySelector("#fSelect");
let sInput = document.querySelector("input");
let meterCover = document.querySelector(".metercover");
let sizeInput = document.querySelector("#sizeInput");
let addBtn = document.querySelector(".add");
let meterCover2 = document.querySelector("#metercover2");
let fill = document.querySelector(".fill");
let fill2 = document.querySelector(".fill2");
let meterCon = document.querySelector(".metercon");
let meterCon2 = document.querySelector(".metercon2");
let reset = document.querySelector("#reset");

// let genderValue = localStorage.getItem("gendervalue");
let goalValue = localStorage.getItem("goalValue");
let minforgain = localStorage.getItem("minforgain");
let maxforgain = localStorage.getItem("maxforgain");
let proteinReq = localStorage.getItem("proteinReq");
let minforloss = localStorage.getItem("minforloss");
let maxforloss = localStorage.getItem("maxforloss");

console.log(minforloss);
console.log(maxforloss);

let turn = "x";
let arr = [];

let proteinS = 0;
let caloriesS = 0;
let sizeS = "";

let proteinC = 0;
let caloriesC = 0;
let sizeC = 0;

let quantity = 1;
let calorieGraph = 0;
let proteinGraph = 0;

let notice = `<p class="caloric-notice">Your caloric goal is completed. You can take up to ${Math.round(
  maxforgain
)} calories for your goal.</p>`;
let notice2 = `<p class="protein-notice">Your protein requirement is completed.</p>`;

intialValues();

sizeInput.addEventListener("keydown", (e) => {
  if (["+", "-"].includes(e.key)) {
    e.preventDefault();
  }
});

for (let item of foodItems) {
  let list = `<li onclick=updateName(this)>${item}</li>`;
  options.insertAdjacentHTML("beforeend", list);
}

sInput.addEventListener("keyup", () => {
  let enteredValue = sInput.value.toLowerCase();
  arr = foodItems
    .filter((data) => {
      return data.toLowerCase().startsWith(enteredValue);
    })
    .map((data) => `<li onclick=updateName(this)>${data}</li>`)
    .join("");
  options.innerHTML = arr ? arr : `<p id="warning">Oops!! Food not found</p>`;
});

function updateName(upd) {
  searchMenu.classList.remove("hidden");
  fSelect.innerText = upd.innerText;
  console.log(upd.innerText);
  downButton.style.transform = "rotate(0deg)";
  if (foodData[fSelect.innerText]) {
    caloriesS = foodData[fSelect.innerText].calories;
    proteinS = foodData[fSelect.innerText].protein;
    sizeS = foodData[fSelect.innerText].size;
  }
  turn = "x";
}

function nutrical() {
  let roundOff = Math.round(quantity);
  proteinC += Math.round(proteinS * roundOff);
  caloriesC += Math.round(caloriesS * roundOff);
  console.log(proteinC);
  console.log(caloriesC);
}
function nutrical2() {
  // to show updated scores on screen
  if (goalValue == "musclegain") {
    writeValues(caloriesC, proteinC);
  } else {
    writeValues(caloriesC, proteinC);
  }
  // to show the movement of meter
  if (goalValue == "musclegain") {
    turning(maxforgain);
  } else {
    turning(minforloss);
  }

  if (goalValue == "musclegain") {
    if (caloriesC >= minforgain && !meterCon.querySelector(".caloric-notice")) {
      meterCon.insertAdjacentHTML("beforeend", notice);
    }

    if (proteinC >= proteinReq && !meterCon2.querySelector(".protein-notice")) {
      meterCon2.insertAdjacentHTML("beforeend", notice2);
    }
    graph();
    if (caloriesC >= maxforgain) {
      let existingNotice = document.querySelector(".caloric-notice");
      if (existingNotice) {
        existingNotice.remove();
      }

      let noticefull = document.createElement("p");
      graph();
      noticefull.classList.add("caloric-notice");
      noticefull.textContent = `Your caloric limit has reached. Consuming more may lead to unncecessary fatgain`;
      meterCon.appendChild(noticefull);
    }
  } else {
    if (caloriesC >= maxforloss && !meterCon.querySelector(".caloric-notice")) {
      let notice = `<p class="caloric-notice">Your caloric goal is completed. You can take up to ${Math.round(
        minforloss
      )} calories for your goal.</p>`;
      meterCon.insertAdjacentHTML("beforeend", notice);
    }

    if (proteinC >= proteinReq && !meterCon2.querySelector(".protein-notice")) {
      let notice2 = `<p class="protein-notice">Your protein requirement is completed.</p>`;
      meterCon2.insertAdjacentHTML("beforeend", notice2);
    }

    if (caloriesC >= minforloss) {
      let existingNotice = document.querySelector(".caloric-notice");
      if (existingNotice) {
        existingNotice.remove();
      }

      let noticefull = document.createElement("p");
      graph();
      noticefull.classList.add("caloric-notice");
      noticefull.textContent = `Your caloric limit for fatloss has reached`;
      meterCon.appendChild(noticefull);
    }
  }
}

selectButton.addEventListener("click", () => {
  searchMenu.classList.toggle("hidden");
  fSelect.innerText = "Select Food";
  sInput.value = "";
  options.innerHTML = foodItems
    .map((data) => `<li onClick=updateName(this)>${data}</li>`)
    .join("");

  if (turn == "x") {
    downButton.style.transform = "rotate(180deg)";
    turn = "y";
  } else {
    downButton.style.transform = "rotate(0deg)";
    turn = "x";
  }
});

sizeInput.addEventListener("input", (e) => {
  quantity = e.target.value;
});

addBtn.addEventListener("click", (e) => {
  nutrical();
  console.log(`calories : ${caloriesC}  protein : ${proteinC}`);
  if (caloriesC > 99999 || proteinC > 99999) {
    addBtn.disabled = true;
    alert("Enter some valid amount");
    nutrical();
    console.log(`quantity = ${quantity}`);
    caloriesC = 0;
    proteinC = 0;
  } else {
    addBtn.disabled = false;
    // nutrical();
    nutrical2();
  }
});

reset.addEventListener("click", () => {
  intialValues();
  caloriesC = 0;
  proteinC = 0;
  fill.style.transform = `rotate(0turn)`;
  fill2.style.transform = `rotate(0turn)`;
  quantity = 1;
  sizeInput.value = "";
});

function graph() {
  if (calorieGraph <= 0.5) {
    fill.style.transform = `rotate(${calorieGraph}turn)`;
  } else {
    fill.style.transform = "rotate(0.5turn)";
  }

  if (proteinGraph <= 0.5) {
    fill2.style.transform = `rotate(${proteinGraph}turn)`;
  } else {
    fill2.style.transform = "rotate(0.5turn)";
  }
}

function writeValues(calories, protein) {
  if (goalValue == "musclegain") {
    let totalCalorie = `<p class="numbers">${calories}/${Math.round(
      maxforgain
    )}</p>`;

    let calorieHeading = `<p class="Calories">Calories</p>`;
    meterCover.innerHTML = totalCalorie + calorieHeading;

    let totalProtein = `<p class="numbers">${protein}/${Math.round(
      proteinReq
    )}</p>`;
    let proteinHeading = `<p class="Calories">Protein (grams)</p>`;
    meterCover2.innerHTML = totalProtein + proteinHeading;
  } else {
    let totalCalorie = `<p class="numbers">${calories}/${Math.round(
      minforloss
    )}</p>`;

    let calorieHeading = `<p class="Calories">Calories</p>`;
    meterCover.innerHTML = totalCalorie + calorieHeading;

    let totalProtein = `<p class="numbers">${protein}/${Math.round(
      proteinReq
    )}</p>`;
    let proteinHeading = `<p class="Calories">Protein (grams)</p>`;
    meterCover2.innerHTML = totalProtein + proteinHeading;
  }
}

function turning(e) {
  calorieGraph = (caloriesC / e) * 0.5;
  proteinGraph = (proteinC / proteinReq) * 0.5;

  if (calorieGraph <= 0.5) {
    fill.style.transform = `rotate(${calorieGraph}turn)`;
  }
  if (proteinGraph <= 0.5) {
    fill2.style.transform = `rotate(${proteinGraph}turn)`;
  } else {
    fill.style.transform = "rotate(0.5turn)";
  }
}

function intialValues() {
  if (goalValue == "musclegain") {
    let reqCalories = `<p class="numbers">0/${Math.round(maxforgain)}</p>`;
    let calorieH = `<p class="Calories">Calories</p>`;
    meterCover.innerHTML = reqCalories + calorieH;

    let reqProtein = `<p class="numbers">0/${Math.round(proteinReq)}</p>`;
    let proteinH = `<p class="Calories">Protein (grams)</p>`;
    meterCover2.innerHTML = reqProtein + proteinH;
  } else {
    let reqCalories = `<p class="numbers">0/${Math.round(minforloss)}</p>`;
    let calorieH = `<p class="Calories">Calories</p>`;
    meterCover.innerHTML = reqCalories + calorieH;

    let reqProtein = `<p class="numbers">0/${Math.round(proteinReq)}</p>`;
    let proteinH = `<p class="Calories">Protein (grams)</p>`;
    meterCover2.innerHTML = reqProtein + proteinH;
  }
}
