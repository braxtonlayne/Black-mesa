// assets/js/messages.js

/**
 * Manages the cycling and typing animation of dynamic system messages.
 */
function initializeSystemMessages() {
    const messages = [
        "Initializing system modules...",
        "Establishing secure connection...",
        "Verifying access credentials...",
        "Loading recent database updates...",
        "System ready for access."
    ];
    let messageIndex = 0;
    const dynamicMessageSpan = document.getElementById('dynamic-system-message');

    if (!dynamicMessageSpan) {
        // If the message area doesn't exist on this page, do nothing.
        return;
    }

    /**
     * Types out a message character by character with a blinking cursor effect.
     * @param {string} message - The message to type.
     * @param {function} callback - A function to call after the typing animation finishes.
     */
    function typeMessage(message, callback) {
        dynamicMessageSpan.textContent = ''; // Clear current message
        dynamicMessageSpan.style.width = '0%'; // Reset width for typing animation
        dynamicMessageSpan.style.animation = 'none'; // Reset animation

        // Trigger reflow to restart animation
        void dynamicMessageSpan.offsetWidth;

        dynamicMessageSpan.textContent = message;
        // Apply typing and blinking cursor animations
        dynamicMessageSpan.style.animation = 'typing 3.5s steps(40, end) forwards, blink-caret .75s step-end infinite';

        // Remove typing animation and cursor after it finishes
        setTimeout(() => {
            dynamicMessageSpan.style.animation = 'none';
            if (callback) callback();
        }, 3500); // Match typing animation duration
    }

    /**
     * Cycles through the predefined messages with delays.
     */
    function cycleMessages() {
        typeMessage(messages[messageIndex], () => {
            messageIndex = (messageIndex + 1) % messages.length;
            setTimeout(cycleMessages, 5000); // Wait 5 seconds before typing next message
        });
    }

    // Start the message cycle after a short delay
    setTimeout(cycleMessages, 1000);
}

// Note: Call this function from your home.js or other relevant page scripts.
// window.onload = initializeSystemMessages; // Or call it after DOMContentLoaded
