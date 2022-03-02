import { authRoutes } from "./auth";
import {publicRoute} from './public';

export default [...authRoutes,...publicRoute]