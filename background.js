chrome.runtime.onInstalled.addListener(() => {
  const proxyConfig = {
    mode: "pac_script",
    pacScript: {
      data: `
        function FindProxyForURL(url, host) {
          if (dnsDomainIs(host, "youtube.com") || dnsDomainIs(host, "googlevideo.com")) {
            return "SOCKS5 45.95.233.23:2285";
          }
          return "DIRECT";
        }
      `
    }
  };

  chrome.proxy.settings.set(
    { value: proxyConfig, scope: "regular" },
    () => console.log("Proxy settings applied.")
  );
});

chrome.runtime.onStartup.addListener(() => {
  console.log("Extension started.");
});
