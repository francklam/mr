import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import React from 'react';

import SearchResto from '../imports/ui/resto/searchResto.jsx';
import Layout from '../imports/ui/core/layout.jsx';

// import '../imports/startup/accounts-config.js';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

FlowRouter.route('/', {
  name: 'Default',
  triggersEnter: [(context, redirect) => {
    redirect('SearchResto');
  }]
});
FlowRouter.route('/search', {
  name: 'SearchResto',
  action() {
    mount(Layout);
    }
  },
);
