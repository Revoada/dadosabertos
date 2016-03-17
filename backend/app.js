var express   = require('express');
var app       = express();
var path      = require('path');
var mongoose  = require('mongoose');
var bodyParser = require('body-parser');

var database = 'mongodb://hackcidadao-op:cidadaoop-hack-dev@ds049661.mongolab.com:49661/hackcidadao-op';
mongoose.connect(database);

var assetsPath = path.join(__dirname, '..', 'frontend');

app.use(express.static(assetsPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('port', (process.env.PORT || 5000));

var api = {};

api.demanda = require('./api/demanda');

app.post('/api/demanda', api.demanda.inserir);
app.get('/api/demandas', api.demanda.obterTodas);
app.get('/api/importar', api.demanda.importar);

app.get('*',function(req,res){
  res.sendFile(assetsPath + '/');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});