import express from "express"
import db from './db.js'

const app = express()
const router = express.Router()
const port = '8888'

app.set('views', './view')

app.set('view engine', 'pug')

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.use(router)

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/show', (req, res) => {
  db.query('SELECT * FROM product', (err, result) => {
    if(err) throw err
    res.render('show', {dataDB : result})
  });
})

router.get('/show/:id', (req, res) => {
  const data = req.params
  db.query("SELECT * FROM product WHERE product_id = ? ", [data.id], (err, result) => {
    if (err) throw err
    res.render('show', {dataDB: result})
  })
})

router.get('/product', (req, res) => {
  res.render('product', {dataDB: ''})
})

router.get('/product/:id', (req, res) => {
  const data = req.params
  db.query("SELECT * FROM product WHERE product_id = ? ", [data.id], (err, result) => {
    if (err) throw err
    res.render('product', {dataDB: result})
  })
})

router.post('/product', (req, res) => {
  const data = req.body
  db.query('INSERT INTO product(product_name, product_price) VALUES (?, ?)', [data.product_name, data.product_price], (err, results) =>{
    if (err) throw err;
    res.end(JSON.stringify({response: 'Success'}));
  })
})

router.post('/update/:id', (req, res) => {
  const id = req.params.id,
        data = req.body
  db.query('UPDATE product SET ? WHERE product_id = ?', [data, id], (err, results) =>{
    if (err) throw err;
    res.end(JSON.stringify({response: 'Success'}));
  })
})

router.get('/delete/:id', (req, res) => {
  const id = req.params.id,
        data = req.body
  db.query('DELETE FROM product WHERE product_id = ?', [id], (err, results) =>{
    if (err) throw err;
    res.end(JSON.stringify({response: 'Success'}));
  })
})

app.listen(port, () => {
  console.log(`This server is running on http://localhost:${port}`)
})