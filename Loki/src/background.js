chrome.runtime.onInstalled.addListener(() => {
    console.log('Password Manager Extension Installed');
});
chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.set({ isAuthenticated: false });
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ isAuthenticated: false });
});
