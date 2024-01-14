// main.js

const audioDirectory = "sounds/";

function initializeSoundboard() {
    const buttonsContainer = document.getElementById("buttons");
    const audio = document.getElementById("audio");

    dynamicSoundData.forEach(function (sound) {
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button");

        const button = document.createElement("button");
        button.textContent = sound;
        button.addEventListener("click", function () {
            playSound(sound);
        });

        buttonContainer.appendChild(button);
        buttonsContainer.appendChild(buttonContainer);
    });

    function playSound(sound) {
        audio.src = `${audioDirectory}${sound}.mp3`;
        audio.play();
    }
}

initializeSoundboard();
