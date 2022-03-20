const clock = document.querySelector("#clock");
const dateElement = document.querySelector("#date");

const daysList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; 

function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    clock.innerText = `${hours}:${minutes}:${seconds}`;

    const years = String(date.getFullYear());
    const months = String(date.getMonth()+1).padStart(2, "0");
    const dates = String(date.getDate()).padStart(2, "0");
    const days = daysList[String(date.getDay())];
    dateElement.innerText = `${years}.${months}.${dates}.${days}`;
}

getClock();
setInterval(getClock, 1000);