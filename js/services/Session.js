var Session = (function () {
    function Session() {
    }
    Object.defineProperty(Session.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Session.prototype, "userName", {
        get: function () {
            return this._userName;
        },
        enumerable: true,
        configurable: true
    });

    Session.prototype.create = function (sessionId, userName) {
        this._id = sessionId;
        this._userName = userName;
    };
    Session.prototype.destroy = function () {
        this._id = null;
        this._userName = null;
    };
    return Session;
})();
//# sourceMappingURL=Session.js.map
