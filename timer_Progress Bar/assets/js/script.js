const start = document.getElementById('start');
const stop = document.getElementById('stop'); 
const inputTime = document.getElementById('input_time');
const output = document.getElementById('output_width');
const output_val = document.getElementById('output_val');

function conver_percentage(current_val, input_val) {
  return (current_val / input_val) * 100;
}

let time = 0;

start.addEventListener('click', function() {
  let input_value = Number(inputTime.value);
  let current_val = 0;

  clearInterval(time); // Prevent multiple intervals

  time = setInterval(function() {
    current_val++;
    let percent = conver_percentage(current_val, input_value);

    output.style.width = percent + '%';
    output.innerText = current_val  ;
    output_val.innerText = current_val + 's';

    if (current_val >= input_value) {
      clearInterval(time);
    }
  }, 1000);

  console.log(current_val);
});

stop.addEventListener('click', () => {
  clearInterval(time);
});