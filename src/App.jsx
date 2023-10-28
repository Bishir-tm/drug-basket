import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Header from './components/Header';
import Home from "./components/Home";
import Footer from './components/Footer';
import './App.css';

function App() {
  

  return (
    <div className="App bg-light" >
      <Header />
      {/* <Search /> */}
      <Home />
      <Footer />
    </div>
  );
}

export default App;
