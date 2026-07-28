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

  return (
    <section className="hero-gradient relative overflow-hidden min-h-[600px] flex items-center group">
      <div className="absolute inset-0 circuit-pattern"></div>
      
      {/* Carousel Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 z-30 p-2 text-white/50 hover:text-secondary-container transition-all opacity-0 group-hover:opacity-100 hidden md:block"
      >
        <span className="material-symbols-outlined text-4xl">chevron_left</span>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 z-30 p-2 text-white/50 hover:text-secondary-container transition-all opacity-0 group-hover:opacity-100 hidden md:block"
      >
        <span className="material-symbols-outlined text-4xl">chevron_right</span>
      </button>

      {/* Slides Container */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 w-full py-16">
        
        {/* Banner 1 */}
        <div className={`transition-opacity duration-500 grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${currentSlide === 0 ? 'opacity-100 visible' : 'opacity-0 invisible absolute inset-0'}`}>
          <div className="text-left space-y-6 pt-16 md:pt-0">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white font-black leading-tight">
              ADVANCED ELECTRONIC <span className="text-secondary-container">CIRCUITS &amp; MODULES</span> FOR INNOVATORS.
            </h1>
            <p className="font-body-base text-body-base text-on-primary-container max-w-lg">
              Engineered for high precision and unwavering reliability. Browse our curated selection of microcontrollers, sensors, and development tools designed for professional makers and elite engineers.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-secondary-container text-white px-8 py-4 font-bold rounded hover:opacity-90 transition-all active:scale-95">Shop Components</button>
              <button className="border-2 border-white text-white px-8 py-4 font-bold rounded hover:bg-white hover:text-primary-container transition-all active:scale-95">Explore Development Kits</button>
            </div>
          </div>
          <div className="hidden md:flex justify-center relative h-[500px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-8 bg-on-primary-container opacity-20 absolute bottom-12 rounded-full blur-xl"></div>
              <div className="w-48 h-64 bg-primary-container border border-outline-variant/20 rounded-xl skew-x-12 absolute transform -rotate-12 animate-float"></div>
              <div className="relative z-20 animate-float" style={{ animationDelay: '-1s' }}>
                <img 
                  alt="High-performance microcontroller unit" 
                  className="w-80 h-80 object-contain drop-shadow-[0_20px_50px_rgba(254,107,0,0.3)]" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjb6tp314KD3SQLvUm5vv8VUwmJcROtdaTsqvD1sj-uY1XRmvGu4Uy5EUbGj-4aOwRb00XG_ca3zi3apLTkHLm1IenmqOzkPIbU1rV5DJh4tymPfSD6Y-JwYo94NnBI2XmsD-vM9m-lvSaThYYTrVREFMrdNRs4IrealV-mBYn-YvuBLJ_I5O_1MqvhF14yy18trHKx8CkhCILFNHpayHHdtpuuYQuHlKBKp8jjsv1r2_ij_MYjgnfP4DpACqnI8DQaE7ETgDQ6Z56" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Banner 2 */}
        <div className={`transition-opacity duration-500 grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${currentSlide === 1 ? 'opacity-100 visible' : 'opacity-0 invisible absolute inset-0'}`}>
          <div className="text-left space-y-6 pt-16 md:pt-0">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white font-black leading-tight">
              NEXT-GEN <span className="text-secondary-container">ROBOTICS &amp; ACTUATION</span> SYSTEMS.
            </h1>
            <p className="font-body-base text-body-base text-on-primary-container max-w-lg">
              Precision motion control for industrial automation and advanced robotics projects. High-torque servos and BLDC drivers available now.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-secondary-container text-white px-8 py-4 font-bold rounded hover:opacity-90 transition-all active:scale-95">View Robotics</button>
            </div>
          </div>
          <div className="hidden md:flex justify-center relative h-[500px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-8 bg-on-primary-container opacity-20 absolute bottom-12 rounded-full blur-xl"></div>
              <div className="w-48 h-64 bg-primary-container border border-outline-variant/20 rounded-xl -skew-x-12 absolute transform rotate-6 animate-float"></div>
              <div className="relative z-20 animate-float" style={{ animationDelay: '-0.5s' }}>
                <img 
                  alt="Industrial robotic arm assembly" 
                  className="w-80 h-80 object-contain drop-shadow-[0_20px_50px_rgba(254,107,0,0.3)]" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuADjroi-O617y6-_ra7KBuTW_7pQVmQdmr-VAMiB_qOifwZGquCtVVs7rdpHOnU0QSEil10W6yUk2fR9NEhc4GSYWojxHbjGqklNxk5XES8dmVY0GTxnB-SvBwm2X_HJWaq1MczQOvTkJVnAdGGGu3Ogjh-pNbZubQZJJUBGlImCBP2k8KU8y6Z6GAt_hTLRY414GTAwWyq4g3wTGSwd4jZQRvRCsIKBy8O6j1ASTV8miEwThVBl_duVGW5PK8c7xAFhrMghJ7c7ibD" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Banner 3 */}
        <div className={`transition-opacity duration-500 grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${currentSlide === 2 ? 'opacity-100 visible' : 'opacity-0 invisible absolute inset-0'}`}>
          <div className="text-left space-y-6 pt-16 md:pt-0">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white font-black leading-tight">
              IOT &amp; <span className="text-secondary-container">WIRELESS CONNECTIVITY</span> SOLUTIONS.
            </h1>
            <p className="font-body-base text-body-base text-on-primary-container max-w-lg">
              Seamless integration for the smart world. Explore our range of LoRa, WiFi 6, and Zigbee modules for ultra-low power applications.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-secondary-container text-white px-8 py-4 font-bold rounded hover:opacity-90 transition-all active:scale-95">Explore IoT</button>
            </div>
          </div>
          <div className="hidden md:flex justify-center relative h-[500px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-8 bg-on-primary-container opacity-20 absolute bottom-12 rounded-full blur-xl"></div>
              <div className="w-48 h-64 bg-primary-container border border-outline-variant/20 rounded-xl animate-float"></div>
              <div className="relative z-20 animate-float" style={{ animationDelay: '-1.5s' }}>
                <img 
                  alt="IoT Wireless connectivity module" 
                  className="w-80 h-80 object-contain drop-shadow-[0_20px_50px_rgba(254,107,0,0.3)]" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCY109R2x6yUwmyxGVVnrsDQicEeRiCGJKxYT9ToAreRHmqc7HWo8krT2_uyibKkFoRcKkJYCfw9lS4WxJ0w_zA1d4Nt6eG7PaUlWd0tYSgb7iJpHWx51h_JDZtgxbvPE059VhyR-vfHipvZ7IgktdYWzpsWNm4q3t2OBYJR0pY70S6HZAe-mDontEl-jRvnNpj4i3vHIbvMEn8NMJ9zhCOWjj5nksY94AScD4HSCu5kmbOxCcLxebXWsBQB_tqrYdxMCjSCjIIQfK-" 
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Indicator Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {[0, 1, 2].map((index) => (
          <button 
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${currentSlide === index ? 'bg-secondary-container' : 'bg-white/30 hover:bg-white/50'}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
