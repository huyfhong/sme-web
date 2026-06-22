import React from 'react';

const items = [
  {
    title: 'Chất lượng đảm bảo',
    desc: 'Mọi sản phẩm và dịch vụ đều được chọn lọc kỹ lưỡng',
  },
  {
    title: 'Hỗ trợ 24/7',
    desc: 'Chúng tôi luôn bên bạn trong quá trình sử dụng',
  },
  {
    title: 'Thanh toán linh hoạt',
    desc: 'Hỗ trợ nguồn tiền đa dạng cùng cung cấp nhiều lựa chọn kết nối linh hoạt',
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="mx-auto max-w-[1024px] px-4 text-center">
        <h2 className="mb-12 text-[32px] font-bold text-black/85 uppercase leading-tight tracking-tight">
          VÌ SAO CHỌN SME HUB CỦA VIETTEL?
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-16">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <h3 className="mb-4 text-2xl font-bold text-[#303030] leading-tight">
                {item.title}
              </h3>
              <p className="text-base text-[#737373] font-normal leading-normal max-w-[300px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div className="relative flex justify-center -mt-8 md:-mt-12 lg:-mt-16">
          <div className="w-full aspect-video max-w-[1024px] scale-[0.6] sm:scale-[0.7] md:scale-[0.8] lg:scale-[0.7] transform origin-center transition-transform duration-500 rounded-[20px] overflow-hidden shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/lcONWHcvE08?autoplay=0&mute=0&controls=1"
              title="Why Choose SME HUB"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};
