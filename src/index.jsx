
// import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import { ReduxRouter } from 'redux-react-router';
import configureStore from './redux/store';
import App from './app/App';
import GnomesList from './components/gnomes/list/GnomesList';
import GnomeDetails from './components/gnomes/details/GnomeDetails';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Router forceRefresh={true}>
			<App>
				<Switch>
					<Route exact path='/'>
						<Redirect to="/gnomes" />
					</Route>
					<Route exact path='/gnomes' component={GnomesList} />
					<Route path='/gnome/:id' component={GnomeDetails} />
				</Switch>
			</App>
		</Router>
	</Provider>,
	document.getElementById('root')
);
