document.addEventListener('DOMContentLoaded', () => {
    const saveOptionsBtn = document.getElementById('saveOptions');
    const apiKeyInput = document.getElementById('apiKey');
    const clientIdInput = document.getElementById('clientId');
    const clientSecretInput = document.getElementById('clientSecret');
    const redirectUriInput = document.getElementById('redirectUri');
    const dropboxAccessTokenInput = document.getElementById('dropboxAccessToken');
    
    // Load saved options
    chrome.storage.sync.get(['apiKey', 'clientId', 'clientSecret', 'redirectUri', 'dropboxAccessToken'], (options) => {
    apiKeyInput.value = options.apiKey || '';
    clientIdInput.value = options.clientId || '';
    clientSecretInput.value = options.clientSecret || '';
    redirectUriInput.value = options.redirectUri || '';
    dropboxAccessTokenInput.value = options.dropboxAccessToken || '';
    });
    
    // Save options
    saveOptionsBtn.addEventListener('click', () => {
    chrome.storage.sync.set({
    apiKey: apiKeyInput.value,
    clientId: clientIdInput.value,
    clientSecret: clientSecretInput.value,
    redirectUri: redirectUriInput.value,
    dropboxAccessToken: dropboxAccessTokenInput.value,
    }, () => {
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
    status.textContent = '';
    }, 2000);
    });
    });
    });
    
    