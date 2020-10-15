import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import { Switch, Route } from 'react-router-dom';
import ShopPage from './pages/shoppage/shoppage.component';
import Header from './components/header/header.component';
import './App.css';

function App() {
  return (
    <div>
    	<Header/>
    	<Switch>
    		<Route exact path='/' component={HomePage}/>
    		<Route exact path='/shop' component={ShopPage}/>
    	</Switch>
    </div>
  );
}

export default App;
