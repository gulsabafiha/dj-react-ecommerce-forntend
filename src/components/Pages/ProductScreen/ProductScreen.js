import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form
} from "react-bootstrap";
import Rating from "../Rating/Rating";
import { listProductDetails } from "../../../actions/productAction";
import Loader from "../Loader";
import Message from "../Message";
import Header from "../../SharedComp/Header/Header";
import Footer from "../../SharedComp/Footer/Footer";

const ProductScreen = ({history}) => {
  
  const [qty,setQty]=useState(1)
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const navigate=useNavigate();

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch,id]);

  const addToCartHandler=()=>{
    navigate(`/cart/${id}?qty=${qty}`)
    
  }

  return (
    <>
    <Header/>
    <div className="container">
      
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product?.image} alt={product?.name} fluid></Image>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product?.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product?.rating}
                  text={`${product?.numReviews}  reviews`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product?.description}</ListGroup.Item>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product?.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product?.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {
                  product?.countInStock>0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col xs='auto' className='my-1'>
                        <Form.Select  
                        value={qty} 
                        onChange={(e)=>setQty(e.target.value)}>
                            {
                              [
                                ...Array(product?.countInStock).keys()
                              ].map((x)=>(
                                <option key={x+1} value={x+1}>{x+1}</option>
                              ))
                            }
                        </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )
                }
                <ListGroup.Item>
                  <Button
                  onClick={addToCartHandler}
                    className="btn-block"
                    disabled={product?.countInStock === 0}
                    type="button"
                  >
                    ADD TO Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
      
    </div>
    <Footer/>
    </>
  );
};

export default ProductScreen;
