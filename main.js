import './style.css'

const musics = [
    { id:1, title : "Hard To Love - BLACKPINK" ,            music : "./music/y2mate.com - BLACKPINK  Hard to Love Official Audio.mp3"},
    { id:2, title : "Howls Moving Castle OST Theme Song" ,  music : "./music/y2mate.com - Howls Moving Castle OST  Theme Song.mp3"},
    { id:3, title : "Murder In My Mind - Kordhell" ,        music : "./music/y2mate.com - KORDHELL  MURDER IN MY MIND.mp3"},
    { id:4, title : "Fall In Love - LilZ" ,                 music : "./music/y2mate.com - LilZ   Fall in Love Official Video.mp3"},
    { id:5, title : "Close To The Sun - TheFatRat" ,        music : "./music/y2mate.com - TheFatRat  Anjulie  Close To The Sun.mp3"},
    { id:6, title : "Until I Found You - Stephen Sanchez" , music : "./music/y2mate.com - until I found you  Stephen Sanchez ft em beihold  sub español lyrics.mp3"}
]

const playingMusic_container = document.querySelector('.playingMusic_container');
const playAudio = document.querySelector('.play_audio');
const playPlay = document.querySelector('.play_play');
const playPause = document.querySelector('.play_pause');
const musicTime = document.querySelector('.music_time');
const musicCurrentTime = document.querySelector('.music_current_time');
const currentProgress = document.querySelector('#current_progress');
const playPrevious = document.querySelector('.play_previous');
const playNext = document.querySelector('.play_next')


const playAndPause = () => {
    playPlay.classList.add('d-none')
    playPause.classList.remove('d-none')
}
const pauseAndPlay = () => {
    playPlay.classList.remove('d-none')
    playPause.classList.add('d-none')
}

const runControl = () => {
    playAudio.play();
    playAndPause()
}
musics.forEach(item=> {
    const musicTitle=document.createElement('div');
    musicTitle.classList.add('musicTitle_byOne','p-3','fw-bold','pb-2');
    const title = String( musics.indexOf(item) + 1)+"." +" "+item.title;
    musicTitle.textContent=title;

    musicTitle.addEventListener('click',()=>{
        playAudio.src= item.music;
        runControl()
    })
    playingMusic_container.append(musicTitle)
})

// const track = playAudio.getAttribute('src')
playPause.addEventListener('click',()=> {
    // track==='' ? console.log('yes') : console.log('no')
    playAudio.pause()
    pauseAndPlay()
})

playPlay.addEventListener("click",()=> {
    const track = playAudio.getAttribute('src')
    if(track!==''){
        runControl()
    }else {
        playAudio.src=musics[0].music
        runControl()
    }
});

const timingHandler = (e) => {
    const minutes = Math.floor(e / 60);
    const seconds = Math.floor(e % 60);
    const holeMin = minutes<10 ?"0"+String(minutes) : minutes;
    const holeSec = seconds<10 ?"0"+String(seconds) : seconds;
    const musicDuration = holeMin+ ":"+holeSec;
    return musicDuration;
}

let musicData = 0;
playAudio.addEventListener('loadeddata',()=>{
    const duration =Math.floor(playAudio.duration)
    musicData = 400/duration;
    const musicDuration = timingHandler(duration)
    musicTime.innerText=String(musicDuration)
})
playAudio.addEventListener('timeupdate',()=>{
    const currentTime = Math.floor(playAudio.currentTime);
    const musicDuration = timingHandler(currentTime)
    musicCurrentTime.textContent=String(musicDuration)
    const result = Math.floor(musicData * currentTime)
    currentProgress.style.width = result+'px'
})

playPrevious.addEventListener('click',()=>{
    const track = playAudio.getAttribute('src')
    const musicIndex = musics.indexOf(musics.find(item=>item.music === track))
    if(musicIndex === -1 || musicIndex === 0 ){
       return;
    }else{
        playAudio.src = musics[musicIndex - 1].music
        runControl()
    }
})
playNext.addEventListener('click',()=>{
    const track = playAudio.getAttribute('src')
    const musicIndex = musics.indexOf(musics.find(item=>item.music === track))
    if(musicIndex === musics.length-1){
        return;
    }else{
        playAudio.src = musics[musicIndex +1].music
        runControl()
    }
})