import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { RestLink } from 'apollo-link-rest';

import './index.css';
import createHistory from "history/createBrowserHistory";

// import { Provider } from "react-redux";
import { Route } from "react-router";

import {
    ConnectedRouter,
    push,
} from "react-router-redux";

// import configureStore from './store'

import Home from './containers/Home';
import ProjectsPage from './containers/ProjectsPage';
import registerServiceWorker from './registerServiceWorker';

const restLink = new RestLink({
    uri: 'http://localhost:5000/api/',
  });
  const client = new ApolloClient({
    link: restLink,
    cache: new InMemoryCache(),
  });
  

const history = createHistory();
// const store = configureStore()

const App = (
    <ApolloProvider client={client}>
        <ConnectedRouter history={history}>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/projects" component={ProjectsPage} />
                {/* <Route path="/projects/:id" component={Project} /> */}
                {/* <Route path="/projects" component={Project} /> */}

            </div>
        </ConnectedRouter>
    </ApolloProvider>
)

ReactDOM.render(
    App,
    document.getElementById('root'));

registerServiceWorker();
