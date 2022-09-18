import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Product from "../Product/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../../actions/productAction";
import Loader from "../Loader";
import Message from "../Message";
import Paginate from "../Paginate";
import ProductCarousel from "../ProductCarousel";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;
  let keyword = window.location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      <Container className="py-5">
        {!keyword && <ProductCarousel />}

        <h1>Latest Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword} />
          </div>
        )}
      </Container>
    </div>
  );
};

export default HomeScreen;
