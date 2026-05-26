// 1. Initialize Variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItemContainer = document.querySelector('.songItemContainer');

// 2. Song Database (12 Hindi Super Hits)
let songs = [
    { songName: "Tum Hi Ho - Arijit Singh", filePath: "songs/1.mp3", coverPath: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=50&q=80" },
    { songName: "Channa Mereya - Arijit Singh", filePath: "songs/2.mp3", coverPath: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=50&q=80" },
    { songName: "Tujh Mein Rab Dikhta Hai", filePath: "songs/3.mp3", coverPath: "https://images.unsplash.com/photo-1493225457124-a1a2a5f52968?w=50&q=80" },
    { songName: "Kal Ho Naa Ho - Sonu Nigam", filePath: "songs/4.mp3", coverPath: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=50&q=80" },
    { songName: "Kabira - Tochi Raina", filePath: "songs/5.mp3", coverPath: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=50&q=80" },
    { songName: "Agar Tum Saath Ho", filePath: "songs/6.mp3", coverPath: "https://images.unsplash.com/photo-1458560871784-56d23406c091?w=50&q=80" },
    { songName: "Tera Ban Jaunga", filePath: "songs/7.mp3", coverPath: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=50&q=80" },
    { songName: "Raabta - Arijit Singh", filePath: "songs/8.mp3", coverPath: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=50&q=80" },
    { songName: "Gerua - Arijit Singh", filePath: "songs/9.mp3", coverPath: "https://images.unsplash.com/photo-1517230878791-229b4b42e47d?w=50&q=80" },
    { songName: "Ghungroo - Arijit Singh", filePath: "songs/10.mp3", coverPath: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=50&q=80" },
    { songName: "Jai Ho - A.R. Rahman", filePath: "songs/11.mp3", coverPath: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=50&q=80" },
    { songName: "Apna Bana Le", filePath: "songs/12.mp3", coverPath: "https://images.unsplash.com/photo-1485030056468-3820ff9e6e90?w=50&q=80" }
];

// 3. Render Songs into your CSS Layout
songs.forEach((element, i) => {
    let songHTML = `
        <div class="songItem">
            <img src="${element.coverPath}" alt="cover">
            <span class="songName">${element.songName}</span>
            <span class="songlistplay">
                <span class="timestamp"><i id="${i}" class="fa-regular fa-circle-play songItemPlay"></i></span>
            </span>
        </div>
    `;
    songItemContainer.innerHTML += songHTML;
});

// 4. Handle Master Play/Pause Click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        if (!audioElement.src) {
            playSpecificSong(0);
        } else {
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        makeAllPlays(); // Reset small icons
    }
});

// 5. Update Progress Bar
audioElement.addEventListener('timeupdate', () => {
    if(audioElement.duration) {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
        myProgressBar.value = progress;
    }
});

// 6. Seek functionality
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// 7. Core Play Logic
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}

function playSpecificSong(index) {
    audioElement.src = songs[index].filePath;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    
    // Update bottom Master button
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    
    // Update small icon in the list
    makeAllPlays();
    let currentIcon = document.getElementById(index.toString());
    if (currentIcon) {
        currentIcon.classList.remove('fa-circle-play');
        currentIcon.classList.add('fa-circle-pause');
    }
}

// 8. Individual List Item Clicks
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => { 
        songIndex = parseInt(e.target.id);
        playSpecificSong(songIndex);
    })
});

// 9. Next Button
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0; 
    } else {
        songIndex += 1;
    }
    playSpecificSong(songIndex);
});

// 10. Previous Button
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0; 
    } else {
        songIndex -= 1;
    }
    playSpecificSong(songIndex);
});