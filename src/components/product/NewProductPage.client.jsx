import { useState, useRef, useEffect, Suspense } from "react";
import { ProductForm } from "./ProductForm.client";
import { ProductOptionsProvider, Image } from "@shopify/hydrogen";
import { Heading, Text, ProductGallery } from "~/components";

import { motion } from "framer-motion";



import tipuriTen from "../../assets/tipten.svg";
import MobileProductPage from "./MobileProductPage.client";



export default function NewProductPage({ product, propsHandle }) {

    const [selectedImage, setSelectedImage] = useState(0)
    const [scrollHeight, setScrollHeight] = useState(0)
    useEffect(() => {
        var counter = 0;
        if (product) {
            product.media.nodes.map((el) => {
                if (el.alt !== "banner") {
                    counter = counter + 1
                }
            })
        }
        setScrollHeight(100 / counter)

    }, [product])

    const allRef = useRef([]);

    allRef.current = [];

    const obsRef = useRef([]);
    obsRef.current = [];

    const addToRefs = (element) => {
        if (element && !allRef.current.includes(element)) {
            allRef.current.push(element);
            obsRef.current.push(element)
        }
    }

    const handleClick = async (i) => {
        if (i !== selectedImage) {
            setTimeout(() => {
                allRef.current[i].scrollIntoView({ behavior: "smooth", block: "start" })
            }, 50);
            setSelectedImage(i)
        }
    }


    const dataInRomana = () => {
        const date = new Date()
        let month = date.getMonth() + 1
        let luna = ""
        if (month === 1) {
            luna = "Ianuarie";
        } else if (month === 2) {
            luna = "Februarie";
        } else if (month === 3) {
            luna = "Martie";
        } else if (month === 4) {
            luna = "Aprilie";
        } else if (month === 5) {
            luna = "Mai";
        } else if (month === 6) {
            luna = "Iunie";
        } else if (month === 7) {
            luna = "Iulie";
        } else if (month === 8) {
            luna = "August";
        } else if (month === 9) {
            luna = "Septembrie";
        } else if (month === 10) {
            luna = "Octombrie";
        } else if (month === 11) {
            luna = "Noiembrie";
        } else if (month === 12) {
            luna = "Decembrie";
        }
        let year = date.getFullYear()
        let day = date.getDate()

        return `${day} ${luna} ${year}`
    }

    const [esteInWishlist, setEsteInWishlist] = useState(false);
    const [trigger, setTrigger] = useState(0);
    const dataDeAzi = dataInRomana();
    const newWish = {
        handle: propsHandle,
        title: product.title,
        vendor: product.vendor,
        image: product.media.nodes[0].image.url,
        data: dataDeAzi,
    };


    useEffect(() => {
        var este = false;
        if (localStorage.getItem("wishlist")) {
            var storage = localStorage.getItem("wishlist");
            storage = JSON.parse(storage)
            storage.map((el) => {
                if (el.handle === newWish.handle) {
                    setEsteInWishlist(true)
                    este = true
                }
            })
        }
        if (!este) {
            setEsteInWishlist(false)
        }
    }, [trigger])



    const addToWishlist = () => {

        if (!localStorage.getItem("wishlist")) {
            var firstWish = [];
            firstWish.push(newWish)
            localStorage.setItem("wishlist", JSON.stringify(firstWish))
            setTrigger(trigger + 1)

        } else {
            var storage = localStorage.getItem("wishlist")
            storage = JSON.parse(storage)
            if (esteInWishlist) {
                var newArray = [];
                storage.map((el) => {
                    if (el.handle !== newWish.handle) {
                        newArray.push(el)
                    }
                })
                localStorage.setItem("wishlist", JSON.stringify(newArray))
                setTrigger(trigger + 1)
            } else {
                var newArrayt = [];
                storage.map((el) => {
                    newArrayt.push(el)
                })
                newArrayt.push(newWish)
                localStorage.setItem("wishlist", JSON.stringify(newArrayt))
                setTrigger(trigger + 1)
            }
        }
    }

    // Intersection Observer
    useEffect(() => {
        obsRef.current.map((el, index) => {
            const observer = new IntersectionObserver((entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setSelectedImage(index)
                }
            })
            observer.observe(el)
            return (() => { observer.unobserve(el) })
        })
    }, []);
    const [tipDescriere, setTipDescriere] = useState("descriere")

    const handleDescreire = (tip) => {
        setTipDescriere(tip)
    }


    // Descirere
    const [arrDescriere, SetArrDescriere] = useState([])
    const [arrModUtilizare, SetArrModUtilizare] = useState([])
    const [arrIngrediente, SetArrIngrediente] = useState([])
    const [arrTipuriten, setArrTipuriten] = useState([])
    useEffect(() => {

        if (product.descriere) {
            let str = product.descriere.value;
            SetArrDescriere(str.split("\n"))
        }

        // Mod Utilizare
        if (product.modutilizare) {
            let str = product.modutilizare.value;
            SetArrModUtilizare(str.split(`\n`))
        }

        //ingrediente
        if (product.ingrediente) {
            let str = product.ingrediente.value;
            SetArrIngrediente(str.replaceAll(",", " • "))
        }
        if (product.tipuriten) {
            let str = product.tipuriten.value;
            setArrTipuriten(str.replaceAll(",", " • "))
        }

    }, [])

    //adaugat in cos

    const [added, setAdded] = useState(false)





    return (

        <div className=" w-full h-[2557px] gap-1 grid grid-rows-7 grid-cols-8 forthswitch:h-fit">
            <div className="  col-start-1 col-end-2 row-start-1 row-end-4 secondswitch:row-end-2 thirdswitch:hidden">
                <div className="flex flex-col  h-full justify-center items-center secondswitch:justify-start  forthswitch:hidden">
                    <h3 className="  rotate-90 text-[120px] mt-[20px] font-['Kenjo'] shadow-md secondswitch:text-[60px]">Z</h3>
                    <h3 className="  rotate-90 text-[120px] mt-[20px] font-['Kenjo'] shadow-md secondswitch:text-[60px]">A</h3>
                    <h3 className="  rotate-90 text-[120px] mt-[20px] font-['Kenjo'] shadow-md secondswitch:text-[60px]">N</h3>
                    <h3 className="  rotate-90 text-[120px] mt-[20px] font-['Kenjo'] shadow-md secondswitch:text-[60px]">S</h3>
                    <h3 className="  rotate-90 text-[120px] mt-[20px] font-['Kenjo'] shadow-md secondswitch:text-[60px]">H</h3>
                    <h3 className="  rotate-90 text-[120px] mt-[20px] font-['Kenjo'] shadow-md secondswitch:text-[60px]">I</h3>
                    <h3 className="  rotate-90 text-[120px] mt-[20px] font-['Kenjo'] shadow-md secondswitch:text-[60px]">N</h3>
                </div>
            </div>

            <div className="col-start-2 col-end-6 row-start-1 row-end-2 row-span-2  thirdswitch:col-start-1 forthswitch:col-end-9 forthswitch:h-full  ">
                <div className="flex flex-col w-5/6 h-fit mt-[100px]  items-center forthswitch:w-full forthswitch:mt-[50px] forthswitch:h-full">
                    <div className="flex forthswitch:h-full">
                        <div className="flex justify-center  items-center secondswitch:flex-col-reverse forthswitch:h-full">
                            <div className="hidden p-5 thirdswitch:flex thirdswitch:mr-[50px] thirdswitch:mt-[20px] forthswitch:hidden ">
                                <svg className="w-[60px] h-[60px] fill-[#52616B] animate-bounce duration-500" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.62 60.12">
                                    <g id="Layer_1-2" data-name="Layer 1">
                                        <g>
                                            <path d="M18.48,33.96c.21,.83,.3,1.63,.32,2.44,.04,1.55-.43,2.97-1.2,4.29-.94,1.61-2.18,2.97-3.67,4.09-.07,.05-.12,.1-.22,.02-1.81-1.38-3.27-3.05-4.22-5.14-.8-1.75-.82-3.57-.42-5.41,.01-.06,.03-.13,.04-.19,0-.01,0-.03,0-.07-.27,0-.55,0-.83,.01-.07,0-.15,.1-.21,.16-.87,.98-1.73,1.96-2.6,2.94-.41,.46-.89,.53-1.37,.15C.78,34.6-.56,31.19,.22,27.02c.49-2.63,1.94-4.69,4.11-6.24,.15-.11,.12-.23,.12-.36-.03-1.91,.08-3.8,.37-5.69,.39-2.58,1.1-5.05,2.26-7.39,1.14-2.3,2.64-4.34,4.63-5.99,.6-.5,1.23-.95,1.93-1.29,.12-.06,.21-.06,.33,0,1.06,.53,1.96,1.27,2.81,2.08,1.44,1.38,2.59,2.98,3.51,4.73,1.11,2.11,1.85,4.35,2.3,6.69,.44,2.26,.61,4.55,.57,6.85,0,.21,.05,.34,.22,.47,2.21,1.62,3.61,3.76,4.07,6.47,.53,3.1-.23,5.87-2.22,8.3-.52,.63-1.11,1.18-1.77,1.66-.42,.31-.93,.24-1.28-.15-.87-.98-1.73-1.96-2.59-2.94-.13-.15-.26-.23-.47-.21-.2,.02-.4,0-.64,0ZM8.55,8.61s-.02,.02-.03,.04c-.03,.06-.06,.12-.08,.18-1.03,2.3-1.63,4.71-1.91,7.21-.33,2.92-.27,5.85,.09,8.76,.3,2.43,.83,4.82,1.71,7.11,.05,.13,.11,.19,.27,.19,3.47,0,6.94,0,10.41,0,.14,0,.21-.04,.26-.17,.45-1.17,.81-2.36,1.09-3.58,.87-3.81,1.13-7.66,.79-11.55-.24-2.76-.85-5.43-1.99-7.97-.04-.08-.08-.16-.11-.22-3.51,2.31-6.99,2.31-10.5,0Zm5.75,33.33c.66-.71,1.19-1.39,1.64-2.13,1.1-1.79,1.23-3.68,.63-5.66-.04-.12-.08-.18-.23-.18-1.69,0-3.39,0-5.08,0-.12,0-.19,.02-.23,.15-.39,1.32-.52,2.66-.12,4,.51,1.68,1.56,3.01,2.79,4.22,.08,.07,.13,.06,.2,0,.15-.16,.31-.31,.4-.4Zm8.77-18.91s-.02,.04-.02,.05c-.02,.18-.03,.36-.05,.55-.29,3.12-.88,6.17-2.03,9.09-.05,.12-.02,.19,.05,.28,.62,.7,1.24,1.4,1.86,2.1,.04,.05,.09,.09,.13,.13,3.79-3.39,3.47-9.26,.07-12.19ZM4.6,35.21s.05-.04,.07-.06c.65-.73,1.3-1.47,1.94-2.21,.04-.05,.05-.16,.03-.22-.19-.56-.41-1.12-.59-1.68-.81-2.53-1.25-5.14-1.47-7.78,0-.08-.02-.16-.03-.25-3.56,3.16-3.59,9.01,.06,12.2ZM15.72,3.66c-.51-.42-1-.86-1.52-1.26-.48-.37-.31-.36-.79,0-1.58,1.17-2.82,2.65-3.85,4.32-.1,.15-.05,.22,.07,.32,2.49,1.91,5.89,1.91,8.36,0,.13-.1,.16-.18,.06-.33-.68-1.09-1.45-2.1-2.32-3.03Z" />
                                            <path d="M9.49,55.25c-.29,.27-.62,.35-.99,.22-.37-.14-.6-.47-.6-.88,0-.77,0-1.54,0-2.31,0-2.83,0-5.66,0-8.49,0-.39,.13-.71,.47-.91,.63-.37,1.4,.08,1.4,.82,0,1.08,0,2.16,0,3.23,0,2.52,0,5.03,0,7.55,0,.29-.06,.56-.28,.77Z" />
                                            <path d="M19.43,43.01c.21,.2,.28,.44,.28,.73,0,2.39,0,4.78,0,7.18,0,1.2,0,2.4,0,3.61,0,.58-.39,1-.93,1-.54,0-.94-.42-.94-1.01,0-3.59,0-7.19,0-10.78,0-.45,.22-.78,.59-.93,.34-.14,.73-.06,1,.21Z" />
                                            <path d="M14.45,47.59c.22,.23,.29,.49,.29,.79,0,1.97,0,3.95,0,5.92,0,1.6,0,3.2,0,4.8,0,.5-.26,.86-.68,.98-.6,.17-1.18-.28-1.19-.92,0-.99,0-1.99,0-2.98,0-2.61,0-5.22,0-7.82,0-.55,.3-.94,.79-1.01,.31-.05,.58,.05,.79,.24Z" />
                                            <path d="M16.45,14.4c1.46,1.47,1.45,3.81-.01,5.27-1.47,1.46-3.82,1.45-5.29-.02-1.45-1.45-1.43-3.81,.03-5.26,1.47-1.46,3.81-1.46,5.27,0Zm-3.95,1.32c-.72,.72-.73,1.89-.02,2.61,.72,.73,1.9,.75,2.63,.03,.73-.73,.74-1.9,.02-2.63-.73-.73-1.89-.74-2.63-.01Z" />
                                        </g>
                                    </g>
                                </svg>
                                <h3 className="text-[30px] font-['Kenjo'] ml-[50px] secondswitch:text-[25px]">Livrare in 2-4 zile</h3>
                            </div>
                            <div
                                className=" h-[550px]  flex flex-col justify-start items-center mr-[40px] 
                            overflow-hidden overflow-y-scroll scrollbar-hide  border-b-[2.5px] rounded border-[#C9D6DF]
                            firstswitch:h-max
                            firstswitch:pb-[8px]
                            secondswitch:flex-row secondswitch:items-start secondswitch:border-none secondswitch:overflow-x-scroll
                            secondswitch:mt-[20px] 
                            thirdswitch:h-[100px]
                            thirdswitch:overflow-x-scroll
                            thirdswitch:mt-[20px]
                            thirdswitch:mr-[0px]
                            forthswitch:hidden
                         ">
                                {product.media.nodes.length > 1 && product.media.nodes.map((medi, i) => {
                                    if (medi.alt !== "banner") {
                                        return (
                                            <img
                                                key={i}
                                                onClick={() => { handleClick(i) }}
                                                src={medi.image.url}
                                                className=" w-[100px] h-[100px] mt-[30px] opacity-100 hover:opacity-80 shadow-md firstswitch:mt-[10px] firstswitch:w-[50px] firstswitch:h-[50px] secondswitch:mx-[10px] thirdswitch:mx-[5px]"
                                                alt={i}
                                            />
                                        )
                                    }
                                })}
                            </div>
                            <div className="flex forthswitch:flex-col forthswitch:items-start forthswitch:justify-start forthswitch:w-full forthswitch:h-full">
                                <div className=" hidden  forthswitch:flex forthswitch:flex-col">
                                    <div className="">
                                        <ProductGallery
                                            media={product.media.nodes}
                                            className="w-screen"
                                        />
                                    </div>
                                    <MobileProductPage product={product} setAdded={setAdded} added={added} addToWishlist={addToWishlist} arrDescriere={arrDescriere} arrModUtilizare={arrModUtilizare} arrIngrediente={arrIngrediente} arrTipuriten={arrTipuriten} esteInWishlist={esteInWishlist} />
                                </div>
                                <div className="  w-[600px] h-[600px] shadow-md firstswitch:w-[400px] firstswitch:h-[400px] forthswitch:hidden">
                                    <div className="w-[600px] h-[600px] overflow-x-hidden snap-y snap-mandatory overflow-scroll scrollbar-hide firstswitch:w-[400px] firstswitch:h-[400px] ">
                                        {product.media.nodes.map((medi, i) => {
                                            if (medi.alt !== "banner") {
                                                return (
                                                    <img
                                                        src={medi.image.url}
                                                        key={i}
                                                        className={`section-${i + 1} imageItem snap-start w-[600px] h-[600px] mt-[40px] mb-[40px] firstswitch:w-[400px] firstswitch:h-[400px]`}
                                                        ref={addToRefs}
                                                    />
                                                )
                                            }
                                        }
                                        )}
                                    </div>
                                </div>
                                {product.media.nodes.length > 1 && (
                                    <div className=" w-[0.5px] h-[500px] ml-[20px] bg-[#C9D6DF] firstswitch:h-[400px] forthswitch:hidden ">
                                        <div className=" scrollItem w-[1px] duration-500 bg-[#52616B] forthswitch:hidden" style={{ height: `${scrollHeight * (selectedImage + 1)}% ` }}>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-start-6 col-end-9 row-start-1 row-end-2  flex flex-col items-center forthswitch:hidden">
                <div className=" w-5/6 h-5/6 flex flex-col mt-[100px]">
                    <div className="w-5/6 ">
                        <Heading as="h2" format className="whitespace-normal thirdswitch:text-[25px] ">
                            {product.title}
                        </Heading>
                        <Text className={'opacity-50 font-medium'}>{product.vendor}</Text>
                    </div>
                    <div className=" mt-[30px] mb-[-30px] h-[150px] flex items-center shadow-md p-5 max-w-[800px] firstswitch:w-max-[400px] secondswitch:max-w-[300px] secondswitch:h-[100px] forthswitch:hidden">
                        <img className="w-[120px] h-[120px] secondswitch:w-[60px] secondswitch:h-[60px]" src={tipuriTen} alt="TipuriTen" />
                        <div className="w-3/4 h-[150px] flex items-center justify-center">
                            {arrTipuriten && (
                                <h3 className="text-[20px] secondswitch:text-[15px]">{arrTipuriten}</h3>
                            )}
                        </div>
                    </div>
                    <div className="self-start w-[600px] mt-[50px] firstswitch:w-[400px] secondswitch:w-[300px] thirdswitch:w-[250px] ">
                        <div className="h-max w-full" >
                            <ProductOptionsProvider data={product}>
                                <ProductForm setAdded={setAdded} />
                            </ProductOptionsProvider>
                        </div>
                        <div className="h-[50px] w-full flex items-center justify-center">
                            {added && (
                                <h3>Produsul a fost adaugat in cos</h3>
                            )
                            }
                        </div>
                    </div>
                    <div className="flex flex-col items-start">
                        {esteInWishlist && (
                            <motion.div whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={addToWishlist}
                                className="flex ml-[10px] items-center my-[20px] cursor-pointer shadow-md border-b-2 rounded p-5 border-[#52616B] secondswitch:w-[300px] secondswitch:h-[100px] thirdswitch:w-[250px] thirdswitch:ml-[0px] forthswitch:hidden">
                                <svg className="fill-[#52616B] w-[40px] h-[40px]" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.41 46.66">
                                    <g id="Layer_1-2" data-name="Layer 1">
                                        <path d="M26.27,8.06c1.49-1.41,2.95-2.91,4.52-4.26,5.27-4.51,10.69-4.99,15.54-1.46,5.47,3.98,7.64,10.83,4.89,16.75-1.25,2.7-3.01,5.32-5.07,7.45-6.58,6.8-13.41,13.35-20.26,20.11-.53-.6-1.26-1.52-2.08-2.35-4.93-4.98-9.85-9.96-14.83-14.88-3.29-3.25-6.52-6.51-8.17-10.99C-2.09,10.61,3.19,1.39,11.36,.12c3.13-.49,5.92,.49,8.35,2.32,2.26,1.7,4.31,3.67,6.56,5.62Z" />
                                    </g>
                                </svg>
                                <h2 className="text-[30px] font-['Kenjo'] ml-[60px] secondswitch:text-[25px] thirdswitch:text-[20px] thirdswitch:ml-[45px]">Scoate din Wishlist</h2>
                            </motion.div>
                        )}
                        {!esteInWishlist && (
                            <motion.div whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={addToWishlist}
                                className="flex ml-[10px] items-center my-[20px] cursor-pointer shadow-md rounded p-5 border-[#52616B] secondswitch:w-[300px] secondswitch:h-[100px] thirdswitch:w-[250px] thirdswitch:ml-[0px] forthswitch:hidden">

                                <svg className="fill-[#52616B] w-[40px] h-[40px]" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.41 46.66">
                                    <g id="Layer_1-2" data-name="Layer 1">
                                        <path d="M26.27,8.06c1.49-1.41,2.95-2.91,4.52-4.26,5.27-4.51,10.69-4.99,15.54-1.46,5.47,3.98,7.64,10.83,4.89,16.75-1.25,2.7-3.01,5.32-5.07,7.45-6.58,6.8-13.41,13.35-20.26,20.11-.53-.6-1.26-1.52-2.08-2.35-4.93-4.98-9.85-9.96-14.83-14.88-3.29-3.25-6.52-6.51-8.17-10.99C-2.09,10.61,3.19,1.39,11.36,.12c3.13-.49,5.92,.49,8.35,2.32,2.26,1.7,4.31,3.67,6.56,5.62Z" />
                                    </g>
                                </svg>
                                <h2 className="text-[30px] font-['Kenjo'] ml-[60px] secondswitch:text-[25px] thirdswitch:text-[20px] thirdswitch:ml-[45px]">Adauga in Wishlist</h2>
                            </motion.div>
                        )}
                        <div className="flex items-center my-[50px] p-5 thirdswitch:hidden forthswitch:hidden">
                            <svg className="w-[60px] h-[60px] fill-[#52616B] animate-bounce duration-500" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.62 60.12">
                                <g id="Layer_1-2" data-name="Layer 1">
                                    <g>
                                        <path d="M18.48,33.96c.21,.83,.3,1.63,.32,2.44,.04,1.55-.43,2.97-1.2,4.29-.94,1.61-2.18,2.97-3.67,4.09-.07,.05-.12,.1-.22,.02-1.81-1.38-3.27-3.05-4.22-5.14-.8-1.75-.82-3.57-.42-5.41,.01-.06,.03-.13,.04-.19,0-.01,0-.03,0-.07-.27,0-.55,0-.83,.01-.07,0-.15,.1-.21,.16-.87,.98-1.73,1.96-2.6,2.94-.41,.46-.89,.53-1.37,.15C.78,34.6-.56,31.19,.22,27.02c.49-2.63,1.94-4.69,4.11-6.24,.15-.11,.12-.23,.12-.36-.03-1.91,.08-3.8,.37-5.69,.39-2.58,1.1-5.05,2.26-7.39,1.14-2.3,2.64-4.34,4.63-5.99,.6-.5,1.23-.95,1.93-1.29,.12-.06,.21-.06,.33,0,1.06,.53,1.96,1.27,2.81,2.08,1.44,1.38,2.59,2.98,3.51,4.73,1.11,2.11,1.85,4.35,2.3,6.69,.44,2.26,.61,4.55,.57,6.85,0,.21,.05,.34,.22,.47,2.21,1.62,3.61,3.76,4.07,6.47,.53,3.1-.23,5.87-2.22,8.3-.52,.63-1.11,1.18-1.77,1.66-.42,.31-.93,.24-1.28-.15-.87-.98-1.73-1.96-2.59-2.94-.13-.15-.26-.23-.47-.21-.2,.02-.4,0-.64,0ZM8.55,8.61s-.02,.02-.03,.04c-.03,.06-.06,.12-.08,.18-1.03,2.3-1.63,4.71-1.91,7.21-.33,2.92-.27,5.85,.09,8.76,.3,2.43,.83,4.82,1.71,7.11,.05,.13,.11,.19,.27,.19,3.47,0,6.94,0,10.41,0,.14,0,.21-.04,.26-.17,.45-1.17,.81-2.36,1.09-3.58,.87-3.81,1.13-7.66,.79-11.55-.24-2.76-.85-5.43-1.99-7.97-.04-.08-.08-.16-.11-.22-3.51,2.31-6.99,2.31-10.5,0Zm5.75,33.33c.66-.71,1.19-1.39,1.64-2.13,1.1-1.79,1.23-3.68,.63-5.66-.04-.12-.08-.18-.23-.18-1.69,0-3.39,0-5.08,0-.12,0-.19,.02-.23,.15-.39,1.32-.52,2.66-.12,4,.51,1.68,1.56,3.01,2.79,4.22,.08,.07,.13,.06,.2,0,.15-.16,.31-.31,.4-.4Zm8.77-18.91s-.02,.04-.02,.05c-.02,.18-.03,.36-.05,.55-.29,3.12-.88,6.17-2.03,9.09-.05,.12-.02,.19,.05,.28,.62,.7,1.24,1.4,1.86,2.1,.04,.05,.09,.09,.13,.13,3.79-3.39,3.47-9.26,.07-12.19ZM4.6,35.21s.05-.04,.07-.06c.65-.73,1.3-1.47,1.94-2.21,.04-.05,.05-.16,.03-.22-.19-.56-.41-1.12-.59-1.68-.81-2.53-1.25-5.14-1.47-7.78,0-.08-.02-.16-.03-.25-3.56,3.16-3.59,9.01,.06,12.2ZM15.72,3.66c-.51-.42-1-.86-1.52-1.26-.48-.37-.31-.36-.79,0-1.58,1.17-2.82,2.65-3.85,4.32-.1,.15-.05,.22,.07,.32,2.49,1.91,5.89,1.91,8.36,0,.13-.1,.16-.18,.06-.33-.68-1.09-1.45-2.1-2.32-3.03Z" />
                                        <path d="M9.49,55.25c-.29,.27-.62,.35-.99,.22-.37-.14-.6-.47-.6-.88,0-.77,0-1.54,0-2.31,0-2.83,0-5.66,0-8.49,0-.39,.13-.71,.47-.91,.63-.37,1.4,.08,1.4,.82,0,1.08,0,2.16,0,3.23,0,2.52,0,5.03,0,7.55,0,.29-.06,.56-.28,.77Z" />
                                        <path d="M19.43,43.01c.21,.2,.28,.44,.28,.73,0,2.39,0,4.78,0,7.18,0,1.2,0,2.4,0,3.61,0,.58-.39,1-.93,1-.54,0-.94-.42-.94-1.01,0-3.59,0-7.19,0-10.78,0-.45,.22-.78,.59-.93,.34-.14,.73-.06,1,.21Z" />
                                        <path d="M14.45,47.59c.22,.23,.29,.49,.29,.79,0,1.97,0,3.95,0,5.92,0,1.6,0,3.2,0,4.8,0,.5-.26,.86-.68,.98-.6,.17-1.18-.28-1.19-.92,0-.99,0-1.99,0-2.98,0-2.61,0-5.22,0-7.82,0-.55,.3-.94,.79-1.01,.31-.05,.58,.05,.79,.24Z" />
                                        <path d="M16.45,14.4c1.46,1.47,1.45,3.81-.01,5.27-1.47,1.46-3.82,1.45-5.29-.02-1.45-1.45-1.43-3.81,.03-5.26,1.47-1.46,3.81-1.46,5.27,0Zm-3.95,1.32c-.72,.72-.73,1.89-.02,2.61,.72,.73,1.9,.75,2.63,.03,.73-.73,.74-1.9,.02-2.63-.73-.73-1.89-.74-2.63-.01Z" />
                                    </g>
                                </g>
                            </svg>
                            <h3 className="text-[30px] font-['Kenjo'] ml-[50px] secondswitch:text-[25px]">Livrare in 2-4 zile</h3>
                        </div>
                        {/* <div className="flex items-center ml-[5px] my-[20px] p-5">
                            <svg className="w-[50px] h-[50px] fill-[#52616B]" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.61 47.52">
                                <g id="Layer_1-2" data-name="Layer 1">
                                    <g>
                                        <path d="M18.83,47.52c-.05-.03-.1-.09-.15-.1-3.51-.66-5.96-4.95-3.42-8.67-.45-.97-.94-1.81-1.24-2.71C10.79,26.22,7.59,16.39,4.39,6.56c-.08-.23-.16-.46-.26-.75-.36,.14-.68,.29-1.02,.4-1.16,.38-2.36-.14-2.87-1.24C-.26,3.92,.04,2.62,1.05,2.04,2.25,1.34,3.5,.71,4.77,.18c1.31-.54,2.6,.2,3.09,1.69,1.19,3.61,2.35,7.22,3.53,10.83,2.16,6.63,4.32,13.26,6.48,19.89,.08,.23,.17,.46,.28,.77,.72-.25,1.41-.49,2.19-.76-.12-.36-.22-.67-.33-.97-1.45-4.14-2.9-8.27-4.35-12.41q-.59-1.69,1.09-2.3c.14-.05,.28-.11,.5-.19-.08-.27-.13-.53-.22-.77-.95-2.71-1.9-5.41-2.85-8.12-.36-1.04-.24-1.27,.81-1.64,3.35-1.18,6.7-2.35,10.04-3.53,1.08-.38,1.31-.26,1.7,.85,1.02,2.91,2.04,5.82,3.09,8.81,.69-.23,1.32-.45,1.96-.66,1.04-.35,1.28-.24,1.65,.81,1.54,4.37,3.07,8.74,4.6,13.1,.07,.2,.16,.39,.27,.65,.64-.22,1.24-.43,1.85-.63,1.51-.51,2.83,.01,3.3,1.3,.49,1.35-.18,2.62-1.74,3.18-6.1,2.18-12.21,4.34-18.32,6.5-.34,.12-.68,.25-.84,.31,.75,.93,1.67,1.76,2.2,2.79,1.48,2.9,0,6.38-3.05,7.52-.28,.11-.56,.23-.84,.35h-2.04Zm17.92-20.84c-1.6-4.54-3.16-8.97-4.73-13.43-1.56,.55-2.98,1.05-4.47,1.58,.56,1.6,1.13,3.13,1.63,4.68,.13,.4,.2,1.02-.01,1.26-.21,.24-.89,.3-1.24,.15-1.32-.59-2.17-.19-2.86,1.01-.19,.33-.71,.67-1.07,.65-.26-.01-.59-.55-.73-.92-.59-1.55-1.13-3.12-1.7-4.74-1.51,.53-2.95,1.04-4.47,1.57,1.58,4.51,3.14,8.95,4.72,13.44,5-1.76,9.91-3.48,14.94-5.25Zm-20.29,10.64c.72-.26,1.18-.44,1.64-.6,7.65-2.71,15.3-5.41,22.95-8.12,.17-.06,.42-.09,.5-.22,.16-.26,.4-.65,.31-.85-.12-.26-.51-.47-.82-.55-.23-.05-.52,.14-.78,.24-7.24,2.57-14.48,5.14-21.72,7.7-1.27,.45-1.46,.36-1.87-.91-2.43-7.48-4.86-14.96-7.3-22.44-.98-3.02-1.98-6.04-2.95-9.06-.18-.56-.46-1.07-1.09-.81-1.16,.49-2.29,1.07-3.39,1.7-.2,.11-.32,.71-.2,.93,.12,.23,.59,.37,.91,.36,.31-.01,.62-.25,.92-.4,1.35-.67,1.58-.58,2.04,.85,2.06,6.34,4.12,12.67,6.18,19.01,1.31,4.02,2.6,8.04,3.94,12.05,.14,.43,.5,.78,.74,1.14Zm2.33-21.22c3.22-1.13,6.35-2.23,9.52-3.34-1.02-2.89-2.01-5.69-3-8.52-.89,.32-1.66,.6-2.49,.89,.35,1,.71,1.88,.97,2.79,.11,.38,.17,.94-.04,1.18-.2,.23-.8,.27-1.15,.17-.7-.22-1.13-.07-1.54,.54-.2,.3-.68,.6-1.01,.58-.26-.02-.57-.49-.71-.82-.39-.92-.7-1.88-1.05-2.86-.88,.31-1.65,.58-2.49,.88,1.01,2.87,1.98,5.64,2.99,8.51Zm5.05,25.97c.02-2.23-1.74-4.02-3.96-4.03-2.24-.02-4.02,1.74-4.04,3.96-.01,2.23,1.74,4.02,3.96,4.04,2.22,.02,4.02-1.75,4.04-3.97Zm2.2-26.73c-1.06,.38-1.99,.7-2.97,1.06,.45,1.26,.87,2.46,1.38,3.91,.63-1.54,1.63-1.73,2.96-1.1-.5-1.41-.92-2.59-1.37-3.87Zm-6.23-9.16c.22,.62,.4,1.15,.56,1.59,.56-.18,1-.32,1.51-.48-.17-.49-.36-1.02-.57-1.62-.52,.17-.94,.32-1.5,.51Z" />
                                        <path d="M22.16,41.98c0,1.29-1.07,2.36-2.35,2.37-1.31,.01-2.42-1.11-2.39-2.42,.03-1.29,1.12-2.34,2.39-2.32,1.28,.02,2.34,1.1,2.34,2.38Zm-1.28,0c-.5-.36-.83-.78-1.06-.73-.31,.07-.54,.49-.81,.76,.26,.24,.51,.64,.79,.67,.26,.03,.56-.35,1.07-.7Z" />
                                    </g>
                                </g>
                            </svg>
                            <h3 className="text-[30px] font-['Kenjo'] ml-[55px]">Retur Gratuit</h3>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="col-start-2 col-end-9 row-start-2 row-end-4  flex flex-col justify-between gap-5 items-center mt-[40px] 
            secondswitch:col-start-1
         secondswitch:mt-[-220px]
         thirdswitch:mt-[-100px]
         forthswitch:hidden
            ">
                <div className=" w-full h-full flex flex-col items-center">

                    <div id="buttons" className="flex justify-between  w-3/4 max-w-[1300px]  mb-[80px] mt-[50px] border-b-2 border-[#C9D6DF]">
                        <div className="p-[10px] flex">
                            <button
                                onClick={() => handleDescreire("descriere")}
                                className={`cursor-pointer hover:opacity-80  text-[30px] font-['Kenjo'] ml-[100px] border-t-2  duration-200 ${(tipDescriere === "descriere") ? "border-[#C9D6DF]" : "border-[#F0F5F9]"} firstswitch:ml-[10px] secondswitch:text-[25px] thirdswitch:text-[20px]`}
                            >
                                DESCRIERE
                            </button>

                        </div>
                        <div className="p-[10px] flex firstswitch:mr-[30px]">

                            <button

                                onClick={() => handleDescreire("modutilizare")}
                                className={`items-center cursor-pointer hover:opacity-80  text-[30px] font-['Kenjo'] ml-[100px] border-t-2 duration-200 ${(tipDescriere === "modutilizare") ? "border-[#C9D6DF]" : "border-[#F0F5F9]"} secondswitch:text-[25px] thirdswitch:text-[20px]`}
                            >
                                MOD DE UTILIZARE
                            </button>
                        </div>
                        <div className="p-[10px] flex ">
                            <button
                                onClick={() => handleDescreire("ingrediente")}
                                className={` cursor-pointer hover:opacity-80  text-[30px] font-['Kenjo'] mr-[100px] border-t-2 duration-200 ${(tipDescriere === "ingrediente") ? "border-[#C9D6DF]" : "border-[#F0F5F9]"} firstswitch:mr-[10px] secondswitch:text-[25px] thirdswitch:text-[20px]`}
                            >
                                INGREDIENTE
                            </button>
                        </div>
                    </div>

                    <div className=" w-[1200px] h-max text-[22px] items-center flex flex-col justify-between  shadow-2xl p-[50px] secondswitch:w-[950px] thirdswitch:w-[650px] forthswitch:hidden">
                        <div className=" w-[1000px] h-max secondswitch:w-[850px] thirdswitch:w-[600px] forthswitch:hidden">

                            {product.descriere && (
                                <>
                                    {(tipDescriere === "modutilizare") && (
                                        <div className="flex justify-items-center items-center mt-[50px] thirdswitch:mt-[20px]">

                                            <svg className="fill-[#C9D6DF] w-1/4 h-[300px] ml-[-50px] mr-[50px] thirdswitch:hidden" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.31 96.31">
                                                <g id="Layer_1-2" data-name="Layer 1">
                                                    <path className="cls-1" d="M53.4,84.46c-2.71,1.02-7.25-.54-9.67-3.21-2.84-3.13-3.59-7-4.05-10.98-.16-1.39-.24-2.78-.35-4.17-.18-.12-.36-.24-.54-.36-.9,1.04-1.76,2.14-2.72,3.13-4.48,4.6-9.21,4.62-13.73,.11-.26-.26-.55-.5-1.05-.96-1.71,4.8-.96,9.66-1.6,14.35-.64,4.62-.99,9.27-1.62,13.9-1.45-5.91,.43-11.67,.87-17.49,.44-5.87,1.33-11.7,1.76-17.64-1.07,3.07-2.14,6.13-3.21,9.2-.22-.03-.43-.07-.65-.1,.03-.49-.02-1,.1-1.47,.93-3.71,1.9-7.42,2.81-11.14,.15-.63,.02-1.32-.3-2.08-1.92,4.4-2.9,9.17-5.7,13.15,1.15-5.05,4.02-9.63,3.58-15.17-.38,.6-.85,1.17-1.13,1.82-1.48,3.47-2.89,6.98-4.39,10.45-.35,.81-.92,1.53-1.6,2.16,.81-4.4,3.44-8.16,4.38-12.47-.22-.08-.44-.16-.66-.24-1.58,3.47-2.9,7.09-4.8,10.37-2.53,4.39-1.95,8.75-.7,13.2,1.59,5.66,1.03,11.31,.22,16.99-.03,.2-.27,.36-.83,.49,0-.82-.05-1.64,0-2.45,.17-2.49,.39-4.98,.58-7.48,.09-1.16-.42-1.58-1.6-1.51-1.73,.1-3.47,.06-5.2,.02-.54-.01-1.08-.2-1.61-.31,.02-.24,.03-.48,.05-.72H8.3c-.38-2.06-.5-3.72-1-5.27-1.54-4.81-1.46-9.39,1.09-13.91,1.44-2.56,2.46-5.36,3.72-8.02,.53-1.12,.7-1.77-.76-2.51-3.65-1.84-4.4-8.55-1.32-11.07-2.08-3.6-3.26-7.47-3.19-11.69,.13-7.49,3.19-13.49,9.18-17.96,1.01-.75,1.53-1.24,1.06-2.73-.99-3.12,.83-6.82,4.03-8.58,4.74-2.61,9.73-2.75,14.66-.72,4.94,2.04,6.59,5.83,5.1,10.85,10.91,7.07,13.52,20.4,7.43,30.99,2.01,.86,2.55,2.62,1.99,4.44-.74,2.41-.83,5.26-3.52,6.72-.32,.18-.42,.74-.65,1.12-1.5,2.51-3.04,4.99-4.47,7.54-.53,.95-1.2,2.08-1.11,3.06,.34,3.43,.65,6.91,1.58,10.21,1.3,4.6,4.73,6.97,9.48,7.47,.62,.07,1.22,.4,1.82,.61,0,0-.04,.06-.04,.06ZM12.58,52.07c-.23,.03-.45,.06-.68,.08-.08-.58-.22-1.17-.23-1.75-.04-1.22,.17-2.47-.07-3.64-.16-.79-.91-1.47-1.4-2.19-.4,.71-1.24,1.52-1.12,2.13,.43,2.03,1.03,4.07,1.9,5.95,.45,.97,1.49,1.36,2.26-.17,1.11-2.22,3.08-3.23,5.52-3.1,2.39,.13,4.13,1.44,5,3.63,.89,2.26,.47,4.38-1.15,6.26-.33,.38-.55,.94-.61,1.44-.11,.93,.1,1.93-.12,2.82-.53,2.14,.05,3.71,1.68,5.24,3.46,3.24,7.98,3.29,11.29-.12,1.65-1.7,3.34-3.37,4.94-5.12,2.92-3.2,5.67-6.53,5.73-11.18,.06-4.04,.05-8.08-.04-12.12-.01-.68-.39-1.51-.87-1.98-7.86-7.72-20.8-8.29-29.36-1.41-1.69,1.36-2.78,2.78-2.57,5.15,.23,2.67,.07,5.38,.06,8.08,0,.67-.1,1.34-.15,2.01Zm-3.94-16.32c4.82-7.65,11.5-12.01,20.63-11.97,9.11,.04,15.76,4.47,20.57,12.15,2.38-7.98-1.87-17.92-9.45-22.59-8.02-4.94-18.71-3.93-25.41,2.18-6.19,5.65-8.39,14.71-6.34,20.23Zm39.54,4.78c1.23-1.51,1.58-2.96,.37-4.43-1.81-2.22-3.42-4.72-5.61-6.49-10.76-8.69-26.61-5.36-33.36,6.8-.85,1.53-.53,2.76,.6,4.14,4.9-6.11,11.05-9.54,18.92-9.56,7.94-.02,14.14,3.42,19.08,9.54Zm-8.22-29.4c.09-.31,.47-.99,.48-1.68,.05-2.64-1.1-4.73-3.32-6.12-4.48-2.81-9.28-2.71-14.05-1.05-3.44,1.19-5.46,4.46-5.15,7.54,.14,1.36,.57,1.98,2.11,1.26,3.12-1.46,6.45-2.33,9.89-1.9,3.26,.42,6.47,1.24,10.03,1.94ZM20.63,59.1c2-1.15,2.83-2.98,2.45-4.94-.37-1.92-2.29-3.56-4.36-3.75-2.05-.18-3.68,.87-4.86,3.63,1.01-.31,1.78-.31,2.12-.69,1.33-1.45,1.75-1.44,2.83,.31,.15,.24,.4,.49,.66,.58,1.5,.49,1.65,1.6,1.45,2.91-.09,.59-.18,1.18-.29,1.96Zm26.03-6.36c.28,.07,.57,.14,.85,.21,.61-2.21,1.31-4.4,1.76-6.64,.1-.49-.71-1.15-1.1-1.73-.5,.51-1.4,1-1.44,1.54-.17,2.2-.07,4.42-.07,6.63Z" />
                                                    <path className="cls-1" d="M53.4,84.46s.04-.06,.04-.06c1.6-.25,3.2-.51,4.79-.76,.03,.35,.05,.69,.08,1.04-1.62,.23-3.23,.68-4.91-.22Z" />
                                                    <path className="cls-1" d="M23.46,60.22c1.98-.1,3.41-3.38,5.27-1.06,1.41-.13,2.43-.46,3.34-.26,.94,.21,1.77,.93,2.65,1.44-1.74,3.2-8.97,3.27-11.26-.12Zm9.25,.62c-.8-.95-1.42-1.47-2.58-.59-.43,.33-1.54,.28-2-.05-1.11-.81-1.67-.3-2.47,.68,2.43,1.1,4.65,1.26,7.05-.04Z" />
                                                    <path className="cls-1" d="M42.65,45.44c-.88-.66-1.47-1.1-1.88-1.41-.81,.73-1.52,1.38-2.23,2.02-.56-.64-1.13-1.28-1.82-2.06-.46,.31-1.11,.74-1.82,1.22,0-1.63,1.34-2.6,3.59-2.77,2.15-.16,3.82,.91,4.15,3Z" />
                                                    <path className="cls-1" d="M32.06,40.76c2.97-3.64,8.48-3.96,11.22-1.12-1.57-.24-3.66-1.01-5.61-.72-1.88,.27-3.6,1.63-5.39,2.52-.07-.22-.15-.45-.22-.67Z" />
                                                    <path className="cls-1" d="M20.61,43.54c.62,1.03,.74,2.17-.61,2.39-.64,.1-1.47-.94-2.21-1.46,.06-.22,.12-.44,.18-.66-.68,.46-1.35,.93-2.06,1.42-.36-1.75,1.33-2.75,4.07-2.53l.63,.84Z" />
                                                    <path className="cls-1" d="M16.39,39.03c2.18-2.14,7.41-1.17,9.4,1.11,.2,.23,.16,.66,.24,1-.39,0-.96,.19-1.15,0-2.41-2.38-5.21-3.06-8.49-2.12Z" />
                                                    <path className="cls-1" d="M26.26,63.87h5.55c.08,.1,.16,.2,.23,.29-.86,.37-1.7,.94-2.6,1.05-1.23,.16-2.48-.06-3.19-1.35Z" />
                                                    <path className="cls-1" d="M31.02,54.05c-1.63,1.47-3.38,1.12-4.04-.74,1.3,.24,2.6,.48,4.04,.74Z" />
                                                    <path className="cls-1" d="M20.61,43.54l-.63-.84c2.22-.08,3.41,.74,3.51,2.52-.99-.58-1.94-1.13-2.88-1.68Z" />
                                                </g>
                                            </svg>
                                            <div className="w-3/4 h-full items-start flex flex-col thirdswitch:text-center thirdswitch:w-full">
                                                {(arrModUtilizare.length > 0) && arrModUtilizare.map((el, i) => {
                                                    if (el === "") {
                                                        return (<br key={i} />)
                                                    } else {
                                                        return (
                                                            <h2 key={i}>{el}</h2>
                                                        )
                                                    }
                                                })}
                                            </div>
                                        </div>

                                    )
                                    }
                                    {(tipDescriere === "ingrediente") &&
                                        <>
                                            <div className="flex justify-items-center items-center mt-[50px] thirdswitch:mt-[5px]">
                                                <div className="flex justify-items-center items-center w-1/4 h-[300px] thirdswitch:hidden">

                                                    <svg className="fill-[#C9D6DF] h-[200px] w-[200px]  ml-[-20px] mb-[20px] " id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.72 55.52">
                                                        <g id="Layer_1-2" data-name="Layer 1">
                                                            <path d="M27.51,27.17c-.41-1.2-.86-2.34-1.19-3.52-.98-3.52-1.07-7.11-.72-10.71,.41-4.13,1.35-8.14,2.78-12.04,.08-.21,.13-.47,.28-.6,.18-.16,.48-.34,.68-.29,.23,.05,.56,.33,.57,.53,.14,1.86,1.4,3.01,2.61,4.16,2.38,2.27,5.12,4.08,7.92,5.77,2.34,1.42,4.73,2.77,7.12,4.1,7.28,4.07,11.7,10.19,12.89,18.44,1.06,7.38-1.13,13.84-6.08,19.42-1.11,1.25-2.45,1.71-3.99,1.98-4.57,.81-9.16,1.23-13.8,1.08-6.51-.22-12.8-1.41-18.68-4.31-7.36-3.63-12.59-9.31-15.91-16.77-.7-1.57-1.24-3.2-1.84-4.81-.07-.19-.13-.39-.14-.59-.04-.6,.47-.99,1.01-.71,2.86,1.51,5.97,1.58,9.09,1.52,4.27-.09,8.45-.88,12.6-1.83,1.31-.3,2.66-.46,3.98-.69,.28-.05,.55-.08,.83-.12Zm24.05,25.53c0-.25,0-.31,0-.37-.95-5.12-2.7-9.93-5.57-14.29-2.38-3.61-5.42-6.5-9.5-8.12-4.08-1.62-8.27-1.66-12.49-.73-4.52,1-9.04,1.93-13.68,2.09-2.67,.09-5.31-.06-7.9-.8-.12-.04-.26-.03-.51-.06,.5,1.21,.93,2.33,1.42,3.43,2.41,5.37,5.9,9.88,10.71,13.32,5.75,4.11,12.28,6,19.23,6.67,4.6,.44,9.19,.28,13.77-.36,1.51-.21,3.01-.51,4.52-.77ZM29.18,3.11c-.09,.27-.17,.46-.23,.65-1.12,3.63-1.86,7.33-2.04,11.13-.19,3.95,.23,7.8,1.9,11.45,.28,.61,.61,.82,1.28,.84,5.79,.14,10.6,2.45,14.5,6.7,3.7,4.04,5.91,8.89,7.48,14.06,.36,1.18,.63,2.39,.97,3.72,.36-.39,.66-.69,.93-1.02,4.05-4.89,5.88-10.5,5.12-16.81-.95-7.91-5.04-13.81-11.91-17.8-2.42-1.41-4.9-2.71-7.28-4.19-3.91-2.42-7.82-4.87-10.71-8.72Z" />
                                                        </g>
                                                    </svg>
                                                </div>
                                                <div className="w-3/4 h-full items-center flex flex-col thirdswitch:w-full thirdswitch:text-center">
                                                    {(arrIngrediente.length > 0) && (
                                                        <p className="text-[18px]">{arrIngrediente}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    }
                                    {(tipDescriere === "descriere") &&
                                        <div className="w-full h-full items-start flex flex-col mt-[50px] thirdswitch:mt-[10px] thirdswitch:text-center thirdswitch:items-center ">
                                            {(arrDescriere.length > 0) && arrDescriere.map((el, i) => {
                                                if (el === "") {
                                                    return (<br key={i} />)
                                                } else {
                                                    if (i === 0) {
                                                        return (<h2 key={i} className="font-bold">{el}</h2>)
                                                    }
                                                    return (
                                                        <h2 key={i}>{el}</h2>
                                                    )
                                                }
                                            })}
                                        </div>
                                    }
                                </>
                            )}
                        </div>
                    </div>

                </div>
                <div className="w-max h-[700px] flex  mt-[-100px] mb-[100px] secondswitch:mb-[-100px] secondswitch:mt-[-100px] thirdswitch:mr-[50px] thirdswitch:flex-col thirdswitch:mb-[100px] thirdswitch:h-max thirdswitch:mr-[0px] forthswitch:hidden">
                    {product.media.nodes.map((el, i) => {
                        if (el.alt === "banner") {
                            return (
                                <img key={i} src={el.image.url} className="w-[700px] h-[700px] mx-[50px] shadow-2xl 
                                firstswitch:w-[500px] firstswitch:h-[500px]
                                secondswitch:w-[350px] secondswitch:h-[350px]
                                thirdswitch:w-[450px] thirdswitch:h-[450px]
                                thirdswitch:mt-[50px]
                                " />
                            )
                        }
                    })}
                </div>
            </div>
        </div>

    )
}



