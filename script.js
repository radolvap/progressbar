document.addEventListener("DOMContentLoaded", () => {
    function saveSettings() {
        const settings = {
            width: document.getElementById("width").value,
            height: document.getElementById("height").value,
            goal: document.getElementById("goal").value,
            current: document.getElementById("current").value,
            barColor1: document.getElementById("barColor1").value,
            barColor2: document.getElementById("barColor2").value,
            borderColor: document.getElementById("borderColor").value,
            borderRadius: document.getElementById("borderRadius").value,
            fontSize: document.getElementById("fontSize").value,
            textColor: document.getElementById("textColor").value,
            textOpacity: document.getElementById("textOpacity").value,
            fontFamily: document.getElementById("fontFamily").value
        };
        localStorage.setItem("progressBarSettings", JSON.stringify(settings));
    }
    
    function loadSettings() {
        const settings = JSON.parse(localStorage.getItem("progressBarSettings"));
        if (!settings) return;
        Object.keys(settings).forEach(key => {
            if (document.getElementById(key)) {
                document.getElementById(key).value = settings[key];
            }
        });
        updateProgressBar(settings);
    }
    
    function updateProgressBar(settings) {
        if (!settings) settings = JSON.parse(localStorage.getItem("progressBarSettings"));
        if (!settings) return;
        document.getElementById("progress-container").style.width = settings.width + "px";
        document.getElementById("progress-container").style.height = settings.height + "px";
        document.getElementById("progress-container").style.borderRadius = settings.borderRadius + "px";
        document.getElementById("progress-container").style.borderColor = settings.borderColor;
        document.getElementById("progress").style.width = (settings.current / settings.goal) * 100 + "%";
        document.getElementById("progress").style.background = `linear-gradient(to right, ${settings.barColor1}, ${settings.barColor2})`;
        document.getElementById("progress").style.borderRadius = settings.borderRadius + "px";
        document.getElementById("progress-text").textContent = `$${settings.current} / $${settings.goal}`;
        document.getElementById("progress-text").style.fontSize = settings.fontSize + "px";
        document.getElementById("progress-text").style.color = settings.textColor;
        document.getElementById("progress-text").style.opacity = settings.textOpacity;
        document.getElementById("progress-text").style.fontFamily = settings.fontFamily;
    }

    document.querySelectorAll("input, select").forEach(element => {
        element.addEventListener("input", () => {
            saveSettings();
            updateProgressBar();
        });
    });
    loadSettings();
    setInterval(updateProgressBar, 1000);
});
