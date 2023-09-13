const socket = io();
const editor = document.getElementById('editor');


// Function to send text editing data to the server
function sendTextData(data) {
    socket.emit('message', data);
}

// Event listener for the "Bold" button
document.getElementById('bold-button').addEventListener('click', () => {
    document.execCommand('bold', false, null);
    sendTextData(editor.innerHTML);
});

// Event listener for the "Italic" button
document.getElementById('italic-button').addEventListener('click', () => {
    document.execCommand('italic', false, null);
    sendTextData(editor.innerHTML);
});


// Event listener for the "Bullets" button
document.getElementById('bullet-button').addEventListener('click', () => {
    document.execCommand('insertUnorderedList', false, null);
    sendTextData(editor.innerHTML);
});


// Event listener for the "Numbering" button
document.getElementById('number-button').addEventListener('click', () => {
    document.execCommand('insertOrderedList', false, null);
    sendTextData(editor.innerHTML);
});

// Event listener for font style selection
document.getElementById('font-style-select').addEventListener('change', () => {
    const selectedFont = document.getElementById('font-style-select').value;
    document.execCommand('fontName', false, selectedFont);
    sendTextData(editor.innerHTML);
});


function toggleUnderline() {
    document.execCommand('underline', false, null);
    sendTextData(editor.innerHTML);
}

// Event listener for the "Underline" button
document.getElementById('underline-button').addEventListener('click', () => {
    toggleUnderline();
});


editor.addEventListener('input', () => {
    // Capture the updated content of the editor
    const updatedText = editor.innerHTML;

    // Send the updated text to the server in real-time
    sendTextData(updatedText);

});


// Receive text data from the server and update the editor
socket.on('message', (message) => {
    editor.innerHTML = message;
});