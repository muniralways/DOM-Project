// ============================
// CONFIG: বসাবে শুধু এই লিংক
// ============================
const TASK_API_URL = "https://script.google.com/macros/s/AKfycbwzhNZgeSuDFGpa2FCm6nMOS0I9Cmn5e6sLt-0N57jzzAuXmX3e6hCMz0q_s7XXpKSf6g/exec";       // Replace with your Web App URL
const CATEGORY_API_URL = "https://script.google.com/macros/s/AKfycbwzhNZgeSuDFGpa2FCm6nMOS0I9Cmn5e6sLt-0N57jzzAuXmX3e6hCMz0q_s7XXpKSf6g/exec";   // Same Web App URL (distinction via isCategory)

// ============================
// GLOBAL MODAL / DOM ELEMENTS
// ============================
const saveButton = document.getElementById('saveButton');       // Task Form Save button
const taksInput = document.getElementById('task_form');        // Task Form
const Cata_btn = document.getElementById('cata_save');         // Category Save button

// Timer
const timeDisplay = document.getElementById('timeDisplay');
const startButton = document.getElementById('startBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const savetBtn = document.getElementById('saveBtn');           // Timer Save button
const timer_taskInput = document.getElementById('timer_taskInput')

// Tables
const show_category = document.getElementById('show_category');
const show_time_taks = document.getElementById('show_time_taks');

// Timer Variables
let elapsedTime = 0;
let timerInterval = null;

// ============================
// INITIAL LOAD
// ============================
show_taks_time();
loadCata();
show_taks_gategory();

// ============================
// TIMER FUNCTIONS
// ============================
function updateTimeDisplay() {
  const hr = Math.floor(elapsedTime / 3600);
  const mins = Math.floor((elapsedTime % 3600) / 60);
  const sec = elapsedTime % 60;
  timeDisplay.textContent = `${hr<10?'0':''}${hr}:${mins<10?'0':''}${mins}:${sec<10?'0':''}${sec}`;
}

startButton.addEventListener('click', e=>{
  e.preventDefault();
  if(!timerInterval){
    timerInterval = setInterval(()=>{ elapsedTime++; updateTimeDisplay(); }, 1000);
  }
});

pauseButton.addEventListener('click', e=>{
  e.preventDefault();
  clearInterval(timerInterval); timerInterval = null;
});

resetBtn.addEventListener('click', e=>{
  e.preventDefault();
  clearInterval(timerInterval); timerInterval=null; elapsedTime=0; updateTimeDisplay();
});

// ============================
// TIMER TASK SAVE
// ============================
savetBtn.addEventListener('click', async e=>{
  e.preventDefault();
  const name = timer_taskInput.value.trim();
  const category = document.getElementById('task_category').value;
  if(!name || !category){ alert("Enter Task and select Category"); return; }

  const hr = Math.floor(elapsedTime/3600);
  const mins = Math.floor((elapsedTime%3600)/60);
  const sec = elapsedTime%60;
  const timeSpent = `${hr<10?'0':''}${hr}:${mins<10?'0':''}${mins}:${sec<10?'0':''}${sec}`;

  const taskData = {
    name: name,
    category: category,
    time: timeSpent,
    timestamp: new Date().toLocaleString()
  };

  await fetch(TASK_API_URL, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(taskData)
  });

  elapsedTime=0; updateTimeDisplay(); timer_taskInput.value="";
  show_taks_time();
});

// ============================
// TASK FORM SUBMIT
// ============================
saveButton.addEventListener('click', async e=>{
  e.preventDefault();
  const name = document.getElementById('task_name').value.trim();
  const desc = document.getElementById('task_description').value.trim();
  const date = document.getElementById('task_date').value;
  const category = document.getElementById('task_category').value;
  if(!name || !category || !date){ alert("Fill all fields"); return; }

  const newTask = {name, desc, date, category};

  await fetch(TASK_API_URL, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(newTask)
  });

  taksInput.reset();
  show_taks_time();
  loadCata();
});

// ============================
// CATEGORY SAVE
// ============================
Cata_btn.addEventListener('click', async e=>{
  e.preventDefault();
  const name = document.getElementById('catagory_name').value.trim();
  const desc = document.getElementById('catagory_description').value.trim();
  if(!name) return;

  const newCata = {name, desc, isCategory:true};

  await fetch(CATEGORY_API_URL, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(newCata)
  });

  document.getElementById('catagory_name').value="";
  document.getElementById('catagory_description').value="";
  loadCata();
  show_taks_gategory();
});

// ============================
// LOAD CATEGORIES INTO SELECT
// ============================
async function loadCata(){
  const res = await fetch(CATEGORY_API_URL + "?category=true");
  const data = await res.json();
  const select = document.getElementById('task_category');
  select.innerHTML='<option value="">Select Category</option>';
  data.forEach(c=>{
    const option = document.createElement('option');
    option.value = c.name;
    option.textContent = c.name;
    select.appendChild(option);
  });
}

// ============================
// SHOW TASKS
// ============================
async function show_taks_time(){
  const res = await fetch(TASK_API_URL);
  const data = await res.json();
  if(!data.length){
    show_time_taks.innerHTML=`<tr><td colspan="5" class="text-center">No tasks saved yet</td></tr>`;
    return;
  }
  let rows="";
  data.forEach((item,i)=>{
    rows+=`<tr>
      <th scope="row">${i+1}</th>
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>${item.time || ""}</td>
      <td>${item.timestamp || ""}</td>
    </tr>`;
  });
  show_time_taks.innerHTML=rows;
}

// ============================
// SHOW CATEGORIES IN TABLE
// ============================
async function show_taks_gategory(){
  const res = await fetch(CATEGORY_API_URL + "?category=true");
  const data = await res.json();
  if(!data.length){
    show_category.innerHTML=`<tr><td colspan="2" class="text-center">No category saved yet</td></tr>`;
    return;
  }
  let rows="";
  data.forEach((item,i)=>{
    rows+=`<tr>
      <th scope="row">${i+1}</th>
      <td>${item.name}</td>
      <td>${item.desc}</td>
    </tr>`;
  });
  show_category.innerHTML=rows;
}
