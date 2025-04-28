// assets/js/login.js

// This script runs specifically on the login page (index.html)

// Ensure the necessary utility and component scripts are loaded before this one:
// <script src="assets/js/utils.js"></script>
// <script src="assets/js/terminal.js"></script>
// <script src="assets/js/time.js"></script>

document.addEventListener('DOMContentLoaded', () => {
    console.log('Login page script loaded.');

    // Initialize terminal info relevant to the login page (IP, Terminal ID)
    // The initializeTerminalInfo function is designed to check for elements,
    // so it won't cause errors if User ID/Last Login spans aren't present.
    if (typeof initializeTerminalInfo === 'function') {
        initializeTerminalInfo();
    } else {
        console.error('initializeTerminalInfo function not found. Make sure terminal.js is loaded.');
        // Fallback for IP and Terminal ID if terminal.js isn't loaded
        const simulatedIpSpan = document.getElementById('simulated-ip');
        if (simulatedIpSpan) {
             simulatedIpSpan.textContent = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
        }
        const statusBarTerminalIdSpan = document.getElementById('status-bar-terminal-id');
        if (statusBarTerminalIdSpan) {
             statusBarTerminalIdSpan.textContent = 'N/A'; // Or generate a simple ID here
        }
    }


    // Initialize the current time update
    if (typeof initializeTimeUpdate === 'function') {
        initializeTimeUpdate();
    } else {
        console.error('initializeTimeUpdate function not found. Make sure time.js is loaded.');
        // Fallback for time if time.js isn't loaded
        const timeSpan = document.getElementById('current-time');
        if (timeSpan) {
            timeSpan.textContent = 'Loading...';
        }
    }

    // No need to initialize messages on the login page

    // Add any other login page specific JavaScript logic here.
    // For example, handling form submission validation (though for this mock,
    // the form just navigates to home.html).
});
