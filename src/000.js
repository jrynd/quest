const express = require('express')
/// taking advice of https://stackoverflow.com/questions/61739434/
const { spawnSync, exec } = require('child_process');
const app = express()
const port = 3000

app.get('/', function (req, res) {
  exec('bin/001', (err, stdout, stderr) => {
    if (err) {
      return res.send(`${stderr}`); // interpolation is shorter than toString()
    }
    return res.send(`${stdout}`);
  });
});

app.get('/aws', function (req,res) {
  exec('bin/002', (err, stdout, stderr) => {
    return res.send(`${stdout}`);
  });
});

app.get('/docker', function (req,res) {
  exec('bin/003', (err, stdout, stderr) => {
    return res.send(`${stdout}`);
  });
});

app.get('/loadbalanced', function (req,res) {
  var subprocess = spawnSync('bin/004', [JSON.stringify(req.headers)]);
  // previous call to exec had shell injection vuln
  return res.send(`${subprocess.stdout}`);
});

app.get('/tls', function (req,res) {
  var subprocess = spawnSync('bin/005', [JSON.stringify(req.headers)]);
  return res.send(`${subprocess.stdout}`);
});

app.get('/secret_word', function (req,res) {
  var subprocess = spawnSync('bin/006', [JSON.stringify(req.headers)]);
  return res.send(`${subprocess.stdout}`);
});

app.listen(port, () => console.log(`Rearc quest listening on port ${port}!`))
