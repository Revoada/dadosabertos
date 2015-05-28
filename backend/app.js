var express   = require('express');
var app       = express();
var path      = require('path');
var mongoose  = require('mongoose');
var bodyParser = require('body-parser');

var database = process.env.HACKDAY_DATABASE ? process.env.HACKDAY_DATABASE : require('./database');
mongoose.connect(database);

var assetsPath = path.join(__dirname, '..', 'frontend');

app.use(express.static(assetsPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var api = {};

api.demanda = require('./api/demanda');

app.post('/api/demanda', api.demanda.inserir);
app.get('/api/demandas', api.demanda.obterTodas);
app.get('/api/importar', api.demanda.importar);

app.get('*',function(req,res){
  res.sendFile(assetsPath + '/');
});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function(){
  console.log('Listening on ' + server_ip_address + ', server_port ' + server_port)
});