// Function to apply rules to text
function applyRules(text) {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ type: 'getRules' }, function (response) {
            let modifiedText = text;
            const rules = response.rules || [];

            rules.forEach(rule => {
                const regex = new RegExp(rule.pattern, 'g');
                modifiedText = modifiedText.replace(regex, rule.replacement);
            });

            resolve(modifiedText);
        });
    });
}

// Function to update clipboard
function updateClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        return true;
    } catch (err) {
        console.error('Failed to update clipboard:', err);
        return false;
    } finally {
        document.body.removeChild(textarea);
    }
}

// Monitor clipboard changes
document.addEventListener('copy', async (event) => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
        const modifiedText = await applyRules(selectedText);
        if (modifiedText !== selectedText) {
            updateClipboard(modifiedText);
        }
    }
});

// Also monitor paste events to catch programmatic clipboard changes
document.addEventListener('paste', async (event) => {
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData('text');
    if (pastedText) {
        const modifiedText = await applyRules(pastedText);
        if (modifiedText !== pastedText) {
            updateClipboard(modifiedText);
        }
    }
});

// Listen for clipboard update requests from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'updateClipboard') {
        // Create a temporary textarea to handle clipboard operations
        const textarea = document.createElement('textarea');
        textarea.value = request.text;
        document.body.appendChild(textarea);
        textarea.select();

        try {
            document.execCommand('copy');
            sendResponse({ success: true });
        } catch (err) {
            console.error('Failed to update clipboard:', err);
            sendResponse({ success: false });
        }

        document.body.removeChild(textarea);
    }
});
