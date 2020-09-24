const audio = new Audio();
audio.src = "Castle of Glass.mp3";


//Loads the audio sorce, filepath is passed from data-attributes
let loadAudio = (filepath) => {
    this.filepath = filepath;
    audio.src = filepath;
}
//changes cover art of playing song
let changeImg = (coverart) => {
    this.coverart = coverart
    $("#mainimage").attr("src", this.coverart);
} 
//changes title of playing same 
let changeTitle = (title,artist) => {
    this.title = title;
    this.artist = artist;
    $("#songtitle").text(this.title);
    $("#artisttitle").text(this.artist);
}

// play button controls 
let play = () => {
    if(audio.paused === true){
        
    audio.play();
        $("#play").removeClass("fa-play-circle");
        $("#play").addClass("fa-pause-circle");
    } else {
    audio.pause();
        $("#play").addClass("fa-play-circle");
        $("#play").removeClass("fa-pause-circle");


    }
};

//sets play possition for use with playlist and play all button feature
let PlayPossition = 0;
let initalPlay = () =>{
    PlayPossition = 0;
    audio.src = playlistload[PlayPossition].file;
    $("#mainimage").attr("src", playlistload[PlayPossition].cover);
    $("#songtitle").text(playlistload[PlayPossition].title);
    $("#artisttitle").text(playlistload[PlayPossition].name);
    play();

};

let shufflePlay = () =>{
    if(PlayPossition > playlistload.length -1|| PlayPossition <0){
        PlayPossition = 0;
    }
    audio.src = playlistload[PlayPossition].file;
    $("#mainimage").attr("src", playlistload[PlayPossition].cover);
    $("#songtitle").text(playlistload[PlayPossition].title);
    $("#artisttitle").text(playlistload[PlayPossition].name);
    play();
};

// music controls
let forward = () => {
    if(shuffleOnOff){
        PlayPossition = Math.floor(Math.random() * Math.floor(playlistload.length));
        shufflePlay();
    } else {
    PlayPossition ++;
    shufflePlay();
    }
};

let rewind = () => {
    if(shuffleOnOff){
        PlayPossition = Math.floor(Math.random() * Math.floor(playlistload.length));
        shufflePlay();
    } else {
    PlayPossition --;
    shufflePlay();
    }
};

//shuffle feature
let shuffleOnOff = false;
let shuffle = () => {
    if (!shuffleOnOff){
        shuffleOnOff = true;;
        $(".fa-random").css({"color" : "green"});
    } else {
        shuffleOnOff = false;
        $(".fa-random").css({"color" : "white"});

    }
}
