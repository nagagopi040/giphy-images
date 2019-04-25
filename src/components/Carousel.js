import React from 'react';
import SlickCarousel from "react-slick";
import { Card } from "reactstrap";
import Image from "./Image";
import GiphyAPIClient from "giphy-js-sdk-core";

import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

const client = GiphyAPIClient("Ua4WPPHpMy12OibmTF5nFcI4JrDZ9aNb");

export default class Carousel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            giphies: []
        }
    }

    componentDidMount(){
        client.search("gifs", { q: this.props.searchKey, limit: 25, offset: 0, lang: "en" })
            .then(res => {
                this.setState({giphies: res.data ? res.data : []});
            })
            .catch(err => {
                this.setState({error: err});
            })
    }

    render() {
        const { giphies } = this.state;
        const settings = {
            className: "my-3",
            dots: false,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            lazyLoad: false
        };

        return (
            <div>
                <h4 className="text-capitalize">{this.props.searchKey}</h4>
                <SlickCarousel {...settings} >
                {
                    giphies.length > 0 && giphies.map( giphy => {
                        const url = giphy.images && giphy.images.fixed_height_downsampled ? giphy.images.fixed_height_downsampled.url : "";
                        return(
                            <div key={giphy.id}>
                                <Card className="border-0 px-1 py-0" body>
                                    <Image alt={giphy.title} src={url} className="" />
                                </Card>
                            </div>
                        )
                    })
                }
                </SlickCarousel>
            </div>
        );
    }
}
