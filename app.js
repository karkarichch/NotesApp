const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const fs = require('fs')

const PORT = process.env.PORT || 3001;
const app = express();

app.set('view engine', 'pug')

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));   // true-more accurate but slower, false-faster but less accurate
app.use('/api', api);
app.use(express.static('public'));    // 'public' folder


// GET route for landing page                             
app.get('/', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err

    const notes = JSON.parse(data)

    res.render('index', { notes: notes })
  })
}


  //res.sendFile(path.join(__dirname, './public/index.html'))
);

// GET route for notes page                               
app.get('/notes', (req, res) => {

  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err

    const notes = JSON.parse(data)

    res.render('notes', { notes: notes })
  })

  /*const formData = req.body

  if (formData.todo.trim == '') {
    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err

      const notes = JSON.parse(data)

      res.render('index', { error: true, notes: notes })
    })
  }else {
    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err

      const notes = JSON.parse(data)

      const notes = {
        id: id(),
        description: formData.note,
        done: false
      }

      notes.push(note)

      fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) throw err
      })
    })
  }*/
}
//res.sendFile(path.join(__dirname, './public/notes.html'))
);

// wildcard route for 404 page. should ALWAYS be below ALL other routes.
app.get('*', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err

    const notes = JSON.parse(data)

    res.render('404', { notes: notes })
  })
}
  //res.sendFile(path.join(__dirname, '/public/404.html'))
);

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);
