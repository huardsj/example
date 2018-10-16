const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const agentKeepAlive = require('./utils/keepAlive').getAgentHttps();
const agentElectrode = require('./utils/electrode-keepalive').getAgentHttps();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const benchmark = require('./benchmark');

const app = express();

app.use(benchmark.benchMarkKeepalive({
    agentElectrode: agentElectrode.agent,
    agentKeepAlive
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter());
app.use('/users', usersRouter);


module.exports = app;
