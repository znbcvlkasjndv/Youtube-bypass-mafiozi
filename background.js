chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "enableProxy") {
        const proxyConfig = {
            mode: "pac_script",
            pacScript: {
                data: `
                    function FindProxyForURL(url, host) {
                        if (dnsDomainIs(host, "youtube.com") || dnsDomainIs(host, "googlevideo.com") || dnsDomainIs(host, "ytimg.com") || dnsDomainIs(host, "ggpht.com")) {
                            return "SOCKS5 45.95.233.23:2285";
                        }
                        return "DIRECT";
                    }
                `
            }
        };

        chrome.proxy.settings.set({ value: proxyConfig, scope: "regular" }, () => {
            console.log("Прокси включен");
        });

    } else if (message.action === "disableProxy") {
        chrome.proxy.settings.clear({}, () => {
            console.log("Прокси выключен");
        });
    }
});