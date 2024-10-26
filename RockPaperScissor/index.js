var buttons=document.querySelectorAll("button");
var resultE=document.getElementById("result");
var user_score=document.getElementById("userscore");
var computer_score=document.getElementById("computerscore");
var resultEN=document.getElementById("resultentity");
// console.log(buttons);
const entity={
    rock:"&#x1F44A;",
    paper:"&#x1f590;",
    scissor:"&#x270c;"
};
let playerscore=0;
let computerscore=0;
buttons.forEach((button)=>{
    //  console.log(button);
    button.addEventListener("click",()=>{
        const playerselection=button.id;
        const computerselection=computerID();
        const result=playRound(playerselection,computerselection);
        console.log(result);
        resultEN.innerHTML=`<h1>${entity[playerselection]}</h1>
        <h1>${entity[computerselection]}</h1>`
        // console.log(playerselection);
        resultE.textContent=result;
    })
})
function computerID(){
    const choices=["rock","paper","scissor"];
    const randomchoice=Math.floor(Math.random()*choices.length);
    // console.log(randomchoice);
    return choices[randomchoice];
}
function playRound(playerselection,computerselection){
    if(playerselection===computerselection){
        return "IT 's tie";
    }else if((playerselection==="rock" && computerselection==="scissor")||(playerselection==="paper" && computerselection==="rock") || (playerselection==="scissor" && computerselection==="paper")){
        playerscore++;
        user_score.innerText=playerscore;
        return "your win"+playerselection+"beats"+computerselection;

    }else{
        computerscore++;
        computer_score.innerText=computerscore;
        return "you loose"+computerselection+"beats"+playerselection;
    }

}