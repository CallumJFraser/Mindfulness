import { React, Component } from 'react';
import Dispatcher from '../../dispatcher';
import SinStore from '../../stores/sin';
import SinItem from '../sinItem';

class SinList extends Component {
    getInitialState() {
        return {
            items: SinStore.getSins(),
        };
    }
    componentDidMount() {
        var taskId = SinStore.subscribe(payload => {
            if (payload.action === 'UPDATE') {
                this._onChange();
            }
        });
        this.setState({
            taskId,
        });
    }
    componentWillUnmount() {
        SinStore.unsubscribe(this.state.taskId);
    }
    _addItem() {
        Dispatcher.publish({
            action: 'SIN_CREATE',
            data: {},
        });
    }
    _onChange() {
        this.setState({
            items: SinStore.getSins(),
        });
    }
    render() {
        var Sins = [];
        this.state.items.forEach(function(item) {
            Sins.push(<SinItem key={item.id} item={item} />);
        });
        return (
            <div className="col-sm-12">
                <h2>Sins</h2>
                <ul>
                    {Sins}
                </ul>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this._addItem}
                >
                    Add
                </button>
            </div>
        );
    }
}

export default SinList;
