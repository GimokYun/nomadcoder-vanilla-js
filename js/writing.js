const welcomeMessage = document.querySelector("#welcome-message");
let typingText = "Welcome to Wave.";
typingText = typingText.split("");

let index = 0;

let typeInterval = setInterval(typing, 100);

function typing() {
    if (index < typingText.length) {
        welcomeMessage.append(typingText[index]);
        index++;
    } else {
        clearInterval(typeInterval);
    }
}