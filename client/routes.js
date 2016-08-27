import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App, About, Home, NotFound, Catalog } from './components/App.js';

const site = "ValueLink"
const title = (page) => `${site} - ${page}`


export const routes = (
  <Route path='/' component={App}>
    <IndexRoute title='ValueLink' component={Home} />
    
    <Route path='catalog' title={title("Catalog")} component={Catalog} />
    <Route path='about' title={title("About")} component={About} />
    <Route path='faq'   title={title("FAQ")} component={NotFound} />
    <Route path='contact' title={title("Contact")} component={NotFound} />
    <Route path='account' title={title("Account")} component={NotFound} />
    <Route path='admin' title={title("Admin")} component={NotFound} />
    <Route path='*' title={title("404: Not Found")} component={NotFound} />
    
  </Route>
);

export default routes;
