import test from 'ava';
import SinStore from './index';

const createAction = 'SIN_CREATE';
const removeAction = 'SIN_REMOVE';
const updateAction = 'SIN_UPDATE';
const fakeTodos = [
    {
        id: 12345,
        text: '0one2three4five6seven8nine',
    },
    {
        id: 54321,
        text: 'zero1two3four5six7eight9',
    },
];

function createFake(defaultValue) {
    let _storage = JSON.stringify(defaultValue);
    return new SinStore({
        getItem: () => _storage,
        setItem: (name, value) => {
            _storage = value;
        },
        removeItem: () => {
            _storage = undefined;
        },
    });
}

test('should provide default "Pizza" sin if passed storage is empty', t => {
    const sinStore = createFake();

    const sins = sinStore.get();
    t.is(sins[0].id, 1);
    t.is(sins[0].text, 'Pizza');
});

test.cb(
    'should pull sins from passed storage calling getItem with key "SinTrackerSins"',
    t => {
        const sinStore = new SinStore({
            getItem: name => {
                t.is(name, 'SinTrackerSins');
                t.end();
                return;
            },
            setItem: () => {},
            removeItem: () => {},
        });

        sinStore.get();
    },
);

test.cb(
    'should pull sins from passed storage calling setItem with key "SinTrackerSins"',
    t => {
        let _storage;
        const sinStore = new SinStore({
            getItem: name => _storage,
            setItem: (name, value) => {
                t.is(name, 'SinTrackerSins');
                t.is(
                    value,
                    '[{"id":1,"text":"Pizza"},{"id":12345,"text":"updated text"}]',
                );
                t.end();
            },
            removeItem: () => {},
        });

        sinStore.handleDispatch({
            action: createAction,
            data: {
                id: 12345,
                text: 'updated text',
            },
        });
    },
);

test.cb(
    'should remove sins from passed storage calling removeItem with key "SinTrackerSins"',
    t => {
        let _storage;
        const sinStore = new SinStore({
            getItem: name => _storage,
            setItem: () => {},
            removeItem: name => {
                t.is(name, 'SinTrackerSins');
                t.end();
            },
        });

        sinStore.handleDispatch({
            action: removeAction,
            data: {
                id: 1,
            },
        });
    },
);

test('should handle sin create action', t => {
    const sinStore = createFake(fakeTodos);
    sinStore.handleDispatch({
        action: createAction,
        data: {
            text: 'testing this shizzle',
        },
    });

    const sins = sinStore.get();
    t.is(sins.length, 3);
    t.is(sins[2].text, 'testing this shizzle');
});

test('should handle sin remove action', t => {
    const sinStore = createFake(fakeTodos);
    sinStore.handleDispatch({
        action: removeAction,
        data: 12345,
    });

    const sins = sinStore.get();
    t.is(sins.length, 1);
    t.is(sins[0].id, 54321);
    t.is(sins[0].text, 'zero1two3four5six7eight9');
});

test('should handle sin update action', t => {
    const sinStore = createFake(fakeTodos);
    sinStore.handleDispatch({
        action: updateAction,
        data: {
            id: 12345,
            text: 'updated text',
        },
    });

    const sins = sinStore.get();
    t.is(sins.length, 2);
    t.is(sins[0].id, 12345);
    t.is(sins[0].text, 'updated text');
});
