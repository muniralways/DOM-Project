/* ---------- ১. Random HEX Code Generator ---------- */
/* একটি 6-digit হেক্স স্ট্রিং তৈরি করে: "0123456789abcdef" থেকে */
function generateHexCode() {
    const chars = "0123456789abcdef";
    let hex = "";
    for (let i = 0; i < 6; i++) {
        hex += chars[Math.floor(Math.random() * 16)];
    }
    return hex;
}

/* ---------- ২. N সংখ্যক ইউনিক HEX কোড তৈরি ---------- */
/* generateHexCode() ব্যবহার করে; ডুপ্লিকেট এড়াতে Set ব্যবহার */
function generateAllHexCode(numberOfColors) {
    const set = new Set();
    while (set.size < numberOfColors) {
        set.add(generateHexCode());
    }
    return set;  // যেমন {"a3f4d2","ff00aa",...}
}

/* ---------- ৩. কপি টু ক্লিপবোর্ড হেল্পার ---------- */
function copyToClipboard(text) {
    navigator.clipboard?.writeText(text).then(() => {
        info.textContent = `${text} copied`;
    }).catch(() => {
        info.textContent = `Copy failed`;
    });
}

/* ---------- ৪. DOM Element তৈরি ---------- */
/* color="a3f4d2" হলে div-এর ব্যাকগ্রাউন্ড হবে "#a3f4d2" */
function generateElement(tagName, color) {
    const el = document.createElement(tagName);
    el.className = "color-box";
    el.style.background = "#" + color;
    el.textContent = "#" + color;

    el.title = "Click to copy";
    el.addEventListener("click", () => copyToClipboard("#" + color));

    return el;
}

/* ---------- ৫. রঙগুলো পেজে দেখানো ---------- */
/* প্রতিটি color নিয়ে generateElement() কল করা হয় */
function renderColors(colorSet, rootEl) {
    rootEl.innerHTML = "";
    colorSet.forEach(color => {
        rootEl.appendChild(generateElement("div", color));
    });
}

/* ---------- ৬. ইনপুট পড়া + ভ্যালিডেশন + পুরো প্রসেস চালানো ---------- */
function handleGenerate() {
    const numberOfColors = Number(num.value)|| 1;

    // ইনপুট চেক
    if (!Number.isInteger(numberOfColors) || numberOfColors < 1) {
        alert('Enter a positive number');
        return;
    } else if (numberOfColors > 500) {
        alert("Server may slow down for too many colors!");
    }

    // রঙ জেনারেট করা
    const colors = generateAllHexCode(numberOfColors);
    renderColors(colors, root);

    // তথ্য দেখানো
    info.textContent = `Generated ${colors.size} unique colors`;
}
