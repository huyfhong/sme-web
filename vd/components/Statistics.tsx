"use client"

import React, { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const stats = [
  { number: 15, suffix: '+', label: 'Giải thưởng đã nhận' },
  { number: 2000, suffix: '+', label: 'Giờ phát triển' },
  { number: 9, suffix: '+', label: 'Sản phẩm và dịch vụ' },
  { number: 4231, suffix: '+', label: 'Khách hàng đang sử dụng' },
]

export const Statistics = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    axis: 'y', 
    loop: true,
    align: 'center',
    containScroll: false
  }, [Autoplay({ delay: 3000, stopOnInteraction: false })])

  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1024px] px-4">
        <h2 className="mb-12 text-[32px] font-bold uppercase leading-tight tracking-tight text-center">
          <span className="text-primary">THỐNG KÊ</span>
          <span className="ml-2 text-[#303030]">VỀ CHÚNG TÔI</span>
        </h2>

        <div className="relative h-[400px] w-full overflow-hidden" ref={emblaRef}>
          <div className="flex h-full flex-col">
            {stats.map((stat, i) => {
              const isActive = i === selectedIndex
              const isPrev = i === (selectedIndex - 1 + stats.length) % stats.length
              const isNext = i === (selectedIndex + 1) % stats.length

              let transform = 'scale(0.8) translateY(0)'
              let opacity = '0.4'
              let zIndex = '10'

              if (isActive) {
                transform = 'scale(1) translateY(0)'
                opacity = '1'
                zIndex = '50'
              } else if (isPrev) {
                transform = 'scale(0.85) translateY(-20%)'
                opacity = '0.7'
                zIndex = '30'
              } else if (isNext) {
                transform = 'scale(0.85) translateY(20%)'
                opacity = '0.7'
                zIndex = '30'
              }

              return (
                <div 
                  key={i} 
                  className="flex-[0_0_189px] min-h-0 w-full flex items-center justify-center transition-all duration-700 ease-in-out"
                  style={{ transform, opacity, zIndex }}
                >
                  <div 
                    className={`
                      relative flex h-[180px] w-full max-w-[800px] items-center justify-between rounded-xl p-10 shadow-lg
                      ${isActive 
                        ? 'bg-gradient-to-r from-[#FF3434] to-[#2E2E2E] text-white' 
                        : 'bg-gradient-to-r from-[#FEF1F4] to-[#FCCFD9] text-black/85'}
                    `}
                  >
                    <div className="flex flex-col">
                       <div className="text-5xl font-black mb-2 flex items-baseline">
                          {stat.number.toLocaleString()}{stat.suffix}
                       </div>
                       <div className={`text-lg font-medium ${isActive ? 'text-white/90' : 'text-[#737373]'}`}>
                          {stat.label}
                       </div>
                    </div>
                    
                    <div className="hidden md:block">
                       <img 
                         src="https://sme.viettel.vn/media/sme//homepage/statistic/statistical.svg" 
                         alt="stat-icon" 
                         className={`h-24 w-24 object-contain ${isActive ? 'brightness-0 invert' : ''}`}
                       />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
