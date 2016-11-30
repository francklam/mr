import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import ons from 'onsenui';
import {Page, Toolbar, Button, Icon, ToolbarButton, BackButton, Input, List, ListItem} from 'react-onsenui';
import {Switch, Tabbar, Tab, Splitter, SplitterSide, SplitterContent, Navigator} from 'react-onsenui';

export default class Setting extends Component {

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
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

  render() {
    return (
      <Page>
        <List
          dataSource={['Setting 1', 'Setting 2', 'Setting 3']}
          renderRow={(row, idx) => (
            <ListItem key={idx} modifier={idx === 2 ? 'longdivider' : null} modifier='chevron' tappable onClick={this.handleItemClick.bind(this, row)} >
              <div className="left">
                <Icon icon="md-face" className="list__item__icon" />
              </div>
              <div className="center">
                <span className="list__item__title">{row}</span>
                <span className="list__item__subtitle">Subtitle</span>
              </div>
            </ListItem>
          )}
        />
      </Page>

    )
  }

}

Setting.propTypes = {
  // queues: PropTypes.array.isRequired,
  // scannedCode: PropTypes.string.isRequired
};

// export default createContainer(() => {
//
//   Meteor.subscribe('queueOptions');
//
//   return {
//    queues: QueueOptions.find().fetch(),
//    scannedCode: Session.get("scannedCode"),
//   };
// }, SearchResto);
