import { motion } from "framer-motion"

export default function SmallHomeCard({ text, img, alt, handle }) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center my-[50px]">
            <a href={`/products/${handle}`}>
                <img className=" w-[70%] shadow-md mx-[1.2vw] forthswitch:w-max forthswitch:h-[15vh]" src={img} alt={`${alt}`} />
                {/* <h2 className="mt-[5px]">{text}</h2> */}
            </a>
        </div>
    )
}
