import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

const footerLinks = [
  {
    title: 'Khám phá',
    links: [{ text: 'Về Viettel', href: '/about-us' }]
  },
  {
    title: 'Liên hệ',
    links: [
      { text: 'Chat online CSKH', href: 'https://zalo.me/viettelkhdn' },
      { text: 'Dành cho đối tác', href: 'https://viettel.com.vn/' }
    ]
  },
  {
    title: 'Hỗ trợ',
    links: [
      { text: 'Câu hỏi thường gặp', href: '/content/question/portal/' },
      { text: 'Điều khoản sử dụng', href: '/content/term/portal/' },
      { text: 'Điều khoản mua hàng', href: '/content/term/portal/' }
    ]
  }
]

const socialLinks = [
  { href: 'https://www.facebook.com/Vietteltelecom/', icon: 'https://sme.viettel.vn/media/sme//assets/logos_facebook.png' },
  { href: 'https://www.youtube.com/user/Viettelchannels', icon: 'https://sme.viettel.vn/media/sme//assets/logos_ytb.png' },
  { href: 'https://www.facebook.com/Vietteltelecom/', icon: 'https://sme.viettel.vn/media/sme//assets/logos_x.png' },
  { href: 'https://zalo.me/viettelkhdn', icon: 'https://sme.viettel.vn/media/sme//assets/logos_zalo.png' }
]

export const Footer = () => {
  return (
    <footer className="bg-white pt-10 pb-8">
      <div className="mx-auto max-w-[1024px] px-4">
        {/* Main Footer Box */}
        <div className="rounded-[20px] bg-[#F7F8FA] p-8 md:p-12 overflow-hidden">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Logo and Info */}
            <div className="lg:col-span-1">
              <div className="flex gap-4 mb-6">
                <Link href="/">
                  <Image src="/images/viettel-logo.24b96913.svg" alt="Viettel" width={109} height={34} />
                </Link>
                <a href="http://online.gov.vn/Home/WebDetails/114173">
                  <img src="https://sme.viettel.vn/media/sme/background/logoBaoCaoBoCongThuong.png" alt="BCT" className="h-[34px] w-auto" />
                </a>
              </div>
              <p className="text-[14px] leading-[1.8] text-[#282828] font-roboto">
                Cơ quan chủ quản: Tổng Công ty Viễn thông Viettel (Viettel Telecom) – Chi nhánh Tập đoàn Công nghiệp – Viễn thông Quân đội - Mã số doanh nghiệp: 0100109106-011 do Sở Kế hoạch và Đầu tư Thành phố Hà Nội cấp lần đầu ngày 18/07/2005
              </p>
            </div>

            {/* Links Columns */}
            {footerLinks.map((col, i) => (
              <div key={i}>
                <h4 className="text-[20px] font-bold text-black/85 mb-6">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <Link href={link.href} className="text-[16px] text-[#757575] hover:text-primary transition-colors">
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter */}
            <div>
              <h4 className="text-[20px] font-bold text-black/85 mb-6">Theo dõi để nhận khuyến mại</h4>
              <div className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Email của bạn" 
                  className="h-[44px] rounded-full border border-gray-200 bg-white px-5 text-sm outline-none"
                />
                <Button variant="viettel" className="h-[44px] w-fit px-8">Đồng ý</Button>
              </div>
            </div>
          </div>

          {/* Social Bar */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-end gap-6 pt-8 border-t border-gray-200">
             <div className="flex gap-4">
                {socialLinks.map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
                    <img src={social.icon} alt="social" className="h-8 w-8 object-contain" />
                  </a>
                ))}
             </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-8 text-center text-[13px] text-[#757575]">
           © 2026 Viettel Telecom. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
