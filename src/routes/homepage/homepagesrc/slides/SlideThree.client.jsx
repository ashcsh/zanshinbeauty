import bannerProduse from "../assets/banner3.png"
import {motion} from "framer-motion"

export default function SlideThree() {
    return (
        <div className="w-full h-max flex justify-center items-center ">
            <div className="flex justify-center items-center  h-full w-full ">
            <div className=" w-max h-max flex justify-center items-center relative ">
                    <img src={bannerProduse} alt="BannerZanshin" className=" max-h-[65vh] w-full bigbanner:w-max bannerswitch:max-h-[45vh] " />
                    <motion.a href="/products" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className="absolute bottom-[50%] left-[35%] text-[1.3vw] rounded-sm px-[40px] py-[10px] bg-none shadow-2xl forthswitch:text-[1.7vw] forthswitch:py-[5px] forthswitch:px-[20px] ">Descopera</motion.a>
                </div>
            </div>
        </div>
    )
}
