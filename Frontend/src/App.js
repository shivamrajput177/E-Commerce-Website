import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import {Container} from 'react-bootstrap';
import {BrowserRouter, Route,Switch} from 'react-router-dom'
import HomeScreens from './screens/HomeScreens'
import ProductScreens from './screens/ProductScreens'
import CartScreens from './screens/CartScreens'
import LoginScreens from './screens/LoginScreens'
import RegisterScreens from './screens/RegisterScreens'
import ProfileScreens from './screens/ProfileScreens'
import ShippingScreens from './screens/ShippingScreens'
import PaymentScreens from './screens/PaymentScreens'
import PlaceOrderScreens from './screens/PlaceOrderScreens'
import OrderScreens from './screens/orderScreens'

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <main className="py-3">
      <Container>
      <Switch>
      <Route path='/' component={HomeScreens} exact />
      <Route path='/product/:id' component={ProductScreens} />
      <Route path='/cart:id?' component={CartScreens} />
      <Route path='/login' component={LoginScreens} />
      <Route path='/register' component={RegisterScreens} />
      <Route path='/profile' component={ProfileScreens} />
      <Route path='/shipping' component={ShippingScreens} />
      <Route path='/payment' component={PaymentScreens} />
      <Route path='/placeorder' component={PlaceOrderScreens} />
      <Route path='/order/:id' component={OrderScreens} />

      </Switch>
      </Container>
      </main>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
