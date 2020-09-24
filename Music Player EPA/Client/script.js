var getAllSongs = () => {
$.ajax({
    url: "music/",
    type: "GET",
    dataType: "json", 
    success: (data) => {
        currentPlaylist = [];
        for (let i = 0, l = data.length; i < l; i++) {
            
            currentPlaylist.push(data[i].filepath,data[i].coverart);
        }
        console.log(currentPlaylist);

    }
})
}
var playlistindex;

/*
All features in this section control the side nav buttons including the 
Playlist
Playlist create
Song Search 
Play all 
Add to playlist
*/

//Search for song, ablum artist 
$("#searchButton").click(() => {
    const input = $("#search").val();

    const requestURL = "music/" + input.replace(/\s+/g, '%20'); //Removes whitespace in db call
    $.ajax({
    url: requestURL,
    type: "GET",
    dataType: "json",
    success: (data) => {
        if(data){ 
            $('ul,li').remove();

            $('<ul class="searchHeader"> </li>').text("Songs").appendTo('#songs');
            $("<ul class='playall' onclick='initalPlay()''>").text("Play All").appendTo('#songs');
            $('<ul class="albumHeader"> </ul>').text("Albums").appendTo('#albums');
            $('<ul class="artistHeader"> </ul>').text("Artist").appendTo('#artist');
            playlistload.length = 0;


            $(data).each(function(i, value) {
                $("<li>", {
                  "class": "results",
                  text:  value.songtitle,
                  attr: {
                    ["data-file"]: value.filepath,
                    ["data-image"]: value.coverart,
                    ["data-title"]: value.songtitle,
                    ["data-artist"]: value.name
                  },
                  appendTo: "#songsection",
                  on: {click: event => {
                                loadAudio(event.target.dataset.file);
                                changeImg(event.target.dataset.image);
                                changeTitle(event.target.dataset.title,event.target.dataset.artist)
                                play();
                                
                              },
                              
                      }
                })
                playlistload.push(
                    {name: value.name, title: value.songtitle, cover: value.coverart, file:value.filepath}
                );
              });

            var albumArray = [];
            for(var i = 0; i < data.length; i++){
                if(albumArray.indexOf(data[i].albumtitle) == -1){
                    albumArray.push(data[i].albumtitle);  
                }
            }

            for(var i = 0; i < albumArray.length; i++){
            $('<li class="results" onclick=""> </li>').text(albumArray[i]).appendTo('#albumsection');
            }

            var artistArray = [];
            for(var i = 0; i < data.length; i++){
                if(artistArray.indexOf(data[i].name) == -1){
                    artistArray.push(data[i].name);  
                }
            }
            for(var i = 0; i < artistArray.length; i++){
            $('<li class="results" onclick=""> </ul>').text(artistArray[i]).appendTo('#artistsection');
             }
            }
        } 
    })
})

//show all songs
$("#songbutton").click(() => {
$.ajax({
    url: "music/song",
    type: "GET",
    dataType: "json",
    success: (data) => {
        if(data){ 
            $('ul,li').remove();
            $('.playall').remove();
            $('<ul class="searchHeader"> </li>').text("Songs").appendTo('#songs');
            $("<ul class='playall' onclick='initalPlay()''>").text("Play All").appendTo('#songs');
            playlistload.length = 0;



            $(data).each(function(i, value) {
                $("<li>", {
                  "class": "results",
                  text:  value.title,
                  attr: {
                    ["data-file"]: value.filepath,
                    ["data-image"]: value.coverart,
                    ["data-title"]: value.title,
                    ["data-artist"]: value.artist
                  },
                  appendTo: "#songsection",
                  on: {click: event => {
                    console.log(event.target.dataset.file, $(this)[0].outerHTML);
                                loadAudio(event.target.dataset.file);
                                changeImg(event.target.dataset.image);
                                changeTitle(event.target.dataset.title,event.target.dataset.artist)
                                play();
                                
                              }
                      }
                })
                playlistload.push(
                    {name: value.artist, title: value.title, cover: value.coverart, file:value.filepath}
                );
                console.log(value.title);
              });
        }
    }
    })
})

//Show all playlist's
$("#playlistbutton").click(() => {
    $.ajax({
        url: "music/playlist",
        type: "GET",
        dataType: "json",
        success: (data) => {
            playlistload.length = 0;
            if(data){ 
                $('ul,li').remove();
                $('<ul class="searchHeader"> </li>').text("Playlist").appendTo('#songs');
                let playlistarray = [];
                let playlistid = [];
                let playlistsongs = [];
                for(var i = 0; i < data.length; i++){
                if(playlistarray.indexOf(data[i].name) == -1){
                    playlistarray.push(data[i].name); 
                    playlistid.push(data[i].id); 
                    console.log(playlistid);
                }
            }
                
            for(var i = 0; i < playlistarray.length; i++){
                $('<li class="playlistresults"> </li>').text(playlistarray[i]).appendTo('#songsection');
                }

                $(".playlistresults").click((e) => {
                    $('.playlistheader').remove();
                    $('.playall').remove();
                    $('<ul class="playlistheader"> </li>').text("Song's in Playlist").appendTo('#albums');
                    $("<ul class='playall' onclick='initalPlay()''>").text("Play All").appendTo('#albums');
                    
                    var txt = $(e.target).text();
                    playlistindex = playlistarray.indexOf(txt);
                    playlistsongs = [];

                    $.ajax({
                        url: "music/playlistview",
                        type: "GET",
                        dataType: "json",
                        success: (data) => {
                            $('.playlistsongresults').remove();
                            playlistload.length = 0;

                            $(data).each(function(i, value) {
                                if (value.playlistname === $(e.target).text()){
                                $("<li>", {
                                  "class": "playlistsongresults",
                                  text:  value.songtitle,
                                  attr: {
                                    ["data-file"]: value.filepath,
                                    ["data-image"]: value.coverart,
                                    ["data-title"]: value.songtitle,
                                    ["data-artist"]: value.name,


                                  },
                                  appendTo: "#playsongsection",
                                  on: {click: event => {
                                                loadAudio(event.target.dataset.file);
                                                changeImg(event.target.dataset.image);
                                                changeTitle(event.target.dataset.title,event.target.dataset.artist)
                                                play();
                                              }
                                      }
                                })
                                playlistload.push(
                                    {name: value.name, title: value.songtitle, cover: value.coverart, file:value.filepath}
                                );
                                playlistsongs.push(value.songtitle);
                            }
                                
                              });
                        }
                        
                    })
                    

                }) 

                    $(".playlistresults").click((e) => {
                    $('.addsongheader').remove();
                    $('<ul class="addsongheader"> </li>').text("Add Song's").appendTo('#playlistaddsongheader');
                    $.ajax({
                        url: "music",
                        type: "GET",
                        dataType: "json",
                        success: (data) => {
                            $('.playlistadd').remove();
                            console.log(playlistsongs);

                            $(data).each(function(i, value) {
                                if(playlistsongs.indexOf(value.songtitle) == -1){
                                $("<li>", {
                                  "class": "playlistadd",
                                  text:  value.songtitle,
                                  attr: {
                                    ["data-file"]: value.filepath
                                  },
                                  appendTo: "#playlistaddsong",
                                  on: {click: event => {
                                    console.log(playlistid[playlistindex])
                                      console.log(value.id)
                                        $.ajax({
                                            url: "music/playlistx",
                                            type: "POST",
                                            data: {
                                                id: playlistid[playlistindex],
                                                songid: value.id
                                            },
                                            dataType: "text",
                                            success: (data) => {
                                                console.log("Data posted");
                                            }
                                        } )
                                            $("#playlistbutton").click();
                                        
                                        }
                                    }
                                })
                            }
                            
                            });
                           
                            
                        }
                
                    })
                })
                
        }
    }
    })
    
})

