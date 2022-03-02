import { Switch, Route } from 'react-router-dom';
import { PublicLayout, AuthLayout } from '../../layout';
import { ConnectedRouter } from 'connected-react-router';
import { History } from '../../helper/history';
import Routes from '../../router';
import { withRouter } from 'react-router';
import NotFound from '../../components/notFound';
import { getLocalStorage } from '../../helper/localStorage';

export default () => {
	const layoutManager = (item, key) => {
		switch (item.layout) {
			case 'public':
				return (
					<Route
						key={key}
						exact={true}
						strict={true}
						path={item.path}
						render={withRouter(route => (
							<PublicLayout route={route} Component={item.component} options={item.options || {}} />
						))}
					/>
				);
			case 'auth':
				return (
					<Route
						key={key}
						exact={true}
						strict={true}
						path={item.path}
						render={withRouter(route => (
							<AuthLayout route={route} Component={item.component} options={item.options || {}} />
						))}
					/>
				);
			default:
				return (
					<Route key={key} exact={true} path={item.path} component={item.component} options={item.options || {}} />
				);
		}
	};

	const switchRoutes = () => {
		return Routes.map((route, key) => {
			return layoutManager(route, key);
		});
	};

	const validPath = ['/home'];

	if (
		!getLocalStorage('userToken') &&
		(validPath.indexOf(window.location.pathname) === -1 || window.location.pathname === '/')
	) {
		window.location.replace('/home');
		return null;
	} else {
		return (
			<ConnectedRouter history={History}>
				<Switch>
					{switchRoutes()}
					<Route component={NotFound} />
				</Switch>
			</ConnectedRouter>
		);
	}
};
