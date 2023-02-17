import React from 'react'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SmallHomeCard from './SmallHomeCard.client';
export default function HomepageProductSlickSlider({ node, direction, mobile }) {
    const settings = {
        dots:false,
        draggable:mobile? true : false,
        pauseOnHover: mobile? true : false,
        pauseOnFocus:mobile? true : false,
        arrows:false,
        infinite: true,
        slidesToShow: mobile? 2 : 6,
        slidesToScroll: mobile? 2 : 2,
        centerMode:true,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 3000,
        cssEase: "linear",
        rtl:direction,
        
    };
    return (
        <div className="">
            <Slider {...settings}>
                {node.products.nodes.map((nod, index) => (
                    <SmallHomeCard img={nod.images.nodes[0].url} text={nod.vendor} alt={nod.handle} handle={nod.handle}/>
                ))}
            </Slider>
        </div>
    )
}
