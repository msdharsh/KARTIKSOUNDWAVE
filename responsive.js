let library_btn = document.getElementsByClassName('library_btn');
let sidebar = Array.from(document.getElementsByClassName('sidebar'));
let dis_none = Array.from(document.getElementsByClassName('dis_none'));



Array.from(library_btn).forEach((e)=>{
    e.addEventListener('click',(()=>{
        //sidebar
        sidebar.forEach(box => {
            if( box.style.width == '340px'){
                box.style.width = '70px';
            }
            else{
                box.style.width = '340px';
            }
          });

          //display none of elements
          dis_none.forEach((el)=>{
 if(el.style.display =="inline"){
    el.style.display ="none"
 }
 else{
    el.style.display ="inline"
   
 }
          });



    }))
})

 