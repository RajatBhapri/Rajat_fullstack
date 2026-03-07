"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var worker_threads_1 = require("worker_threads");
function fib(n) {
    if (n <= 1)
        return n;
    return fib(n - 1) + fib(n - 2);
}
worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.on("message", function (n) {
    try {
        var result = fib(n);
        worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({
            result: result,
        });
    }
    catch (err) {
        worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({
            error: err.message,
        });
    }
});
