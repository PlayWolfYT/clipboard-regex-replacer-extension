// Handles your frontend UI logic.

document.addEventListener('DOMContentLoaded', function () {
    const rulesContainer = document.getElementById('rules-container');
    const addRuleButton = document.getElementById('add-rule');
    const emptyState = document.querySelector('.empty-state');

    // Load existing rules
    chrome.storage.sync.get(['rules'], function (result) {
        const rules = result.rules || [];
        if (rules.length === 0) {
            emptyState.style.display = 'block';
        } else {
            rules.forEach(rule => addRuleElement(rule.pattern, rule.replacement));
        }
    });

    // Add new rule button handler
    addRuleButton.addEventListener('click', function () {
        emptyState.style.display = 'none';
        addRuleElement('', '');
    });

    function addRuleElement(pattern = '', replacement = '') {
        const ruleDiv = document.createElement('div');
        ruleDiv.className = 'rule';

        const ruleInputs = document.createElement('div');
        ruleInputs.className = 'rule-inputs';

        const patternInput = document.createElement('input');
        patternInput.type = 'text';
        patternInput.placeholder = 'Pattern (e.g., www.instagram.com)';
        patternInput.value = pattern;

        const replacementInput = document.createElement('input');
        replacementInput.type = 'text';
        replacementInput.placeholder = 'Replacement (e.g., d.ddinstagram.com)';
        replacementInput.value = replacement;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '×';
        deleteButton.title = 'Delete rule';
        deleteButton.addEventListener('click', function () {
            ruleDiv.remove();
            saveRules();
            if (rulesContainer.children.length === 0) {
                emptyState.style.display = 'block';
            }
        });

        // Add input change handlers with debounce
        let timeout;
        [patternInput, replacementInput].forEach(input => {
            input.addEventListener('input', function () {
                clearTimeout(timeout);
                timeout = setTimeout(saveRules, 500);
            });
        });

        ruleInputs.appendChild(patternInput);
        ruleInputs.appendChild(replacementInput);
        ruleDiv.appendChild(ruleInputs);
        ruleDiv.appendChild(deleteButton);
        rulesContainer.appendChild(ruleDiv);

        // Focus the pattern input
        patternInput.focus();
    }

    function saveRules() {
        const rules = [];
        document.querySelectorAll('.rule').forEach(ruleDiv => {
            const inputs = ruleDiv.querySelectorAll('input');
            if (inputs[0].value && inputs[1].value) {
                rules.push({
                    pattern: inputs[0].value,
                    replacement: inputs[1].value
                });
            }
        });
        chrome.storage.sync.set({ rules: rules });
    }
});
