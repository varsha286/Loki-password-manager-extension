document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('auth-form');
    const message = document.getElementById('message');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const password = document.getElementById('auth-password').value;

        chrome.storage.sync.get(['masterPassword'], function (result) {
            if (result.masterPassword) {
                if (password === result.masterPassword) {
                    chrome.storage.local.set({ isAuthenticated: true }, function () {
                        chrome.action.setPopup({ popup: 'src/popup.html' });
                        window.location.href = 'popup.html';
                    });
                } else {
                    message.textContent = 'Incorrect password. Please try again.';
                }
            } else {
                chrome.storage.sync.set({ masterPassword: password }, function () {
                    message.textContent = 'Password set successfully. Please re-enter to authenticate.';
                    form.reset();
                });
            }
        });
    });
});
