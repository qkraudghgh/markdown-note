const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({extended: true}));
app.use("/script", express.static(__dirname + "/script"));
app.use("/markdown", express.static(__dirname + "/markdown"));
app.use("/style", express.static(__dirname + "/style"))
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/:filename', (req, res) => {
  const fileName = req.params.filename;
  fs.readFile(__dirname + '/markdown/' + fileName + ".txt", 'utf8', (err, data) => {
    if (err) {
      res.send("원하는 파일을 찾을 수 없습니다.");
      return;
    };
    res.render('read', { fileName, data })
  })
});

app.post('/write', (req, res) => {
  const text = req.body["text"];
  const fileName = Math.random().toString(36).substring(7);
  fs.writeFile(__dirname + '/markdown/' + fileName + ".txt", text, 'utf8', (err) => {
    res.end(fileName)
  })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
