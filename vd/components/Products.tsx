"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import useEmblaCarousel from 'embla-carousel-react'

const categories = [
  {
    title: 'Sản phẩm thiết yếu',
    products: [
      { name: 'Tendoo', desc: 'Dịch vụ quản lý bán hàng thông minh', icon: 'https://sme.viettel.vn/media/sme//icon/tendo_logo_update.jpeg' },
      { name: 'Hóa đơn điện tử', desc: 'Xuất hóa đơn và quản lý dễ dàng', icon: 'https://sme.viettel.vn/media/sme//market-info/detail/vinvoice-icon.png' },
      { name: 'Hợp đồng điện tử', desc: 'Khởi tạo, lập, gửi, nhận, quản lý hóa đơn bằng phương tiện điện tử', icon: 'https://sme.viettel.vn/media/sme//homepage/our_product/our_product_vcontract.png' },
      { name: 'MySign', desc: 'Ký số mọi lúc mọi nơi, trên mọi thiết bị.', icon: 'https://sme.viettel.vn/media/sme//homepage/our_product/our_product_mysign.png' },
    ]
  },
  {
    title: 'Sản phẩm nâng cao',
    products: [
      { name: 'Dịch vụ Easybooks', desc: 'Phần mềm kế toán', icon: 'https://sme.viettel.vn/media/sme//background/logo-easybook-1-01.png' },
      { name: 'EasyHRM', desc: 'Giải pháp quản lý nhân sự', icon: 'https://sme.viettel.vn/media/sme//icon/hrm_icon_price.svg' },
      { name: 'CoDX', desc: 'Giải pháp Collaborations', icon: 'https://sme.viettel.vn/media/sme//icon/codx_icon_logo.png' },
      { name: '1Office', desc: 'Nền tảng quản trị tổng thể doanh nghiệp', icon: 'https://sme.viettel.vn/media/sme//icon/icon_price_view_1office.svg' },
    ]
  },
  {
    title: 'Sản phẩm đặc thù',
    products: [
      { name: 'Dịch vụ FTTH', desc: 'Dịch vụ cố định', icon: 'https://sme.viettel.vn/media/sme//icon/logoVBHXH.png' },
      { name: 'Dịch vụ Di động', desc: 'Dịch vụ Di động', icon: 'https://sme.viettel.vn/media/sme//icon/logoVBHXH.png' },
      { name: 'Viettel DMS', desc: 'Hệ thống quản lý phân phối', icon: 'https://sme.viettel.vn/media/sme//icon/DMS2.png' },
    ]
  }
]

export const Products = () => {
  const [emblaRef] = useEmblaCarousel({ align: 'start', loop: false })

  return (
    <section className="bg-[#F5F5F5] py-12">
      <div className="mx-auto max-w-[1024px] bg-white px-8 py-10 rounded-xl shadow-sm">
        {/* Header with Title and Search */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="text-[28px] font-black uppercase leading-tight">
            <span>DỊCH VỤ</span> <span className="text-primary">CHẤT LƯỢNG</span>
          </h2>
          
          <div className="flex flex-1 items-center gap-3 md:justify-end">
            <div className="relative flex h-[44px] w-full max-w-[300px] items-center rounded-full border border-gray-200 bg-white px-4">
              <Search className="h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Bạn đang tìm gì…" 
                className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
            </div>
            <Button variant="outline" className="h-[44px] rounded-[12px_12px_12px_0px] border-gray-400 px-6 font-semibold">
              Nhận tư vấn
            </Button>
          </div>
        </div>

        {/* Carousel Area */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {categories.map((cat, i) => (
              <div key={i} className="flex-[0_0_100%] md:flex-[0_0_33.33%] min-w-0">
                <div className="flex flex-col h-full rounded-xl border border-gray-100 bg-[#F7F8FA] overflow-hidden">
                   {/* Category Header */}
                   <div className="relative h-[80px] w-full flex items-center justify-between px-6 bg-cover bg-no-repeat" style={{ backgroundImage: "url('https://sme.viettel.vn/media/sme//homepage/our_product/Vector.svg')" }}>
                      <p className="relative z-10 font-bold text-white text-lg">{cat.title}</p>
                      <ChevronRight className="relative z-10 text-white h-5 w-5" />
                   </div>

                   {/* Product List */}
                   <div className="flex-1 p-2">
                     {cat.products.map((prod, j) => (
                       <div key={j} className="flex items-center gap-4 p-4 hover:bg-white transition-colors cursor-pointer group border-b border-gray-100 last:border-0">
                         <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-white p-1">
                            <img src={prod.icon} alt={prod.name} className="h-full w-full object-contain" />
                         </div>
                         <div className="flex-1 min-w-0">
                           <h4 className="text-[15px] font-bold text-black group-hover:text-primary truncate">{prod.name}</h4>
                           <p className="text-[13px] text-gray-500 line-clamp-2 leading-tight mt-0.5">{prod.desc}</p>
                         </div>
                         <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="h-4 w-4 text-primary" />
                         </div>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Button */}
        <div className="mt-10 flex justify-center">
          <Button variant="viettel" size="lg" className="h-[48px] px-8">
            Xem thêm tại Chợ Ứng dụng
          </Button>
        </div>
      </div>
    </section>
  )
}
