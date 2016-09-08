import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {App} from './components/App.js';
// Pages
import {Home} from './pages/Home';
import {About} from './pages/About';
import {FAQ} from './pages/FAQ';
import {Shop} from './pages/Shop';
import {Contact} from './pages/Contact';
import {NotFound} from './pages/NotFound';
import {Collections} from './pages/Collections';
import {collectionPages} from './pages/Collections__rendered';

import data from './collections.json';
const site = "ValueLink"
const title = (page) => `${site} - ${page}`

const collectionRoutes = data.keys.map((name, i) =>{
  return <Route 
    path={`/collections/${name}`}
    title={title(`${name} Collection`)}
    component={collectionPages[name]}
    key = {i} />
});


export const routes = (
  <Route path='/' component={App}>
    <IndexRoute title='ValueLink' component={Home} />
    <Route path='about' title={title("About")} component={About} />
    <Route path='Shop' title={title("Shop")} component={Shop} />
    <Route path='faq'   title={title("FAQ")} component={FAQ} />
    <Route path='how-it-works'   title={title("FAQ")} component={NotFound} />
    <Route path='contact' title={title("Contact")} component={Contact} />
    <Route path='account' title={title("Account")} component={NotFound} />
    <Route path='admin' title={title("Admin")} component={NotFound} />
    <Route path='collections' title={title("Collections")} component={Collections}>
      {collectionRoutes}
    </Route>
    
    {/* fall through*/}
    <Route path='*' title={title("404: Not Found")} component={NotFound} />
  </Route>
);

export default routes;
