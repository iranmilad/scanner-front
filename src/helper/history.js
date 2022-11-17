import { useHistory } from 'react-router-dom';
export const History = ()=>{
  let history = useHistory();
  return history;
};

export const ReplaceHistory = (path)=>{
  let history = useHistory();
  history.replace(path);
  return history;
}