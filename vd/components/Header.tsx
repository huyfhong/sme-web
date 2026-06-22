import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Bell } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 border-r border-gray-200 pr-6">
            <Image
              src="/images/viettel-logo.24b96913.svg"
              alt="Viettel Logo"
              width={109}
              height={34}
              priority
              className="h-auto w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link href="#" className="flex items-center gap-1.5 text-[15px] font-medium text-[#282828] hover:text-primary transition-colors">
              Sản phẩm
              <svg
                viewBox="64 64 896 896"
                width="10"
                height="10"
                fill="currentColor"
                aria-hidden="true"
                className="mt-0.5"
              >
                <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" />
              </svg>
            </Link>
            <Link href="/market-place" className="text-[15px] font-medium text-[#282828] hover:text-primary transition-colors">
              Chợ ứng dụng
            </Link>
            <Link href="/landing-page-combo" className="text-[15px] font-medium text-[#282828] hover:text-primary transition-colors">
              Gói giải pháp
            </Link>
            <Link href="/support-page" className="text-[15px] font-medium text-[#282828] hover:text-primary transition-colors">
              Hỗ trợ
            </Link>
            <Link href="/news" className="text-[15px] font-medium text-[#282828] hover:text-primary transition-colors">
              Tin Tức
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative cursor-pointer p-1.5 text-gray-500 hover:text-primary transition-colors">
            <Bell size={22} strokeWidth={2} />
            <span className="absolute top-1.5 right-1.5 flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-[#27ae60] px-0.5 text-[9px] font-bold text-white">
              0
            </span>
          </div>
          <div className="h-4 w-[1px] bg-gray-200" />
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-10 border-gray-200 px-5 text-[#282828] hover:bg-gray-50 rounded-lg font-medium">
              Đăng nhập
            </Button>
            <Button variant="viettel" className="h-10 px-6 bg-[#EE0033] hover:bg-[#D0002D] text-white">
              Đăng ký
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
