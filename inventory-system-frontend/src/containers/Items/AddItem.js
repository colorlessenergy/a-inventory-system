import React, { Component } from 'react';
import Form from '../../Components/UI/Form/Form'
import { connect } from 'react-redux'
import { addItemAction } from '../../redux/actions/itemsAction';
import { withRouter, Link } from 'react-router-dom';
import Api from '../../services/Api';

import classes from './AddItem.module.css'

class AddItem extends Component {
  // this is the data needed to create a item in our API
  state = {
    name: '',
    amount: '',
    id: this.props.match.params.id,
    errorMessage: '',
    inputsClicked: []
  }

  inputChangeHandler = (ev) => {
    this.setState({
      [ev.target.id]: ev.target.value
    });
  }
  
  inputClickHandler = (ev) => {
    console.log('input clicked');
    console.log(ev.target.id);
    this.setState({
      inputsClicked: [...this.state.inputsClicked, ev.target.id]
    });
  }

  errorHandler = (errorMessage) => {
    this.setState({
      errorMessage: errorMessage
    });
  }

  submitHandler = (ev) => {
    ev.preventDefault();
    
    // **reset the inputsClicked array since its a new submit
    if (this.state.inputsClicked) {
      this.setState({
        inputsClicked: ''
      });
    }

    console.log('submitted', this.state);
    // **form validation
    let errorMessage = null;
    if (this.state.name === '') {
      errorMessage = 'Missing item name';
    }
    if (this.state.amount === '') {
      if (errorMessage) {
        errorMessage += ', and amount';
      }
      else {
        errorMessage = 'Missing item amount';
      }
    }
    if (errorMessage) {
      console.log('errorMessage', errorMessage);
      this.errorHandler(errorMessage);
      return;
    }

    // **sending request, form validation passed    
    Api().post('/items', this.state)
      .then((res) => {
        console.log('POST /items res');
        console.log(res);
        this.props.createItem(res.data);

        this.setState({
          name: '',
          amount: ''
        });

        this.props.history.push('/rooms/' + this.props.match.params.id);
      })
      .catch(err => {
        console.log('POST /items err');
        console.log(err.response);
        console.log(err.response.data);

        this.errorHandler(err.response.data);
      });
  }

  render() {
    let inputsData = [
      { 
        key: '0',
        for: 'name',
        labelText: 'name',
        type: 'text'
      },
      {
        key: '1',
        for: 'amount',
        labelText: 'amount',
        type: 'text'
      }
    ];

    return (
      <React.Fragment>
        <p className={classes["link-container"]}>
          <Link to={'/rooms/' + this.props.match.params.id}>
            go back to items
          </Link>
        </p>
        <Form
          inputsData={inputsData}
          formTitle='create a item'
          buttonText='create'
          onChange={this.inputChangeHandler}
          onSubmit={this.submitHandler}
          onClick={this.inputClickHandler}
          errorMessage={this.state.errorMessage}
          inputsClicked={this.state.inputsClicked}
          {...this.state} />
      </React.Fragment>
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
