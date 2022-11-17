import { createContext } from 'react';

const RoutesContext = createContext({
  stockID: null,
  headerType: 0,
  setStockID: () => {},
  setHeaderType: () => {},
});

export default RoutesContext;
