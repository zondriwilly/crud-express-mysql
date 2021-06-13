import mysql from 'mysql'

const db = mysql.createConnection({
  'name': 'localhost',
  'user': 'root',
  'password': '',
  'database': 'expressvue'
})

export default db;