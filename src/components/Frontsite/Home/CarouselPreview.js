import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import pic1 from '../../../images/1.jpeg'
import pic2 from '../../../images/2.jpeg'
import pic3 from '../../../images/3.jpeg'

export default class CarouselPreview extends Component {

	render() {

		return (

      <Carousel 
          autoPlay={true} 
          showStatus={false} 
          showIndicators={false}
          showThumbs={false}
        >
          <div>
            <img src={pic1} style={{height:"300px"}} alt=""  />
          </div>
          <div>
            <img src={pic2} style={{height:"300px"}}  alt=""  />
          </div>
          <div>
            <img src={pic3} style={{height:"300px"}}  alt=""  />
          </div>
      </Carousel>
      
		);
	}

}