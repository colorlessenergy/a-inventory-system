import React, {Component} from 'react';
import { initItemsAction } from '../../redux/actions/itemsAction';
import { connect } from 'react-redux';

import ItemsList from '../../Components/UI/List';
import AddItem from './AddItem';


/**
 we need to pass the 'id' route parameter to the initItemsAction for the request to get items
*/
let roomId = '';

class Items extends Component {
  componentDidMount() {
    console.log('about to request GET http://localhost:3001/rooms/items');
    console.log('this.props');
    console.log(this.props);
    console.log('this.props.match.params.id', this.props.match.params.id);
    roomId = this.props.match.params.id;
    console.log('roomId', roomId);
    this.props.initItems(roomId);
  }

  render () {
    console.log('items from this.props.items from redux', this.props.items);
    return (
      <React.Fragment>
        <AddItem />
        <ItemsList url='/items/' items={this.props.items} />
      </React.Fragment>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    items: state.items.items
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initItems: (roomId) => {
      console.log('dispaching initItemsAction');
      dispatch(initItemsAction(roomId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);