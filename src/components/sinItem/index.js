import { React, Component } from 'react';
import Dispatcher from '../../dispatcher';

class SinItem extends Component {
    _onNameChange(event) {
        var eventData = {
            id: this.props.item.id,
            text: event.target.value,
        };

        Dispatcher.publish({
            action: 'SIN_UPDATE',
            data: eventData,
        });
    }
    _removeItem() {
        Dispatcher.publish({
            action: 'SIN_REMOVE',
            data: this.props.item.id,
        });
    }
    render() {
        return (
            <li key={this.props.item.id}>
                <form>
                    <div className="row">
                        <div className="col-xs-8 col-sm-10">
                            <textarea
                                className="form-control"
                                name="name"
                                value={this.props.item.text}
                                onChange={this._onNameChange}
                            />
                        </div>
                        <div className="col-xs-4 col-sm-2">
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this._removeItem}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </form>
            </li>
        );
    }
}

export default SinItem;
