// assets/js/archive.js

// This script runs specifically on the document archive page (archive.html)

// Ensure the necessary utility and component scripts are loaded before this one:
// <script src="assets/js/utils.js"></script>
// <script src="assets/js/terminal.js"></script>
// <script src="assets/js/time.js"></script>

document.addEventListener('DOMContentLoaded', () => {
    console.log('Document archive script loaded.');

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


    // No need to initialize dynamic messages on the archive page by default,
    // but you could add a "Loading document list..." message if you implement dynamic loading.
    // if (typeof initializeSystemMessages === 'function') {
    //     initializeSystemMessages();
    // } else {
    //      console.error('initializeSystemMessages function not found. Make sure messages.js is loaded.');
    //      const dynamicMessageSpan = document.getElementById('dynamic-system-message');
    //      if (dynamicMessageSpan) dynamicMessageSpan.textContent = 'System message service unavailable.';
    // }


    // --- Document Archive Page Specific Logic ---

    // --- Document Archive Page Specific Logic ---

    const categoryFilter = document.getElementById('category-filter');
    const documentCategoriesContainer = document.getElementById('document-categories-container');

    async function loadArchive() {
        try {
            // Fetch the manifest
            const manifestResponse = await fetch('documents/manifest.json');
            if (!manifestResponse.ok) {
                throw new Error(`Failed to fetch manifest: ${manifestResponse.statusText}`);
            }
            const manifest = await manifestResponse.json();

            // Group documents by category
            const documentsByCategory = manifest.reduce((acc, doc) => {
                const category = doc.category || 'Uncategorized'; // Default category
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(doc);
                return acc;
            }, {});

            // Clear existing content
            if (documentCategoriesContainer) {
                documentCategoriesContainer.innerHTML = '';
            }

            // Populate the category filter dropdown
            if (categoryFilter) {
                // Clear existing options except "All Categories"
                categoryFilter.innerHTML = '<option value="all">All Categories</option>';
                Object.keys(documentsByCategory).sort().forEach(category => {
                    const option = document.createElement('option');
                    option.value = category;
                    option.textContent = category;
                    categoryFilter.appendChild(option);
                });
            }


            // Render documents by category
            Object.keys(documentsByCategory).sort().forEach(category => {
                const categorySection = document.createElement('div');
                categorySection.classList.add('category-section');
                categorySection.id = `category-${category.replace(/\s+/g, '-').toLowerCase()}`; // Create a valid ID

                const categoryHeading = document.createElement('h3');
                categoryHeading.textContent = category;
                categorySection.appendChild(categoryHeading);

                const documentList = document.createElement('ul');
                documentList.classList.add('document-list');

                documentsByCategory[category].forEach(doc => {
                    const listItem = document.createElement('li');
                    const docLink = document.createElement('a');
                    docLink.href = `document.html?doc=${doc.code}`;
                    docLink.textContent = doc.title;

                    const docCodeSpan = document.createElement('span');
                    docCodeSpan.classList.add('document-code');
                    docCodeSpan.textContent = `[${doc.code}]`;

                    listItem.appendChild(docLink);
                    listItem.appendChild(docCodeSpan);
                    documentList.appendChild(listItem);
                });

                categorySection.appendChild(documentList);
                if (documentCategoriesContainer) {
                    documentCategoriesContainer.appendChild(categorySection);
                }
            });

             // Add event listener for filtering after categories are loaded
            if (categoryFilter) {
                categoryFilter.addEventListener('change', (event) => {
                    const selectedCategory = event.target.value;
                    const allSections = documentCategoriesContainer.querySelectorAll('.category-section');

                    allSections.forEach(section => {
                        const sectionId = section.id.replace('category-', '');
                        if (selectedCategory === 'all' || sectionId === selectedCategory.toLowerCase().replace(/\s+/g, '-')) {
                            section.style.display = 'block'; // Show the section
                        } else {
                            section.style.display = 'none'; // Hide the section
                        }
                    });
                });
            }


        } catch (error) {
            console.error('Error loading archive:', error);
            if (documentCategoriesContainer) {
                documentCategoriesContainer.innerHTML = '<p style="color: red;">Error loading document archive.</p>';
            }
        }
    }

    // Load the archive when the page loads
    loadArchive();

    // Add any other archive page specific JavaScript logic here.
    // For example, more advanced filtering, sorting, dynamic loading of documents, etc.

});
