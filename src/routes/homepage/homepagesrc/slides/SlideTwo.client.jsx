import bannerFata from "../assets/banner2.png"
import {motion} from "framer-motion"

export default function SlideTwo() {
  return (
    <div className="w-full h-max flex justify-center items-center">
      <div className="flex justify-center items-center h-full w-full">
        <div className=" w-max h-max flex justify-center items-center relative">
          <img src={bannerFata} alt="BannerZanshin" className="w-full max-h-[65vh] bigbanner:h-max bigbanner:w-max bannerswitch:max-h-[45vh] " />
          <motion.a href="/products" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className="absolute bottom-[20%] left-[10%] text-[1.1vw] rounded-full px-[30px] py-[10px] bg-[#C9D6DF] forthswitch:text-[1.7vw] forthswitch:py-[5px] forthswitch:px-[20px] forthswitch:bottom-[15%]">Descopera Aici</motion.a>
        </div>
      </div>
    </div>
  )
}
