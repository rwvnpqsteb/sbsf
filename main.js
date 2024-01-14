// main.js

const audioDirectory = "sounds/";

const sounds = dynamicSoundData.map(sound => [sound]);

const buttons = document.getElementById("buttons");
const audio = document.getElementById("audio");
const fragment = document.createDocumentFragment();
let activeSound = null;
let timer = 0;
let clicked = false;

sounds.forEach(function (sound, index) {
    const item = createItem(sound[0]);
    fragment.appendChild(item);
});

buttons.appendChild(fragment);

function createItem(sound) {
    const item = createElement("div", { className: "item" });
    const buttonWrapper = createElement("div", { className: "button" });
    const buttonBackground = createElement("div", { className: "button-background" });
    const button = document.createElement("button");
    const label = createElement("div", {
        className: "label",
        innerText: sound
    });
    button.dataset.fileName = getFilename(sound);
    // Menggunakan warna yang telah diacak
    buttonBackground.style.backgroundColor = getRandomColor();
    button.addEventListener("click", handleButtonClick);
    appendChildren(buttonWrapper, buttonBackground, button);
    appendChildren(item, buttonWrapper, label);
    return item;
}

function getRandomColor() {
    // Daftar warna yang sesuai dengan urutan sound
    const yourColors = [
        "red", "yellow", "brown", "silver", "purple", "blue", "cyan", "lightgreen", "orange", "maroon", "gold"
        // ... tambahkan warna lain sesuai keinginan Anda
    ];

    return yourColors[Math.floor(Math.random() * yourColors.length)];
}

function createElement(tagName, attributes) {
    const element = document.createElement(tagName);
    for (const attribute in attributes) {
        if (attributes.hasOwnProperty(attribute)) {
            element[attribute] = attributes[attribute];
        }
    }
    return element;
}

function appendChildren(parent, ...children) {
    children.forEach(function (child) {
        parent.appendChild(child);
    });
}

function getFilename(sound) {
    return sound.toLowerCase().replace(/[?!',.]/g, "").replace(/ /g, "-");
}

function handleButtonClick(e) {
    const fileName = e.target.dataset.fileName;

    if (clicked) {
        clearTimeout(timer);
        downloadSound(fileName);
        clicked = false;
    } else {
        clicked = true;
        timer = setTimeout(function () {
            playSound(fileName);
            clicked = false;
        }, 200);
    }
}

function playSound(sound) {
    if (activeSound) {
        activeSound.pause();
        activeSound.currentTime = 0;
    }

    audio.src = `${audioDirectory}${sound}.mp3`;
    audio.play();
    activeSound = audio;
}

function downloadSound(sound) {
    const dl = document.createElement("a");
    dl.href = `${audioDirectory}${sound}.mp3`;
    dl.download = `${sound}.mp3`;
    dl.style.display = "none";
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
}
