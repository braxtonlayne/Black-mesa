// assets/js/utils.js

/**
 * Generates a random alphanumeric ID.
 * @param {string} prefix - A prefix to add to the beginning of the ID.
 * @param {number} length - The desired length of the random part of the ID.
 * @returns {string} The generated random ID.
 */
function generateRandomId(prefix, length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = prefix;
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Note: Other utility functions could be added here in the future.
