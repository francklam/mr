import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import ons from 'onsenui';
import {Page, Toolbar, Button, Icon, ToolbarButton, BackButton, Input, List, ListItem} from 'react-onsenui';
import {Switch, Tabbar, Tab, Splitter, SplitterSide, SplitterContent, Navigator} from 'react-onsenui';

import OrderList from './orderList.jsx';

import { Orders } from '../../api/order.js';

class SearchOrder extends Component {

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
    if (nextProps.scannedCode == this.state.scanCode) {
      this.setState({
        scanCode: "",
      })
    }
  }


  handleItemClick(navigator, row) {
    // ons.notification.alert('Click on ' + row);
    navigator.pushPage({
      component: OrderList,
      props: {
        orderId: row._id,
        restoId: row.restoId,
        restoName: row.restoName,
      },
      hasBackButton : true,
      title: 'dish-list'
    });
  }

  handleClick(navigator) {
    // ons.notification.confirm('Do you really want to go back?')
    //   .then((response) => {
    //     if (response === 1) {
          navigator.popPage();
      //   }
      // });
  }

  renderToolbar(route, navigator) {
    const backButton = route.hasBackButton
      ? <BackButton onClick={this.handleClick.bind(this, navigator)}>Back</BackButton>
      : null;

    return (
      <Toolbar>
        <div className='left'>{backButton}</div>
      </Toolbar>
    )
  }

  renderPage(route, navigator) {

    switch(route.component) {
      case OrderList:
        return (
          <Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>

            <OrderList orderId={route.props.orderId} restoId={route.props.restoId} restoName={route.props.restoName} />

          </Page>
        )
      default:
        return (
          <Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>

            <List
              dataSource={this.props.orderList}
              renderRow={(row, idx) => (
                <ListItem key={idx} modifier={idx === 2 ? 'longdivider' : null} modifier='chevron' tappable onClick={this.handleItemClick.bind(this, navigator, row)} >
                  <div className="left">
                    <Icon icon="md-face" className="list__item__icon" />
                  </div>
                  <div className="center">
                    <span className="list__item__title">{row.restoName}</span>
                    <span className="list__item__subtitle">{row.creator}</span>
                  </div>
                  <div className="right">
                    <label>{row.dishes.length}</label>
                  </div>
                </ListItem>
              )}
            />

          </Page>
        )
    }

  }

  render() {
    return (
      <Page>
        <Navigator
          renderPage={this.renderPage.bind(this)}
          initialRoute={{
            component: SearchOrder,
            hasBackButton: false,
            title: 'order-list',
          }}
          animation="slide-ios"
          animationOptions={{duration:0.3, delay:0.1,timing:'ease-out'}}
        />
      </Page>

    )
  }

}

SearchOrder.propTypes = {
  orderList: PropTypes.array.isRequired,
  // scannedCode: PropTypes.string.isRequired
};

export default createContainer(() => {

  Meteor.subscribe('orderList');

  return {
   orderList: Orders.find().fetch(),
  };
}, SearchOrder);
