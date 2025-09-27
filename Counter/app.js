

const counterValue = document.getElementById("counter-value");
const allBtn = document.querySelectorAll (".btn");


let count = 0;



allBtn.forEach((btn) =>{
    btn.addEventListener("click", function(e){
        const btnClass =e.target.classList;

        if(btnClass.contains("increase")){
            count ++;
        }else if(btnClass.contains("decrease")){
            count --
        }else if(btnClass.contains("reset")){
            count = 0;
        }
        
        counterValue.style.color = count >  0 ? "green" : count < 0 ? "red" : "black" 

        counterValue.innerText =count;
    })
    
})