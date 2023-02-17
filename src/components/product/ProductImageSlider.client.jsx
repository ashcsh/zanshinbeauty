
import Slider from "react-slick";

export default function ProductImageSlider({ product, addToRefs, sliderRef }) {

  
    return (
      
            <div className="w-[500px] h-[500px] overflow-x-hidden snap-y snap-mandatory overflow-scroll scrollbar-hide">
                {product.media.nodes.map((medi, i) => (
                        <img
                            src={medi.image.url}
                            key={medi.id}
                            className={`section-${i + 1} imageItem snap-start w-[500px] h-[500px] mt-[40px] mb-[40px]`}
                            ref={addToRefs}
                        />
                ))}
            </div>
    
    )
}
