// script.js
document.getElementById('check-btn').addEventListener('click', function() {
    const textInput = document.getElementById('text-input').value;
    const resultDiv = document.getElementById('result');

    if (textInput.trim() === "") {
        alert("Please input a value");
        return;
    }

    const sanitizedInput = textInput.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    const reversedInput = sanitizedInput.split('').reverse().join('');

    if (sanitizedInput === reversedInput) {
        resultDiv.textContent = `${textInput} is a palindrome`;
    } else {
        resultDiv.textContent = `${textInput} is not a palindrome`;
    }
});
