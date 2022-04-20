import { BrowserRouter,Switch, Route } from 'react-router-dom';
import { PublicLayout, AuthLayout } from '../../layout';
import Routes from '../../router';
import { withRouter } from 'react-router';
import NotFound from '../../components/notFound';
import { getLocalStorage } from '../../helper/localStorage';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getConfig } from '../../apis/main/main';
import {setConfig} from '../../redux/reducers/config';
import BigLoading from '../../components/bigLoading';

export default () => {
	// dispatching states
	const dispatch = useDispatch();
	let [loading,setLoading] = useState(false);

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

	/**
	 * use router in a loop to render all routes
	 * @returns {void}
	 */
	const switchRoutes = () => {
		return Routes.map((route, key) => {
			return layoutManager(route, key);
		});
	};

	/**
	 * send request to server every 2 second
	 * get all configs for first time
	 * set config to redux
	 */
	useEffect(()=>{
		setLoading(true);
		getConfig('/home/data')
		.then(res => {
			dispatch(setConfig(res.data))
			setLoading(false);
		})
		.catch(err=>{});
	},[]);



	return (
		<>		
		{loading ? (
			<BigLoading />
		) : (
			<BrowserRouter  >
			<Switch>
				{switchRoutes()}
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
		)}
		</>
	);
};
