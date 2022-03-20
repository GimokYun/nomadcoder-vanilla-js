const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const firstPage = document.querySelector(".first-page");
const mainPage = document.querySelector(".main-page");
const header = document.querySelector(".header");
const bottom = document.querySelector(".bottom");
const question = document.querySelector(".main-page__question");
const mainForm = document.querySelector(".main-page__form");
const bottomQuote = document.querySelector(".bottom__quote");
const mainList = document.querySelector(".main-page__list");
const headerPart = document.querySelector(".header");

const HIDDEN_CLASSNAME = "hidden";
const ANIMATION_CLASSNAME = "first-page__disappear";
const MAINPAGE_ANIMATION_CLASSNAME = "main-page__appear";
const QUOTE_ANIMATION_CLASSNAME = "quote__animation";
const HEADER_ANIMATION_CLASSNAME = "header__animation";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
    event.preventDefault();
    const typedUsername = loginInput.value;
    localStorage.setItem(USERNAME_KEY, typedUsername);
    firstPage.classList.add(ANIMATION_CLASSNAME);
    paintGreetings(typedUsername);
    loginInput.value="";
}

function paintGreetings(username) {
    greeting.innerText = `Hello, ${username}.`;
    mainPage.classList.remove(HIDDEN_CLASSNAME);
    header.classList.remove(HIDDEN_CLASSNAME);
    bottom.classList.remove(HIDDEN_CLASSNAME);
    greeting.classList.add(MAINPAGE_ANIMATION_CLASSNAME);
    question.classList.add(MAINPAGE_ANIMATION_CLASSNAME);
    mainForm.classList.add(MAINPAGE_ANIMATION_CLASSNAME);
    mainList.classList.add(MAINPAGE_ANIMATION_CLASSNAME);
    bottomQuote.classList.add(QUOTE_ANIMATION_CLASSNAME);
    headerPart.classList.add(HEADER_ANIMATION_CLASSNAME);

}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
    firstPage.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    paintGreetings(savedUsername);
}
