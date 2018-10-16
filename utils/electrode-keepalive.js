const ElectrodeKeepAlive = require('electrode-keepalive');

const agentHttps = new ElectrodeKeepAlive({ https: true});
const agent =  new ElectrodeKeepAlive({ https: false});

const getAgentHttps = () => {
    return agentHttps;
};

const getAgent = () => {
    return agent;
};

module.exports = {
    getAgent,
    getAgentHttps
};
