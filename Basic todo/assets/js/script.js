const form = document.getElementById("input-form");
  const taskInput = document.getElementById("taskInput");
  const output = document.getElementById("output");


form.addEventListener("submit", function (e){
  e.preventDefault();

  const task = taskInput.value.trim();

   if(task === ""){
    alert ("Please enter a task.");
    return;
   }


  addTask(task);
  saveToLocalStorage(task);

})


//Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", function(){
  let tasks = JSON.parse (localStorage.getItem("tasks")|| []);
  tasks.forEach(task => addTask(task));
})


// Create list item
function addTask(task){
   let li = document.createElement("li");
   li.className = "list-group-item d-flex justify-content-between align-items-center";

   li.innerHTML = `${task} <button class="btn btn-danger btn-sm delete-btn">X</button>`;
   output.appendChild(li);
   taskInput.value = ""


}

//save to loval storage

function saveToLocalStorage(task){
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task)
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


output.addEventListener("click", function(e){

  if(e.target.classList.contains("delete-btn")){
    if(confirm("Are you sure you want to delete this task?")){
      const li = e.target.parentElement;
      const task = li.firstChild.textContent.trim();
      output.removeChild(li);



      //remove from localStorage

      let tasks = JSON.parse(localStorage.getItem("tasks")) || []
      tasks = tasks.filter (t => t !==  task);
       localStorage.setItem("tasks", JSON.stringify(tasks));

    }
  }

})