/**
 * 日志系统
 * 
 * 使用 方法  
    let testLog = require('./AppLog');
    testLog.log("这是普通日志: hello world");
    testLog.info("这是重要的日志: hello world");
    testLog.logS("这是服务器传过来的日志: hello world");
    testLog.logC("这是发给服务器的日志: hello world");
    testLog.error("这是错误日志输出：hello world");
    testLog.warn("这是警告日志：hello wolrd");

    // 可以实时关闭日志 避免 泄露数据

 * 
 */

let AppLog = {};

AppLog.OPEN_LOG_FLAG = true;

AppLog.setDebug = function (isDeubug) {
    if (isDeubug) {
        AppLog.OPEN_LOG_FLAG = isDeubug;
    } else {
        AppLog.OPEN_LOG_FLAG = false;
    }
};

AppLog._getDateString = function () {
    var d = new Date();
    var str = d.getHours() + "";
    var timeStr = "";
    timeStr += (str.length == 1 ? ("0" + str) : str) + ":";
    str = d.getMinutes() + "";
    timeStr += (str.length == 1 ? ("0" + str) : str) + ":";
    str = d.getSeconds() + "";
    timeStr += (str.length == 1 ? ("0" + str) : str) + ".";
    str = d.getMilliseconds() + "";
    if (str.length == 1) str = "00" + str;
    if (str.length == 2) str = "0" + str;
    timeStr += str;
    timeStr = "[" + timeStr + "]";
    return timeStr;
};

AppLog._stack = function (lineLength) {
    var e = new Error();
    var lines = e.stack.split(" ");
    lines.shift();

    var resultLines = [];
    lines.forEach(function (line,index) {
        if (line=='at') {
            resultLines.push(lines[index + 1]);
        }
    });

    var list = [];
    if (lineLength <= resultLines.length - 1) {
        list= resultLines[lineLength].split('.');
    }

    if (list.length > 0) {
        return ("[" + list[0] + ".js->" + list[1] + "]");
    }

    return "";
};

AppLog.log = function (msg) {
    var backLog = cc.log || console.log || window["log"];
    if (!AppLog.OPEN_LOG_FLAG) {
        return;
    }
    backLog.call(this, "%s%s " + cc.js.formatStr.apply(cc, arguments), this._getDateString(), this._stack(2));
};

AppLog.info = function (msg) {
    var backLog = cc.log || console.log || window["log"];
    if (!AppLog.OPEN_LOG_FLAG) {
        return;
    }
    backLog.call(this, "%c%s%s " + cc.js.formatStr.apply(cc, arguments), "color:#00CD00;", this._getDateString(), this._stack(2));
};

AppLog.logS = function (msg) {
    var backLog = cc.log || console.log || window["log"];
    if (!AppLog.OPEN_LOG_FLAG) {
        return;
    }
    backLog.call(this, "%c%s%s " + cc.js.formatStr.apply(cc, arguments), "color:#0066FF;", this._getDateString(), this._stack(2));
};

AppLog.logC = function (msg) {
    var backLog = cc.log || console.log || window["log"];
    if (!AppLog.OPEN_LOG_FLAG) {
        return;
    }
    backLog.call(this, "%c%s%s " + cc.js.formatStr.apply(cc, arguments), "color:#00FF00;", this._getDateString(), this._stack(2));
};

AppLog.error = function (msg) {
    var backLog = cc.log || console.log || window["log"];
    if (!AppLog.OPEN_LOG_FLAG) {
        return;
    }
    backLog.call(this, "%c%s%s " + cc.js.formatStr.apply(cc, arguments), "color:#FF0000;", this._getDateString(), this._stack(2));
};

AppLog.warn = function (msg) {
    var backLog = cc.log || console.log || window["log"];
    if (!AppLog.OPEN_LOG_FLAG) {
        return;
    }
    backLog.call(this, "%c%s%s " + cc.js.formatStr.apply(cc, arguments), "color:#8B6914;", this._getDateString(), this._stack(2));
};

module.exports = AppLog;