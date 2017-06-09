import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import SinItem from './index';

const testItem = {
    id: 1,
    text: 'temp',
};

test('should render with filled name input and remove button', t => {
    const wrapper = shallow(<SinItem item={testItem} />);

    t.is(wrapper.find('textarea').text(), 'temp');
    t.true(wrapper.find('button').exists());
    t.is(wrapper.find('button').text(), 'Remove');
});
