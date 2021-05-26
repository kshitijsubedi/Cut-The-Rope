let mainMenu = document.getElementById('menu')
let playButton  = document.getElementById('play-button')
let musicButton = document.getElementById('music-button')

playButton.addEventListener('click',(e)=>{
    stage = 'level';
    mainMenu.style.display='none';
    canvas.style.display='block';
    transition.close('levels')
})

musicButton.style.background=`url('./assets/musicMute.png') no-repeat`
musicButton.style.left='5%'
musicButton.style.bottom='10%'

musicButton.addEventListener('click',(e)=>{
    if(music){
        music=false;
        backgroundSound.pause()
        musicButton.style.background=`url('./assets/musicMute.png') no-repeat`
    }else {
        music=true;
        backgroundSound.play()
        musicButton.style.background=`url('./assets/musicPlay.png') no-repeat`
    }
})