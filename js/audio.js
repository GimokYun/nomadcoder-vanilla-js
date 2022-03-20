const playButton = document.querySelector("#play-button");
const audioRange = document.querySelector("#audio-range input");
const volume = document.querySelector("#volume");
const current = document.querySelector("#current");
const duration = document.querySelector("#duration");

const audio = new Audio("audio/0.wav");
audio.preload = "metadata";

const PAUSE_CLASS = "fa-pause";
const PLAY_CLASS = "fa-play";
const MUTE_CLASS = "fa-volume-xmark";
const VOLUME_CLASS = "fa-volume-high";

function printDuration() {
    const durationMinute = Math.floor(audio.duration / 60);
    const durationSecond = Math.floor(audio.duration - durationMinute * 60);
    duration.innerText = `${String(durationMinute).padStart(2, "0")}:${String(durationSecond).padStart(2, "0")}`;
    audioRange.max = audio.duration;
}

function audioRangePrint() {
    const currentMinute = Math.floor(audio.currentTime / 60);
    const currentSecond = Math.floor(audio.currentTime - currentMinute * 60);
    audioRange.value = audio.currentTime;
    current.innerText = `${String(currentMinute).padStart(2, "0")}:${String(currentSecond).padStart(2, "0")}`;

    if (audio.currentTime === audio.duration) {
        playButton.classList.remove(PAUSE_CLASS);
        playButton.classList.add(PLAY_CLASS);
        audio.pause();
        audio.currentTime = 0;
    }

    const ratio = audio.currentTime / audio.duration * 100;
    audioRange.style.background = `linear-gradient(to right, white ${ratio}%, rgba(255, 255, 255, 0.3) ${ratio}%)`;
}

function playClickHandle(event) {
    const className = event.target.classList[1];

    if (className === PLAY_CLASS) {
        event.target.classList.remove(className);
        event.target.classList.add(PAUSE_CLASS);
        audio.play();
    } else {
        event.target.classList.remove(className);
        event.target.classList.add(PLAY_CLASS);
        audio.pause();
    }
}

function volumeClickHandle(event) {
    const className = event.target.classList[1];

    if (className === VOLUME_CLASS) {
        event.target.classList.remove(className);
        event.target.classList.add(MUTE_CLASS);
        audio.muted = true;
    } else {
        event.target.classList.remove(className);
        event.target.classList.add(VOLUME_CLASS);
        audio.muted = false;
    }
    console.log(audio.muted)
}

function audioRangeHandle(event) {
    const playTime = event.target.value;
    const ratio = playTime / audio.duration * 100;
    audio.currentTime = playTime;
    audioRange.style.background = `linear-gradient(to right, white ${ratio}%, rgba(255, 255, 255, 0.3) ${ratio}%)`;
}

audio.onloadedmetadata = function() {
    printDuration();
    setInterval(audioRangePrint, 100);

    if (playButton) {
        playButton.addEventListener("pointerdown", playClickHandle);
    }
    if (audioRange) {
        audioRange.addEventListener("input", audioRangeHandle);
    }
    if (volume) {
        volume.addEventListener("pointerdown", volumeClickHandle);
    }
};