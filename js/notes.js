// Html elements


let $noteForm = document.getElementById('createNote');
let $noteList = document.getElementById('notes');
let $hideButton = document.getElementById('hideButton');
let $noteInput = document.getElementById('noteInput');
let $searchInput = document.getElementById('searchInput');



//events

function addEvents(params){

    //Arrays

    const cancelButtonArray = document.getElementsByClassName('cancel');
    const noteArray = document.getElementsByClassName('noteList');
    const editButtonArray = document.getElementsByClassName('edit');
    const editInputArray = document.getElementsByClassName('editNote');
    const paraNoteArray = document.getElementsByClassName('list-content');


    //

    
    
    
    //Events

    $noteForm.addEventListener('submit',(event)=> addNotes(event,editInputArray,paraNoteArray));
    $hideButton.addEventListener('click', hideNotes);

    Array.from(cancelButtonArray).forEach((item,index,array)=>{
        item.addEventListener('click', ()=> {deleteNote(noteArray,index)});
})

    Array.from(editButtonArray).forEach((item,index)=>{
     item.addEventListener('click', ()=>editNote(paraNoteArray,editInputArray,index,))
})
  $noteInput.addEventListener('click', ()=>{
      const indexBlockInput = Array.from(editInputArray).findIndex((item)=>{
          return getComputedStyle(item).display === 'block';
      })
      if(indexBlockInput !== -1){
          editInputArray[indexBlockInput].value = '';
          editInputArray[indexBlockInput].style.display = 'none';
      }
  })

  $searchInput.addEventListener('keyup',(event)=>searchNote(event,paraNoteArray,noteArray))
}

function searchNote(event, paraNoteArray,noteArray){

   const searchValue = event.target.value.toUpperCase();



   for(let index = 0; index < paraNoteArray.length; index++){
       const note = paraNoteArray[index].innerHTML.toUpperCase();

       if(note.includes(searchValue)){
           noteArray[index].style.display = 'block'
       }else{
           noteArray[index].style.display = 'none'
       }
   }
}

addEvents()

function editNote(paraNoteArray,editInputArray,index,){

    $noteInput.value = ''; //empty the create note inpute

    

    const indexBlockInput = Array.from(editInputArray).findIndex((item)=>{

       return getComputedStyle(item).display === 'block';
    })

       if(indexBlockInput === -1){

      editInputArray[index].style.display = 'block';
      editInputArray[index].value = paraNoteArray[index].innerHTML;
       
    }else{
        //hide the current input displaying
        editInputArray[indexBlockInput].value = '';
        editInputArray[indexBlockInput].style.display = 'none';

        //display the new input
        editInputArray[index].style.display = 'block';
        editInputArray[index].value = paraNoteArray[index].innerHTML;
    }

}

function deleteNote(noteArray,index){
   noteArray[index].style.display = 'none';
}

function hideNotes(){
    const isBlock = window.getComputedStyle($noteList).display === 'block';
    if(isBlock){
        $noteList.style.display = 'none';
        $hideButton.innerHTML = 'Show Notes';
    }
    else{
        $noteList.style.display = 'block';
        $hideButton.innerHTML = 'Hide Notes';
    }
}



function addNotes(event, editInputArray,paraNoteArray){
    event.preventDefault();

    const indexBlockInput = Array.from(editInputArray).findIndex((item)=>{
        return getComputedStyle(item).display==='block';
    })

    let inputValue = event.target.elements['0'].value; 

    if(indexBlockInput !== -1 && editInputArray[indexBlockInput].value !== ''){
        paraNoteArray[indexBlockInput].innerHTML = editInputArray[indexBlockInput].value;
        editInputArray[indexBlockInput].value = '';
        editInputArray[indexBlockInput].style.display = 'none';
    }else if(inputValue !== ''){

    

        const note = document.createElement('li');

        note.className = 'noteList';
        note.innerHTML = `<p class = 'list-content'>${event.target.elements['0'].value}</p
        class = "icons"> <span> <button class="cancel"><i class=" fa fa-window-close"
        id="icon"></i><button>
        <button class="edit"><i class="fa fa-edit"></i></button>
        </span>
        </div><input type="text" class="editNote">`;

        $noteList.appendChild(note);

        //to remove
        event.target.elements['0'].value = '';
        
        addEvents();
        
    }
}
