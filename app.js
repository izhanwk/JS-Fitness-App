document.addEventListener("DOMContentLoaded", () => {
let inputs = document.querySelectorAll("#container #calculator input");
let input1 = document.querySelector("#in1");
let input2 = document.querySelector("#in2");
let input3 = document.querySelector("#in3");
let gender = document.querySelectorAll('input[name="gender"]');
let goal = document.querySelectorAll('input[name="goal"]');
let btn1 = document.querySelector("#container #calculator #btn1");
let para1 = document.querySelector("#p1");
let para2 = document.querySelector("#p2");
let para3 = document.querySelector("#p3");
let para4 = document.querySelector("#p4");
let para5 = document.querySelector("#p5");
let form1 = document.querySelector("#f1");
let form2 = document.querySelector("#f2");
let arr1 = [];

let age=0;
let weight=0;
let height=0;
let genderValue="";
let goalValue="";



inputs.forEach((input)=>{
    input.addEventListener("keydown",(e)=>{
        if(["+","-"].includes(e.key)){
            e.preventDefault();
        }
    })
})



input1.addEventListener("input", (e)=>{
    if(e.target.value<=0){
        input1.style.border="2px Solid Red";
        para1.style.display="block";
    }else{
    resetStyles(input1,para1)
    }
})

input2.addEventListener("input", (e)=>{
    if(e.target.value<=0){
        input2.style.border="2px Solid Red";
        para2.style.display="block";
    }else{
    resetStyles(input2,para2)
    }
})

input3.addEventListener("input", (e)=>{
    if(e.target.value<=0){
        input3.style.border="2px Solid Red";
        para3.style.display="block";
    }else{
    resetStyles(input3,para3)
    }
})

gender.forEach((e)=>{
    e.addEventListener("change",()=>{
        resetStyles(form1,para4)
    });
})

goal.forEach((e)=>{
    e.addEventListener("change",()=>{
        resetStyles(form2,para5)
    });
})

input1.addEventListener("input",(e)=>{
    age=Number(e.target.value)
})

input2.addEventListener("input", (e)=>{
    weight=Number(e.target.value);
})

input3.addEventListener("input", (e)=>{
    height=Number(e.target.value);
})

gender.forEach((e)=>{
    e.addEventListener("change",(ch)=>{
        genderValue = ch.target.value
    })
})

goal.forEach((e)=>{
    e.addEventListener("change",(ch)=>{
        goalValue = ch.target.value;
    })
})

btn1.addEventListener("click", (e)=>{
if(age<=0 || weight<=0 || height<=0 || genderValue=="" || goalValue==""){

    check("2px solid Red", "block")

}

else{
    check("none", "none")
    arr1.push(age);
    arr1.push(weight);
    arr1.push(height);
    arr1.push(genderValue);
    arr1.push(goalValue);
    localStorage.setItem("age", age);
    localStorage.setItem("weight", weight);
    localStorage.setItem("height", height);
    localStorage.setItem("gendervalue", genderValue);
    localStorage.setItem("goalValue", goalValue);

    window.location.replace("page2.html");
    console.log("Age:", age);
    console.log("Weight:", weight);
    console.log("Height:", height);
    console.log("Gender:", genderValue);
    console.log("Goal:", goalValue);

}



})

function check(value1, value2){
    if(age<=0){
        input1.style.border = value1;
        para1.style.display = value2;
    }else{
        input1.style.border = "none";
        para1.style.display = "none";
    }

    if(weight<=0){
        input2.style.border = value1;
        para2.style.display = value2;  
    }else{
        input2.style.border = "none";
        para2.style.display = "none";
    }

    if(height<=0){
        input3.style.border = value1;
        para3.style.display = value2;
    }else{
        input3.style.border = "none";
        para3.style.display = "none";
    }
    
    if(genderValue==""){
        form1.style.border = value1;
        para4.style.display = value2;
    }else{
        form1.style.border = "none";
        para4.style.display = "none";
    }

    if(goalValue==""){
        form2.style.border = value1;
        para5.style.display = value2;
    }else{
        form2.style.border = "none";
        para5.style.display = "none";
    }
    
}

function resetStyles(v1,v2){
    v1.style.border = "none";
    v2.style.display = "none";
    
}
})

