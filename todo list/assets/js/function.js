

// function save data local storage
function saveTOls(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

// 

function getTols (key){
   const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}




