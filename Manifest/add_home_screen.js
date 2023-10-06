if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js');
  });
};

let download_app = Array.from(document.querySelectorAll('.download_app'));
download_app.forEach((e)=>{
 e.style.display = 'none'
})

let deferredPrompt;
window.addEventListener('beforeinstallprompt',(e)=>{
  e.preventDefault();
  deferredPrompt = e;
  download_app.forEach((e)=>{
    e.style.display = 'inline-block';
    e.addEventListener('click',(e)=>{
deferredPrompt.prompt();
deferredPrompt.userChoice
.then((choiceResult)=>{
  if(choiceResult.outcome === "accepted"){
    console.log("user accepted A2HS")
  }else{
    console.log('user dismissed')
  }
  deferredPrompt = null
})
    })
   });

});