const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("db/music.db");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("Client"));
app.use(express.static("Client/Internal-Storage"));
app.use(express.static("db"));

//Inital sqlite call to get the view created in the db
app.get("/music", (req,res) => {
    db.all("SELECT * FROM v_music", (err,rows) => {
        if (err){ 
            console.log(err);
        } else {
            console.log(rows)
            res.send(rows);
        }
    })
})
//additional db call for just the song table
app.get("/music/song", (req,res) => {
    db.all("SELECT * FROM song", (err,rows) => {
        if (err){ 
            console.log(err);
        } else {
            console.log(rows)
            res.send(rows);
        }
    })
})
//db call to the playlist table to populate the playlist view
app.get("/music/playlist", (req,res) => {
    db.all("SELECT * FROM playlist", (err,rows) => {
        if (err){ 
            console.log(err);
        } else {
            console.log(rows)
            res.send(rows);
        }
    })
})
//db call to get the playlist view from the db
app.get("/music/playlistview", (req,res) => {
    // console.log(req.body);
    db.all("SELECT * FROM v_playlist", 

    // {
    //     $name: req.body.name
    // },
    (err,rows) => {
        if (err){ 
            console.log(err);
        } else {
            console.log(rows)
            res.send(rows);
        }
    })
})

// db call that uses user input for the search feature
app.get("/music/:table", (req,res) => {
    const input = req.params.table;
   
    
    db.all(
        
        "SELECT * FROM v_music WHERE name LIKE $name COLLATE NOCASE",
        {
            $name: "%" + input + "%"
            
        },
        (err,rows) => {
            console.log(rows);
            if (rows) {
                res.send(rows);
            } else {
                res.send({});
            }
        },
        
        
    )
    
})

//post requests to the server
app.post("/music/playlist", (req, res) => {
    console.log(req.body);
    db.run(
        "INSERT INTO playlist(name) VALUES($name)",
        {
            $name: req.body.name
        },
        (err) => {
            if(err) {
                res.send({message: "error in app.post(/music)"});
            } else {
                res.send({message: "successfully ran app.post(/music)"});
            }
        }
    )
});
//post the updated playlist song list
app.post("/music/playlistx", (req, res) => {
    console.log(req.body);
    db.run(
        "INSERT INTO playlistsongxref(playlistid, songid) VALUES($id, $songid) ",
        {
            $id: req.body.id,
            $songid: req.body.songid
        },
        (err) => {
            if(err) {
                res.send({message: "error in app.post(/music)"});
            } else {
                res.send({message: "successfully ran app.post(/music)"});
            }
        }
    )
});
//local host for the server to start on.
// app.listen(3000, function(){
//     console.log("Server started on 3000");
// });


//Heroku Deplyment port
const PORT = process.env.PORT

app.listen(PORT);