import { useEffect ,useContext} from 'react';
import {useLocation } from 'react-router-dom';
import RoutesContext from "../../contexts/routes";

/**
 * this component can handle all routes and literllay it made for handle custom header in stock pages
 * @returns {null}
 */
export default function HandleRoutes() {
  const {setHeaderType,setStockID} = useContext(RoutesContext)
  const { pathname } = useLocation();
  const regex = /\/stock\//;
  useEffect(() => {
    if(regex.test(pathname)){
      //it should return stock ID for us
      let splitPath = pathname.split("/");
      splitPath = splitPath[splitPath.length - 1];
      setHeaderType(1);
      setStockID(splitPath)
    }
    else{
      setHeaderType(0);
      setStockID(null)
    }

  }, [pathname]);

  return null;
}
