// const usernameInput = document.getElementById('usernameInput');
//         const passwordInput = document.getElementById('passwordInput');
//         const loginBtn = document.getElementById('loginBtn');

//         function handleLogin() {
//             const username = usernameInput.value.trim();
//             const password = passwordInput.value.trim();

//             if (username === '' || password === '') {
//                 alert('Please enter both username and password.');
//                 return;
//             }

//             alert('Logged in as: ' + username);
//         }

//         loginBtn.addEventListener('click', handleLogin);

// Function to handle login form submission
const loginFormHandler = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Gather user input from the form
    const emailInput = document.querySelector('#email-login');
    const passwordInput = document.querySelector('#password-login');

    // Trimmed values of user input
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Check if both email and password are provided
    if (email && password) {
        try {
            // Send login credentials to the server
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            // If login is successful, redirect to homepage
            if (response.ok) {
                document.location.replace('/');
            } else {
                // If login fails, display an error message
                alert('Failed to log in. Please check your credentials and try again.');
            }
        } catch (error) {
            // Handle any unexpected errors
            console.error('Error during login:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    } else {
        // If either email or password is missing, prompt the user to provide both
        alert('Please enter both email and password.');
    }
};

// Attach the login form handler to the form submission event
document
.querySelector('.login-form')
.addEventListener('submit', loginFormHandler);
