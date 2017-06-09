import test from 'ava';
import Observer from './index';

test('should have subscribe, unsubscribe and publish functions', t => {
    const observer = new Observer();
    t.is(typeof observer.subscribe, 'function');
    t.is(typeof observer.unsubscribe, 'function');
    t.is(typeof observer.publish, 'function');
});

test.cb('should send published payload to subscribed functions', t => {
    const fakePayload = {
        data: true,
    };
    const observer = new Observer();
    observer.subscribe(function(payload) {
        t.deepEqual(payload, fakePayload);
        t.end();
    });

    observer.publish(fakePayload);
});

test.cb('should not send published payload to unsubscribed functions', t => {
    const fakePayload = {
        data: true,
    };

    const observer = new Observer();
    const idToDelete = observer.subscribe(function(payload) {
        done('should not be called');
    });
    observer.subscribe(function(payload) {
        t.deepEqual(payload, fakePayload);
        t.end();
    });

    observer.unsubscribe(idToDelete);

    observer.publish(fakePayload);
});
