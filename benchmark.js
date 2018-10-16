const onFinished = require('on-finished');
const onHeaders = require('on-headers');
const util = require('util');
const debugLog = util.debuglog('benchmark-keepalive');

const utils = require('./utils/utils');

const rtKeepalives = {};
let timeOut;

const clearIntervalLogging = () => {
    clearInterval(timeOut);
};

function recordStartTime () {
    this._startTime = Date.now();
}


const benchMarkKeepalive = config => {
    const agentElectrode = config.agentElectrode;
    const agentKeepAlive = config.agentKeepAlive;

    timeOut = setInterval(function () {
        if (agentElectrode) {
            debugLog('\nn----------------------------------------------------------------');
            debugLog('[benchmark] HTTP agentElectrode:  %d req/socket\n',
                (agentElectrode.requestCount / agentElectrode.createSocketCount || 0).toFixed(2),
            );
            debugLog('getCurrentStatus: ', agentElectrode.getCurrentStatus());
            debugLog('\n----------------------------------------------------------------');
        }
        if (agentKeepAlive) {
            debugLog('[benchmark] HTTPS agentKeepAlive: %d req/socket\n',
                (agentKeepAlive.requestCount / agentKeepAlive.createSocketCount || 0).toFixed(2)
            );
            debugLog('getCurrentStatus: ', agentKeepAlive.getCurrentStatus());
            debugLog('\n----------------------------------------------------------------');
        }
        debugLog(utils.sortObjKeysNumerically(rtKeepalives));
        debugLog('\n----------------------------------------------------------------');

    }, config.interval || 5000);

    return (req, res, next) => {
        const onEnd = () => {
            const _endTime = Date.now();
            res._endTime = _endTime;
            const use = _endTime - req._startTime;
            res._responseTime = use;
            const bucketName = utils.calculateBucketKey(use, 5, 50);
            rtKeepalives[bucketName] ? rtKeepalives[bucketName]++ : rtKeepalives[bucketName] = 1;
        };

        // record request start
        recordStartTime.call(req);
        onHeaders(res, recordStartTime);
        onFinished(res, onEnd);
        next();

    };
};
module.exports = {benchMarkKeepalive, clearIntervalLogging};
