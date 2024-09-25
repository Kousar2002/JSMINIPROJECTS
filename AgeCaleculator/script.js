var birthdate=document.getElementById("birthdate");
var btn=document.getElementById("btn");
var para=document.getElementsByClassName("para")[0];
function getAge(){
    birthValue=birthdate.value;
    if(birthValue===""){
        alert("Please Enter your age");
    }else{
        const age=getCalculateAge(birthValue);
        para.innerText=`your age is ${age}`
    }
}
function getCalculateAge(birthValue){
    let date=new Date();
    let birth=new Date(birthValue);
    let Age=date.getFullYear()-birth.getFullYear();
    let month=date.getMonth()-birth.getMonth();
    if(month<0 || (month===0 && date.getDate()<birth.getDate())){
        Age--;
    }
    return Age;
    console.log(Age);
}
btn.addEventListener("click",getAge);
