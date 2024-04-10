const usernameInput = document.getElementById('usernameInput');
        const passwordInput = document.getElementById('passwordInput');
        const loginBtn = document.getElementById('loginBtn');

        function handleLogin() {
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (username === '' || password === '') {
                alert('Please enter both username and password.');
                return;
            }

            alert('Logged in as: ' + username);
        }

        loginBtn.addEventListener('click', handleLogin);