import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import ons from 'onsenui';
import {Page, Toolbar, Button, Icon, ToolbarButton, BackButton, Input, List, ListItem} from 'react-onsenui';
import {Switch, Tabbar, Tab, Splitter, SplitterSide, SplitterContent, Navigator, Col} from 'react-onsenui';

import { Orders } from '../../api/order.js';

class OrderList extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };

  }

  componentWillMount() {
    // Session.setDefault("scannedCode", "");
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }


  handleItemClick(row) {
    this.props.onSelect(row);
  }

  handleAddClick(row) {
    const who = "moi";
    const newDish = {dish:row.dish, price:row.price, person:who};
    Meteor.call('orders.add', this.props.restoId, this.props.restoName, who, newDish);
  }

  handleRemoveClick(row) {

  }

  render() {

    let temp = this.props.order[0].dishes;

    temp.sort((a, b) => {
      return a.dish.localeCompare(b.dish);
    });

    let regroupDishes = [];
    let subtotal = 0;

    if (temp.length > 0) {

      let previousDish = temp[0];
      let newDish = null;
      let number = 0;

      temp.forEach((oneDish) => {

        subtotal += oneDish.price;
        if (previousDish.dish != oneDish.dish) {
          newDish = previousDish;
          newDish.number = number;
          regroupDishes.push(newDish);

          previousDish = oneDish;
          number = 1;
        }
        else {
          number += 1;
        }
      });

      newDish = previousDish;
      newDish.number = number;
      regroupDishes.push(newDish);
    }

    return (
      <Page>
        <span>Subtotal: {subtotal}</span>
        <List
          dataSource={regroupDishes}
          renderRow={(row, idx) => (
            <ListItem key={idx} modifier='longdivider' tappable >
              <div className="left">
                <Button style={{margin: '6px'}} modifier='outline' onClick={this.handleAddClick.bind(this, row)}><Icon icon="md-plus"/></Button>
                <Button style={{margin: '6px'}} modifier='outline' onClick={this.handleRemoveClick.bind(this, row)}><Icon icon="md-minus"/></Button>
              </div>
              <div className="center">
                <span className="list__item__title">{row.dish}</span>
                <span className="list__item__subtitle">{row.person}</span>
              </div>
              <div className="right">
                <span className="list__item__title">HKD {(parseFloat(row.number) * parseFloat(row.price)).toFixed(2)}</span>
                <span className="list__item__subtitle">{row.number} x {row.price}</span>
              </div>

            </ListItem>
          )}
        />
      </Page>

    )
  }

}

OrderList.propTypes = {
  order: PropTypes.array.isRequired,
  orderId: PropTypes.string.isRequired,
  restoId: PropTypes.string.isRequired,
  restoName: PropTypes.string.isRequired,
};

export default createContainer((props) => {

  Meteor.subscribe('orderList');

  return {
    order: Orders.find(props.orderId).fetch(),
  }
}, OrderList);
