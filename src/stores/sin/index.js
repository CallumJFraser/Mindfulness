import Dispatcher from '../../dispatcher';
import Observer from '../../utils/Observer';

const localStorageName = 'SinTrackerSins';

class SinStore extends Observer {
    constructor(storage) {
        super();
        this._storage = storage;
        this._dispatchId = Dispatcher.subscribe(this.handleDispatch);
    }

    get() {
        const sins = this._storage.getItem(localStorageName);
        if (typeof sins === 'string') {
            return JSON.parse(sins);
        }
        return [
            {
                id: 1,
                text: 'Pizza',
            },
        ];
    }

    handleDispatch(payload) {
        switch (payload.action) {
            case 'SIN_CREATE':
                createSin.call(this, payload.data);
                break;
            case 'SIN_REMOVE':
                remove.call(this, payload.data);
                break;
            case 'SIN_UPDATE':
                update.call(this, payload.data);
                break;
        }
        this.publish({
            action: 'UPDATE',
        });
    }
}

function setSins(sinList) {
    this._storage.setItem(localStorageName, JSON.stringify(sinList));
}

function createSin(sin) {
    var _sins = this.get.call(this);
    const sinItem = Object.assign(
        {
            id: new Date(),
            text: 'A new sin',
        },
        sin,
    );
    _sins.push(sinItem);

    setSins.call(this, _sins);
}

function remove(id) {
    var _sins = this.get.call(this);
    _sins = _sins.filter(item => {
        return item.id !== id;
    });

    setSins.call(this, _sins);
}

function update(sin) {
    var _sins = this.get.call(this);
    _sins = _sins.map(item => {
        if (item.id === sin.id) {
            return sin;
        }
        return item;
    });

    setSins.call(this, _sins);
}

export default SinStore;
