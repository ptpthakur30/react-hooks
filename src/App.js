import React,{useContext} from 'react';
import Auth from './components/Auth'
import {AuthContext} from './context/auth-context'
import Ingredients from './components/Ingredients/Ingredients';

const App = props => {
  let content = <Auth/>
  const isAuthenticated = useContext(AuthContext);
  if(isAuthenticated.isAuth)
  {
    content=<Ingredients />
  }
  return content;
};

export default App;
