import MyBtn from "./common";

let btn = new MyBtn('gohome');

btn.on("click",()=>{
    location.pathname ="/index.html";
});
