document.addEventListener("DOMContentLoaded", () => {
  let age = parseFloat(localStorage.getItem("age"));
  let weight = parseFloat(localStorage.getItem("weight"));
  let height = parseFloat(localStorage.getItem("height"));
  let genderValue = localStorage.getItem("gendervalue");
  let goalValue = localStorage.getItem("goalValue");

  // let sbtn1 = document.querySelector("#sendatory")
  // let sbtn2 = document.querySelector("#lightlyactive")
  // let sbtn3 = document.querySelector("#moderatelyactive")
  // let sbtn4 = document.querySelector("#veryactive")
  // let sbtn5 = document.querySelector("#superactive")

  let bmrValue = 0;
  let maintainCalorie = 0;

  let minforgain = 0;
  let maxforgain = 0;

  let minforloss = 0;
  let maxforloss = 0;

  let proteinReq = 0;

  let sbtn = document.querySelectorAll(".boxes");
  sbtn.forEach((e) => {
    e.addEventListener("click", () => {
      let eValue = parseFloat(e.getAttribute("data-value"));
      caloriemaintain(eValue);
      if (goalValue == "musclegain") {
        minforgain = Math.round(maintainCalorie + 250);
        maxforgain = Math.round(maintainCalorie + 500);
        localStorage.setItem("minforgain", minforgain);
        localStorage.setItem("maxforgain", maxforgain);
        console.log(`min ${minforgain}`);
        console.log(`max ${maxforgain}`);
        window.location.replace("page3.html");
      }
      if (goalValue == "fatloss") {
        minforloss = maintainCalorie - 250;
        maxforloss = maintainCalorie - 500;
        localStorage.setItem("minforloss", minforloss);
        localStorage.setItem("maxforloss", maxforloss);
        console.log(`min ${minforloss}`);
        console.log(`max ${maxforloss}`);
        window.location.replace("page3.html");
      }
    });
  });

  let heightCM = height * 30.48;
  let BMR = 0;

  if (genderValue == "male") {
    BMR = 10 * weight + 6.25 * heightCM - 5 * age + 5;
    console.log(BMR);
    bmrValue = BMR;
  }

  if (genderValue == "female") {
    BMR = 10 * weight + 6.25 * heightCM - 5 * age - 161;
    console.log(BMR);
    bmrValue = BMR;
  }

  function caloriemaintain(activity) {
    let calCalorieMaintain = BMR * activity;
    maintainCalorie = calCalorieMaintain;
    console.log(`maintaining calories : ${maintainCalorie}`);
  }

  if (genderValue == "male") {
    proteinReq = 1.6 * weight;
    localStorage.setItem("proteinReq", proteinReq);
  } else {
    proteinReq = 1.2 * weight;
    localStorage.setItem("proteinReq", proteinReq);
  }
});
