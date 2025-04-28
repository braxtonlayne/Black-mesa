// assets/js/time.js

/**
 * Updates the current time displayed on the page.
 */
function initializeTimeUpdate() {
    const timeSpan = document.getElementById('current-time');

    if (!timeSpan) {
        // If the time element doesn't exist on this page, do nothing.
        return;
    }

    /**
     * Updates the text content of the time span with the current time.
     */
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        timeSpan.textContent = timeString;
    }

    // Update time every second
    setInterval(updateTime, 1000);
    // Initial call to display time immediately
    updateTime();
}

// Note: Call this function from your page-specific scripts (e.g., login.js, home.js)
// window.onload = initializeTimeUpdate; // Or call it after DOMContentLoaded
