var express = require('express');
var upload = require('multer')();

var app = express();

var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.post('/', upload.single('info'), function(req, res, next) {
  res.json({
    size: req.file.size
  });
})

module.exports = app.listen(port, function() {
  console.log('Upload app listening on port ' + port + '!');
});
