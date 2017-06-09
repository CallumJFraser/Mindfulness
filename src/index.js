import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SinList from './components/sinList';

const Index = React.createClass({
    render: function IndexRender() {
        return (
            <div className="row">
                <SinList />
            </div>
        );
    },
});

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(<Index />, document.getElementById('body'));
});
