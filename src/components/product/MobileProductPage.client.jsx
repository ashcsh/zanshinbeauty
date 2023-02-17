import React from 'react'
import { useRef, useEffect, useState } from "react"
import { ProductOptionsProvider, Image } from "@shopify/hydrogen";
import { Heading, Text, IconClose } from "~/components";
import { ProductForm } from "./ProductForm.client";
import { useWindowScroll } from 'react-use';
import tipuriTen from "../../assets/tipten.svg";
import { Disclosure } from '@headlessui/react';



export default function MobileProductPage({ product, setAdded, added, esteInWishlist, addToWishlist, arrDescriere, arrModUtilizare, arrIngrediente, arrTipuriten }) {
    const { y } = useWindowScroll();
    const [showAddToCart, setShowAddToCart] = useState(true)

    const bottomRef = useRef()
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                setShowAddToCart(false)
            } else {
                setShowAddToCart(true)
            }
        })
        observer.observe(bottomRef.current)
    }, []);

    return (
        //MAIN DIV
        <div className="flex flex-col w-full h-fit mb-[20px">

            {/* ADD TO CART BUTTON & OPTIONS */}
            {showAddToCart && (
                <div className="fixed bottom-0 w-full h-auto shadow-2xl bg-[#1E2022]/90 rounded-t-2xl z-40">
                    <div className="lowerexception:hidden " >
                        {(y > 130) && (
                            <div className="w-5/6 mx-auto mb-[10px]">
                                <ProductOptionsProvider data={product}>
                                    <ProductForm setAdded={setAdded} phone={true} />
                                </ProductOptionsProvider>
                                <div className="h-[30px] w-full flex items-center justify-center">
                                    {added && (
                                        <h3 className="text-[#F0F5F9]">Produsul a fost adaugat in cos</h3>
                                    )
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="w-5/6 mx-auto exception:hidden">
                        <ProductOptionsProvider data={product}>
                            <ProductForm setAdded={setAdded} phone={true}/>
                        </ProductOptionsProvider>
                        <div className="h-[30px] w-full flex items-center justify-center">
                            {added && (
                                <h3 className="text-[#F0F5F9]">Produsul a fost adaugat in cos</h3>
                            )
                            }
                        </div>
                    </div>
                </div>
            )}

            {/* HEADING */}
            <div className="mx-[20px] ml-[25px] mt-[20px]">
                <Heading as="h2" format className="whitespace-normal thirdswitch:text-[25px] lowerexception:text-[20px]">
                    {product.title}
                </Heading>
                <Text className={'opacity-50 font-medium mt-[10px]'}>{product.vendor}</Text>
            </div>

            {/* TIPURI TEN */}
            <div className=" ml-[25px] mr-[20px] h-fit flex justify-center items-center">
                <img className="w-[80px] h-[80px] " src={tipuriTen} alt="TipuriTen" />
                <div className="w-3/4 h-[150px] flex flex-col items-center justify-center">
                    {arrTipuriten && (
                        <h3 className="text-[20px] secondswitch:text-[15px]">{arrTipuriten}</h3>
                    )}
                </div>
            </div>

            {/* WISHLIST */}
            <div className="flex flex-col items-center justify-center ml-[25px] mr-[20px] ">
                {!esteInWishlist && (
                    <div onClick={addToWishlist}
                        className="flex items-center my-[20px] cursor-pointer shadow-md rounded p-5 border-[#52616B] ">

                        <svg className="fill-[#52616B] w-[40px] h-[40px]" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.41 46.66">
                            <g id="Layer_1-2" data-name="Layer 1">
                                <path d="M26.27,8.06c1.49-1.41,2.95-2.91,4.52-4.26,5.27-4.51,10.69-4.99,15.54-1.46,5.47,3.98,7.64,10.83,4.89,16.75-1.25,2.7-3.01,5.32-5.07,7.45-6.58,6.8-13.41,13.35-20.26,20.11-.53-.6-1.26-1.52-2.08-2.35-4.93-4.98-9.85-9.96-14.83-14.88-3.29-3.25-6.52-6.51-8.17-10.99C-2.09,10.61,3.19,1.39,11.36,.12c3.13-.49,5.92,.49,8.35,2.32,2.26,1.7,4.31,3.67,6.56,5.62Z" />
                            </g>
                        </svg>
                        <h2 className="font-['Kenjo']  text-[20px] ml-[35px]">Adauga in Wishlist</h2>
                    </div>
                )}
                {esteInWishlist && (
                    <div onClick={addToWishlist} className="flex items-center my-[20px] cursor-pointer shadow-md rounded p-5 border-[#52616B] ">
                        <svg className="fill-[#52616B] w-[40px] h-[40px]" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.41 46.66">
                            <g id="Layer_1-2" data-name="Layer 1">
                                <path d="M26.27,8.06c1.49-1.41,2.95-2.91,4.52-4.26,5.27-4.51,10.69-4.99,15.54-1.46,5.47,3.98,7.64,10.83,4.89,16.75-1.25,2.7-3.01,5.32-5.07,7.45-6.58,6.8-13.41,13.35-20.26,20.11-.53-.6-1.26-1.52-2.08-2.35-4.93-4.98-9.85-9.96-14.83-14.88-3.29-3.25-6.52-6.51-8.17-10.99C-2.09,10.61,3.19,1.39,11.36,.12c3.13-.49,5.92,.49,8.35,2.32,2.26,1.7,4.31,3.67,6.56,5.62Z" />
                            </g>
                        </svg>
                        <h2 className="font-['Kenjo']  text-[20px] ml-[35px]">Scoate din Wishlist</h2>
                    </div>
                )}
            </div >

            {/* LIVRARE */}
            <div className="flex flex-col items-center justify-center ml-[25px] mr-[20px] ">
                <div className="flex items-center justify-center p-5 mr-[15px]">
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
                    <h3 className="font-['Kenjo']  text-[20px] ml-[30px]">Livrare in 2-4 zile</h3>
                </div>
            </div>

            {/* text-align center

            p : 
            text-align justify
            line-height:20px
            letter-spacing 
            text-indent: 50px */}

            {/* DESCREIRE */}
            <div className="ml-[25px] mr-[20px] h-fit">
                <div className=" flex flex-col items-center mt-[20px]">
                    {(arrDescriere.length > 0) && arrDescriere.map((el, i) => {
                        if (el === "") {
                            return (<br key={i} />)
                        } else {
                            if (i === 0) {
                                return (<h2 key={i} className="font-bold">{el}</h2>)
                            }
                            return (
                                <h2 key={i} className="text-justify indent-[30px]">{el}</h2>
                            )
                        }
                    })}
                </div>

                <div className="  my-[15px]">

                    <Disclosure key="1" as="div" className="grid w-full gap-2">
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="text-left">
                                    <div className="flex justify-between items-center mx-[20px]">
                                        <svg className="fill-[#52616B] h-[60px] w-[60px]" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.31 96.31">
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
                                        <Text size="lead" as="h4">
                                            Mod De Utilizare
                                        </Text>
                                        <IconClose
                                            className={`${open ? '' : 'rotate-[45deg]'
                                                } transition-transform transform-gpu duration-200`}
                                        />
                                    </div>
                                </Disclosure.Button>
                                <Disclosure.Panel className={'pb-4 pt-2 grid gap-2'}>


                                    {(arrModUtilizare.length > 0) && arrModUtilizare.map((el, i) => {
                                        if (el === "") {
                                            return (<br key={i} />)
                                        } else {
                                            return (
                                                <h2 key={i} className="text-justify">{el}</h2>
                                            )
                                        }
                                    })}

                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>


                <div className=" my-[15px]">
                    <Disclosure key="1" as="div" className="grid w-full gap-2">
                        {/* @ts-expect-error @headlessui/react incompatibility with node16 resolution */}
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="text-left">
                                    <div className="flex justify-between items-center mx-[20px]">
                                        <svg className="fill-[#52616B] h-[40px] w-[40px] " id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.72 55.52">
                                            <g id="Layer_1-2" data-name="Layer 1">
                                                <path d="M27.51,27.17c-.41-1.2-.86-2.34-1.19-3.52-.98-3.52-1.07-7.11-.72-10.71,.41-4.13,1.35-8.14,2.78-12.04,.08-.21,.13-.47,.28-.6,.18-.16,.48-.34,.68-.29,.23,.05,.56,.33,.57,.53,.14,1.86,1.4,3.01,2.61,4.16,2.38,2.27,5.12,4.08,7.92,5.77,2.34,1.42,4.73,2.77,7.12,4.1,7.28,4.07,11.7,10.19,12.89,18.44,1.06,7.38-1.13,13.84-6.08,19.42-1.11,1.25-2.45,1.71-3.99,1.98-4.57,.81-9.16,1.23-13.8,1.08-6.51-.22-12.8-1.41-18.68-4.31-7.36-3.63-12.59-9.31-15.91-16.77-.7-1.57-1.24-3.2-1.84-4.81-.07-.19-.13-.39-.14-.59-.04-.6,.47-.99,1.01-.71,2.86,1.51,5.97,1.58,9.09,1.52,4.27-.09,8.45-.88,12.6-1.83,1.31-.3,2.66-.46,3.98-.69,.28-.05,.55-.08,.83-.12Zm24.05,25.53c0-.25,0-.31,0-.37-.95-5.12-2.7-9.93-5.57-14.29-2.38-3.61-5.42-6.5-9.5-8.12-4.08-1.62-8.27-1.66-12.49-.73-4.52,1-9.04,1.93-13.68,2.09-2.67,.09-5.31-.06-7.9-.8-.12-.04-.26-.03-.51-.06,.5,1.21,.93,2.33,1.42,3.43,2.41,5.37,5.9,9.88,10.71,13.32,5.75,4.11,12.28,6,19.23,6.67,4.6,.44,9.19,.28,13.77-.36,1.51-.21,3.01-.51,4.52-.77ZM29.18,3.11c-.09,.27-.17,.46-.23,.65-1.12,3.63-1.86,7.33-2.04,11.13-.19,3.95,.23,7.8,1.9,11.45,.28,.61,.61,.82,1.28,.84,5.79,.14,10.6,2.45,14.5,6.7,3.7,4.04,5.91,8.89,7.48,14.06,.36,1.18,.63,2.39,.97,3.72,.36-.39,.66-.69,.93-1.02,4.05-4.89,5.88-10.5,5.12-16.81-.95-7.91-5.04-13.81-11.91-17.8-2.42-1.41-4.9-2.71-7.28-4.19-3.91-2.42-7.82-4.87-10.71-8.72Z" />
                                            </g>
                                        </svg>
                                        <Text size="lead" as="h4">
                                            Ingrediente
                                        </Text>
                                        <IconClose
                                            className={`${open ? '' : 'rotate-[45deg]'
                                                } transition-transform transform-gpu duration-200`}
                                        />
                                    </div>
                                </Disclosure.Button>

                                <Disclosure.Panel className={'pb-4 pt-2 grid gap-2'}>

                                    {(arrIngrediente.length > 0) && (
                                        <p className="text-[18px] text-justify">{arrIngrediente}</p>
                                    )}

                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>

                </div>
            </div>

            {/* BANNER */}
            <div className="  ml-[25px] mr-[20px] flex flex-col items-center my-[40px]">
                {product.media.nodes.map((el, i) => {
                    if (el.alt === "banner") {
                        return (
                            <img key={i} src={el.image.url} className=" w-[300px] h-[300px] shadow-2xl mt-[40px]" alt="banner" />
                        )
                    }
                })}
            </div>
            <div className=" h-[20px] w-full" ref={bottomRef}></div>
        </div >
    )
}