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

/* =========================
   BASE64 ENCODER / DECODER
========================= */
const base64Input = document.getElementById("base64Input");
const base64Output = document.getElementById("base64Output");
const base64Status = document.getElementById("base64Status");
const base64Mode = document.getElementById("base64Mode");

function setBase64Status(message) {
    if (base64Status) base64Status.textContent = message;
}

function bytesToBase64(bytes) {
    let binary = "";
    const chunkSize = 0x8000;

    for (let i = 0; i < bytes.length; i += chunkSize) {
        const chunk = bytes.subarray(i, i + chunkSize);
        binary += String.fromCharCode(...chunk);
    }

    return btoa(binary);
}

function base64ToBytes(base64) {
    const clean = base64
        .replace(/\s+/g, "")
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const padding = clean.length % 4;
    const normalized = padding ? clean + "=".repeat(4 - padding) : clean;

    const binary = atob(normalized);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return bytes;
}

function encodeBase64(text) {
    const bytes = new TextEncoder().encode(text);
    return bytesToBase64(bytes);
}

function decodeBase64(text) {
    const bytes = base64ToBytes(text);
    return new TextDecoder().decode(bytes);
}

function processBase64() {
    if (!base64Input || !base64Output) return;

    const text = base64Input.value.trim();
    if (!text) {
        base64Output.value = "";
        setBase64Status("Enter text first.");
        return;
    }

    try {
        const mode = base64Mode?.value || "encode";

        if (mode === "decode") {
            base64Output.value = decodeBase64(text);
            setBase64Status("Decoded successfully.");
        } else {
            base64Output.value = encodeBase64(text);
            setBase64Status("Encoded successfully.");
        }
    } catch (error) {
        base64Output.value = "";
        setBase64Status("Invalid Base64 text.");
    }
}

function swapBase64() {
    if (!base64Input || !base64Output) return;

    const temp = base64Input.value;
    base64Input.value = base64Output.value;
    base64Output.value = temp;
    setBase64Status("Swapped input and result.");
}

async function copyBase64() {
    if (!base64Output) return;

    const text = base64Output.value.trim();
    if (!text) {
        setBase64Status("Nothing to copy.");
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        setBase64Status("Copied to clipboard.");
    } catch (error) {
        base64Output.select();
        document.execCommand("copy");
        setBase64Status("Copied to clipboard.");
    }
}

function clearBase64() {
    if (base64Input) base64Input.value = "";
    if (base64Output) base64Output.value = "";
    if (base64Mode) base64Mode.value = "encode";
    setBase64Status("");
}

function loadBase64Example() {
    if (!base64Input) return;

    base64Mode.value = "encode";
    base64Input.value = "Hello world!";
    processBase64();
}

/* =========================
   UNIT CONVERTER
========================= */
const unitTypeEl = document.getElementById("unitType");
const fromUnitEl = document.getElementById("fromUnit");
const toUnitEl = document.getElementById("toUnit");
const unitInputEl = document.getElementById("unitInput");
const unitOutputEl = document.getElementById("unitOutput");
const unitStatusEl = document.getElementById("unitStatus");

const unitData = {
    length: {
        label: "Length",
        units: {
            mm: { label: "Millimeter", factor: 0.001 },
            cm: { label: "Centimeter", factor: 0.01 },
            m: { label: "Meter", factor: 1 },
            km: { label: "Kilometer", factor: 1000 },
            in: { label: "Inch", factor: 0.0254 },
            ft: { label: "Foot", factor: 0.3048 },
            yd: { label: "Yard", factor: 0.9144 },
            mi: { label: "Mile", factor: 1609.344 }
        }
    },
    weight: {
        label: "Weight",
        units: {
            mg: { label: "Milligram", factor: 0.000001 },
            g: { label: "Gram", factor: 0.001 },
            kg: { label: "Kilogram", factor: 1 },
            t: { label: "Ton", factor: 1000 },
            oz: { label: "Ounce", factor: 0.028349523125 },
            lb: { label: "Pound", factor: 0.45359237 }
        }
    },
    temperature: {
        label: "Temperature",
        units: {
            c: { label: "Celsius" },
            f: { label: "Fahrenheit" },
            k: { label: "Kelvin" }
        }
    },
    area: {
        label: "Area",
        units: {
            mm2: { label: "Square Millimeter", factor: 0.000001 },
            cm2: { label: "Square Centimeter", factor: 0.0001 },
            m2: { label: "Square Meter", factor: 1 },
            km2: { label: "Square Kilometer", factor: 1000000 },
            ha: { label: "Hectare", factor: 10000 },
            ac: { label: "Acre", factor: 4046.8564224 },
            ft2: { label: "Square Foot", factor: 0.09290304 }
        }
    },
    volume: {
        label: "Volume",
        units: {
            ml: { label: "Milliliter", factor: 0.001 },
            l: { label: "Liter", factor: 1 },
            m3: { label: "Cubic Meter", factor: 1000 },
            tsp: { label: "Teaspoon", factor: 0.00492892159375 },
            tbsp: { label: "Tablespoon", factor: 0.01478676478125 },
            cup: { label: "Cup", factor: 0.24 },
            gal: { label: "US Gallon", factor: 3.785411784 }
        }
    },
    speed: {
        label: "Speed",
        units: {
            mps: { label: "Meter/Second", factor: 1 },
            kph: { label: "Kilometer/Hour", factor: 0.2777777778 },
            mph: { label: "Mile/Hour", factor: 0.44704 },
            knot: { label: "Knot", factor: 0.5144444444 }
        }
    }
};

function setUnitStatus(message) {
    if (unitStatusEl) unitStatusEl.textContent = message;
}

function populateUnitOptions(type) {
    if (!fromUnitEl || !toUnitEl || !unitData[type]) return;

    const units = unitData[type].units;
    const keys = Object.keys(units);

    fromUnitEl.innerHTML = "";
    toUnitEl.innerHTML = "";

    keys.forEach((key, index) => {
        const option1 = document.createElement("option");
        option1.value = key;
        option1.textContent = units[key].label;

        const option2 = document.createElement("option");
        option2.value = key;
        option2.textContent = units[key].label;

        fromUnitEl.appendChild(option1);
        toUnitEl.appendChild(option2);

        if (index === 0) fromUnitEl.value = key;
        if (index === 1) toUnitEl.value = key;
    });

    if (keys.length > 1) {
        toUnitEl.value = keys[1];
    } else {
        toUnitEl.value = keys[0];
    }
}

function convertTemperature(value, from, to) {
    let celsius;

    if (from === "c") {
        celsius = value;
    } else if (from === "f") {
        celsius = (value - 32) * 5 / 9;
    } else if (from === "k") {
        celsius = value - 273.15;
    }

    if (to === "c") return celsius;
    if (to === "f") return (celsius * 9 / 5) + 32;
    if (to === "k") return celsius + 273.15;

    return NaN;
}

function convertUnit() {
    if (!unitTypeEl || !fromUnitEl || !toUnitEl || !unitInputEl || !unitOutputEl) return;

    const type = unitTypeEl.value;
    const from = fromUnitEl.value;
    const to = toUnitEl.value;
    const value = parseFloat(unitInputEl.value);

    if (Number.isNaN(value)) {
        unitOutputEl.value = "";
        setUnitStatus("Enter a valid number.");
        return;
    }

    let result;

    try {
        if (type === "temperature") {
            result = convertTemperature(value, from, to);
        } else {
            const units = unitData[type].units;
            const fromFactor = units[from].factor;
            const toFactor = units[to].factor;
            const baseValue = value * fromFactor;
            result = baseValue / toFactor;
        }

        if (!Number.isFinite(result)) {
            unitOutputEl.value = "";
            setUnitStatus("Conversion failed.");
            return;
        }

        unitOutputEl.value = formatUnitResult(result);
        setUnitStatus("Converted successfully.");
    } catch (error) {
        unitOutputEl.value = "";
        setUnitStatus("Conversion failed.");
    }
}

function formatUnitResult(value) {
    if (Math.abs(value) >= 1000000 || (Math.abs(value) > 0 && Math.abs(value) < 0.0001)) {
        return value.toExponential(6);
    }

    return parseFloat(value.toFixed(6)).toString();
}

function swapUnit() {
    if (!fromUnitEl || !toUnitEl) return;

    const temp = fromUnitEl.value;
    fromUnitEl.value = toUnitEl.value;
    toUnitEl.value = temp;

    convertUnit();
    setUnitStatus("Units swapped.");
}

function clearUnit() {
    if (unitInputEl) unitInputEl.value = "";
    if (unitOutputEl) unitOutputEl.value = "";
    if (unitStatusEl) unitStatusEl.textContent = "";
    if (unitTypeEl) unitTypeEl.value = "length";
    populateUnitOptions("length");
}

if (unitTypeEl) {
    populateUnitOptions(unitTypeEl.value);

    unitTypeEl.addEventListener("change", () => {
        populateUnitOptions(unitTypeEl.value);
        convertUnit();
    });
}

if (fromUnitEl) fromUnitEl.addEventListener("change", convertUnit);
if (toUnitEl) toUnitEl.addEventListener("change", convertUnit);
if (unitInputEl) unitInputEl.addEventListener("input", convertUnit);