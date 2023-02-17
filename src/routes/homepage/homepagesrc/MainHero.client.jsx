
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SlideTwo from "./slides/SlideTwo.client";
import SlideThree from "./slides/SlideThree.client";

export default function MainHero({phone}) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows:false,
        appendDots: dots => (
            <ul style={{ padding: '20px', textAlign: 'center', marginBottom:phone ? "-5px" : "60px" }}>{dots}</ul>
          ),
    };

    return (
        <div className="w-[96%] h-[60vh] bg-none cursor-grab bannerswitch:h-[45vh]">
            <Slider {...settings}>
                <div className="w-full   ">
                    <SlideTwo/>
                </div>
                <div className="w-full  ">
                    <SlideThree />
                </div>
            </Slider>
        </div>

    )
}

