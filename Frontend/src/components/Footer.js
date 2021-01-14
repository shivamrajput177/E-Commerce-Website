import React from 'react'
import {Row, Col} from 'react-bootstrap';

export const Footer = () => {
    return (
        <footer>
             <Row>
             <div>
                 <Col className='py-3' style={{textAlign:"center",bottom:"0",position:"fixed"}}>Copyright © RS Shop</Col>
             </div>
             </Row>   
        </footer>
    )
}
export default Footer
