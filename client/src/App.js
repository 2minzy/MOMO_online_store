import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen';
import ProductDetail from './screens/ProductDetail';
import ProductsLanding from './screens/ProductsLanding';

const App = () => {
  return (
    <Router>
    <Header />
    <main className='landing'>
    <Route exact path='/' component={HomeScreen} />
    <Route exact path='/shop' component={ProductsLanding} />
    <Route exact path='/shop/product/:id' component={ProductDetail} />
    </main>
    <Footer />
    </Router>
  );
}

export default App;
