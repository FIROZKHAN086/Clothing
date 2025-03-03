import React, { useEffect, useRef } from 'react'
import gsap from 'gsap' 
import './css/home.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
    const homeref = useRef()
    const textRef = useRef()

    useEffect(() => {
        gsap.from(homeref.current, {
            opacity: 0,
            translateY: -50,
        })
        gsap.to(homeref.current, {
            duration: 1.5,
            opacity: 1,
        })
        gsap.fromTo('#text',{
            opacity: 0,
            y: 20
        },{
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            delay: 0.5
        })
    }, [])

    return (
        <>
            <div ref={homeref} className="relative w-full overflow-hidden">
                {/* Hero Section */}
                <div className="relative h-screen">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                        <img 
                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070" 
                            alt="Fashion Background" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex items-center">
                        <div className="container mx-auto px-4 md:px-8">
                            <div className="max-w-3xl">
                                <p id="text" className="text-yellow-400 text-lg md:text-xl mb-4 font-medium">
                                    Welcome to King's Fashion
                                </p>
                                <h1 id="text" className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                                    Discover Your
                                </h1>
                                <h1 id="text" className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                                    Perfect Style
                                </h1>
                                <p id="text" className="text-gray-200 text-lg md:text-xl mb-8 max-w-2xl">
                                    Explore our curated collection of trendsetting fashion pieces that define 
                                    your unique style. From casual comfort to elegant sophistication.
                                </p>
                                <div className="flex gap-4 flex-wrap">
                                    <button id="text" className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition duration-300">
                                        Shop Now
                                    </button>
                                    <button id="text" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition duration-300">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                        <div className="animate-bounce">
                            <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header