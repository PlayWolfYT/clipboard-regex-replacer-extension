// background.js
// Author:
// Author URI: https://
// Author Github URI: https://www.github.com/
// Project Repository URI: https://github.com/
// Description: Handles all the browser level activities (e.g. tab management, etc.)
// License: MIT

// Default replacement rules
const defaultRules = [
    {
        pattern: "www.instagram.com",
        replacement: "d.ddinstagram.com"
    }
];

// Load rules from storage or use defaults
chrome.storage.sync.get(['rules'], function (result) {
    if (!result.rules) {
        chrome.storage.sync.set({ rules: defaultRules });
    }
});

// Listen for rules requests
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'getRules') {
        chrome.storage.sync.get(['rules'], function (result) {
            sendResponse({ rules: result.rules || defaultRules });
        });
        return true; // Required for async response
    }

    if (request.type === 'clipboardChanged') {
        chrome.storage.sync.get(['rules'], function (result) {
            let text = request.text;
            const rules = result.rules || defaultRules;

            // Apply all rules
            rules.forEach(rule => {
                const regex = new RegExp(rule.pattern, 'g');
                text = text.replace(regex, rule.replacement);
            });

            // Update clipboard using Chrome's clipboard API
            chrome.runtime.sendMessage({
                type: 'updateClipboard',
                text: text
            }, function (response) {
                sendResponse({ success: true });
            });
        });
        return true; // Required for async response
    }
});
