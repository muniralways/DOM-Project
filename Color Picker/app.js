

const num = document.getElementById("num");
const generate = document.getElementById("generate");
const root = document.getElementById("root");
const info = document.getElementById("info");


/* ---------- ইভেন্ট সেটআপ ---------- */
generate.addEventListener("click", handleGenerate);

/* পেজ লোডেই ডিফল্ট কিছু কালার দেখাই */
handleGenerate();