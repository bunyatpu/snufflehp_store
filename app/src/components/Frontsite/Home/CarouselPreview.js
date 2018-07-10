import React, { Component } from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import pic1 from '../../../images/1.jpeg'
import pic2 from '../../../images/2.jpeg'
import pic3 from '../../../images/3.jpeg'

export default class CarouselPreview extends Component {

	render() {

    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000
    };

		return (

      <Slider {...settings} >
          <div>
            <img src={pic1} style={{height:"300px",width: '100%'}} alt=""  />
          </div>
          <div>
            <img src={pic2} style={{height:"300px",width: '100%'}}  alt=""  />
          </div>
          <div>
            <img src={pic3} style={{height:"300px",width: '100%'}}  alt=""  />
          </div>
      </Slider>
      
		);
	}

}


// render() {

//   return (

//     <Carousel 
//         autoPlay={true} 
//         showStatus={false} 
//         showIndicators={false}
//         showThumbs={false}
//       >
//         <div>
//           <img src={pic1} style={{height:"300px"}} alt=""  />
//         </div>
//         <div>
//           <img src={pic2} style={{height:"300px"}}  alt=""  />
//         </div>
//         <div>
//           <img src={pic3} style={{height:"300px"}}  alt=""  />
//         </div>
//     </Carousel>
    
//   );
// }