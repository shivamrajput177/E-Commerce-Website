// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// // import { PayPalButton } from 'react-paypal-button-v2'
// import { Link } from 'react-router-dom'
// import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import Message from '../components/Message'
// import Loader from '../components/Loader'
// import {getOrderDetails} from '../actions/orderAction'
// // import {
// //   ORDER_PAY_RESET,
// //   ORDER_DELIVER_RESET,
// // } from '../constants/orderConstants'

// const OrderScreen = ({ match, history }) => {
//   const orderId = match.params.id

//   const [sdkReady, setSdkReady] = useState(false)

//   const dispatch = useDispatch()

//   const cart = useSelector((state) => state.cart)
// //   const userLogin = useSelector((state) => state.userLogin)

//   const orderDetails = useSelector((state) => state.orderDetails)
//   var { order, loading, error } = orderDetails
//     // loading  = false
// //   const orderPay = useSelector((state) => state.orderPay)
// //   const { loading: loadingPay, success: successPay } = orderPay

// //   const orderDeliver = useSelector((state) => state.orderDeliver)
// //   const { loading: loadingDeliver, success: successDeliver } = orderDeliver

//   const userLogin = useSelector((state) => state.userLogin)
//   const { userInfo } = userLogin

//   if (!loading) {
//     //   Calculate prices
//     const addDecimals = (num) => {
//       return (Math.round(num * 100) / 100).toFixed(2)
//     }

//     order.itemsPrice = addDecimals(
//       order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
//     )
//   }

//   useEffect(() => {
//     if (!userInfo) {
//       history.push('/login')
//     }
//     dispatch(getOrderDetails(orderId))
//     // const addPayPalScript = async () => {
//     //   const { data: clientId } = await axios.get('/api/config/paypal')
//     //   const script = document.createElement('script')
//     //   script.type = 'text/javascript'
//     //   script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
//     //   script.async = true
//     //   script.onload = () => {
//     //     setSdkReady(true)
//     //   }
//     //   document.body.appendChild(script)
//     // }

//     // if (!order || successPay || successDeliver || order._id !== orderId) {
//     // //   dispatch({ type: ORDER_PAY_RESET })
//     // //   dispatch({ type: ORDER_DELIVER_RESET })
//     //   dispatch(getOrderDetails(orderId))
//     // } else if (!order.isPaid) {
//     //   if (!window.paypal) {
//     //     addPayPalScript()
//     //   } else {
//     //     setSdkReady(true)
//     //   }
//     // }
//   }, [dispatch, orderId, order])

//   const successPaymentHandler = (paymentResult) => {
//     console.log(paymentResult)
//     // dispatch(payOrder(orderId, paymentResult))
//   }

//   const deliverHandler = () => {
//     // dispatch(deliverOrder(order))
//   }

//   return loading ? (
//     // <Loader />
//     <>
//       <h1>Order {orderId}</h1>
//       <Row>
//         <Col md={8}>
//           <ListGroup variant='flush'>
//             <ListGroup.Item>
//               <h2>Shipping</h2>
//               <p>
//                 <strong>Name: </strong> {userLogin.userInfo.name}
//               </p>
//               <p>
//                 <strong>Email: </strong>{' '}
//                 <a href={`mailto:${userLogin.userInfo.email}`}>{userLogin.userInfo.email}</a>
//               </p>
//               <p>
//                 <strong>Address:</strong>
//                 {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
//                 {cart.shippingAddress.postalCode},{' '}
//                 {cart.shippingAddress.country}
//               </p>
//               {/* {order.isDelivered ? (
//                 <Message variant='success'>
//                   Delivered on {order.deliveredAt}
//                 </Message>
//               ) : (
//                 <Message variant='danger'>Not Delivered</Message>
//               )} */}
//             </ListGroup.Item>

//             <ListGroup.Item>
//               <h2>Payment Method</h2>
//               <p>
//                 <strong>Method: </strong>
//                 {/* {order.paymentMethod} */}
//               </p>
//               {/* {order.isPaid ? (
//                 <Message variant='success'>Paid on {order.paidAt}</Message>
//               ) : (
//                 <Message variant='danger'>Not Paid</Message>
//               )} */}
//             </ListGroup.Item>

//             <ListGroup.Item>
//               <h2>Order Items</h2>
//               {order.orderItems.length === 0 ? (
//                 <Message>Order is empty</Message>
//               ) : (
//                 <ListGroup variant='flush'>
//                   {order.orderItems.map((item, index) => (
//                     <ListGroup.Item key={index}>
//                       <Row>
//                         <Col md={1}>
//                           <Image
//                             src={item.image}
//                             alt={item.name}
//                             fluid
//                             rounded
//                           />
//                         </Col>
//                         <Col>
//                           <Link to={`/product/${item.product}`}>
//                             {item.name}
//                           </Link>
//                         </Col>
//                         <Col md={4}>
//                           {item.qty} x ${item.price} = ${item.qty * item.price}
//                         </Col>
//                       </Row>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               )}
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>
//         <Col md={4}>
//           <Card>
//             <ListGroup variant='flush'>
//               <ListGroup.Item>
//                 <h2>Order Summary</h2>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Items</Col>
//                   <Col>${order.itemsPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Shipping</Col>
//                   <Col>${order.shippingPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Tax</Col>
//                   <Col>${order.taxPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Total</Col>
//                   <Col>${order.totalPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               {/* {!order.isPaid && (
//                 <ListGroup.Item>
//                   {loadingPay && <Loader />}
//                   {!sdkReady ? (
//                     <Loader />
//                   ) : (
//                     <PayPalButton
//                       amount={order.totalPrice}
//                       onSuccess={successPaymentHandler}
//                     />
//                   )}
//                 </ListGroup.Item>
//               )} */}
//               {/* {loadingDeliver && <Loader />}
//               {userInfo &&
//                 userInfo.isAdmin &&
//                 order.isPaid &&
//                 !order.isDelivered && (
//                   <ListGroup.Item>
//                     <Button
//                       type='button'
//                       className='btn btn-block'
//                       onClick={deliverHandler}
//                     >
//                       Mark As Delivered
//                     </Button>
//                   </ListGroup.Item>
//                 )} */}
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   ) : error ? (
//     <Message variant='danger'>{error}</Message>
//   ) : (
//     <>
//       <h1>Order {order._id}</h1>
//       <Row>
//         <Col md={8}>
//           <ListGroup variant='flush'>
//             <ListGroup.Item>
//               <h2>Shipping</h2>
//               <p>
//                 <strong>Name: </strong> {order.user.name}
//               </p>
//               <p>
//                 <strong>Email: </strong>{' '}
//                 <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
//               </p>
//               <p>
//                 <strong>Address:</strong>
//                 {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
//                 {order.shippingAddress.postalCode},{' '}
//                 {order.shippingAddress.country}
//               </p>
//               {order.isDelivered ? (
//                 <Message variant='success'>
//                   Delivered on {order.deliveredAt}
//                 </Message>
//               ) : (
//                 <Message variant='danger'>Not Delivered</Message>
//               )}
//             </ListGroup.Item>

//             <ListGroup.Item>
//               <h2>Payment Method</h2>
//               <p>
//                 <strong>Method: </strong>
//                 {order.paymentMethod}
//               </p>
//               {order.isPaid ? (
//                 <Message variant='success'>Paid on {order.paidAt}</Message>
//               ) : (
//                 <Message variant='danger'>Not Paid</Message>
//               )}
//             </ListGroup.Item>

//             <ListGroup.Item>
//               <h2>Order Items</h2>
//               {order.orderItems.length === 0 ? (
//                 <Message>Order is empty</Message>
//               ) : (
//                 <ListGroup variant='flush'>
//                   {order.orderItems.map((item, index) => (
//                     <ListGroup.Item key={index}>
//                       <Row>
//                         <Col md={1}>
//                           <Image
//                             src={item.image}
//                             alt={item.name}
//                             fluid
//                             rounded
//                           />
//                         </Col>
//                         <Col>
//                           <Link to={`/product/${item.product}`}>
//                             {item.name}
//                           </Link>
//                         </Col>
//                         <Col md={4}>
//                           {item.qty} x ${item.price} = ${item.qty * item.price}
//                         </Col>
//                       </Row>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               )}
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>
//         <Col md={4}>
//           <Card>
//             <ListGroup variant='flush'>
//               <ListGroup.Item>
//                 <h2>Order Summary</h2>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Items</Col>
//                   <Col>${order.itemsPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Shipping</Col>
//                   <Col>${order.shippingPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Tax</Col>
//                   <Col>${order.taxPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Total</Col>
//                   <Col>${order.totalPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               {/* {!order.isPaid && (
//                 <ListGroup.Item>
//                   {loadingPay && <Loader />}
//                   {!sdkReady ? (
//                     <Loader />
//                   ) : (
//                     <PayPalButton
//                       amount={order.totalPrice}
//                       onSuccess={successPaymentHandler}
//                     />
//                   )}
//                 </ListGroup.Item>
//               )} */}
//               {/* {loadingDeliver && <Loader />}
//               {userInfo &&
//                 userInfo.isAdmin &&
//                 order.isPaid &&
//                 !order.isDelivered && (
//                   <ListGroup.Item>
//                     <Button
//                       type='button'
//                       className='btn btn-block'
//                       onClick={deliverHandler}
//                     >
//                       Mark As Delivered
//                     </Button>
//                   </ListGroup.Item>
//                 )} */}
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   )
// }

// export default OrderScreen

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { createOrder,getOrderDetails} from '../actions/orderAction'
// import { ORDER_CREATE_RESET } from '../constants/orderConstants'
// import { USER_DETAILS_RESET } from '../constants/userConstants'

const OrderScreen = ({ history,match }) => {
    const orderId = match.params.id
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  //   const userLogin = useSelector((state) => state.userLogin)
//   const { userInfo } = userLogin

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

//   const orderCreate = useSelector((state) => state.orderCreate)
//   const { order, success, error } = orderCreate

    const userLogin = useSelector((state) => state.userLogin)
     const { userInfo } = userLogin
    
      const orderDetails = useSelector((state) => state.orderDetails)
  var { order, loading, error } = orderDetails

//   const orderCreate = useSelector((state) => state.orderCreate) 
//   var { loading , success, order } = orderDetails 

  useEffect(() => {
    // if (success) {
    //   history.push(`/order/${order._id}`)
    // //   dispatch({ type: USER_DETAILS_RESET })
    // //   dispatch({ type: ORDER_CREATE_RESET })
    // }
    dispatch(getOrderDetails(orderId))
    // eslint-disable-next-line
  }, [history])

 

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