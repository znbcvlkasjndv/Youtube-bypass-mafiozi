document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("toggleProxy");

    chrome.storage.local.get("proxyEnabled", function (data) {
        if (data.proxyEnabled) {
            button.textContent = "Выключить";
        } else {
            button.textContent = "Включить";
        }
    });

    button.addEventListener("click", function () {
        chrome.storage.local.get("proxyEnabled", function (data) {
            const newState = !data.proxyEnabled;

            chrome.storage.local.set({ proxyEnabled: newState }, function () {
                chrome.runtime.sendMessage({ action: newState ? "enableProxy" : "disableProxy" });
                button.textContent = newState ? "Выключить" : "Включить";
            });
        });
    });
});
