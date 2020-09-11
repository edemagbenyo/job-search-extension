const radios = document.querySelectorAll("input[type=radio]");
const positions = document.querySelector(".positions");
const new_job_position_input = document.querySelector('#new_job_position_input');
const new_job_position_form = document.querySelector('#new_job_position_form');
const flash_job_position=  document.querySelector('.flash_job_position');
// positions.addEventListener("change", function (e) {
//   if (e.type == "change") {
//     chrome.storage.sync.set({job_position:e.target.value},()=>{})
//   }
// });
// positions.addEventListener("dblclick", function (e) {
//   if (e.target.tagName == "SPAN") {
//     console.dir(e.target)
//   }
// });

chrome.storage.sync.get(['job_position'],(result)=>{
  new_job_position_input.value=result['job_position']
})

//create new position
new_job_position_form.addEventListener('submit',(e)=>{

  //save position in storage
  e.preventDefault();
  chrome.storage.sync.set({job_position:new_job_position_input.value},()=>{

    flash_job_position.style.visibility="visible"
    flash_job_position.textContent="Job position updated!";
    setTimeout(() => {
      flash_job_position.style.visibility="hidden"
    }, 3000);
  })

  // e.preventDefault()
  // if(new_job_position_input.value!=="" && new_job_position_input.value.length>=2){
  //   const radio_job_span= document.createElement('span');
  //   const radio_job= document.createElement('input');
  //   console.log(caseTitle(new_job_position_input.value))
  // }
})

const caseTitle = (str)=>{
  let arr =  str.split(" ");
  for(let i=0; i<arr.length; i++){
    arr[i] = arr[i].slice(0,1).toUpperCase()+arr[i].slice(1)
  }

  return arr.join(" ");
}
