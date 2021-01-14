import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import {Container} from 'react-bootstrap';
import {BrowserRouter, Route,Switch} from 'react-router-dom'
import HomeScreens from './screens/HomeScreens'
import ProductScreens from './screens/ProductScreens'
import CartScreens from './screens/CartScreens'

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
      </Switch>
      </Container>
      </main>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
