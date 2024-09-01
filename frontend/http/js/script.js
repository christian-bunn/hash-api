// Define the base URL for the backend API
const API_BASE_URL = window.location.hostname === 'ilovequt.lol' ? `https://api.ilovequt.lol` : 'http://127.0.0.1:3000';

// Show the selected file name
function showSelectedFile() {
    const fileInput = document.getElementById('uploadBtn');
    const selectedFileText = document.getElementById('selectedFile');
    if (fileInput.files.length > 0) {
        selectedFileText.textContent = `Selected file: ${fileInput.files[0].name}`;
    } else {
        selectedFileText.textContent = "No file selected";
    }
}

// Function to upload the file
async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    // Display a message indicating that encryption is in progress
    const encryptionResultDiv = document.getElementById('encryptionResult');
    encryptionResultDiv.textContent = "Please wait while your file is encrypted. This may take some time with larger files.";

    try {
        const response = await fetch(`${API_BASE_URL}/files/upload`, {
            method: 'POST',
            body: formData,
            credentials: 'include' // Include cookies for authentication
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.downloadLink) {
            // Instead of directly navigating to the download link, display it as a clickable link
            const downloadLinkElement = document.createElement('a');
            downloadLinkElement.href = `${API_BASE_URL}${data.downloadLink}`;
            downloadLinkElement.textContent = "Encryption Complete! Click here to download your encrypted file";
            downloadLinkElement.style.display = 'block'; // Ensure the link is displayed as a block
            downloadLinkElement.style.marginTop = '10px'; // Add some space above the link
            downloadLinkElement.setAttribute('download', '');

            encryptionResultDiv.textContent = ""; // Clear previous text
            encryptionResultDiv.appendChild(downloadLinkElement); // Append the new link

        } else {
            throw new Error('Download link not provided');
        }
    } catch (error) {
        console.error('Error during file upload:', error);
        encryptionResultDiv.textContent = "An error occurred during file upload.";
    }
}

// Form submission for file upload
document.getElementById('uploadForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('uploadBtn');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        uploadFile(file);
    } else {
        console.log("No file selected to upload.");
        document.getElementById('encryptionResult').textContent = "No file selected to upload.";
    }
});

// form submission for signup
document.getElementById('signupForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.status) {
            messageDiv.textContent = "Account created successfully! Redirecting to login...";
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        } else {
            messageDiv.textContent = `Error: ${data.error}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        messageDiv.textContent = "An error occurred during signup.";
    });
});

// form submission for login
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const messageDiv = document.getElementById('loginMessage');

    fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.status) {
            messageDiv.textContent = "Login successful! Redirecting to file upload...";
            setTimeout(() => {
                window.location.href = 'file_upload.html';
            }, 1000);
        } else {
            messageDiv.textContent = `Error: ${data.error}`;
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        messageDiv.textContent = "An error occurred during login.";
    });
});

// function for logout
function logout() {
    fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/login.html';
        } else {
            console.error('Logout failed');
        }
    })
    .catch(error => {
        console.error('Error during logout:', error);
    });
}
