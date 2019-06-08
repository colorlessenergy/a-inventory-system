import React, { Component } from 'react';
import Form from '../../Components/UI/Form/Form'
import { connect } from 'react-redux'
import { addItemAction } from '../../redux/actions/itemsAction';
import { withRouter } from 'react-router-dom';


import Api from '../../services/Api';


class AddItem extends Component {
  // this is the data needed to create a item in our API
  state = {
    name: '',
    amount: '',
    id: this.props.match.params.id
  }

  inputChangeHandler = (ev) => {
    this.setState({
      [ev.target.id]: ev.target.value
    });
  }
  
  submitHandler = (ev) => {
    ev.preventDefault();

    Api().post('/items', this.state)
      .then((res) => {
        console.log('POST /items res');
        console.log(res);
        this.props.createItem(res.data);

        this.setState({
          name: '',
          amount: ''
        });

        document.querySelector('form').name.value = '';
        document.querySelector('form').amount.value = '';
      })
      .catch(err => console.log(err));
    console.log('creating a item', this.state);
  }

  render() {
    let inputsData = [
      { key: '0', for: 'name', labelText: 'name', type: 'text' },
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

const mapDispatchToProps = (dispatch) => {
  return {
    createItem: (item) => {
      dispatch(addItemAction(item))
    }
  }
}

export default connect(null, mapDispatchToProps)(withRouter(AddItem));
