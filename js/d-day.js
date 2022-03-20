const dDayPopUp = document.querySelector(".d-day__popup");
const dDayList = document.querySelector("#d-day-list");
const dDayForm = document.querySelector("#d-day-form");
const dateInput = document.querySelector("#d-day-form input:first-child");
const eventInput = document.querySelector("#d-day-form input:last-child");
const firstDDayDate = document.querySelector("#d-day span:first-child");
const firstDDayEvent = document.querySelector("#d-day span:last-child");

let dDays = [];
const DDAYS_KEY = "ddays";
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function printFirstDDay() {
    if (dDays.length !== 0) {
        const today = new Date();
        let dateFirst = dDays[0].date;
        dateFirst = dateFirst.split("/");
        const date = new Date(`${month[parseInt(dateFirst[1])]} ${dateFirst[2]}, ${dateFirst[0]}`);
        let dDay = Math.floor((date - today) / (24 * 60 * 60 * 1000));
        if (dDay === 0) {
            dDay = "Day";
        }
        firstDDayDate.innerText = `D-${dDay}`;
        firstDDayEvent.innerText = dDays[0].event;
    } else {
        firstDDayDate.innerText = "D-Day";
        firstDDayEvent.innerText = "Event";
    }
}

function saveDDays() {
    localStorage.setItem(DDAYS_KEY, JSON.stringify(dDays));
}

function deleteDDay(event) {
    const liToDelete = event.target.parentElement;
    liToDelete.remove();
    dDays = dDays.filter((objToDelete) => objToDelete.id !== parseInt(liToDelete.id));
    saveDDays();
}

function paintDDay(newDDay) {
    const newDDayLi = document.createElement("li");
    const newDDayDate = document.createElement("span");
    const newDDayEvent = document.createElement("span");
    const deleteBtn = document.createElement("button");
    deleteBtn.addEventListener("click", deleteDDay);

    const today = new Date();
    let dateChosen = newDDay.date;
    dateChosen = dateChosen.split("/");
    const date = new Date(`${month[parseInt(dateChosen[1])]} ${dateChosen[2]}, ${dateChosen[0]}`);
    let dDay = Math.floor((date - today) / (24 * 60 * 60 * 1000));
    if (dDay === 0) {
        dDay = "Day";
    }

    newDDayLi.id = newDDay.id;
    newDDayLi.classList.add("d-day__li");
    newDDayEvent.innerText = newDDay.event;
    newDDayDate.innerText = `D-${dDay}`;
    deleteBtn.innerText = "X";

    newDDayLi.appendChild(deleteBtn);
    newDDayLi.appendChild(newDDayEvent);
    newDDayLi.appendChild(newDDayDate);
    dDayList.appendChild(newDDayLi);
}

function handleDDaySubmit(event) {
    event.preventDefault();
    const newDate = dateInput.value;
    const today = new Date();
    let dateChosen = newDate;
    dateChosen = dateChosen.split("/");
    const date = new Date(`${month[parseInt(dateChosen[1])]} ${dateChosen[2]}, ${dateChosen[0]}`);

    if(date >= today){
        const newEvent = eventInput.value;
        const newDDayObj ={
            "id" : Date.now(),
            "date" : newDate,
            "event" : newEvent
        };
        dateInput.value = "";
        eventInput.value = "";

        const gap = date - today;
        for (let i = 0 ; i < dDays.length ; i++){
            let dateInList = dDays[i].date;
            dateInList = dateInList.split("/");
            const dateToCompare = new Date(`${month[parseInt(dateInList[1])]} ${dateInList[2]}, ${dateInList[0]}`);
            const gapToCompare = dateToCompare - today;
            if (gap < gapToCompare) {
                dDays.splice(i, 0, newDDayObj);
                break;
            }
        }
        dDays.push(newDDayObj);
        paintDDay(newDDayObj);
        saveDDays();
    } else {
        const errorMessage = document.createElement("span");
        errorMessage.innerText = "Please choose a later date than today.";
        errorMessage.classList.add("remove-span");
        errorMessage.classList.add("main-page__message");
        dDayPopUp.appendChild(errorMessage);
        dateInput.value = "";
        eventInput.value = "";
    }
}

function removeMessage() {
    const spanToRemove = document.querySelector(".remove-span");
    if (spanToRemove) {
        spanToRemove.remove();
    }
}

function clickDDayHandle() {
    dDayPopUp.classList.toggle("hidden");
}

dDayForm.addEventListener("submit", handleDDaySubmit);
setInterval(removeMessage, 3000);

const savedDDays = localStorage.getItem(DDAYS_KEY);

if (savedDDays != null) {
    const parsedDDays = JSON.parse(savedDDays);
    dDays = parsedDDays;
    parsedDDays.forEach(paintDDay);
}

printFirstDDay();
setInterval(printFirstDDay, 100);

firstDDayDate.addEventListener("click", clickDDayHandle);
firstDDayEvent.addEventListener("click", clickDDayHandle);