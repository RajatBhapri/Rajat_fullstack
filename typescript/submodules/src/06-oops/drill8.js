// 1) Logger Class
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.info = function (message) {
        console.log("[INFO]: ".concat(message));
    };
    Logger.prototype.warn = function (message) {
        console.warn("[WARN]: ".concat(message));
    };
    Logger.prototype.error = function (message) {
        console.error("[ERROR]: ".concat(message));
    };
    return Logger;
}());
var SimpleCache = /** @class */ (function () {
    function SimpleCache(maxSize) {
        this.store = new Map();
        this.maxSize = maxSize;
    }
    SimpleCache.prototype.set = function (key, value) {
        if (this.store.size >= this.maxSize) {
            var firstKey = this.store.keys().next().value;
            this.store.delete(firstKey);
        }
        this.store.set(key, value);
    };
    SimpleCache.prototype.get = function (key) {
        return this.store.get(key);
    };
    SimpleCache.prototype.has = function (key) {
        return this.store.has(key);
    };
    SimpleCache.prototype.clear = function () {
        this.store.clear();
    };
    return SimpleCache;
}());
var Timer = /** @class */ (function () {
    function Timer() {
        this.startTime = null;
        this.elapsed = 0;
    }
    Timer.prototype.start = function () {
        if (this.startTime === null) {
            this.startTime = Date.now();
        }
    };
    Timer.prototype.stop = function () {
        if (this.startTime !== null) {
            this.elapsed += Date.now() - this.startTime;
            this.startTime = null;
        }
    };
    Timer.prototype.reset = function () {
        this.startTime = null;
        this.elapsed = 0;
    };
    Timer.prototype.getElapsedTime = function () {
        if (this.startTime !== null) {
            return this.elapsed + (Date.now() - this.startTime);
        }
        return this.elapsed;
    };
    return Timer;
}());
var ValidationResult = /** @class */ (function () {
    function ValidationResult() {
        this.isValid = true;
        this.errors = [];
    }
    ValidationResult.prototype.addError = function (message) {
        this.isValid = false;
        this.errors.push(message);
    };
    ValidationResult.prototype.getErrors = function () {
        return this.errors;
    };
    return ValidationResult;
}());
