import Image from 'next/image';

const items = [
  {
    icon: '/images/sme_hub_introduction_icon_1.png',
    text: 'SME Hub cung cấp hệ sinh thái hỗ trợ toàn diện từ tư vấn tới cung cấp các giải pháp chuyển đổi số tùy chỉnh theo ngành',
  },
  {
    icon: '/images/sme_hub_introduction_icon_1.png', // Icon 2 was missing in extraction
    text: 'SME Hub giúp doanh nghiệp tiết kiệm thời gian và chi phí trong vận hành',
  },
  {
    icon: '/images/sme_hub_introduction_icon_3.png',
    text: 'Cam kết mang đến sự tin cậy và bảo mật cho mọi giao dịch và dữ liệu',
  },
];

export const About = () => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1024px] px-4 text-center">
        <h2 className="mb-2 text-[32px] font-bold uppercase leading-tight tracking-tight">
          <span className="text-primary">SME HUB</span>
          <span className="ml-2 text-[#303030]">là gì ?</span>
        </h2>
        <p className="mb-12 text-xl text-[#787878] font-normal">
          Một nền tảng chuyển đổi số hàng đầu dành cho các doanh nghiệp nhỏ và vừa (SMEs)
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-6 flex h-[92px] w-[92px] items-center justify-center">
                <Image
                  src={item.icon}
                  alt="icon"
                  width={92}
                  height={92}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex w-full flex-1 rounded-[10px] bg-[#F7F7F7] p-6">
                <p className="text-[18px] leading-[1.6] text-black/85 text-center">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
