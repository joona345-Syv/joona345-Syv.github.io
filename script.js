document.addEventListener("DOMContentLoaded", () => {

    const music = document.getElementById("bgMusic");
    const button = document.getElementById("musicToggle");

    if (music && button) {

        let isMuted = localStorage.getItem("musicMuted") === "true";
        let hasStarted = localStorage.getItem("musicStarted") === "true";

        music.muted = isMuted;
        music.volume = 0.02;

        button.textContent = isMuted ? "🔇" : "🔊";

        // ✅ jos käyttäjä on jo kerran käynnistänyt musiikin
        if (!isMuted && hasStarted) {
            music.play().catch(() => {});
        }

        // ✅ ensimmäinen klikkaus koko sivustolla
        document.addEventListener("click", () => {
            if (!music.muted && music.paused) {
                music.play();
                localStorage.setItem("musicStarted", "true"); // ✅ muista tämä
            }
        }, { once: true });

        button.addEventListener("click", () => {
            const newMutedState = !music.muted;

            music.muted = newMutedState;
            localStorage.setItem("musicMuted", newMutedState);

            button.textContent = newMutedState ? "🔇" : "🔊";

            // ✅ jos unmute → käynnistä JA tallenna
            if (!newMutedState && music.paused) {
                music.play();
                localStorage.setItem("musicStarted", "true");
            }
        });
    }

});
function toggleMenu() {
    const menu = document.getElementById("navMenu");
    menu.classList.toggle("active");
}