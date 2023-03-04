const express = require('express')
const app = express()
const port = 8100
const path = require('path')
const db = require('./db');
db.initialize();

app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/src/index.html'))
})

app.get('/internos/:num', async (req, res) => {
  const result = await db.getInterno(req.params.num);
  if ( result ){
    res.json(result);
  } else {
    res.json(null);
  }
})

app.get('/internos', async (req, res) => {
  const results = await db.getInternos();
  res.json(results);
})


app.post('/internos', async (req, res) => {
  const interno = await db.insertInterno(req.body.interno, {descrip: req.body.descrip});
  res.json(interno);
})

app.put('/internos/:num', async (req, res) => {
  const interno = await db.updateInterno(req.params.num, {descrip: req.body.descrip});
  res.json(interno);
})


console.log('app listening on port', port);
console.log(`http://localhost:${port}`)
app.listen(port);