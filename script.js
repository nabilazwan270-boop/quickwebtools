const textInput = document.getElementById("textInput");

if (textInput) {
    textInput.addEventListener("input", function () {
        const text = textInput.value;

        // Word count
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        document.getElementById("wordCount").textContent = words.length;

        // Character count
        document.getElementById("charCount").textContent = text.length;
    });
}

function generatePassword() {
    const length = document.getElementById("length").value;
    const hasUpper = document.getElementById("uppercase").checked;
    const hasLower = document.getElementById("lowercase").checked;
    const hasNumber = document.getElementById("numbers").checked;
    const hasSymbol = document.getElementById("symbols").checked;

    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const number = "0123456789";
    const symbol = "!@#$%^&*()_+";

    let chars = "";

    if (hasUpper) chars += upper;
    if (hasLower) chars += lower;
    if (hasNumber) chars += number;
    if (hasSymbol) chars += symbol;

    let password = "";

    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    document.getElementById("result").value = password;
}

const caseInput = document.getElementById("caseInput");

function toUpper() {
    caseInput.value = caseInput.value.toUpperCase();
}

function toLower() {
    caseInput.value = caseInput.value.toLowerCase();
}

function toCapitalize() {
    caseInput.value = caseInput.value.charAt(0).toUpperCase() + caseInput.value.slice(1).toLowerCase();
}

function toTitle() {
    caseInput.value = caseInput.value
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}