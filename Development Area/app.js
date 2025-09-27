const form_input = document.getElementById('form_input');
const msg= document.getElementById('msg');
const data_list = document.getElementById('data_list');



form_input.addEventListener('submit', (e) => {
    e.preventDefault();

let name  =form_input.querySelector('input[name="name"]').value;
let email = form_input.querySelector('input[name="email"]').value;
let role  = form_input.querySelector('select[name="role"]').value;
let genderInput = form_input.querySelector('input[type=radio]:checked');
let gender = genderInput ? genderInput.value : '';
let skillInputs = form_input.querySelectorAll('input[name="skill"]:checked');
// let skil = Array.from(skillInputs).map(input => input.value);


//checkbox value
let skil_value = [];


skillInputs.forEach((input) => {
    skil_value.push(input.value);
})




// Check if any field is empty
if(name === '' || email === '' || role === '' || gender === '') {
  msg.innerHTML = setAllert('Please fill all the fields and select a gender', 'danger');
}else{
    msg.innerHTML = setAllert('Form submitted successfully', 'success');
   
    // Reset the form after a delay
   
    setTimeout(() => {
        msg.innerHTML = '';
        form_input.reset();
    }, 2000);
}


data_list.innerHTML = `
    <h2>Form Data</h2>
    <p>Name: ${name}</p>
    <p>Email: ${email}</p>
    <p>Role: ${role}</p>
    <p>Gender: ${gender}</p>
    <p>Skills: ${skil_value.join(', ')}</p>
`;
});