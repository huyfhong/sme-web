import React from 'react'

const testimonials = [
  {
    text: "\"Đội ngũ bán hàng và CSKH của Viettel rất nhiệt tình, hỗ trợ 24/7. Khi sử dụng dịch vụ của Viettel chúng tôi rất an tâm, chúng tôi sẽ giới thiệu và quảng bá các dịch vụ Viettel.\"",
    author: "Khách hàng Doanh nghiệp"
  },
  {
    text: "\"Các dịch vụ của Viettel Telecom rất tốt, chúng tôi rất tin tưởng khi sử dụng vì các dịch vụ đã hỗ trợ rất nhiều cho quy trình làm việc của chúng tôi trong công việc.\"",
    author: "Đối tác Công nghệ"
  },
  {
    text: "“Phần mềm của Viettel rất dễ sử dụng và tiện lợi. Phần mềm hỗ trợ rất nhiều cho chúng tôi, giúp chúng tôi tiết kiệm thời gian làm việc.\"",
    author: "Doanh nghiệp Sản xuất"
  }
]

export const Testimonials = () => {
  return (
    <section className="bg-white py-20 overflow-hidden">
      <div className="mx-auto max-w-[1024px] px-4">
        <h2 className="mb-16 text-[32px] font-bold uppercase leading-tight tracking-tight text-center">
          <span className="text-primary">ĐỐI TÁC</span>
          <span className="ml-2 text-black/85">NÓI GÌ VỀ CHÚNG TÔI</span>
        </h2>

        <div className="relative">
          {/* Decorative background SVG placeholder */}
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none">
             <svg width="500" height="150" viewBox="0 0 500 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 75C100 0 400 150 500 75" stroke="#EE0033" strokeWidth="20" strokeLinecap="round"/>
             </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Testimonial 1 */}
            <div className="md:col-span-8 p-6 rounded-2xl bg-[#F7F8FA] shadow-sm border border-gray-100">
               <p className="text-base text-[#303030] leading-relaxed italic mb-4">{testimonials[0].text}</p>
               <p className="text-lg font-bold text-black/85">— {testimonials[0].author}</p>
            </div>

            {/* Testimonial 2 */}
            <div className="md:col-span-8 md:col-start-5 p-8 rounded-2xl bg-white shadow-xl border border-gray-100">
               <p className="text-base text-[#303030] leading-relaxed italic mb-4">{testimonials[1].text}</p>
               <p className="text-lg font-bold text-black/85">— {testimonials[1].author}</p>
            </div>

            {/* Testimonial 3 */}
            <div className="md:col-span-8 md:col-start-2 p-6 rounded-2xl bg-[#F7F8FA] shadow-sm border border-gray-100">
               <p className="text-base text-[#303030] leading-relaxed italic mb-4">{testimonials[2].text}</p>
               <p className="text-lg font-bold text-black/85">— {testimonials[2].author}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
