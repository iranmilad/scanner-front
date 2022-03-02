import React,{Suspense} from 'react';
import BigLoading from '../../components/bigLoading';

export default ({ Component, route }) => {
	return (
		<>
			<main>
				<Suspense fallback={<BigLoading />}>
					<Component route={route} />
				</Suspense>
			</main>
		</>
	);
};
