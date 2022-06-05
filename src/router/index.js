import { authRoutes } from './auth';
import { publicRoute } from './public';
import { privateRoute } from './private';

export default [...authRoutes, ...publicRoute, ...privateRoute];
