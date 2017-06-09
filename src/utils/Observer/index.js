class Observer {
    constructor() {
        this._callbacks = [];
    }
    subscribe(callback) {
        const callbackId = this._callbacks.length;
        this._callbacks.push(callback);
        return callbackId;
    }
    unsubscribe(callbackId) {
        this._callbacks.splice(callbackId, 1);
    }
    publish(payload) {
        this._callbacks.forEach(callback => {
            if (typeof callback === 'function') {
                callback(payload);
            }
        });
    }
}

export default Observer;
