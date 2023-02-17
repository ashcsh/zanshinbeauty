import React, { useEffect, useState } from 'react'
import { Link } from "@shopify/hydrogen"

import { motion } from "framer-motion"

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState("");
  const [style, setStyle] = useState("")
  const [produse, setProduse] = useState(false)
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    if (localStorage.getItem("wishlist")) {
      var storage = localStorage.getItem("wishlist")
      storage = JSON.parse(storage)
      if (storage.length <= 0) {
        setProduse(false)
      } else {
        var newArray = []
        storage.map((el) => {
          newArray.push(el);
        })
        setWishlist(newArray);
        setProduse(true);
        setStyle("border-b-[0.8px] border-black");
      }
    }
  }, [trigger])

  const handleRemove = (el) => {
    var rmArr = []
    var storage = localStorage.getItem("wishlist")
    storage = JSON.parse(storage)

    storage.map((wish) => {
      if (el.handle !== wish.handle) {
        rmArr.push(wish)
      }
      localStorage.setItem("wishlist", JSON.stringify(rmArr))
    })
    setTrigger(trigger + 1)

  }


  return (
    <div className="mt-[30px]">
      <ul className="hidden thirdswitch:flex thirdswitch:flex-col thirdswitch:items-center">

        {produse && wishlist.map((elm, indexm) => (
          <li key={indexm} className="hidden justify-between shadow-md h-fit w-4/5  thirdswitch:w-full p-[50px] thirdswitch:flex thirdswitch:flex-col">
            <button className="shadow-md w-[2px] h-[2px] self-end" onClick={() => handleRemove(elm)}>X</button>
            <div className="p-10 flex flex-col items-center justify-center smallphone:w-full">
              <img src={elm.image} alt="wishlistImage" className="max-w-[400px] smallphone:w-[200px] smallphone:h-[200px]" />
              <h2 className="smallphone:text-[10px] mt-[10px]">
                {elm.data}
              </h2>
            </div>
            <div className="flex flex-col justify-center items-center smallphone:w-full">
              <h2>{elm.vendor}</h2>
              <h2>{elm.title}</h2>
            </div>
            <div className="flex flex-col justify-between items-center mt-[50px] smallphone:w-full">
              <Link to={`/products/${elm.handle}`} className="shadow-md p-5 smallphone:text-[20px]">
                Vezi Produs
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <ul className="flex flex-col items-center thirdswitch:hidden">
        {produse && wishlist.map((el, index) => (



          <li key={index} className="flex justify-between shadow-md h-fit w-5/6 p-[50px] thirdswitch:hidden">
            <div className="p-10 thirdswitch:hidden">
              <img src={el.image} alt="wishlistImage" className="w-[200px] h-[200px] thirdswitch:hidden" />
              <h2>Adaugat : <span> {el.data}</span> </h2>
            </div>
            <div className="flex flex-col justify-center items-center thirdswitch:hidden">
              <h2>{el.vendor}</h2>
              <h2>{el.title}</h2>
            </div>
            <div className="flex flex-col justify-between items-center thirdswitch:hidden">
              <button className="shadow-md w-[2px] h-[2px] self-end" onClick={() => handleRemove(el)}>X</button>
              <Link to={`/products/${el.handle}`} className="shadow-md p-5">
                Vezi Produs
              </Link>
            </div>
          </li>

        ))}
      </ul>
      {!produse && (
        <div className="w-full h-full flex flex-col items-center mt-[90px]">
          <h3 className="text-[40px] text-[#C9D6DF] mb-[30px]">Din pacate ...  </h3>
          <h3 className="text-[40px] text-[#C9D6DF] mb-[30px]">Wishlistul tau este gol</h3>
          <svg className="w-[300px] h-[300px] fill-[#C9D6DF] mb-[30px]" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 549.09 548.84">
            <g id="Layer_1-2" data-name="Layer 1">
              <g>
                <g>
                  <path className="cls-1" d="M549.09,274.56c-.04,151.7-123.06,274.36-275.09,274.28C122.79,548.76-.06,425.74,0,274.48,.06,122.71,122.8-.1,274.32,0c152.11,.1,274.8,122.71,274.76,274.56ZM274.59,23.19c-138.15-.09-250.97,112.6-251.2,250.91-.23,138.25,112.31,251.13,250.6,251.34,138.69,.21,251.59-112.27,251.7-250.75,.11-138.5-112.63-251.41-251.1-251.49Z" />
                  <path className="cls-1" d="M549.09,274.56c-.04,151.7-123.06,274.36-275.09,274.28C122.79,548.76-.06,425.74,0,274.48,.06,122.71,122.8-.1,274.32,0c152.11,.1,274.8,122.71,274.76,274.56ZM274.59,23.19c-138.15-.09-250.97,112.6-251.2,250.91-.23,138.25,112.31,251.13,250.6,251.34,138.69,.21,251.59-112.27,251.7-250.75,.11-138.5-112.63-251.41-251.1-251.49Z" />
                </g>
                <path className="cls-1" d="M268.17,373.61c28.95-5.44,58.95,5.85,73.69,28.38,1.68,2.57,2.67,6.17,2.51,9.21-.24,4.89-3.59,8.22-8.31,9.51-5.02,1.37-8.89-.83-12.44-4.44-4.86-4.94-9.51-10.51-15.32-14.03-27.44-16.62-64.49-1.51-73.11,29.34-.49,1.76-.93,3.57-1.73,5.19-2.67,5.43-8.26,7.75-13.81,5.89-5.59-1.87-8.94-6.99-7.84-12.8,4.56-24.18,19.1-40.48,40.89-50.74,4.93-2.32,10.31-3.71,15.48-5.53Z" />
                <path className="cls-1" d="M363.16,256.08c31.14,1.81,60.85,10.64,86.46,30.89,2.47,1.95,4.8,4.77,5.85,7.67,1.75,4.85-.58,10.09-4.56,12.7-4.19,2.75-9.67,2.41-14.42-1.19-15.65-11.86-33.08-19.89-52.3-23.66-8.78-1.72-17.8-2.26-26.72-3.16-7.49-.76-11.8-5.21-11.5-12.28,.28-6.88,4.76-10.93,12.16-10.98,1.33,0,2.66,0,5.03,0Z" />
                <path className="cls-1" d="M203.78,259.08c.09,7.03-4.16,11.72-11.27,11.85-29.21,.55-55.36,10.02-79.05,26.82-4.34,3.08-8.98,4.54-13.96,1.62-4.52-2.65-6.52-7.01-5.38-11.88,.69-2.93,2.77-6.12,5.16-7.99,21.6-16.88,46.28-26.57,73.33-30.26,6.73-.92,13.58-1.33,20.38-1.36,6.63-.02,10.7,4.59,10.78,11.2Z" />
              </g>
            </g>
          </svg>

          <Link to="/products">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className=" rounded shadow-md mt-[30px] p-[20px] text-[30px] text-[#F0F5F9] bg-[#52616B] font-['Kenjo']">
              Vezi toate Produsele
            </motion.div>
          </Link>
        </div>

      )}
    </div>

  )
}
