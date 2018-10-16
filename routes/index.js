const express = require('express');
const router = express.Router();

const apiUrl = 'https://reqres.in/api/users';
const rp = require('request-promise');

const agentElectrodeKeepAlive = new require('../utils/electrode-keepalive.js').getAgentHttps();

const agentKeepAlive = require('../utils/keepAlive').getAgentHttps();

const options = {
    uri: apiUrl,
    json: true,  // Automatically parses the JSON string in the response,
    time: true
};


const getUsers = (res, req, agentKeepalive) => {
    if (!agentKeepalive) {
        const newOptions = Object.assign({}, options, {agent: agentKeepAlive});
        return rp(newOptions)
            .then(function (htmlString) {
                res.send({title: 'Express', users: htmlString});
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).send(err.message);
            });
    } else {
        const newOptions = Object.assign({}, options, {agent: agentElectrodeKeepAlive.agent});
        return rp(newOptions)
            .then(function (htmlString) {
                res.send({title: 'Express', users: htmlString});
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).send(err.message);
            });
    }
};

const getRouter = () => {
    /* GET home page. */
    router.get('/api', function (req, res, next) {
        getUsers(res);
    });

    router.get('/api/electrodeKeepAlive', function (req, res, next) {
        getUsers(res, req, true);
    });
    return router;
};

module.exports = getRouter;
