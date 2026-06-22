"use client"

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

export const Hero = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })])

  return (
    <section className="relative w-full overflow-hidden bg-white mb-[21.6px]">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {/* Slide 1 */}
          <div className="embla__slide relative h-[500px] w-full flex-[0_0_100%] md:h-[900px]">
            <div 
              className="absolute inset-0 bg-[url('/images/sme_hub_banner.png')] bg-[50%_50%] bg-cover bg-no-repeat transition-transform duration-700 hover:scale-105"
            />
            
            {/* Decorative SVGs and Content Container */}
            <div className="relative mx-auto h-full max-w-[1280px] px-4">
              <div className="absolute inset-0 flex items-center">
                {/* Content could go here if extracted later */}
              </div>

              {/* Decorative SVG 1 */}
              <svg 
                width="288" 
                height="329" 
                viewBox="0 0 288 329" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="absolute bottom-[250px] left-0 hidden lg:block animate-in fade-in slide-in-from-left-10 duration-1000"
              >
                <path 
                  d="M223.132 314.387C64.9472 304.712 -55.4444 168.635 -45.7695 10.4492" 
                  style={{ fill: 'none', strokeWidth: 20, stroke: 'url(#paint0_linear)', strokeLinecap: 'round' }}
                  className="stroke-[#EE0033]"
                />
                <circle cx="11.7202" cy="11.7202" r="11.7202" transform="matrix(-0.0610473 0.998135 0.998135 0.0610473 247.803 304.153)" fill="#EF0436" />
                <defs>
                  <linearGradient id="paint0_linear" x1="-70.7326" y1="86.0393" x2="223.132" y2="314.387" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#EE0033" stopOpacity="0" />
                    <stop offset="1" stopColor="#EE0033" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Carousel Indicators could be added here */}
    </section>
  )
}
