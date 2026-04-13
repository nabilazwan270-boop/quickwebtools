/* =========================
   WORD COUNTER
========================= */
const textInput = document.getElementById("textInput");

if (textInput) {
    textInput.addEventListener("input", () => {
        const text = textInput.value;

        const words = text.trim().match(/\S+/g);
        const wordCount = words ? words.length : 0;

        const charCount = text.length;

        const wordEl = document.getElementById("wordCount");
        const charEl = document.getElementById("charCount");

        if (wordEl) wordEl.textContent = wordCount;
        if (charEl) charEl.textContent = charCount;
    });
}

/* =========================
   PASSWORD GENERATOR
========================= */
function generatePassword() {

    const lengthEl = document.getElementById("length");
    const upperEl = document.getElementById("uppercase");
    const lowerEl = document.getElementById("lowercase");
    const numberEl = document.getElementById("numbers");
    const symbolEl = document.getElementById("symbols");
    const resultEl = document.getElementById("result");

    if (!lengthEl || !resultEl) return;

    const length = parseInt(lengthEl.value);

    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const number = "0123456789";
    const symbol = "!@#$%^&*()_+";

    let chars = "";

    if (upperEl?.checked) chars += upper;
    if (lowerEl?.checked) chars += lower;
    if (numberEl?.checked) chars += number;
    if (symbolEl?.checked) chars += symbol;

    if (!chars) {
        alert("Select at least one option");
        return;
    }

    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    resultEl.value = password;
}

/* =========================
   COPY TO CLIPBOARD
========================= */
function copyResult(id = "result") {
    const el = document.getElementById(id);
    if (!el) return;

    el.select();
    el.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(el.value);

    alert("Copied to clipboard!");
}

/* =========================
   CASE CONVERTER
========================= */
const caseInput = document.getElementById("caseInput");

function toUpper() {
    if (caseInput) caseInput.value = caseInput.value.toUpperCase();
}

function toLower() {
    if (caseInput) caseInput.value = caseInput.value.toLowerCase();
}

function toCapitalize() {
    if (!caseInput) return;
    caseInput.value =
        caseInput.value.charAt(0).toUpperCase() +
        caseInput.value.slice(1).toLowerCase();
}

function toTitle() {
    if (!caseInput) return;

    caseInput.value = caseInput.value
        .toLowerCase()
        .split(" ")
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");
}

/* =========================
   TEXT REVERSER (future tool)
========================= */
function reverseText() {
    const input = document.getElementById("reverseInput");
    const output = document.getElementById("reverseOutput");

    if (!input || !output) return;

    output.value = input.value.split("").reverse().join("");
}

/* =========================
   RANDOM NUMBER GENERATOR
========================= */
function generateRandom() {
    const min = parseInt(document.getElementById("min")?.value) || 0;
    const max = parseInt(document.getElementById("max")?.value) || 100;
    const result = document.getElementById("randomResult");

    if (!result) return;

    result.value = Math.floor(Math.random() * (max - min + 1)) + min;
}

const loremParagraphsInput = document.getElementById("loremParagraphs");
const loremSentencesInput = document.getElementById("loremSentences");
const loremResult = document.getElementById("loremResult");
const loremStats = document.getElementById("loremStats");

const loremSentencePool = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
    "Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
    "Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque.",
    "Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.",
    "Fusce nec tellus sed augue semper porta. Mauris massa.",
    "Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora."
];

function getRandomSentence() {
    const index = Math.floor(Math.random() * loremSentencePool.length);
    return loremSentencePool[index];
}

function countWords(text) {
    const words = text.trim().match(/\S+/g);
    return words ? words.length : 0;
}

function updateLoremStats() {
    if (!loremResult || !loremStats) return;

    const text = loremResult.value;
    const words = countWords(text);
    const chars = text.length;

    loremStats.textContent = `Words: ${words} | Characters: ${chars}`;
}

function generateLorem() {
    if (!loremResult) return;

    const paragraphs = Math.max(1, Math.min(parseInt(loremParagraphsInput?.value || "3", 10), 20));
    const sentencesPerParagraph = Math.max(1, Math.min(parseInt(loremSentencesInput?.value || "4", 10), 10));

    let output = "";

    for (let p = 0; p < paragraphs; p++) {
        const paragraph = [];
        for (let s = 0; s < sentencesPerParagraph; s++) {
            paragraph.push(getRandomSentence());
        }
        output += paragraph.join(" ") + (p < paragraphs - 1 ? "\n\n" : "");
    }

    loremResult.value = output;
    updateLoremStats();
}

async function copyLorem() {
    if (!loremResult) return;

    const text = loremResult.value.trim();
    if (!text) {
        alert("Nothing to copy yet.");
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    } catch (error) {
        loremResult.select();
        document.execCommand("copy");
        alert("Copied to clipboard!");
    }
}

function clearLorem() {
    if (!loremResult) return;

    loremResult.value = "";
    if (loremParagraphsInput) loremParagraphsInput.value = 3;
    if (loremSentencesInput) loremSentencesInput.value = 4;
    updateLoremStats();
}

if (loremResult) {
    loremResult.addEventListener("input", updateLoremStats);
}

if (loremParagraphsInput) {
    loremParagraphsInput.addEventListener("change", generateLorem);
}

if (loremSentencesInput) {
    loremSentencesInput.addEventListener("change", generateLorem);
}

let qrInstance = null;

function generateQRCode() {
    const text = document.getElementById("qrText").value.trim();
    const size = parseInt(document.getElementById("qrSize").value) || 256;
    const dark = document.getElementById("qrDark").value;
    const light = document.getElementById("qrLight").value;
    const level = document.getElementById("qrLevel").value;
    const canvas = document.getElementById("qrCanvas");
    const message = document.getElementById("qrMessage");
    const logoInput = document.getElementById("qrLogo");

    if (!text) {
        message.textContent = "Enter text first.";
        return;
    }

    const tempDiv = document.createElement("div");

    new QRCode(tempDiv, {
        text: text,
        width: size,
        height: size,
        colorDark: dark,
        colorLight: light,
        correctLevel: QRCode.CorrectLevel[level]
    });

    const qrCanvas = tempDiv.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = light;
    ctx.fillRect(0, 0, size, size);

    ctx.drawImage(qrCanvas, 0, 0);

    // Add logo center
    if (logoInput.files && logoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const logo = new Image();
            logo.onload = function() {
                const logoSize = size * 0.2;
                const x = (size - logoSize) / 2;
                const y = (size - logoSize) / 2;

                ctx.fillStyle = "#ffffff";
                ctx.fillRect(x - 5, y - 5, logoSize + 10, logoSize + 10);

                ctx.drawImage(logo, x, y, logoSize, logoSize);
            };
            logo.src = e.target.result;
        };
        reader.readAsDataURL(logoInput.files[0]);
    }

    message.textContent = "QR code generated.";
}

function downloadQRCode() {
    const canvas = document.getElementById("qrCanvas");
    const link = document.createElement("a");

    link.download = "qr-code.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

function clearQRCode() {
    document.getElementById("qrText").value = "";
    document.getElementById("qrLogo").value = "";
    document.getElementById("qrCanvas").getContext("2d").clearRect(0,0,1000,1000);
    document.getElementById("qrMessage").textContent = "Cleared.";
}

document.addEventListener("DOMContentLoaded", () => {
    const qrTextEl = document.getElementById("qrText");

    if (qrTextEl) {
        qrTextEl.addEventListener("input", () => {
            if (qrTextEl.value.trim() !== "") {
                generateQRCode();
            }
        });
    }
});

const input = document.getElementById("jsonInput");
const output = document.getElementById("jsonOutput");
const status = document.getElementById("jsonStatus");

function formatJSON() {
    try {
        const parsed = JSON.parse(input.value);
        output.value = JSON.stringify(parsed, null, 2);
        setStatus("✅ Valid JSON - Formatted");
    } catch (e) {
        setStatus("❌ Invalid JSON");
    }
}

function minifyJSON() {
    try {
        const parsed = JSON.parse(input.value);
        output.value = JSON.stringify(parsed);
        setStatus("✅ JSON Minified");
    } catch (e) {
        setStatus("❌ Invalid JSON");
    }
}

function validateJSON() {
    try {
        JSON.parse(input.value);
        setStatus("✅ JSON is Valid");
    } catch (e) {
        setStatus("❌ JSON is Invalid");
    }
}

function clearJSON() {
    input.value = "";
    output.value = "";
    status.textContent = "";
}

function copyJSON() {
    output.select();
    document.execCommand("copy");
    setStatus("✅ Copied to clipboard");
}

function setStatus(msg) {
    status.textContent = msg;
}

/* =========================
   URL ENCODER / DECODER
========================= */
const urlInput = document.getElementById("urlInput");
const urlOutput = document.getElementById("urlOutput");
const urlStatus = document.getElementById("urlStatus");
const encodeMode = document.getElementById("encodeMode");

function setURLStatus(message) {
    if (!urlStatus) return;
    urlStatus.textContent = message;
}

function encodeURL() {
    if (!urlInput || !urlOutput) return;

    const text = urlInput.value.trim();
    if (!text) {
        setURLStatus("Enter text or URL first.");
        urlOutput.value = "";
        return;
    }

    try {
        const mode = encodeMode?.value || "uri";
        const result =
            mode === "component"
                ? encodeURIComponent(text)
                : encodeURI(text);

        urlOutput.value = result;
        setURLStatus("Encoded successfully.");
    } catch (error) {
        setURLStatus("Failed to encode.");
    }
}

function decodeURL() {
    if (!urlInput || !urlOutput) return;

    const text = urlInput.value.trim();
    if (!text) {
        setURLStatus("Enter encoded text first.");
        urlOutput.value = "";
        return;
    }

    try {
        const result = decodeURIComponent(text);
        urlOutput.value = result;
        setURLStatus("Decoded successfully.");
    } catch (error) {
        setURLStatus("Invalid encoded text.");
    }
}

function swapURL() {
    if (!urlInput || !urlOutput) return;

    const temp = urlInput.value;
    urlInput.value = urlOutput.value;
    urlOutput.value = temp;
    setURLStatus("Swapped input and result.");
}

async function copyURL() {
    if (!urlOutput) return;

    const text = urlOutput.value.trim();
    if (!text) {
        setURLStatus("Nothing to copy.");
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        setURLStatus("Copied to clipboard.");
    } catch (error) {
        urlOutput.select();
        document.execCommand("copy");
        setURLStatus("Copied to clipboard.");
    }
}

function clearURL() {
    if (urlInput) urlInput.value = "";
    if (urlOutput) urlOutput.value = "";
    setURLStatus("");
}

function loadURLExample() {
    if (!urlInput) return;

    urlInput.value = "https://example.com/search?q=hello world&lang=id";
    if (encodeMode) encodeMode.value = "uri";
    encodeURL();
}