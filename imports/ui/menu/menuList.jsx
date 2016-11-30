import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import ons from 'onsenui';
import {Page, Toolbar, Button, Icon, ToolbarButton, BackButton, Input, List, ListItem} from 'react-onsenui';
import {Switch, Tabbar, Tab, Splitter, SplitterSide, SplitterContent, Navigator} from 'react-onsenui';

import { Dishes } from '../../api/menu.js';
import '../../api/order.js';

class MenuList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      scanCode: "",
      index: 0,
      isOpen: false,
    };
  }

  componentWillMount() {
    // Session.setDefault("scannedCode", "");
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scannedCode == this.state.scanCode) {
      this.setState({
        scanCode: "",
      })
    }
  }

  handleItemClick(row) {
    this.props.onSelect(row);
  }

  handleAddClick(row) {
    const who = "moi";
    const newDish = {dish:row.dish, price:row.price, person:who};
    Meteor.call('orders.add', row.restoId, row.restoName, who, newDish);
  }

  render() {
    return (

      <List
        dataSource={this.props.dishes}
        renderRow={(row, idx) => (
          <ListItem key={idx} modifier={idx === 2 ? 'longdivider' : null} tappable >
            <div className="left">
              <Icon icon="md-face" className="list__item__icon" />
            </div>
            <div className="center">
              <span className="list__item__title">{row.dish}</span>
              <span className="list__item__subtitle">{row.section}</span>
            </div>
            <div className="right">
              <label>HKD {row.price}</label>
            </div>
            <div className="right">
              <Button style={{margin: '6px'}} modifier='outline' onClick={this.handleAddClick.bind(this, row)}><Icon icon="md-plus"/></Button>
            </div>
          </ListItem>
        )}
      />
    )
  }

}

MenuList.propTypes = {
  dishes: PropTypes.array.isRequired,
  restoId: PropTypes.string.isRequired
};

export default createContainer((props) => {

  Meteor.subscribe('menuList', props.restoId);

  return {
   dishes: Dishes.find({restoId:props.restoId}).fetch(),
  };
}, MenuList);
