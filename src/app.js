import React, { Component } from 'react';
import InfiniteScroll from "react-infinite-scroller";
import Carousel from "./components/Carousel";
import { Container, Row, Col } from "reactstrap";

import "bootstrap/scss/bootstrap.scss";
import "./main.scss";

const categoryList = ["angry", "bored", "disappointed", "drunk", "embarrassed", "excited", "frustrated", "happy", "hungry", "inspired", "lonely", "love", "nervous", "pain", "reaction", "relaxed", "sad", "sassy", "scared", "shocked", "sick", "stressed", "surprised", "suspicious", "tired", "unimpressed"];

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasMore: true,
      categories: [],
      offset: 0
    }
  }

  loadMore = () => {
    const { offset, hasMore } = this.state;
    if(offset < categoryList.length && hasMore){
      setTimeout( () => {
        const nextItems = categoryList.slice(0, offset + 3);
        console.log(nextItems);
        this.setState(prevState => ({ categories: nextItems, offset: prevState.offset + 3 }))
      }, 500)
    } else {
      this.setState({hasMore: false})
    }
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <h1 className="text-center mb-5">Giphy Lazyloading Images</h1>
          </Col>
          <Col>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadMore}
              hasMore={this.state.hasMore}
            >
              {
                this.state.categories.length > 0 && this.state.categories.map( item => {
                  return(
                    <Carousel searchKey={item} key={item} />
                  )
                })
              }
            </InfiniteScroll>
          </Col>
        </Row>
      </Container>
    );
  }
}
