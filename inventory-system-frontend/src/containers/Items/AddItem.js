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

        this.props.history.push('/rooms/' + this.props.match.params.id);
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
