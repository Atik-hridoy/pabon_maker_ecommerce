import React, { useState, useEffect } from 'react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const slides = [
    {
      badge: "PRO-GRADE ELECTRONICS",
      title1: "ADVANCED ELECTRONIC",
      titleHighlight: "CIRCUITS & MODULES",
      title2: "FOR INNOVATORS.",
      desc: "Engineered for high precision and unwavering reliability. Browse our curated selection of microcontrollers, sensors, and development tools designed for professional makers and elite engineers.",
      btn1: "Shop Components",
      btn2: "Explore Kits",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjb6tp314KD3SQLvUm5vv8VUwmJcROtdaTsqvD1sj-uY1XRmvGu4Uy5EUbGj-4aOwRb00XG_ca3zi3apLTkHLm1IenmqOzkPIbU1rV5DJh4tymPfSD6Y-JwYo94NnBI2XmsD-vM9m-lvSaThYYTrVREFMrdNRs4IrealV-mBYn-YvuBLJ_I5O_1MqvhF14yy18trHKx8CkhCILFNHpayHHdtpuuYQuHlKBKp8jjsv1r2_ij_MYjgnfP4DpACqnI8DQaE7ETgDQ6Z56",
      glowColor: "rgba(254,107,0,0.4)"
    },
    {
      badge: "INDUSTRIAL MOTION",
      title1: "NEXT-GEN",
      titleHighlight: "ROBOTICS & ACTUATION",
      title2: "SYSTEMS.",
      desc: "Precision motion control for industrial automation and advanced robotics projects. High-torque servos and BLDC drivers available now.",
      btn1: "View Robotics",
      btn2: "Watch Demo",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuADjroi-O617y6-_ra7KBuTW_7pQVmQdmr-VAMiB_qOifwZGquCtVVs7rdpHOnU0QSEil10W6yUk2fR9NEhc4GSYWojxHbjGqklNxk5XES8dmVY0GTxnB-SvBwm2X_HJWaq1MczQOvTkJVnAdGGGu3Ogjh-pNbZubQZJJUBGlImCBP2k8KU8y6Z6GAt_hTLRY414GTAwWyq4g3wTGSwd4jZQRvRCsIKBy8O6j1ASTV8miEwThVBl_duVGW5PK8c7xAFhrMghJ7c7ibD",
      glowColor: "rgba(0,184,217,0.4)"
    },
    {
      badge: "SMART CONNECTIVITY",
      title1: "IOT &",
      titleHighlight: "WIRELESS CONNECTIVITY",
      title2: "SOLUTIONS.",
      desc: "Seamless integration for the smart world. Explore our range of LoRa, WiFi 6, and Zigbee modules for ultra-low power applications.",
      btn1: "Explore IoT",
      btn2: "Read Docs",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCY109R2x6yUwmyxGVVnrsDQicEeRiCGJKxYT9ToAreRHmqc7HWo8krT2_uyibKkFoRcKkJYCfw9lS4WxJ0w_zA1d4Nt6eG7PaUlWd0tYSgb7iJpHWx51h_JDZtgxbvPE059VhyR-vfHipvZ7IgktdYWzpsWNm4q3t2OBYJR0pY70S6HZAe-mDontEl-jRvnNpj4i3vHIbvMEn8NMJ9zhCOWjj5nksY94AScD4HSCu5kmbOxCcLxebXWsBQB_tqrYdxMCjSCjIIQfK-",
      glowColor: "rgba(138,43,226,0.4)"
    }
  ];

  return (
    <section className="relative overflow-hidden min-h-[250px] md:min-h-[600px] flex items-center group bg-surface-container-lowest">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-secondary-container/20 blur-[120px] mix-blend-screen animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary-container/30 blur-[100px] mix-blend-screen animate-pulse" style={{animationDelay: "2s"}}></div>
      
      {/* Tech Grid Pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        opacity: 0.5
      }}></div>
      
      {/* Carousel Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 z-40 p-3 rounded-full bg-white/5 backdrop-blur border border-white/10 text-white hover:bg-secondary-container hover:text-white hover:border-secondary-container transition-all opacity-0 group-hover:opacity-100 hidden md:block transform -translate-x-4 group-hover:translate-x-0"
      >
        <span className="material-symbols-outlined text-2xl">arrow_back</span>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-6 z-40 p-3 rounded-full bg-white/5 backdrop-blur border border-white/10 text-white hover:bg-secondary-container hover:text-white hover:border-secondary-container transition-all opacity-0 group-hover:opacity-100 hidden md:block transform translate-x-4 group-hover:translate-x-0"
      >
        <span className="material-symbols-outlined text-2xl">arrow_forward</span>
      </button>

      {/* Slides Container */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-20 w-full py-4 md:py-20">
        
        {slides.map((slide, idx) => (
          <div 
            key={idx}
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center transition-all duration-700 ease-in-out ${
              currentSlide === idx 
                ? 'opacity-100 visible translate-y-0 scale-100' 
                : 'opacity-0 invisible absolute inset-0 translate-y-8 scale-95 pointer-events-none'
            }`}
          >
            {/* Text Content (Glassmorphism) */}
            <div className="hidden md:block text-left space-y-6 pt-16 md:pt-0 relative z-30">
              <div className="inline-block px-3 py-1 rounded-full bg-secondary-container/20 border border-secondary-container/30 backdrop-blur-md">
                <span className="text-secondary-container text-[11px] font-black uppercase tracking-widest">{slide.badge}</span>
              </div>
              
              <h1 className="font-display-lg text-3xl md:text-5xl lg:text-6xl text-white font-black leading-[1.1] tracking-tight">
                {slide.title1} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-container to-secondary">
                  {slide.titleHighlight}
                </span> <br/>
                {slide.title2}
              </h1>
              
              <p className="text-base md:text-lg text-surface-variant font-medium max-w-lg leading-relaxed">
                {slide.desc}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-6">
                <button className="bg-gradient-to-r from-secondary to-secondary-container text-white px-8 py-3.5 font-bold rounded-lg hover:shadow-[0_0_20px_rgba(254,107,0,0.4)] transition-all active:scale-95 flex items-center gap-2">
                  {slide.btn1}
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <button className="bg-white/5 backdrop-blur-md border border-white/20 text-white px-8 py-3.5 font-bold rounded-lg hover:bg-white/10 transition-all active:scale-95">
                  {slide.btn2}
                </button>
              </div>
            </div>

            {/* Image Content (Floating) */}
            <div className="flex justify-center relative h-[250px] sm:h-[350px] md:h-[500px] w-full">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Glowing Base */}
                <div className="w-72 h-16 bg-white opacity-10 absolute bottom-8 rounded-[100%] blur-xl transition-all duration-1000" style={{backgroundColor: slide.glowColor}}></div>
                
                {/* Tech Frame */}
                <div className="w-64 h-80 bg-gradient-to-br from-white/10 to-transparent border border-white/20 rounded-2xl absolute transform -rotate-6 backdrop-blur-sm animate-pulse"></div>
                <div className="w-64 h-80 bg-gradient-to-tr from-white/5 to-transparent border border-white/10 rounded-2xl absolute transform rotate-3 backdrop-blur-sm"></div>
                
                {/* Product Image */}
                <div className="relative z-20 animate-float" style={{ animationDuration: '6s' }}>
                  <img 
                    alt="High-performance tech component" 
                    className="w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 object-contain transition-transform duration-700 hover:scale-110 hover:rotate-3" 
                    src={slide.img} 
                    style={{filter: `drop-shadow(0 25px 35px ${slide.glowColor})`}}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modern Indicator Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-4">
        {[0, 1, 2].map((index) => (
          <button 
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group flex flex-col items-center gap-2"
          >
            <div className={`h-1.5 rounded-full transition-all duration-500 ${
              currentSlide === index 
                ? 'w-8 bg-secondary-container shadow-[0_0_10px_rgba(254,107,0,0.6)]' 
                : 'w-2 bg-white/30 group-hover:bg-white/60'
            }`}></div>
          </button>
        ))}
      </div>
      
      {/* Bottom Gradient Fade to match section below */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-surface to-transparent z-10 pointer-events-none"></div>
    </section>
  );
}
