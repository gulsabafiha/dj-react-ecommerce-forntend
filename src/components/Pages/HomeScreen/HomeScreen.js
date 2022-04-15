import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../../SharedComp/Footer/Footer";
import Header from "../../SharedComp/Header/Header";
import Product from "../Product/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../../actions/productAction";
import Loader from "../Loader";
import Message from "../Message";


const HomeScreen = ({ props }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;
   let keyword=window.location.search
 

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch,keyword]);

  return (
    <div>
      <Container className="py-5">
        <h1>Latest Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default HomeScreen;
