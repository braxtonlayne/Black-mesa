// assets/js/document.js

// This script runs specifically on the document viewer page (document.html)

// Ensure the necessary utility and component scripts are loaded before this one:
// <script src="assets/js/utils.js"></script>
// <script src="assets/js/terminal.js"></script>
// <script src="assets/js/time.js"></script>

document.addEventListener('DOMContentLoaded', () => {
    console.log('Document viewer script loaded.');

    // Initialize terminal info relevant to this page (IP, User ID, Terminal ID, Last Login)
    // The initializeTerminalInfo function is designed to check for elements,
    // so it will populate what's available on this page.
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


    // No need to initialize dynamic messages on the document page by default,
    // but you could add a "Loading document..." message if you implement dynamic loading.
    // if (typeof initializeSystemMessages === 'function') {
    //     initializeSystemMessages();
    // } else {
    //      console.error('initializeSystemMessages function not found. Make sure messages.js is loaded.');
    //      const dynamicMessageSpan = document.getElementById('dynamic-system-message');
    //      if (dynamicMessageSpan) dynamicMessageSpan.textContent = 'System message service unavailable.';
    // }


    // --- Document Page Specific Logic ---
    // In a real application, you would load document content based on a parameter
    // in the URL (e.g., document.html?doc=BM-HIST-5280).
    // For this static mockup, the content is hardcoded in the HTML.

    // --- Document Page Specific Logic ---

    const urlParams = new URLSearchParams(window.location.search);
    const docCode = urlParams.get('doc');

    const documentHeaderInfo = document.getElementById('document-header-info');
    const documentContentDiv = document.getElementById('document-content');
    const docCodeSpan = document.getElementById('doc-code');
    const docTitleSpan = document.getElementById('doc-title');
    const docClassificationSpan = document.getElementById('doc-classification');
    const docAccessLevelSpan = document.getElementById('doc-access-level');
    const docLastUpdatedSpan = document.getElementById('doc-last-updated');

    async function loadDocument(code) {
        try {
            // Fetch the manifest
            const manifestResponse = await fetch('documents/manifest.json');
            if (!manifestResponse.ok) {
                throw new Error(`Failed to fetch manifest: ${manifestResponse.statusText}`);
            }
            const manifest = await manifestResponse.json();

            // Find the document in the manifest
            const documentEntry = manifest.find(doc => doc.code === code);

            if (!documentEntry) {
                displayError(`Document with code "${code}" not found.`);
                return;
            }

            // Fetch the Markdown file
            const docResponse = await fetch(documentEntry.filePath);
            if (!docResponse.ok) {
                 throw new Error(`Failed to fetch document: ${docResponse.statusText}`);
            }
            const markdownContent = await docResponse.text();

            // Parse Markdown to HTML
            const htmlContent = marked.parse(markdownContent);

            // Display document content
            if (documentContentDiv) {
                documentContentDiv.innerHTML = htmlContent;
            }

            // Update document header info
            if (docCodeSpan) docCodeSpan.textContent = documentEntry.code;
            if (docTitleSpan) docTitleSpan.textContent = documentEntry.title;
            if (docClassificationSpan) docClassificationSpan.textContent = documentEntry.classification;
            if (docAccessLevelSpan) docAccessLevelSpan.textContent = documentEntry.accessLevel;
            if (docLastUpdatedSpan) docLastUpdatedSpan.textContent = documentEntry.lastUpdated;

            // Update page title
            document.title = `Black Mesa Internal Database - ${documentEntry.title}`;

            console.log(`Document "${code}" loaded successfully.`);

        } catch (error) {
            console.error('Error loading document:', error);
            displayError(`Error loading document: ${error.message}`);
        }
    }

    function displayError(message) {
        if (documentContentDiv) {
            documentContentDiv.innerHTML = `<p style="color: red;">${message}</p>`;
        }
         if (docTitleSpan) docTitleSpan.textContent = 'Error';
         if (docCodeSpan) docCodeSpan.textContent = 'ERROR';
         if (document.title) document.title = 'Black Mesa Internal Database - Error';
    }


    if (docCode) {
        loadDocument(docCode);
    } else {
        displayError('No document code specified in URL.');
        console.log('No document code specified in URL.');
    }

    // Add any other document viewer specific JavaScript logic here.
    // For example, handling click events on internal links, print functionality, etc.

});
