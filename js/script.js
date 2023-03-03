const loadData=async(dataLimit)=>{
const res= await fetch('https://openapi.programming-hero.com/api/ai/tools');
const json= await res.json();
displayLoadData(json.data.tools,dataLimit)  
}
const displayLoadData=(tools,dataLimit)=>{
  const toolsContainer= document.getElementById('tools-container');
  toolsContainer.textContent='';
  const showAll=document.getElementById('seeAll');
  if(dataLimit && tools.length>6){
   tools= tools.slice(0,6);
   showAll.classList.remove('invisible')
  }
  else{
    showAll.classList.add('invisible')
  }
  tools.forEach(tool => {
   // console.log(tool)  
   const div=document.createElement('div');
   div.classList.add='card w-96 bg-base-100 shadow-xl'
   div.innerHTML=`
   <div class="border-solid border border-rgba(17, 17, 17, 0.1)-800 rounded-xl p-6 min-h-[550px] md:min-h-[650px] ">
   <figure ><img class="rounded-xl h-50 lg:h-72" src=${tool.image} alt="Shoes" /></figure>
   <div class="card-body p-0">
     <h2 class="card-title pt-12 font-bold text-2xl">
     Features
     </h2>
     <ol>
     <li>1.${tool.features[0]?tool.features[0]:''}</li>
     <li>2. ${tool.features[1]?tool.features[1]:''}</li>
     <li>${tool.features[2]?`3. ${tool.features[2]}`:''}</li>
     <li>${tool.features[3]?`4. ${tool.features[3]}`:''}</li>
     </ol>
     <hr class="my-6">
       <div class="flex justify-between items-center ">
       <div>
       <h2 class="text-2xl pb-4 font-bold">${tool.name}</h2>
       <p><i class="fa-solid pr-2 text-[gray] fa-calendar-days"></i>${tool.published_in}</p>
       </div> 
     <div><i class="fa-sharp p-2 rounded-full bg-[#faf8f8] hover:bg-[#be4b4b] text-[#cc4646] hover:text-[white] text-2xl fa-regular fa-circle-right"></i></div>
   </div>
 </div></div>`
 toolsContainer.appendChild(div);
});
toggleSpinner(false)
}
loadData(6);
document.getElementById('seeAll').addEventListener('click',function(){
  toggleSpinner(true)
  loadData();
});

const toggleSpinner=isLoading=>{
  const loaderSection=document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('invisible')
  }
  else{
    loaderSection.classList.add('invisible')
  }
}

