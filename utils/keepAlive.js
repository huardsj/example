const Agent = require('agentkeepalive');
const HttpsAgent = require('agentkeepalive').HttpsAgent;

const agent = new Agent();
const agentHttps = new HttpsAgent();

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
