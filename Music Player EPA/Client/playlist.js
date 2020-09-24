let currentPlaylist = {};

let playlistload = [];

var test = () => {
    console.log(playlistload[0].name);
}
// playlist creation + database post
$("#createPlaylist").click(() => {
    let playlistName = prompt("name of play list");
    if (playlistName != ''){
    console.log(playlistName);
    
        $.ajax({
            url: "music/playlist",
            type: "POST",
            data: {
                name: playlistName

            },
            dataType: "text",
            success: (data) => {
                console.log("Data posted");
            }
         } )
        } else {
            alert("Playlist name cannot be empty!")
        }

})





