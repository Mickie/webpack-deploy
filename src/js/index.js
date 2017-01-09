import MyBtn from './common';
import '../css/main.css';

let btn = new MyBtn('gosub');

btn.on("click", () => {
    location.pathname = "/sub.html";
});






