import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductDetail from './screens/ProductDetail';
import ProductsLanding from './screens/ProductsLanding';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='landing'>
        <Route exact path='/' component={HomeScreen} />
        <Route exact path='/shipping' component={ShippingScreen} />
        <Route exact path='/payment' component={PaymentScreen} />
        <Route exact path='/placeorder' component={PlaceOrderScreen} />
        <Route exact path='/order/:id' component={OrderScreen} />
        <Route exact path='/login' component={LoginScreen} />
        <Route exact path='/register' component={RegisterScreen} />
        <Route exact path='/profile' component={ProfileScreen} />
        <Route exact path='/shop' component={ProductsLanding} />
        <Route exact path='/shop/product/:id' component={ProductDetail} />
        <Route exact path='/cart/:id?' component={CartScreen} />
        <Route exact path='/admin/userlist' component={UserListScreen} />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
