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
     <li>1. ${tool.features[0]?tool.features[0]:''}</li>
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
     <button  onclick="loadToolDetails('${tool.id}')"><label for="my-modal-3"><i class="fa-sharp p-2 rounded-full bg-[#faf8f8] hover:bg-[#be4b4b] text-[#cc4646] hover:text-[white] text-2xl fa-regular fa-circle-right"></i></label></button>
    
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

const toggleSpinner= isLoading =>{
  const loaderSection=document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('invisible')
  }
  else{
    loaderSection.classList.add('invisible')
  }
}

const loadToolDetails = async id =>{
  const res =await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
  const json= await res.json();
  displayToolDetails(json.data)
}
const displayToolDetails= data=>{
  console.log(data)
const modalLeft=document.getElementById('modal-left');

modalLeft.innerHTML=`
<div class="p-6">
<div>
<h2 class="text-2xl font-bold">${data.description}</h2>
<div class="grid grid-cols-3 gap-4 py-6">
<div class="bg-[#FFFFFF] rounded-xl text-[#03A30A] font-bold flex justify-center items-center flex-col">
${data.pricing?data.pricing[0].price:`free of cost/`}<br><span>${data.pricing?data.pricing[0].plan:`Basic`}
</div>
<div class="bg-[#FFFFFF] rounded-xl text-[#F28927] font-bold flex justify-center items-center flex-col">${data.pricing?data.pricing[1].price:`free of cost/`}<br><span>${data.pricing?data.pricing[1].plan:`Pro`}</div>
<div class="bg-[#FFFFFF] rounded-xl text-[#EB5757] font-bold flex text-center flex-col">${data.pricing?data.pricing[2].price:`free of cost/`}<br><span>${data.pricing?data.pricing[2].plan:`Enterprice`}</span></div>
</div>

<div class="grid grid-cols-2">
<div>
<h2 class="text-2xl font-bold pb-4">Features</h2>
<li>${data.features?data.features['1']?.feature_name:``}</li>
<li>${data.features?data.features['2']?.feature_name:``}</li>
<li>${data.features?data.features['3']?.feature_name:``}</li>
<li class="list-none">${data.features['4']?`<li>${data.features['4']?.feature_name}</li>`:``}</li>
</div>

<div>
<h2 class="text-2xl font-bold pb-4">Integrations</h2>
<li class="list-none">${data.integrations&&data.integrations[0]?`<li>${data.integrations[0]}</li>`:``}</li>
<li class="list-none">${data.integrations&&data.integrations[1]?`<li>${data.integrations[1]}</li>`:``}</li>
<li class="list-none">${data.integrations&&data.integrations[2]?`<li>${data.integrations[2]}</li>`:``}</li>
<li class="list-none">${data.integrations&&data.integrations[3]?`<li>${data.integrations[3]}</li>`:``}</li>
<li class="list-none">${data.integrations&&data.integrations[4]?`<li>${data.integrations[4]}</li>`:``}</li>
<li class="list-none">${data.integrations==null?`data not found`:``}</li>
</div>
</div>
</div>
</div>
`
const modalRight=document.getElementById('modal-right');
modalRight.innerHTML=`
<div class="relative p-6">
<img class="rounded-lg " src=${data.image_link[0]} alt="" />
<button class="btn btn-sm invisible">${data.accuracy&&data.accuracy.score?`<button class="btn btn-sm bg-[#EB5757] text-white border-none normal-case absolute right-8 top-8">${(data.accuracy.score)*100}% accuracy</button>`:``}</button></div>
<button class="btn btn-sm invisible">${data.accuracy==null?``:``}</button>
<h2 class="text-2xl font-bold text-center mt-6 mb-4">${data.input_output_examples&&data.input_output_examples[0]?data.input_output_examples[0].input:``}</h2>
<p class="text-center mb-6">${data.input_output_examples&&data.input_output_examples[0]?data.input_output_examples[0].output:``}</p>
<p>${data.input_output_examples==null?`<div><h2 class="text-2xl font-bold text-center mt-6 mb-4">Can you give any example?</h2><p class="text-center mb-6">No! Not Yet! Take a break!!!</p></div>`:``}</p>
`

}
