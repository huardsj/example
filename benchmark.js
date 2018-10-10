const onFinished = require('on-finished');
const onHeaders = require('on-headers');

let count = 0;
let countIn = 0;
const rtKeepalives = {
    ' <10ms': 0,
    ' <15ms': 0,
    ' <20ms': 0,
    ' <30ms': 0,
    ' <40ms': 0,
    ' <50ms': 0,
    ' <100ms': 0,
    ' <150ms': 0,
    ' <200ms': 0,
    ' <250ms': 0,
    ' <300ms': 0,
    ' <350ms': 0,
    ' <400ms': 0,
    ' <450ms': 0,
    ' <500ms': 0,
    ' <550ms': 0,
    ' <600ms': 0,
    ' <650ms': 0,
    ' <700ms': 0,
    ' <750ms': 0,
    ' <800ms': 0,
    ' <850ms': 0,
    ' <900ms': 0,
    ' <950ms': 0,
    ' >=950ms+': 0
};
let timeOut;

const clearIntervalLogging = () => {
    clearInterval(timeOut);
};

function recordStartTime () {
    //this._startAt = process.hrtime();
    this._startTime = Date.now();
}

const benchMarkKeepalive = config => {
    const agentKeepalive = config.agent;
    const agentHttps = config.agentHttps;

    timeOut = setInterval(function () {
        console.log('countIn : %d\n', countIn);
        console.log('----------------------------------------------------------------');
        console.log('[benchmark.js:%d] keepalive: %d created, %d requests, %d req/socket, %d close, %d timeout\n',
            count,
            agentKeepalive.createSocketCount,
            agentKeepalive.requestCount,
            (agentKeepalive.requestCount / agentKeepalive.createSocketCount || 0).toFixed(2),
            agentKeepalive.closeSocketCount,
            agentKeepalive.timeoutSocketCount
        );
        for (const name in agentKeepalive.sockets) {
            console.log('sockets %s: %d', name, agentKeepalive.sockets[name].length);
        }
        for (const name in agentKeepalive.freeSockets) {
            console.log('freeSockets %s: %d', name,
                agentKeepalive.freeSockets[name].length || 0);
        }
        for (const name in agentKeepalive.requests) {
            console.log('requests %s: %d', name,
                agentKeepalive.requests[name].length || 0);
        }

        console.log('----------------------------------------------------------------\n');

        console.log('[benchmark.js:%d] HTTPS keepalive: %d created, %d requests, %d req/socket, %d close, %d timeout\n',
            count,
            agentHttps.createSocketCount,
            agentHttps.requestCount,
            (agentHttps.requestCount / agentHttps.createSocketCount || 0).toFixed(2),
            agentHttps.closeSocketCount,
            agentHttps.timeoutSocketCount
        );
        for (const name in agentHttps.sockets) {
            console.log('sockets %s: %d', name, agentHttps.sockets[name].length);
        }
        for (const name in agentHttps.freeSockets) {
            console.log('freeSockets %s: %d', name,
                agentHttps.freeSockets[name].length || 0);
        }
        for (const name in agentHttps.requests) {
            console.log('requests %s: %d', name,
                agentHttps.requests[name].length || 0);
        }
        console.log('%j', rtKeepalives);

        console.log('----------------------------------------------------------------');

    }, config.interval || 5000);

    return (req, res, next) => {

        const onEnd = () => {
            const use = Date.now() - req._startTime;
            if (use < 10) {
                rtKeepalives[' <10ms']++;
            } else if (use < 15) {
                rtKeepalives[' <15ms']++;
            } else if (use < 20) {
                rtKeepalives[' <20ms']++;
            } else if (use < 30) {
                rtKeepalives[' <30ms']++;
            } else if (use < 40) {
                rtKeepalives[' <40ms']++;
            } else if (use < 50) {
                rtKeepalives[' <50ms']++;
            } else if (use < 100) {
                rtKeepalives[' <100ms']++;
            } else if (use < 150) {
                rtKeepalives[' <150ms']++;
            } else if (use < 200) {
                rtKeepalives[' <200ms']++;
            } else if (use < 250) {
                rtKeepalives[' <250ms']++;
            } else if (use < 300) {
                rtKeepalives[' <300ms']++;
            } else if (use < 350) {
                rtKeepalives[' <350ms']++;
            } else if (use < 400) {
                rtKeepalives[' <400ms']++;
            } else if (use < 450) {
                rtKeepalives[' <450ms']++;
            } else if (use < 500) {
                rtKeepalives[' <500ms']++;
            } else if (use < 550) {
                rtKeepalives[' <550ms']++;
            } else if (use < 600) {
                rtKeepalives[' <600ms']++;
            } else if (use < 650) {
                rtKeepalives[' <650ms']++;
            } else if (use < 700) {
                rtKeepalives[' <700ms']++;
            } else if (use < 750) {
                rtKeepalives[' <750ms']++;
            } else if (use < 800) {
                rtKeepalives[' <800ms']++;
            } else if (use < 850) {
                rtKeepalives[' <850ms']++;
            } else if (use < 900) {
                rtKeepalives[' <900ms']++;
            } else if (use < 950) {
                rtKeepalives[' <950ms']++;
            } else {
                rtKeepalives[' >=950ms+']++;
            }
            count++;
        };

        // record request start
        recordStartTime.call(req);
        onHeaders(res, recordStartTime);
        onFinished(res, onEnd);
        next();

    };
};
module.exports = {benchMarkKeepalive, clearIntervalLogging};
