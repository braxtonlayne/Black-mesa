// assets/js/home.js

// This script runs specifically on the home page (e.g., home.html)

// Ensure the necessary utility and component scripts are loaded before this one:
// <script src="assets/js/utils.js"></script>
// <script src="assets/js/terminal.js"></script>
// <script src="assets/js/messages.js"></script>
// <script src="assets/js/time.js"></script>

document.addEventListener('DOMContentLoaded', () => {
    console.log('Home page script loaded.');

    // Initialize all terminal info (IP, User ID, Terminal ID, Last Login)
    if (typeof initializeTerminalInfo === 'function') {
        initializeTerminalInfo();
    } else {
        console.error('initializeTerminalInfo function not found. Make sure terminal.js is loaded.');
        // Fallback if terminal.js isn't loaded
        const simulatedIpSpan = document.getElementById('simulated-ip');
        if (simulatedIpSpan) simulatedIpSpan.textContent = 'ERROR';
        const simulatedUserIdSpan = document.getElementById('simulated-user-id');
        if (simulatedUserIdSpan) simulatedUserIdSpan.textContent = 'ERROR';
        const terminalIdSpan = document.getElementById('terminal-id');
        if (terminalIdSpan) terminalIdSpan.textContent = 'ERROR';
        const statusBarTerminalIdSpan = document.getElementById('status-bar-terminal-id');
        if (statusBarTerminalIdSpan) statusBarTerminalIdSpan.textContent = 'ERROR';
        const lastLoginDateSpan = document.getElementById('last-login-date');
        if (lastLoginDateSpan) lastLoginDateSpan.textContent = 'ERROR';
        const lastLoginTimeSpan = document.getElementById('last-login-time');
        if (lastLoginTimeSpan) lastLoginTimeSpan.textContent = 'ERROR';
    }


    // Initialize the current time update
    if (typeof initializeTimeUpdate === 'function') {
        initializeTimeUpdate();
    } else {
         console.error('initializeTimeUpdate function not found. Make sure time.js is loaded.');
         const timeSpan = document.getElementById('current-time');
         if (timeSpan) timeSpan.textContent = 'ERROR';
    }


    // Initialize the dynamic system messages
    if (typeof initializeSystemMessages === 'function') {
        initializeSystemMessages();
    } else {
         console.error('initializeSystemMessages function not found. Make sure messages.js is loaded.');
         const dynamicMessageSpan = document.getElementById('dynamic-system-message');
         if (dynamicMessageSpan) dynamicMessageSpan.textContent = 'System message service unavailable.';
    }


    // Add any other home page specific JavaScript logic here.
    // For example, fetching recent updates, handling search input, etc.
});
