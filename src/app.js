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
      items: [],
      offset: 0
    }
  }

  loadMore = () => {
    const { offset } = this.state;
    const nextItems = categoryList.slice(0, offset + 5);
    console.log(nextItems, offset);
    if(offset < categoryList.length){
      this.setState(prevState => ({ items: nextItems, offset: prevState.offset + 3}))
    } else {
      this.setState({hasMore: false})
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center mb-5">Giphy Lazyloading Images</h1>
          </Col>
        </Row>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={this.state.hasMore}
          >
            {
              this.state.items.length > 0 && this.state.items.map( item => {
                return(
                  <Carousel searchKey={item} key={item} />
                )
              })
            }
          </InfiniteScroll>
      </Container>
    );
  }
}
