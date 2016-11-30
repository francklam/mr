import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import ons from 'onsenui';
import {Page, Toolbar, Button, Icon, ToolbarButton, BackButton, Input, List, ListItem} from 'react-onsenui';
import {Switch, Tabbar, Tab, Splitter, SplitterSide, SplitterContent, Navigator} from 'react-onsenui';

import MenuList from '../menu/menuList.jsx';

import { Restos } from '../../api/resto.js';

class SearchResto extends Component {

  constructor(props) {
    super(props);

    this.state = {
      restoName: '',
      dishName: '',
    };
  }

  componentWillMount() {
    // Session.setDefault("scannedCode", "");
  }

  componentDidMount() {
    ons.ready(() => {
    // Onsen UI is now initialized
      ons.notification.alert('Welcome to Onsen UI!');
    });
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
      component: MenuList,
      props: {
        restoId: row._id,
        restoName: row.name,
      },
      hasBackButton : true,
      title: 'menu-list'
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

  handleDishInputChange(e) {
    this.setState({dishName: e.target.value});
  }

  handleRestoInputChange(e) {
    this.setState({restoName: e.target.value});
  }

  handleDishAdd(route) {

    let dish = this.state.dishName.trim();

    if (dish != "") {
      Meteor.call('dishes.add',route.props.restoId, route.props.restoName, "Section", dish, 100);

      this.setState({dishName: ""});
    }
  }

  handleRestoAdd(event) {
    event.preventDefault();

    let resto = this.state.restoName.trim();

    if (resto != "") {
      Meteor.call('restos.add',resto, "Branch", "Address", "type");

      this.setState({restoName: ""});
    }
  }

  renderPage(route, navigator) {

    switch(route.component) {
      case MenuList:
        return (
          <Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>

            <List>
              <ListItem key='0' tappable>
                <Input
                  value={this.state.dishName}
                  onChange={this.handleDishInputChange.bind(this)}
                  modifier='underbar'
                  float
                  placeholder='Dish' />
                <Button style={{margin: '6px'}} modifier='outline' onClick={this.handleDishAdd.bind(this, route)}>Add</Button>
              </ListItem>
            </List>

            <MenuList restoId={route.props.restoId}/>

          </Page>
        )
      default:
        return (
          <Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
            <List>
              <ListItem key='0' tappable>
                <Input
                  value={this.state.restoName}
                  onChange={this.handleRestoInputChange.bind(this)}
                  modifier='underbar'
                  float
                  placeholder='Resto' />
                <Button style={{margin: '6px'}} modifier='outline' onClick={this.handleRestoAdd.bind(this)}>Add</Button>
              </ListItem>
            </List>

            <List
              dataSource={this.props.restoList}
              renderRow={(row, idx) => (
                <ListItem key={idx} modifier='longdivider' modifier='chevron' tappable onClick={this.handleItemClick.bind(this, navigator, row)} >
                  <div className="left">
                    <Icon icon="md-face" className="list__item__icon" />
                  </div>
                  <div className="center">
                    <span className="list__item__title">{row.name}</span>
                    <span className="list__item__subtitle">{row.branch}</span>
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
            component: SearchResto,
            hasBackButton: false,
            title: 'resto-list',
          }}
          animation="slide-ios"
          animationOptions={{duration:0.3, delay:0.1,timing:'ease-out'}}
        />
      </Page>

    )
  }

}

SearchResto.propTypes = {
  restoList: PropTypes.array.isRequired,
  // scannedCode: PropTypes.string.isRequired
};

export default createContainer(() => {

  Meteor.subscribe('restoList', false);

  return {
   restoList: Restos.find().fetch(),
  };
}, SearchResto);
