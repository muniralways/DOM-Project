// ফর্ম এবং মেসেজ এলিমেন্ট সিলেক্ট করা
const form_input = document.getElementById('form_mariage');
const msg = document.getElementById('msg');

form_input.onsubmit = (e) => {
    e.preventDefault(); // সাবমিট এড়িয়ে JS দ্বারা হ্যান্ডেল করা

    // ইনপুট ভ্যালু নেওয়া
    let name = form_input.querySelector('input[name="name"]').value;
    let age = parseInt(form_input.querySelector('input[name="age"]').value); // string -> number
    let gender = form_input.querySelector('input[name="gender"]:checked'); // সিলেক্ট করা radio

    // gender অনুযায়ী legal marriage age নির্ধারণ
    let gender_val = gender ? (gender.value == 'male' ? 21 : 18) : 0;

    // ===============================
    // ফর্ম validation
    // ===============================
    // যদি নাম ফাঁকা হয়, বয়স সংখ্যা না হয় বা gender সিলেক্ট না করা হয়
    if (!name.trim() || isNaN(age) || !gender) {
        msg.innerHTML = setAlert('All fields are required', 'danger');
        return; // validation fail হলে পরবর্তী লজিক চলবে না
    }

    // ===============================
    // লজিক: বয়স + gender অনুযায়ী মেসেজ দেখানো
    // ===============================
    if(age >= gender_val && gender.value == 'male') {
        // পুরুষ এবং বয়স >= 21
        msg.innerHTML = setAlert(`Hi ${name} vaiya, You are ${age} years old. You can married now`, 'success');
    } else if(age < gender_val && gender.value == 'male') {
        // পুরুষ এবং বয়স < 21
        msg.innerHTML = setAlert(`Hi ${name} vaiya, You are ${age} years old. Please wait ${gender_val - age} years`, 'success');
    } else if(age >= gender_val && gender.value == 'female') {
        // নারী এবং বয়স >= 18
        msg.innerHTML = setAlert(`Hi ${name} apu, You are ${age} years old. You can married now`, 'success');
    } else if(age < gender_val && gender.value == 'female') {
        // নারী এবং বয়স < 18
        msg.innerHTML = setAlert(`Hi ${name} apu, You are ${age} years old. Please wait ${gender_val - age} years`, 'success');
    }
}
