"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Star, ChevronRight } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const categories = [
  "Tất cả sản phẩm",
  "Sản phẩm thiết yếu",
  "Quản trị doanh nghiệp",
  "Sản phẩm chuyên ngành",
  "Internet, viễn thông"
]

const products = [
  { name: "SInvoice - Hóa đơn điện tử", img: "https://sme.viettel.vn/media/sme/market-info/home/vinvoice.png", rating: 5 },
  { name: "Tendoo – Dịch vụ Quản lý bán hàng thông minh", img: "https://sme.viettel.vn/media/sme/icon/market_Tendoo.png", rating: 5 },
  { name: "MySign - Ký số từ xa", img: "https://sme.viettel.vn/media/market-info/ad3a562b-968e-47de-b0c4-63300ea27db1_.png", rating: 4 },
  { name: "vContract - Chứng thực hợp đồng điện tử", img: "https://sme.viettel.vn/media/sme/market-info/home/vcontract.png", rating: 4 },
  { name: "Scontract - Hợp đồng điện tử thông thường", img: "https://sme.viettel.vn/media/sme/market-info/home/scontract_market.png", rating: 4 },
  { name: "Viettel-CA Chữ ký số", img: "https://sme.viettel.vn/media/market-info/bc17969c-cebd-4106-bcf1-6afecc0c0c2d_.webp", rating: 5 },
  { name: "Dịch vụ Easybooks", img: "https://sme.viettel.vn/media/sme/background/Hinh%20anh%20banner_easybooks.jpg", rating: 5 },
  { name: "EasyHRM - Quản lý nhân sự", img: "https://sme.viettel.vn/media/sme/background/bannerHRM.png", rating: 3 },
  { name: "1Office - Quản trị tổng thể", img: "https://sme.viettel.vn/media/sme/icon/market_place_1office.svg", rating: 5 },
]

export default function MarketplacePage() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Banner Section */}
        <section className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8">
           <div className="flex flex-col items-center gap-12 md:flex-row">
              <div className="flex w-full justify-center md:w-1/5">
                <img 
                  src="https://sme.viettel.vn/media/sme//market-place/banner.png" 
                  alt="Market Banner" 
                  className="h-auto w-full max-w-[200px] object-contain"
                />
              </div>
              <div className="w-full md:w-4/5">
                <h1 className="mb-4 text-[40px] font-bold leading-tight tracking-tight text-[#282828]">
                  CHỢ ỨNG DỤNG <span className="text-primary uppercase">VIETTEL</span>
                </h1>
                <p className="max-w-[800px] text-[20px] font-normal leading-relaxed text-[#282828]">
                  Mua sắm tiện lợi, cùng chợ ứng dụng Viettel - nơi đáng tin cậy để tìm kiếm sản phẩm chất lượng, với những ưu đãi hấp dẫn và dịch vụ chăm sóc khách hàng tận tâm.
                </p>
              </div>
           </div>
        </section>

        {/* Main Content with Sidebar */}
        <section className="mx-auto max-w-[1280px] px-4 pb-20 lg:px-8">
           <div className="flex flex-col gap-8 lg:flex-row">
              {/* Sidebar */}
              <aside className="w-full lg:w-1/5">
                <div className="mb-6">
                   <div className="flex h-12 w-full items-center rounded-[10px_10px_10px_0px] border-[1.5px] border-[#737373] bg-white px-4">
                      <Search className="h-5 w-5 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Tìm kiếm từ khóa" 
                        className="ml-2 w-full bg-transparent text-sm outline-none"
                      />
                   </div>
                </div>

                <div className="rounded-xl bg-gradient-to-b from-[#F7F8FA] to-[#F7F8FA]/70 p-1">
                   {categories.map((cat, i) => (
                     <div 
                       key={i} 
                       className={`flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-white transition-colors border-b border-gray-200 last:border-0 ${i === 0 ? 'bg-primary text-white hover:bg-primary/90' : 'text-[#303030]'}`}
                     >
                        <span className="font-bold text-[15px]">{cat}</span>
                        <ChevronRight className={`h-4 w-4 ${i === 0 ? 'text-white' : 'text-gray-400'}`} />
                     </div>
                   ))}
                </div>
              </aside>

              {/* Grid Area */}
              <div className="w-full lg:w-4/5">
                 {/* Featured Slider */}
                 <div className="mb-12 overflow-hidden rounded-2xl bg-cover bg-no-repeat p-8 md:p-12" style={{ backgroundImage: "url('https://sme.viettel.vn/media/sme//market-place/background-slide.svg')" }}>
                    <div className="embla" ref={emblaRef}>
                      <div className="embla__container flex">
                        {products.slice(0, 3).map((prod, i) => (
                          <div key={i} className="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-3">
                             <div className="h-full rounded-2xl bg-white p-6 shadow-lg transition-transform hover:scale-105">
                                <div className="mb-4 aspect-square overflow-hidden rounded-xl bg-gray-50">
                                   <img src={prod.img} alt={prod.name} className="h-full w-full object-contain" />
                                </div>
                                <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-tight text-[#282828]">{prod.name}</h3>
                                <div className="flex gap-0.5">
                                   {[...Array(5)].map((_, j) => (
                                     <Star key={j} className={`h-4 w-4 ${j < prod.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                   ))}
                                </div>
                             </div>
                          </div>
                        ))}
                      </div>
                    </div>
                 </div>

                 {/* Products Grid */}
                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((prod, i) => (
                      <Link 
                        key={i} 
                        href={`/market-place/${prod.name.toLowerCase().replace(/ /g, '-').split('\n')[0]}`}
                        className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-xl hover:-translate-y-1"
                        style={{ backgroundImage: "url('https://sme.viettel.vn/media/sme//market-place/bg-item.png')", backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}
                      >
                         <div className="mb-6 aspect-square overflow-hidden rounded-xl bg-white/50 p-4 transition-transform group-hover:scale-110">
                            <img src={prod.img} alt={prod.name} className="h-full w-full object-contain" />
                         </div>
                         <h3 className="mb-3 line-clamp-2 min-h-[3rem] text-[17px] font-bold leading-snug text-[#282828] group-hover:text-primary transition-colors">
                            {prod.name.split('\n')[0]}
                         </h3>
                         <div className="mt-auto flex items-center justify-between">
                            <div className="flex gap-0.5">
                               {[...Array(5)].map((_, j) => (
                                 <Star key={j} className={`h-4 w-4 ${j < prod.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                               ))}
                            </div>
                            <span className="text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                               Xem chi tiết <ChevronRight className="h-4 w-4 ml-1" />
                            </span>
                         </div>
                      </Link>
                    ))}
                 </div>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
