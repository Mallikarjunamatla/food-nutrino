const usda = new Usda();



const getForm = document.getElementById('get');
let foodName = document.getElementById('foodName');
const profile = document.querySelector('#profile');
const loader = document.querySelector('#loader');
let userText="";
let prevVal ;
let tot ;
let pageVal = 1;
//console.log(pageVal);

getForm.addEventListener('submit', (e) => {
   // confoodName.value);
    userText = foodName.value;
    console.log(userText);
     pageVal =usda.firstPage();
    if(userText!==""){
        prevVal = userText;
       // pageVal = 1;
        loader.style.display = 'block';
        //const nextContent = await fetchData()
       
      
        usda.getFood(userText,pageVal)
        .then( data => {
            if(data.foodProfile.foods.length === 0)
            {
               const alert = document.createElement('h2');
               alert.className = 'alert';
               alert.textContent = 'Food Not found';
               profile.innerHTML = '';
               profile.appendChild(alert);
               loader.style.display = 'none'
            }else{
                console.log(data)
                loader.style.display = 'none'
                generate_table(data.foodProfile)
            }
           
        });
        
       
    }
    else{
        loader.style.display = 'none'
        profile.innerHTML="";
    }

    e.preventDefault();
});

function generate_table(foodProfile) {
    
    profile.innerHTML='';
    const currentPage = foodProfile.currentPage;
    const food = foodProfile.foodSearchCriteria.query;
    const foods = foodProfile.foods;
        tot = foodProfile.totalPages;
    const foodDesc = document.createElement('div');
        foodDesc.innerHTML =`<ul class="food-desc">
                                    <li>Food Name : ${userText.toUpperCase()}</li>
                                   
                                    <li>Current Page : ${currentPage}</li>
                             </ul>`;
        profile.appendChild(foodDesc);

    foods.forEach((food) => {

        // const addDesc = (food.additionalDescriptions!==undefined || food.additionalDescriptions!=="")? food.additionalDescriptions : food.foodCategory; 
        
        const foodDetails = document.createElement('div');
        foodDetails.innerHTML =`<ul class="food-details">
                                    <li class="food-category" >Food Category : ${food.foodCategory}</li>
                                    <li>Description : ${food.description}</li>
                                   


                                    <li>Published Date : ${food.publishedDate}</li>
                                    <li class="note"><i>Please note Food Category before reading table values</li>
                                </ul>`
                                ;
        profile.appendChild(foodDetails);
        //console.log(food.foodNutrients[i].nutrientName);
        //console.log(food.foodNutrients[i].value);
        const foodNutrients = food.foodNutrients;
        //console.log(food.foodNutrients);

        const tableArea = document.createElement("div");
        tableArea.className = 'table';
        const table  =  document.createElement("table");
        const tblBody = document.createElement("tbody");
        tblBody.innerHTML = `<tr>
                                <th>Nutrient Name</th>
                                <th>Value(per 100g)</th> 
                             </tr>`
        
            

        foodNutrients.forEach(nutrino =>{
            const tnutrino = document.createElement("tr");

        
            //const table = document.createElement("table");
           if(nutrino.unitName.toLowerCase() === 'ug' ){
                nutrino.unitName = 'μG';
           }
          

            tnutrino.innerHTML = `<td>${nutrino.nutrientName}</td>
                                  <td>${nutrino.value}${nutrino.unitName.toLowerCase()}</td>`;
            tblBody.appendChild(tnutrino);
        });
       table.appendChild(tblBody);
       tableArea.appendChild(table);
       profile.appendChild(tableArea);
            //console.log(table)
          
         // food.foodNutrients.forEach()
        

        

        // creates a <table> element and a <tbody> element
    
    });
    const paginate =   document.createElement('div');
             paginate.innerHTML = `<input type="button" onclick="firt()" id="first"  value="first" />
                                <input type="button" id="next" onclick="seco()"  value="next" />
                                <input type="button" id="previous" onclick="prev()" value="previous" />
                                <input type="button" id="last" onclick="last(tot)" value="last" />`;
            paginate.style.display ='flex';
             profile.appendChild(paginate);

     
  
      

    foodName.value="";
}
/*const firstItr = document.getElementById(first);
const secondItr = document.getElementById(next);
const thirdItr = document.getElementById(previous);
const fourthItr = document.getElementById(last);*/

function firt (){
    pageVal = usda.firstPage();
       // const fname = 'apple';
   // getForm.addEventListener('submit', (e) => {
        console.log(prevVal);
        //console.log(pageVal);

        //const userText = e.target.value;
    
        //if(foodName.value!==""){
            loader.style.display = 'block';
            //const nextContent = await fetchData()
           
           console.log(pageVal);
            usda.getFood(prevVal,pageVal)
            .then( data => {
                
                    console.log(data)
                    loader.style.display = 'none'
                    generate_table(data.foodProfile)
                }
               
            );
            if (window.scrollY) {
                window.scroll(0, 0);  // reset the scroll position to the top left of the document.
              }
}
function seco() {
        pageVal = usda.nextPage();
       // const fname = 'apple';
   // getForm.addEventListener('submit', (e) => {
        console.log(prevVal);
        //console.log(pageVal);

        //const userText = e.target.value;
    
        //if(foodName.value!==""){
            loader.style.display = 'block';
            //const nextContent = await fetchData()
           
           console.log(pageVal);
            usda.getFood(prevVal,pageVal)
            .then( data => {
                
                    console.log(data)
                    loader.style.display = 'none'
                    generate_table(data.foodProfile)
                }
               
            );
            
           
            if (window.scrollY) {
                window.scroll(0, 0);  
              }
       
       // e.preventDefault();
    
    //console.log(pageVal)
   // usda.getFood(firstVal);

    //next.value = nextVal;
}

function prev() {
   // usda.previousPage();
    pageVal = usda.previousPage();
       // const fname = 'apple';
   // getForm.addEventListener('submit', (e) => {
        console.log(prevVal);
        //console.log(pageVal);

        //const userText = e.target.value;
    
        //if(foodName.value!==""){
            loader.style.display = 'block';
            //const nextContent = await fetchData()
           
           console.log(pageVal);
            usda.getFood(prevVal,pageVal)
            .then( data => {
                
                    console.log(data)
                    loader.style.display = 'none'
                    generate_table(data.foodProfile)
                }
               
            );
            if (window.scrollY) {
                window.scroll(0, 0);  // reset the scroll position to the top left of the document.
              }
}


function last(tot) {
    console.log(tot);
    // usda.lastPage(tot);
     pageVal = usda.lastPage(tot);
       // const fname = 'apple';
   // getForm.addEventListener('submit', (e) => {
        console.log(prevVal);
        //console.log(pageVal);

        //const userText = e.target.value;
    
        //if(foodName.value!==""){
            loader.style.display = 'block';
            //const nextContent = await fetchData()
           
           console.log(pageVal);
            usda.getFood(prevVal,pageVal)
            .then( data => {
                
                    console.log(data)
                    loader.style.display = 'none'
                    generate_table(data.foodProfile)
                }
               
            );
            if (window.scrollY) {
                window.scroll(0, 0);  // reset the scroll position to the top left of the document.
              }
   // console.log(pageVal);
   // usda.getFood(firstVal);

    //next.value = nextVal;
}
/*thirdItr.addEventListener('click',(e) => {
    const preVal = usda.previousPage();
   // usda.getFood(firstVal);

    previous.value = preVal;
})
fourthItr.addEventListener('click',(e) => {
    const lastVal = usda.lastPage();
   // usda.getFood(firstVal);

    last.value = lastVal;
})*/
  
