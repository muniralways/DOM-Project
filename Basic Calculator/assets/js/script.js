

let currentExpression = '';

function appendNumber (number){
    currentExpression += number;
    document.getElementById('sub-res').innerText = currentExpression;
}


function finalResult(){
    try{
        currentExpression = eval (
            currentExpression.replace('÷', '/').replace('×', '*')
        );
        document.getElementById('finalResult').innerText = currentExpression;
    } catch{
        if(currentExpression === '0'){
document.getElementById('finalResult').innerText = 'Error';
        }
        
    }
}
function clearResult() {
  currentExpression = '';
  document.getElementById('sub-res').innerText = '0';
  document.getElementById('finalResult').innerText = '';
}

