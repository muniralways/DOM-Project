const clear = document.querySelector(".clear");
const list = document.getElementById("list");
const input = document.getElementById("todo-input");
const addBtn = document.querySelector(".add");
const msg = document.querySelector(".msg");




const time = document.getElementById("time");
const date = document.getElementById("date");


//classess name
const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const lineThrough = "lineThrough";

//set date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", options);

//show time and date
const showTime = (time) =>{
    let timeNow = new Date();
    let hours =timeNow.getHours()
    let minutes = timeNow.getMinutes();

   
    let timeString =  "" + (hours > 12 ? hours -12: hours )

    timeString += (minutes <10 ?  ":0" :  ":"  ) + minutes;
    timeString += hours >= 12 ? ` PM` : " A.M";
   time.innerHTML = timeString;
}

showTime(time)
let todoLists = [];
let id = 0;

let storageData = localStorage.getItem("TODO");

// LocalStorage থেকে ডাটা আনা
if (storageData) {
    todoLists = JSON.parse(storageData); // ঠিক করা হলো
    id = todoLists.length;  // যত ডাটা আছে, সেই সংখ্যা থেকে নতুন id শুরু হবে
} else {
    todoLists = [];
    id = 0;
}

// Save Function
function save() {
    localStorage.setItem("TODO", JSON.stringify(todoLists));
}

function render(){
    list.innerHTML = "";

    todoLists.forEach ((item ,index)=>{
        list.innerHTML +=`<li class = "item">
        
        <p class = 'text'> ${index + 1} .${item.name}</p>
        </li>`
    }
)}

// Add Item Function
function addItem() {
    let todo = input.value;
    if (todo) {
        // Array তে নতুন টাস্ক যোগ করা
        todoLists.push({
            id: id,
            name: todo
        });

        id++;   // পরের টাস্কের জন্য id বাড়ালাম
        save(); // LocalStorage এ সেভ করলাম
        input.value = ""; // ইনপুট ফাঁকা
        render()
    }
}

// Add button এ ক্লিক করলে addItem() হবে
addBtn.addEventListener("click", addItem);
document.addEventListener('keyup', (e) => {
    if(e.key ==="Enter"){
        addItem();
    }
})
 render()
console.log(list);
