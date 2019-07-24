import React from 'react';
import Upload from './pages/Upload/Upload';
import Home from './pages/Home/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainNavigation from './components/MainNavigation/MainNavigation';
import Footer from './components/Footer/Footer'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <MainNavigation />
        <main className="main-content">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/upload" component={Upload} />
          </Switch>
        </main>
        <Footer />
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
