const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const PORT = 4000;

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'bfpndo7znxqayv5svjvf-mysql.services.clever-cloud.com',
  user: 'uvfpzdv08dfuydrr',
  password: 'OPIXuNpW3USXofmBJxbJ',
  database: 'bfpndo7znxqayv5svjvf'
});

app.get('/train-timetable/:id', (req, res) => {
  const id = req.params.id;
  const q = 'SELECT * FROM bfpndo7znxqayv5svjvf.train_timetable WHERE id = ?';

  db.query(q, [id], (err, data) => {
    if (err) {
      return res.json(err);
    }

    return res.json(data[0]);
  });
});

app.get('/train-timetable', (req, res) => {
  const q = 'SELECT * FROM bfpndo7znxqayv5svjvf.train_timetable';

  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }

    return res.json(data);
  });
});

app.post('/train-timetable', (req, res) => {
  const q =
    'INSERT INTO bfpndo7znxqayv5svjvf.train_timetable (`departure_point`, `departure_date`, `departure_time`, `arrival_point`, `arrival_date`, `arrival_time`) VALUES (?)';

  const values = [
    req.body.departure_point,
    req.body.departure_date,
    req.body.departure_time,
    req.body.arrival_point,
    req.body.arrival_date,
    req.body.arrival_time
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }

    return res.json(data);
  });
});

app.delete('/train-timetable/:id', (req, res) => {
  const id = req.params.id;
  const q = ' DELETE FROM bfpndo7znxqayv5svjvf.train_timetable WHERE id = ? ';

  db.query(q, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put('/train-timetable/:id', (req, res) => {
  const id = req.params.id;
  const q =
    'UPDATE bfpndo7znxqayv5svjvf.train_timetable SET `departure_point` = ?, `departure_date` = ?, `departure_time` = ?, `arrival_point` = ?, `arrival_date` = ?, `arrival_time` = ? WHERE `id` = ?';

  const values = [
    req.body.departure_point,
    req.body.departure_date,
    req.body.departure_time,
    req.body.arrival_point,
    req.body.arrival_date,
    req.body.arrival_time,
    id
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
