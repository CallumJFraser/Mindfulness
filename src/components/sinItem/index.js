import React, { Component } from 'react';
import styled from 'styled-components';
import Dispatcher from '../../dispatcher';

const ItemContainer = styled.form`
    display:flex;
`;
const NameInput = styled.textarea`
    display:flex;
    width: 80%;
    margin: 1rem;
`;
const RemoveButton = styled.button`
    width: 20%;
    margin: 1rem;
    background-color: #F00000;
    border: none;
    :hover {
        background-color: #C00000;
    }
`;

class SinItem extends Component {
    constructor(props) {
        super(props);
        this._onNameChange = this._onNameChange.bind(this);
        this._removeItem = this._removeItem.bind(this);
    }
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
            <ItemContainer className={this.props.className} key={this.props.item.id}>
                <NameInput
                    name="name"
                    value={this.props.item.text}
                    onChange={this._onNameChange}
                />
                <RemoveButton
                    type="button"
                    onClick={this._removeItem}
                >
                    Remove
                </RemoveButton>
            </ItemContainer>
        );
    }
}

export default SinItem;
