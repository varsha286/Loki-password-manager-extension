document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get(['isAuthenticated'], function (result) {
        if (!result.isAuthenticated) {
            chrome.action.setPopup({ popup: 'src/auth.html' });
            window.location.href = 'auth.html';
        } else {
            const form = document.getElementById('password-form');
            const passwordList = document.getElementById('password-list');

            form.addEventListener('submit', function (e) {
                e.preventDefault();

                const site = document.getElementById('site').value;
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                if (site && username && password) {
                    const passwordEntry = { site, username, password };
                    savePassword(passwordEntry);
                    displayPasswords();
                    form.reset();
                }
            });

            function savePassword(entry) {
                chrome.storage.sync.get(['passwords'], function (result) {
                    const passwords = result.passwords || [];
                    passwords.push(entry);
                    chrome.storage.sync.set({ passwords });
                });
            }

            function displayPasswords() {
                chrome.storage.sync.get(['passwords'], function (result) {
                    const passwords = result.passwords || [];
                    passwordList.innerHTML = '';
                    passwords.forEach((entry) => {
                        const listItem = document.createElement('li');
                        listItem.textContent = `${entry.site} - ${entry.username} - ${entry.password}`;
                        passwordList.appendChild(listItem);
                    });
                });
            }

            displayPasswords();
        }
    });
});
