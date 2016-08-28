import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { 
  App,
  AboutPage,
  HomePage,
  NotFoundPage,
  CatalogPage,
  CollectionsPage
} from './components/App.js';

const site = "ValueLink"
const title = (page) => `${site} - ${page}`


export const routes = (
  <Route path='/' component={App}>
    <IndexRoute title='ValueLink' component={HomePage} />
    
    <Route path='about' title={title("About")} component={AboutPage} />
    <Route path='catalog' title={title("Catalog")} component={CatalogPage} />
    <Route path='collections' title={title("Collections")} component={CollectionsPage} />
    <Route path='faq'   title={title("FAQ")} component={NotFoundPage} />
    <Route path='contact' title={title("Contact")} component={NotFoundPage} />
    <Route path='account' title={title("Account")} component={NotFoundPage} />
    <Route path='admin' title={title("Admin")} component={NotFoundPage} />
    <Route path='*' title={title("404: Not Found")} component={NotFoundPage} />
    
  </Route>
);

export default routes;
