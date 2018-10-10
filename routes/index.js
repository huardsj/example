const express = require('express');
const router = express.Router();

const apiUrl = 'https://reqres.in/api/users';
const rp = require('request-promise');

const ancestryRequest = require('ancestry-request').defaults({
    componentId: "searchui-resultsui",
    isEdgeSystem: true,
    timeout: 5000
});

const agentKeepAlive = require('ancestry-request/lib/keepAliveAgent').getAgentHttps();

const options = {
    uri: apiUrl,
    json: true,  // Automatically parses the JSON string in the response,
    time: true
};


const getUsers = (res, req, agentKeepalive) => {
    if (!agentKeepalive) {
        const newOptions = Object.assign({}, options, {agent: agentKeepAlive, timeout: 5000});
        return rp(newOptions)
            .then(function (htmlString) {
                res.send({title: 'Express', users: htmlString});
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).send(err.message);
            });
    } else {
        return ancestryRequest.get(options, req)
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

    router.get('/api/keepAlive', function (req, res, next) {
        getUsers(res, req, true);
    });
    return router;
};

module.exports = getRouter;
