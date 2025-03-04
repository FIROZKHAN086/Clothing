import React, { useEffect, useState } from 'react';
import gsap from 'gsap';


const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
        {
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070",
            title: "Summer Collection",
            subtitle: "Discover the latest trends"
        },
        {
            image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071",
            title: "Autumn Essentials",
            subtitle: "Cozy and stylish pieces"
        },
        {
            image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070",
            title: "Winter Wear",
            subtitle: "Stay warm in style"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        gsap.fromTo(".slide-content",
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            }
        );
    }, [currentSlide]);

    return (
        <div className="relative mt-10 w-full h-[600px] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute w-full h-full transition-opacity duration-1000 ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40">
                        <div className="h-full flex items-center justify-center">
                            <div className="slide-content text-center text-white px-4">
                                <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
                                <p className="text-xl mb-8">{slide.subtitle}</p>
                                <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition duration-300">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            
            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide ? "bg-white w-8" : "bg-white/50"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
