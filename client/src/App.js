import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
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
import UserEditScreen from './screens/UserEditScreen';
import ProductCreateScreen from './screens/ProductCreateScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className='wrapper'>
      <Router>
        <Header />
        <main>
          <Route exact path='/' component={HomeScreen} />
          <Route exact path='/payment' component={PaymentScreen} />
          <Route exact path='/placeorder' component={PlaceOrderScreen} />
          <Route exact path='/order/:id' component={OrderScreen} />
          <Route exact path='/shipping' component={ShippingScreen} />
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/register' component={RegisterScreen} />
          <Route exact path='/profile' component={ProfileScreen} />
          <Route exact path='/shop' component={ProductsLanding} />
          <Route exact path='/shop/search' component={SearchScreen} />
          <Route
            exact
            path='/shop/search/:keyword'
            component={ProductsLanding}
          />
          <Route
            exact
            path='/shop/search/:keyword/page/:pageNumber'
            component={ProductsLanding}
          />
          <Route
            exact
            path='/shop/category/:category'
            component={ProductsLanding}
          />
          <Route
            exact
            path='/shop/category/:category/page/:pageNumber'
            component={ProductsLanding}
          />
          <Route
            exact
            path='/shop/page/:pageNumber'
            component={ProductsLanding}
          />
          <Route exact path='/shop/product/:id' component={ProductDetail} />
          <Route exact path='/cart/:id?' component={CartScreen} />
          <Route exact path='/admin/userlist' component={UserListScreen} />
          <Route exact path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            exact
            path='/admin/productlist'
            component={ProductListScreen}
          />
          <Route
            exact
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
          />
          <Route
            exact
            path='/admin/product/:id/edit'
            component={ProductEditScreen}
          />
          <Route
            exact
            path='/admin/product/create'
            component={ProductCreateScreen}
          />
          <Route exact path='/admin/orderlist' component={OrderListScreen} />
        </main>
        <Route
          path='/'
          render={({ location }) => location.pathname !== '/' && <Footer />}
        />
      </Router>
    </div>
  );
};

export default App;
