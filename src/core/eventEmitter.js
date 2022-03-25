const EventEmitter = {
    _events: {},
    dispatch: function (event, data) {
        if (!this._events[event]) {
            return;
        }
        this._events[event].forEach((callback) => callback(data));
    },
    subscribe: function (event, callback) {
        if (!this._events[event]) {
            this._events[event] = [];
        }
        this._events[event].push(callback);
    },
    remove: function (event) {
        if (this._events[event]) {
            this._events[event] = [];
        }
    },
};

export default EventEmitter;
