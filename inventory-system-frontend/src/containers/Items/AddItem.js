import React, { Component } from 'react';
import Form from '../../Components/UI/Form/Form'

class AddItem extends Component {
  state = {
    item: '',
    amount: ''
  }

  inputChangeHandler = (ev) => {
    this.setState({
      [ev.target.id]: ev.target.value
    });

  }
  
  submitHandler = (ev) => {
    ev.preventDefault();
    // TODO: hook up the backend
    console.log('creating a item', this.state)
  }

  render() {
    let inputsData = [
      { key: '0', for: 'item', labelText: 'item', type: 'text' },
      { key: '1', for: 'amount', labelText: 'amount', type: 'text' }
    ]

    return (
      <Form 
        inputsData={inputsData}
        formTitle='create a item'
        buttonText='create new item'
        onChange={this.inputChangeHandler}
        onSubmit={this.submitHandler} />
    )
  }
}

export default AddItem;
