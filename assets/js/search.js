// assets/js/search.js

// This script runs specifically on the database search page (search.html)

// Ensure the necessary utility and component scripts are loaded before this one:
// <script src="assets/js/utils.js"></script>
// <script src="assets/js/terminal.js"></script>
// <script src="assets/js/time.js"></script>

document.addEventListener('DOMContentLoaded', () => {
    console.log('Database search script loaded.');

    // Initialize terminal info relevant to this page (IP, User ID, Terminal ID, Last Login)
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


    // No need to initialize dynamic messages on the search page by default,
    // but you could add a "Awaiting search query..." message if you like.
    // if (typeof initializeSystemMessages === 'function') {
    //     initializeSystemMessages();
    // } else {
    //      console.error('initializeSystemMessages function not found. Make sure messages.js is loaded.');
    //      const dynamicMessageSpan = document.getElementById('dynamic-system-message');
    //      if (dynamicMessageSpan) dynamicMessageSpan.textContent = 'System message service unavailable.';
    // }


    // --- Database Search Page Specific Logic ---

    const searchInput = document.getElementById('search-query');
    const searchButton = document.getElementById('search-button');
    const resultsList = document.getElementById('results-list');
    const noResultsMessage = document.getElementById('no-results-message');
    const resultsHeading = document.getElementById('results-heading');

    let allDocuments = []; // To store document data including content

    // Function to fetch manifest and document content
    async function loadDocumentsForSearch() {
        try {
            const manifestResponse = await fetch('documents/manifest.json');
            if (!manifestResponse.ok) {
                throw new Error(`Failed to fetch manifest: ${manifestResponse.statusText}`);
            }
            const manifest = await manifestResponse.json();

            // Fetch content for each document
            const documentPromises = manifest.map(async doc => {
                try {
                    const docResponse = await fetch(doc.filePath);
                    if (!docResponse.ok) {
                        console.warn(`Failed to fetch content for ${doc.code}: ${docResponse.statusText}`);
                        return { ...doc, content: '' }; // Return doc with empty content on failure
                    }
                    const content = await docResponse.text();
                    return { ...doc, content: content };
                } catch (error) {
                    console.warn(`Error fetching content for ${doc.code}:`, error);
                    return { ...doc, content: '' }; // Return doc with empty content on error
                }
            });

            allDocuments = await Promise.all(documentPromises);
            console.log(`Loaded ${allDocuments.length} documents for searching.`);

        } catch (error) {
            console.error('Error loading documents for search:', error);
            if (resultsHeading) {
                resultsHeading.textContent = 'Error loading documents.';
            }
        }
    }

    // Perform search function
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        console.log(`Performing search for: "${query}"`);

        if (!allDocuments.length) {
            console.warn('Documents not loaded yet or failed to load.');
            if (resultsHeading) {
                 resultsHeading.textContent = 'Documents not available for search.';
            }
            if (resultsList) resultsList.innerHTML = '';
            if (noResultsMessage) noResultsMessage.style.display = 'block';
            return;
        }

        // Filter documents based on query matching title, code, or content
        const filteredDocuments = allDocuments.filter(doc => {
            const titleMatch = doc.title.toLowerCase().includes(query);
            const codeMatch = doc.code.toLowerCase().includes(query);
            const contentMatch = doc.content.toLowerCase().includes(query);
            return titleMatch || codeMatch || contentMatch;
        });

        // Clear previous results
        if (resultsList) {
            resultsList.innerHTML = '';
        }

        if (filteredDocuments.length > 0) {
            if (noResultsMessage) noResultsMessage.style.display = 'none';
            if (resultsHeading) resultsHeading.textContent = `Search Results for "${query}" (${filteredDocuments.length})`;

            filteredDocuments.forEach(doc => {
                const listItem = document.createElement('li');
                const docLink = document.createElement('a');
                docLink.href = `document.html?doc=${doc.code}`;
                docLink.textContent = doc.title;

                const docCodeSpan = document.createElement('span');
                docCodeSpan.classList.add('result-code');
                docCodeSpan.textContent = `[${doc.code}]`;

                listItem.appendChild(docLink);
                listItem.appendChild(docCodeSpan);

                // Add a snippet (basic implementation: first 200 chars or highlight match)
                const snippet = document.createElement('p');
                snippet.classList.add('result-snippet');

                const queryIndex = doc.content.toLowerCase().indexOf(query);
                if (queryIndex !== -1) {
                    // Show snippet around the first match
                    const snippetLength = 100; // Characters before and after match
                    const startIndex = Math.max(0, queryIndex - snippetLength);
                    const endIndex = Math.min(doc.content.length, queryIndex + query.length + snippetLength);
                    let snippetText = doc.content.substring(startIndex, endIndex);

                    // Highlight the query (basic replacement, might need refinement for HTML)
                    const regex = new RegExp(query, 'gi');
                    snippetText = snippetText.replace(regex, '<strong>$&</strong>');

                    snippet.innerHTML = `...${snippetText}...`;
                } else {
                    // If query not in content (but matched title/code), show start of content
                    snippet.textContent = doc.content.substring(0, 200) + '...';
                }

                listItem.appendChild(snippet);


                if (resultsList) {
                    resultsList.appendChild(listItem);
                }
            });

        } else {
            if (noResultsMessage) noResultsMessage.style.display = 'block';
            if (resultsHeading) resultsHeading.textContent = `Search Results for "${query}" (0)`;
        }
    }

    // Load documents when the page loads
    loadDocumentsForSearch();

    // Add event listener to the search button
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    } else {
        console.warn('Search button element not found.');
    }

    // Add event listener to allow searching on Enter key press in the input field
    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                performSearch();
            }
        });
    } else {
        console.warn('Search input element not found.');
    }

    // Add any other search page specific JavaScript logic here.
    // For example, handling advanced search options, displaying search progress, etc.

});
