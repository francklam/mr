import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import ons from 'onsenui';
import {Page, Toolbar, Button, Icon, ToolbarButton, BackButton, Input, List, ListItem} from 'react-onsenui';
import {Switch, Tabbar, Tab, Splitter, SplitterSide, SplitterContent, Navigator} from 'react-onsenui';

import SearchResto from '../resto/searchResto.jsx';
import SearchOrder from '../order/searchOrder.jsx';
import Setting from '../setting/setting.jsx';

export default class Layout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      isOpen: false,
    };
  }

  hide() {
    this.setState({isOpen: false});
  }

  show() {
    this.setState({isOpen: true});
  }

  renderToolbar() {

    return (
      <Toolbar>
        <div className='center'>Search Resto</div>
        <div className="right">
          <ToolbarButton>
            <Icon icon="md-menu" onClick={this.show.bind(this)} />
          </ToolbarButton>
        </div>
      </Toolbar>
    )
  }

  renderTabs() {
    return [
      {
        content: <SearchResto />,
        tab: <Tab label='Home' icon='md-home' />
      },
      {
        content: <SearchOrder />,
        tab: <Tab label='Order' icon='md-settings' />
      },
      {
        content: <Setting />,
        tab: <Tab label='Settings' icon='md-settings' />
      }
    ];
  }

  render() {
    return (
      <Page>
        <Splitter>
          <SplitterSide
            style={{
                boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
            }}
            side='left'
            width={'100%'}
            collapse={true}
            isSwipeable={true}
            isOpen={this.state.isOpen}
            onClose={this.hide.bind(this)}
            onOpen={this.show.bind(this)}
          >
            <Page>
              <List
                dataSource={['Profile', 'Followers', 'Settings']}
                renderRow={(title) => (
                  <ListItem key={title} onClick={this.hide.bind(this)} tappable>{title}</ListItem>
                )}
              />
            </Page>
          </SplitterSide>
          <SplitterContent>

            <Page key='First-Page' renderToolbar={this.renderToolbar.bind(this)}>

              <Tabbar
                index={this.state.index}
                onPreChange={(event) =>
                  {
                    if (event.index != this.state.index) {
                      this.setState({index: event.index});
                    }
                  }
                }
                renderTabs={this.renderTabs}
              />
            </Page>

          </SplitterContent>
        </Splitter>
      </Page>

    )
  }
}
