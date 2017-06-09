import test from 'ava';
import React from 'react';
import { ReactDOM, TestUtils } from 'react-dom';
import SinItem from './index';

const testItem = {
    id: 1,
    text: 'temp',
};

function renderComponent() {
    const component = TestUtils.renderIntoDocument(<SinItem item={testItem} />);
    return ReactDOM.findDOMNode(component);
}

test('should render with filled name input and remove button', t => {
    const sinItem = renderComponent();
    const nameInput = sinItem.querySelectorAll('textarea')[0];
    const removeButton = sinItem.querySelectorAll('button');

    t.is(nameInput.textContent, 'temp');
    t.is(removeButton.length, 1);
    t.is(removeButton[0].textContent, 'Remove');
});
