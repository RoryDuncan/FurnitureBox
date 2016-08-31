import React from 'react';
import { Route, IndexRoute } from 'react-router';

import collections from './collections.json';

import { 
  App,
  AboutPage,
  HomePage,
  NotFoundPage,
  CatalogPage,
  CollectionsPage,
  collectionPages
} from './components/App.js';

const site = "ValueLink"
const title = (page) => `${site} - ${page}`

const collectionRoutes = Object.keys(collections).map((name, i) =>{
  return <Route 
    path="/collections/:name" 
    title={title(`${name} Collection`)}
    component={collectionPages[name]}
    key = {i} />
});


export const routes = (
  <Route path='/' component={App}>
    <IndexRoute title='ValueLink' component={HomePage} />
    
    <Route path='about' title={title("About")} component={AboutPage} />
    <Route path='catalog' title={title("Catalog")} component={CatalogPage} />
    
    <Route path='faq'   title={title("FAQ")} component={NotFoundPage} />
    <Route path='contact' title={title("Contact")} component={NotFoundPage} />
    <Route path='account' title={title("Account")} component={NotFoundPage} />
    <Route path='admin' title={title("Admin")} component={NotFoundPage} />
    <Route path='collections' title={title("Collections")} component={CollectionsPage}>
      {collectionRoutes}
    </Route>
    
    {/* fall through*/}
    <Route path='*' title={title("404: Not Found")} component={NotFoundPage} />
  </Route>
);

export default routes;
