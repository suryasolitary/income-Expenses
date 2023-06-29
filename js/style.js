const Balance = document.querySelector('#balance');
const incomePrice=document.querySelector('#inc-price');
const ExpensesPrice=document.querySelector('#exp-price');
const description=document.querySelector('#desc');
const Amount=document.querySelector('#amount');
const TransactionUl=document.querySelector('#trans')
const Forms=document.querySelector('#form');
/*
let dummyData = [
    {id:1,description:'flower',amount:-200},
    {id:2,description:'Food',amount:-2000},
    {id:3,description:'Salary',amount:+30000},
    {id:4,description:'loan',amount:-3000},
    {id:5,description:'drinks',amount:-2500}
];

let transactions = dummyData;
*/

const localStorageTrans=JSON.parse(localStorage.getItem("TransactionUl"));

let transactions = localStorage.getItem("TransactionUl") !== null ? localStorageTrans:[];
console.log(transactions)


function ContentLoaded(transaction){
    let size = transaction.amount<0 ? "-" : "+";
    let item = document.createElement("li");
    item.classList.add(transaction.amount<0?"expen" : "inco");
    item.innerHTML=`${transaction.description} <span>${size} ${Math.abs(transaction.amount)}</span> <button class="btn-del" onclick="removeButton(${transaction.id})">X</button>`;
    TransactionUl.appendChild(item);
    
}

function removeButton(id){
    if(confirm(" You want to Delete transaction")){
       transactions = transactions.filter((transaction)=>transaction.id != id)
        config(); 
        UpdateLocalStorage();
    }else{
        return;
    }
}

function UpdateAmount(){
    let Amounts= transactions.map((transaction)=>transaction.amount);
    let total = Amounts.reduce((acc,item) => (acc+=item),0).toFixed(2) ;
    Balance.innerHTML=`₹ ${total}`
    let income= Amounts.filter((item)=>item>0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
    //console.log(income)
    let expenses= Amounts.filter((item)=>item<0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
    incomePrice.innerHTML=`₹ ${income}`
    ExpensesPrice.innerHTML=`₹ ${Math.abs(expenses)}`

}
function config(){
   TransactionUl.innerHTML = " " ;
   transactions.forEach(ContentLoaded)
   UpdateAmount();
 
}

function updatetransaction(e){
    e.preventDefault();
    if(description.value.trim()=="" || amount.value.trim()=="")
    {
        alert("Please Enter Your Description and Amount !!!")
    }else{
        const transaction={
            id:uniId(),
            description:description.value,
            amount: +amount.value
        }
        console.log(transaction)
        transactions.push(transaction);
        ContentLoaded(transaction);
        description.value="";
        amount.value="";
        UpdateAmount();
        UpdateLocalStorage()
        console.log(transactions)
    }

}
function uniId(){
   return Math.floor(Math.random()*100000);
}

Forms.addEventListener('submit',updatetransaction);

window.addEventListener("load",function(){
  config();
});

function UpdateLocalStorage(){
    localStorage.setItem("TransactionUl",JSON.stringify(transactions));
}






