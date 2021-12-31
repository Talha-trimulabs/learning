const express = require('express');
const app = express();
const pool = require('./db');
const PORT = process.env.PORT || 3000;
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.get('/view', async (req, res) => {
  const all = await pool.query('select * from players order by id');
  console.log(all.rows);
  res.json(all.rows);
});

app.post('/add', async (req, res) => {
  //console.log(req.body);
  const { id, name, age, matches_played } = req.body;
  const newadd = await pool.query(
    'INSERT INTO players (id, name, age, matches_played) VALUES($1,$2,$3,$4)',
    [id, name, age, matches_played]
  );
  res.send(`player with id ${id} is added`);
});

app.delete('/delete/id', async (req, res) => {
  const id = req.body.id;
  const del = await pool.query('delete from players where id = $1', [id]);
  res.send('player deleted of id ' + id);
});

app.put('/update', async (req, res) => {
  const { id, name, age, matches_played } = req.body;
  const update = await pool.query(
    'update players set name = $1, age = $2, matches_played = $3 where id = $4',
    [name, age, matches_played, id]
  );
  res.send('player of id ' + id + ' updated');
  console.log('player of id ' + id + ' updated');
});
app.listen(PORT, () => console.log('Server is running .. '));
