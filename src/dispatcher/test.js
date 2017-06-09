import test from 'ava';
import dispatcher from './index';

test('should export setupObserver interface', t => {
    t.is(typeof dispatcher.subscribe, 'function');
    t.is(typeof dispatcher.unsubscribe, 'function');
});

test('should expose publish function', t => {
    t.is(typeof dispatcher.publish, 'function');
});
