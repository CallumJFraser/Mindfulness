import React, { Component } from 'react';
import styled from 'styled-components';
import Dispatcher from '../../dispatcher';
import SinStore from '../../stores/sin';
import sinItem from '../sinItem';

const _SinStore = new SinStore(localStorage);

const SinListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const Heading = styled.h2``;
const SinContainer = styled.div`
    display: flex;
    width: 100%;
`;
const SinItem = styled(sinItem)`
    display: flex;
    width: 100%;
`;

const AddButton = styled.button`
    display: flex;
    width: 100%;
    margin: 1rem;
    background-color: #F00000;
    border: none;
    :hover {
        background-color: #C00000;
    }
`;

class SinList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: _SinStore.get(),
        };
        this._addItem = this._addItem.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        var taskId = _SinStore.subscribe(payload => {
            if (payload.action === 'UPDATE') {
                this._onChange();
            }
        });
        this.setState({
            taskId,
        });
    }
    componentWillUnmount() {
        _SinStore.unsubscribe(this.state.taskId);
    }
    _addItem() {
        Dispatcher.publish({
            action: 'SIN_CREATE',
            data: {},
        });
    }
    _onChange() {
        this.setState({
            items: _SinStore.get(),
        });
    }
    render() {
        var Sins = [];
        this.state.items.forEach(function(item) {
            Sins.push(<SinItem key={item.id} item={item} />);
        });
        return (
            <SinListContainer>
                <Heading>Sins</Heading>
                <SinContainer>
                    {Sins}
                </SinContainer>
                <AddButton
                    type="button"
                    onClick={this._addItem}
                >
                    Add
                </AddButton>
            </SinListContainer>
        );
    }
}

export default SinList;
