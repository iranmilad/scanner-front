import { History } from "../../helper/history";
import {Helmet} from 'react-helmet';

export default () => {
  return (
    <>
    <Helmet>
      <title>خانه</title>
    </Helmet>
      <button onClick={()=> History.push('/register')}>Register</button>
    </>
  )
}