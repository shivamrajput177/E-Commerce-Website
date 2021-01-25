import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { payOrder,getOrderDetails, deliverOrder} from '../actions/orderAction'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'
// import { USER_DETAILS_RESET } from '../constants/userConstants'

const OrderScreen = ({ history,match }) => {
    const orderId = match.params.id
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  const orderDetails = useSelector((state) => state.orderDetails)
  const {  loading, order} = orderDetails
  // const {taxPrice,shippingPrice,totalPrice,isPaid,isDelivered,
  //         _id,orderItems,user,paymentMethod,} = order

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // const orderDeliver = useSelector((state) => state.orderDeliver)
  // const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  //   Calculate prices

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }


  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    if (!order || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } 
    dispatch(getOrderDetails(orderId))
    // eslint-disable-next-line
  }, [history])

  console.log(order)
 

  return (
    <>
    <h1>Order {orderId}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
                <p>
                    <strong>Name: </strong> {userLogin.userInfo.name}
                </p>
                <p>
                    <strong>Email: </strong>{' '}
                     <a href={`mailto:${userLogin.userInfo.email}`}>{userLogin.userInfo.email}</a>
                </p>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
              {/* {order.isDelivered ? (
                 <Message variant='success'>
                   Delivered on {order.deliveredAt}
                 </Message>
               ) : (
                 <Message variant='danger'>Not Delivered</Message>
               )} */}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
              <strong>Method: </strong>
              {cart.paymentMethod}
              </p>
              {/* {order.isPaid ? (
                 <Message variant='success'>Paid on {order.paidAt}</Message>
               ) : (
                 <Message variant='danger'>Not Paid</Message>
               )} */}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} Rs = {item.qty * item.price} Rs
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{cart.itemsPrice} Rs</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{cart.shippingPrice} Rs</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>{cart.taxPrice} Rs</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{cart.totalPrice} Rs</Col>
                </Row>
              </ListGroup.Item>
              
              <ListGroup.Item>
               
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen