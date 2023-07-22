//get total
//creat product
//save local storeg
//clear inputs
//reat
//count
//delete
//search
//clean data
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let total=document.getElementById('total');
let discount=document.getElementById('discount');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let countOfProduct=document.getElementById('totalbr');
let up='create';
let temp;
let searchMode='title';
function getTotal(){
if(price.value !='')
{
    let result=+price.value+ +taxes.value+ +ads.value- +discount.value;
    total.innerHTML=result;
    total.style.background='#040';
    }
    else{
        total.style.background='rgb(190, 32, 21)';
        total.innerHTML='';
    }
}
let dataPro;
if(localStorage.product != null){
    dataPro=JSON.parse(localStorage.product);
    showData();
}
else{
dataPro=[];}
submit.onclick=function(){

    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    if(title.value !='' && price.value!='' && category.value!=''){
        if(up==='create'){
        if(newPro.count>1&&newPro.count<=100)
        {
            for(let i=0; i<newPro.count; i++)
            {
                dataPro.push(newPro);
            }
            window.alert('Added successfully');
        }
        else if(newPro.count==1)
        {
        dataPro.push(newPro);
        window.alert('Added successfully');
    }
        else{
            window.alert('you cant add more than 100 products');
            newPro.count.value=100;
        }
        getTotal();
}
        else{
            dataPro[temp]=newPro;
            count.style.display="block";
    submit.innerHTML="Create";
    up='create';

}
    localStorage.setItem('product',JSON.stringify(dataPro));
    showData();
    clearData();
    
    }
    else
    window.alert('Pleas Enter title, price and category at lest!');
    
}
function addNew(){
    let newPro={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }

    if(title.value !='' && price.value!='' && category.value!=''){
        if(newPro.count>1)
        {
            for(let i=0; i<newPro.count; i++)
            {
                dataPro.push(newPro);
            }
        }
        else
        {
        dataPro.push(newPro);}
        
    localStorage.setItem('product',JSON.stringify(dataPro));
    showData();
    clearData();
    window.alert('Added successfully');
    }
    else
    window.alert('Pleas Enter title, price and category at lest!');
}
function update(i){
    dataPro[i].title=title.value;
    dataPro[i].price=price.value;
    dataPro[i].taxes=taxes.value;
    dataPro[i].ads=ads.value;
    dataPro[i].discount=discount.value;
    dataPro[i].category=category.value;
    localStorage.setItem('product',JSON.stringify(dataPro));
    showData();
    clearData();
    window.alert('Updated successfully');
    up=false;
}
//clear inputs
function clearData(){
title.value='';
price.value='';
taxes.value='';
ads.value='';
discount.value='';
total.innerHTML='';
count.value='';
category.value='';
}

//read
function showData(){
    total.style.background='rgb(190, 32, 21)';
        total.innerHTML='';
    let table='';
    for(let i=0 ; i< dataPro.length ;i++){
        table+=`
        <tr>
                    <th>${i+1}</th>              
                    <th>${dataPro[i].title}</th>              
                    <th>${dataPro[i].price}</th>              
                    <th>${dataPro[i].taxes}</th>              
                    <th>${dataPro[i].ads}</th>              
                    <th>${dataPro[i].discount}</th>              
                    <th>${dataPro[i].total}</th>              
                    <th>${dataPro[i].category}</th>               
                    <th><button onclick="updateData(${i});" id="update">update</button></th>               
                    <th><button onclick="deletData(${i});" id="delet">Delet</button></th>               
                </tr>`
    }
    document.getElementById('tbody').innerHTML=table;
    let btnDelet=document.getElementById('deletall');
    if(dataPro.length>0)
    {
        btnDelet.innerHTML=`
        <button onclick="deletAll();">Delet All</button>
        `
    }
    else
    {
        btnDelet.innerHTML="";
    }
    countOfProduct.innerHTML=dataPro.length;
    if(dataPro.length>0)
countOfProduct.style.background='#040';
else
countOfProduct.style.background='rgb(190, 32, 21)';
}
//delet
function deletData(i){
    if(window.confirm('Are you sure you want to delete this item?')){
dataPro.splice(i, 1);
localStorage.product=JSON.stringify(dataPro);
showData();}
}
//delet all
function deletAll(){
    if(window.confirm('Are you sure you want to delete all data?')){
    dataPro.splice(0);
    localStorage.clear();
    showData();}
}
//update
function updateData(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    category.value=dataPro[i].category;
    getTotal();
    count.style.display="none";
    submit.innerHTML="Update";
    up='update';
    temp=i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}

function searchBy(id){
    let search=document.getElementById('search');
if(id==="searchTitle")
{
    searchMode='title';
}
else if(id==="searchCategory")
{
    searchMode='category';
}
search.placeholder='Search By '+searchMode;
search.focus();
search.value='';
showData();
}

function searchData(value){
let table='';
for(let i=0; i<dataPro.length; i++){
    if(searchMode=="title")
    {
            if(dataPro[i].title.includes(value.toLowerCase()))
            {
                table+=`
        <tr>
                    <th>${i+1}</th>              
                    <th>${dataPro[i].title}</th>              
                    <th>${dataPro[i].price}</th>              
                    <th>${dataPro[i].taxes}</th>              
                    <th>${dataPro[i].ads}</th>              
                    <th>${dataPro[i].discount}</th>              
                    <th>${dataPro[i].total}</th>              
                    <th>${dataPro[i].category}</th>               
                    <th><button onclick="updateData(${i});" id="update">update</button></th>               
                    <th><button onclick="deletData(${i});" id="delet">Delet</button></th>               
                </tr>`
            }
        }
    else if(dataPro[i].category.includes(value.toLowerCase()))           
            {
                table+=`
        <tr>
                    <th>${i+1}</th>              
                    <th>${dataPro[i].title}</th>              
                    <th>${dataPro[i].price}</th>              
                    <th>${dataPro[i].taxes}</th>              
                    <th>${dataPro[i].ads}</th>              
                    <th>${dataPro[i].discount}</th>              
                    <th>${dataPro[i].total}</th>              
                    <th>${dataPro[i].category}</th>               
                    <th><button onclick="updateData(${i});" id="update">update</button></th>               
                    <th><button onclick="deletData(${i});" id="delet">Delet</button></th>               
                </tr>`
            }
            document.getElementById('tbody').innerHTML=table;
            
        }
}