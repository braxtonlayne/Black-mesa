// assets/js/terminal.js

// Ensure utils.js is loaded before this script

/**
 * Initializes and displays simulated terminal information.
 * This includes IP address, User ID, Terminal ID, and Last Login time.
 */
function initializeTerminalInfo() {
    // Simulate IP Address
    const simulatedIpSpan = document.getElementById('simulated-ip');
    if (simulatedIpSpan) { // Check if the element exists on the page
        const simulatedIp = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
        simulatedIpSpan.textContent = simulatedIp;
    }

    // Simulate User ID
    // This element might only exist on the home page, so check for it.
    const simulatedUserIdSpan = document.getElementById('simulated-user-id');
    if (simulatedUserIdSpan) {
        // Use the utility function from utils.js
        const simulatedUserId = generateRandomId('USER-', 5);
        simulatedUserIdSpan.textContent = simulatedUserId;
        // The blinking cursor is handled by CSS on this span
    }


    // Simulate Terminal ID
    const terminalIdSpan = document.getElementById('terminal-id');
    const statusBarTerminalIdSpan = document.getElementById('status-bar-terminal-id');
    const terminalId = generateRandomId('', 4); // Generate a 4-character ID

    if (terminalIdSpan) {
         terminalIdSpan.textContent = terminalId;
    }
    if (statusBarTerminalIdSpan) {
        statusBarTerminalIdSpan.textContent = terminalId; // Update status bar as well
    }


    // Simulate Last Login Date and Time (random date within last week)
    // These elements might only exist on the home page, so check for them.
    const lastLoginDateSpan = document.getElementById('last-login-date');
    const lastLoginTimeSpan = document.getElementById('last-login-time');

    if (lastLoginDateSpan && lastLoginTimeSpan) {
        const now = new Date();
        const lastLoginDate = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000); // Random date in last 7 days
        lastLoginDateSpan.textContent = lastLoginDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        lastLoginTimeSpan.textContent = lastLoginDate.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
}

// Note: Call this function from your page-specific scripts (e.g., login.js, home.js)
// window.onload = initializeTerminalInfo; // Or call it after DOMContentLoaded

