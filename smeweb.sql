-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 22, 2026 lúc 05:34 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `smeweb`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `token`, `created_at`) VALUES
(2, 'Admin', 'admin@sme.vn', '$2y$10$dRQS1YNVPqS4DU0jB3BFeeZURJyp4fkkVXv9m67D1ecnG3cVBURAi', '568e127461e64f721a39279ec5ced603ddf12b19b6fa0f96e5de00f86ec4eafc', '2026-06-21 17:06:54');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `banners`
--

CREATE TABLE `banners` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `banners`
--

INSERT INTO `banners` (`id`, `image`, `title`, `link`, `sort_order`, `is_active`, `created_at`) VALUES
(1, 'images/sme_hub_banner.png', 'SME Hub Banner 1', NULL, 0, 1, '2026-06-21 16:57:22'),
(2, 'images/sme_hub_banner.png', 'SME Hub Banner 2', NULL, 1, 1, '2026-06-21 16:57:22'),
(3, 'images/sme_hub_banner.png', 'SME Hub Banner 3', NULL, 2, 1, '2026-06-21 16:57:22');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `created_at`) VALUES
(1, 'Sản phẩm thiết yếu', 'san-pham-thiet-yeu', NULL, '2026-06-10 13:47:05'),
(2, 'Quản trị doanh nghiệp', 'quan-tri-doanh-nghiep', NULL, '2026-06-10 13:47:05'),
(3, 'Sản phẩm chuyên ngành', 'san-pham-chuyen-nganh', NULL, '2026-06-10 13:47:05'),
(4, 'Internet, viễn thông', 'internet-vien-thong', NULL, '2026-06-10 13:47:05');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `consultations`
--

CREATE TABLE `consultations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT '',
  `product` varchar(255) DEFAULT '',
  `message` text DEFAULT NULL,
  `status` enum('pending','contacted','closed') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `consultations`
--

INSERT INTO `consultations` (`id`, `name`, `phone`, `email`, `product`, `message`, `status`, `created_at`) VALUES
(1, 'tesst', '0374573648', 'phonghuy2004@gmail.com', 'SINVOICE', 'test 1223\n', 'contacted', '2026-06-21 17:10:11'),
(2, 'Huy Phong', '0374573648', 'phonghuy2004@gmail.com', 'Hóa đơn điện tử vInvoice', 'test 112\n', 'pending', '2026-06-22 02:03:23'),
(3, 'Huy Phong', '0374573648', 'phonghuy2004@gmail.com', 'vBHXH - Bảo hiểm xã hội', 'msms', 'pending', '2026-06-22 02:16:09'),
(4, 'tsdsfs', 'sffsf', 'phonghuy2004@gmail.com', 'Chữ ký số Viettel CA', 'ssf', 'pending', '2026-06-22 02:45:32'),
(5, 'Huy Phong', '0374573648', 'phonghuy2004@gmail.com', 'Chữ ký số Viettel CA', 'sfsfs', 'pending', '2026-06-22 02:48:09');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `partners`
--

CREATE TABLE `partners` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `partners`
--

INSERT INTO `partners` (`id`, `name`, `logo`, `url`, `sort_order`, `is_active`, `created_at`) VALUES
(1, 'Vietcombank', NULL, NULL, 0, 1, '2026-06-21 16:57:22'),
(2, 'VPBank', NULL, NULL, 1, 1, '2026-06-21 16:57:22'),
(3, 'MB Bank', NULL, NULL, 2, 1, '2026-06-21 16:57:22'),
(4, 'Vietinbank', NULL, NULL, 3, 1, '2026-06-21 16:57:22'),
(5, 'BIDV', NULL, NULL, 4, 1, '2026-06-21 16:57:22'),
(6, 'Sacombank', NULL, NULL, 5, 1, '2026-06-21 16:57:22'),
(7, 'ACB', NULL, NULL, 6, 1, '2026-06-21 16:57:22'),
(8, 'Techcombank', NULL, NULL, 7, 1, '2026-06-21 16:57:22');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `short_description` varchar(500) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `developer` varchar(255) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT 5.0,
  `is_featured` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `slug`, `short_description`, `description`, `image`, `developer`, `rating`, `is_featured`, `created_at`) VALUES
(1, 1, 'SInvoice', 'sinvoice', 'Giải pháp hóa đơn điện tử', 'Xuất hóa đơn điện tử và quản lý hóa đơn cho doanh nghiệp.', 'sinvoice.png', 'Viettel Telecom', 5.0, 0, '2026-06-10 13:49:46'),
(2, 1, 'MySign', 'mysign', 'Giải pháp chữ ký số', 'Ký số văn bản và hợp đồng điện tử từ xa.', 'mysign.png', 'Viettel Telecom', 4.8, 0, '2026-06-10 13:49:46'),
(3, 1, 'vContract', 'vcontract', 'Giải pháp hợp đồng điện tử', 'Tạo lập, ký kết và quản lý hợp đồng điện tử.', 'vcontract.png', 'Viettel Telecom', 4.9, 0, '2026-06-10 13:49:46'),
(5, 2, 'EasyHRM', 'easyhrm', 'Giải pháp quản lý nhân sự', 'Hỗ trợ chấm công, tính lương, quản lý hồ sơ nhân viên và đánh giá hiệu suất.', 'easyhrm.png', 'Viettel Solutions', 4.8, 0, '2026-06-11 12:47:12'),
(6, 2, 'EasyBooks', 'easybooks', 'Phần mềm kế toán EasyBooks', 'Quản lý thu chi, công nợ, báo cáo tài chính và nghiệp vụ kế toán cho doanh nghiệp.', 'easybooks.png', 'Viettel Solutions', 4.7, 0, '2026-06-11 12:47:12'),
(7, 3, 'Viettel DMS', 'dms', 'Giải pháp quản lý kênh phân phối', 'Hỗ trợ doanh nghiệp quản lý bán hàng, nhà phân phối, đại lý và đội ngũ nhân viên thị trường.', 'dms.png', 'Viettel Solutions', 4.8, 0, '2026-06-11 13:11:26'),
(8, 3, 'Viettel Cyber Work', 'vtracking', 'Giải pháp quản lý doanh nghiệp', 'Giải pháp quản lý tự động hóa quy trình, công việc và kho lưu trữ tài liệu, cung cấp các giải pháp quản trị và điều hành doanh nghiệp đơn giản, từ xa', 'cyber.png', 'Viettel Telecom', 4.7, 0, '2026-06-11 13:11:26'),
(9, 2, 'CoDX', 'codx', 'Giải pháp Collaboration', 'Nền tảng cộng tác số giúp doanh nghiệp trao đổi thông tin, quản lý công việc, họp trực tuyến và nâng cao hiệu quả làm việc nhóm.', 'codx.png', 'CoDX', 4.9, 0, '2026-06-12 07:13:37'),
(10, 1, 'Tendoo - Dịch vụ Quản lý bán hàng thông minh', 'tendoo-dich-vu-quan-ly-ban-hang-thong-minh', 'Giải pháp quản lý bán hàng thông minh dành cho doanh nghiệp.', 'Tendoo là nền tảng quản lý bán hàng giúp doanh nghiệp quản lý đơn hàng, sản phẩm, khách hàng và doanh thu một cách hiệu quả, hỗ trợ bán hàng đa kênh và tối ưu hoạt động kinh doanh.', 'tendoo-quan-ly-ban-hang.png', 'Viettel Solutions', 5.0, 1, '2026-06-14 08:03:15'),
(11, 1, 'Tendoo Marketing - Quảng cáo và chăm sóc khách hàng', 'tendoo-marketing-quang-cao-va-cham-soc-khach-hang', 'Nền tảng marketing và chăm sóc khách hàng dành cho doanh nghiệp.', 'Tendoo Marketing cung cấp các công cụ quảng cáo, gửi tin nhắn, email marketing và chăm sóc khách hàng tự động, giúp doanh nghiệp tăng hiệu quả tiếp cận và giữ chân khách hàng.', 'tendoo-marketing.png', 'Viettel Solutions', 4.0, 1, '2026-06-14 08:03:15'),
(12, 1, 'Scontract - Hợp đồng điện tử thông thường', 'scontract-hop-dong-dien-tu-thong-thuong', 'Giải pháp hợp đồng điện tử an toàn và tiện lợi.', 'Scontract là nền tảng ký kết và quản lý hợp đồng điện tử, giúp doanh nghiệp số hóa quy trình ký kết, tiết kiệm thời gian, chi phí và nâng cao hiệu quả quản lý tài liệu.', 'scontract.png', 'Viettel Solutions', 5.0, 1, '2026-06-14 08:03:15'),
(14, 4, 'cr7', 'wc 2026', 'siuu', '7 tạ', 'images/1782097986_a76c10c6.png', '', 0.0, 0, '2026-06-22 03:13:06');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_details`
--

CREATE TABLE `product_details` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `slogan` varchar(255) DEFAULT NULL,
  `overview` text DEFAULT NULL,
  `feature_content` text DEFAULT NULL,
  `guide_content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_details`
--

INSERT INTO `product_details` (`id`, `product_id`, `slogan`, `overview`, `feature_content`, `guide_content`, `created_at`) VALUES
(1, 9, 'Cộng tác số - Hiệu quả - Linh hoạt', '\r\nCoDX Collaboration \r\nKhông gian làm việc số không giới hạn\r\nMạng xã hội nội bộ doanh nghiệp gắn kết – xây dựng giá trị khác biệt tạo nên thành công đặc biệt.\r\n\r\nLợi ích:\r\n\r\n1. Quản lý bộ quy trình và hiệu lực ban hành\r\nChuẩn hóa toàn bộ hệ thống tài liệu về Bộ quy trình vận hành tại doanh nghiệp thực tế. Chia sẻ, tìm kiếm, quản lý lịch sử phát hành các phiên bản quy trình, biểu mẫu.\r\n\r\n2. Họp trực tuyến - Dịch vụ văn phòng số\r\nVăn phòng không giấy tờ cho mọi dịch vụ online từ Hành Chính (đặt phòng họp liên thông, họp trực tuyến, xe công tác, cấp văn phòng phẩm, báo hỏng cơ sở vật chất) đến Dịch vụ IT (cấp phát thiết bị và tài nguyên CNTT, IT Helpdesk).\r\n\r\n3. Trình ký số bảo mật tuyệt đối - Ký duyệt không gián đoạn.\r\n', '\r\n1. Quản lý công việc\r\n\r\n2. Quản lý quy trình động\r\n\r\n3. Quản lý tài liệu\r\n\r\n4. Ký số\r\n\r\n5. Không gian làm việc số\r\n\r\n6. Quản lý văn bản đi đến\r\n\r\n7. Đăng ký xe\r\n\r\n8. Đăng ký lịch họp\r\n\r\n9. Văn phòng phẩm\r\n', 'Tài liệu hướng dẫn sử dụng CoDX sẽ được cập nhật tại đây.', '2026-06-12 13:22:22'),
(3, 1, 'Giải pháp hóa đơn điện tử cho doanh nghiệp', 'HÓA ĐƠN ĐIỆN TỬ SINVOICE LÀ GÌ?\r\n\r\nSInvoice giúp doanh nghiệp khởi tạo, lập, gửi, nhận, quản lý hóa đơn bằng phương tiện điện tử, ký bằng chữ ký số và có giá trị pháp lý như hóa đơn giấy. SInvoice phục vụ mọi khách hàng có nhu cầu, đủ điều kiện theo quy định pháp luật. Dịch vụ cung cấp từ năm 2016, liên tục cải tiến đáp ứng yêu cầu sử dụng của khách hàng cũng như nghiệp vụ quản lý từ cơ quan Nhà nước. Để phát hành hóa đơn điện tử, doanh nghiệp cần có chữ ký số.\r\n\r\n    Liên hệ: 18008000.', '• Đầy đủ tính năng, linh hoạt quản lý\r\n\r\n• Thư viện mẫu hóa đơn đa dạng.\r\n\r\n• Tạo mới, khai báo cho mẫu hóa đơn mới nhanh.\r\n\r\n• Lập hóa đơn nhanh chóng, đơn giản.\r\n\r\n• Hỗ trợ ký bằng thiết bị ký số.\r\n\r\n• Có module kết nối tới Tổng cục Thuế theo mẫu của Tổng cục Thuế.\r\n\r\n• Có sẵn Portal cho khách hàng tra cứu hóa đơn.\r\n\r\n• Liên hệ tổng đài 18008000 để được hỗ trợ sử dụng dịch vụ SInvoice.', NULL, '2026-06-13 08:18:02'),
(4, 2, 'Ký kết Không khoảng cách – An toàn – Bảo mật', 'DỊCH VỤ CHỮ KÝ SỐ MYSIGN LÀ GÌ?\r\n\r\nDịch vụ chữ ký số từ xa MySign là một loại chữ ký điện tử sử dụng công nghệ điện toán đám mây (cloud base) có giá trị pháp lý, giúp người dùng có thể thực hiện ký số trên môi trường online ngay trên thiết bị di động mọi lúc mọi nơi nhanh chóng chỉ cần có kết nối Internet mà không cần sử dụng thiết bị phần cứng USB Token và SIM CA.\r\n\r\nLiên hệ: 18008000.', '• Tích hợp trên nhiều môi trường ký: Giáo dục, Y tế, Dịch vụ công, BHXH, Hải quan, Chứng khoán, Ngân hàng,...\r\n\r\n • Ký trên mọi nền tảng: Androi và IOS\r\n\r\n • Tốc độ ký vượt trội: chỉ trong 1s\r\n\r\n• Dễ dàng quản lý và sử dụng.', NULL, '2026-06-13 08:31:36'),
(5, 3, 'Ký kết Không khoảng cách – An toàn – Bảo mật', 'DỊCH VỤ HỢP ĐỒNG ĐIỆN TỬ VCONTRACT LÀ GÌ?\r\n\r\nHợp đồng điện tử Viettel (vContract) cho phép doanh nghiệp quản lý và ký số các loại hợp đồng, tài liệu với khách hàng, đối tác qua internet. Hợp đồng điện tử Viettel đáp ứng các quy định của pháp luật và là giải pháp thay thế hợp đồng giấy hiệu quả, có giá trị pháp lý như việc ký kết hợp đồng giấy theo phương thức truyền thống.\r\n\r\nLiên hệ: 18008000.', '• Khởi tạo, ký và tra cứu hợp đồng/tài liệu, ký hợp đồng, gửi nhận thông tin hợp đồng/tài liệu qua email/SMS...\r\n\r\n• Quản lý và lưu trữ hợp đồng/tài liệu dễ dàng\r\n\r\n• Đa dạng phương thức ký: Ký số (USB Token, Cloud CA, Mobile CA)/ OTP/ eKYC/ ký ảnh\r\n\r\n• Áp dụng cho nhiều loại thỏa thuận/chứng từ/hợp đồng', NULL, '2026-06-13 08:35:11'),
(6, 5, 'Đơn giản - Tối tư – Hiệu quả', 'EasyHRM là giải pháp quản lý nhân sự toàn diện do Công ty CP Đầu tư & Thương mại Softdreams ra mắt. Sở hữu những tính năng thông minh, EasyHRM giúp việc quản trị nhân sự trở nên dễ dàng ở mọi lúc, mọi nơi.\r\n\r\nChúng tôi hoàn toàn tự tin về chất lượng sản phẩm mang tới cho doanh nghiệp của bạn khi đã xây dựng thành công hệ sinh thái gồm EasyInvoice, EasyCa, Easybooks, Easydocs, EasyPIT, EasyCRM,... hiện đang có hơn 200.000 đối tác sử dụng.Dịch vụ gì? Có chức năng gì?', '1. Quản lý thông tin nhân sự\r\n\r\n- Giao diện trực quan, dễ dàng theo dõi\r\n\r\n• Quản lý thông tin nhân sự với Dashboard tổng quan, biểu đồ, số liệu rõ ràng.\r\n\r\n• Cập nhật đầy đủ quy trình nhân sự, quyết định, phúc lợi, nghỉ việc,...\r\n\r\n- Quản lý dữ liệu tập trung, dễ dàng tìm kiếm, truy xuất\r\n\r\n• Tổng hợp dữ liệu chi tiết về hồ sơ nhân viên (SYLL, lịch sử lương, thưởng, kỷ luật,...)\r\n\r\n•  Phê duyệt đơn từ dễ dàng chỉ cần 1 điểm chạm\r\n\r\n•  Nhập - xuất dữ liệu ra file excel tiện lợi, nhanh chóng\r\n    \r\n    2. Chi tiết thông tin nhân viên\r\n\r\n- Quản lý hồ sơ trực tiếp trên mọi nền tảng\r\n\r\n•  Đầy đủ sơ yếu lý lịch, thông tin làm việc, quá trình lương, khen thưởng, kỷ luật\r\n\r\n- Đăng ký nghỉ, giải trình trực tiếp bằng App mobile:\r\n\r\n• Thao tác đơn giản, dễ dàng\r\n\r\n•  Theo dõi tình trạng đơn đăng ký và gửi thông báo\r\n\r\n• Cấp quản lý nhận được đơn đăng ký tức thì\r\n\r\n- Theo dõi bảng công, phiếu lương, hợp đồng\r\n\r\n•  Bảng công chi tiết với thời gian vào - ra, nghỉ, công tác...\r\n\r\n•  Giải trình dễ dàng và chính xác tuyệt đối\r\n\r\n•  Bảng lương cập nhật theo từng kỳ, thuận tiện cho đối soát\r\n\r\n•  Cập nhật lịch sử trạng thái hợp đồng, phụ lục hợp đồng lao động\r\n    \r\n    3. Quản lý chấm công\r\n\r\n- Tổng hợp kỳ công, dữ liệu chấm công dễ dàng\r\n\r\n•  Theo dõi tổng quan tình trạng đi sớm, về muộn, công tác của nhân viên\r\n\r\n•  HR có thể truy xuất dữ liệu chấm công từng ngày từ hỗ trợ tích hợp trực tiếp với máy chấm công hoặc sử dụng giải pháp chấm công APP mobile như GPS, Wifi, FaceID\r\n\r\n•  Dễ dàng kiểm tra báo cáo chấm công theo từng ngày, chi tiết check in - check out, xác nhận giải trình, …\r\n\r\n- Xếp ca làm việc cho nhân viên các bộ phận:\r\n\r\n•  Kiểm tra bảng ca làm việc của từng nhân sự trong doanh nghiệp, chi tiết, trực quan phù hợp chuỗi cửa hàng, nhiều ca kíp trong ngày.', NULL, '2026-06-13 08:39:48'),
(7, 6, 'Phần mềm kế toán', 'Dịch vụ Easybooks là gì?\r\n    \r\n    EasyBooks là phần mềm kế toán tối ưu dành cho các doanh nghiệp đáp ứng đầy đủ nghiệp vụ kế toán. EasyBooks đáp ứng đầy đủ nghiệp vụ Kế toán tài chính - Kế toán quản trị cho mọi loại hình doanh nghiệp áp dụng chế độ kế toán theo Thông tư 200/2014/TT-BTC và Thông tư 133/2016/TT-BTC. Easybooks đáp ứng đầy đủ nghiệp vụ quản trị tài chính kế toán cho mọi loại hình doanh nghiệp, thuộc mọi lĩnh vực. Giúp kế toán dễ dàng theo dõi doanh thu, công nợ, chi phí. Đồng thời, giúp lãnh đạo dễ dàng đánh giá được hiệu quả kinh doanh của doanh nghiệp…\r\n\r\nLiên hệ: 18008000', 'Phần mềm kế toán EasyBooks sở hữu 13 phân hệ chính, đảm bảo tất cả hoạt động của kế toán:\r\n\r\n1. Kế toán tiền mặt và ngân hàng\r\n\r\nPhân hệ tiền mặt và ngân hàng của EasyBooks đáp ứng đầy đủ các nghiệp vụ thu – chi bằng tiền mặt và tiền gửi ngân hàng theo nhiều hình thức và nhiều loại tiền.\r\n\r\n– Thu: Hỗ trợ thực hiện các nghiệp vụ làm tăng số tiền mà doanh nghiệp đang nắm giữ, ghi tăng bên nợ của các tài khoản tiền\r\n\r\n– Chi: Hỗ trợ thực hiện các nghiệp vụ làm giảm số tiền mà doanh nghiệp đang nắm giữ, ghi tăng bên có của các tài khoản tiền\r\n\r\n\r\n2. Kế toán mua hàng\r\n\r\n– Với phân hệ mua hàng kế toán có thể quản lý các đơn mua hàng và hạch toán kế toán các nghiệp vụ mua hàng hóa/dịch vụ, các khoản chiết khấu; theo dõi và thống kê việc mua hàng; chức năng tự động phân bổ chi phí mua hàng, chi phí trước hải quan. Bên cạnh đó, phân hệ cung cấp các sổ, báo cáo để theo dõi chi tiết công nợ, tình hình mua hàng qua sổ nhật ký mua hàng…\r\n\r\n– Phân hệ mua hàng theo dõi và thống kê việc mua hàng phục vụ cho việc phân tích tình hình thực hiện đơn hàng, theo dõi được công nợ phải trả nhà cung cấp và xu hướng thay đổi giá, bổ sung chức năng tự động phân bổ chi phí mua hàng (vận chuyển, bốc dỡ…), chi phí trước hải quan cho từng mặt hàng theo nhiều hình thức. Người dùng có thể phân bổ nhiều chứng từ chi phí cho 1 chứng từ mua hàng hoặc phân bổ 1 chứng từ chi phí cho nhiều chứng từ mua hàng.\r\n\r\n\r\n3. Kế toán kho\r\n\r\n- Với phân hệ này doanh nghiệp có thể quản lý tình hình nhập – xuất – tồn kho theo từng vật tư hàng hóa, nhóm/ loại; đáp ứng tất cả các phương pháp tính giá xuất kho; thực hiện đầy đủ các nghiệp vụ kho như nhập – xuất; in được các biểu mẫu phiếu xuất kho, phiếu nhập kho, thẻ kho, các sổ tổng hợp. Tự cập nhật giá nhập khi thành phẩm, sắp xếp thứ tự nhập xuất chứng từ trong cùng 1 ngày…\r\n\r\n- Phần mềm kế toán EasyBooks giúp doanh nghiệp quản lý tình hình nhập – xuất – tồn kho theo từng vật tư hàng hóa, công cụ dụng cụ theo các nhóm/loại và trong nhiều kho. Phần mềm đáp ứng tất cả các phương pháp tính giá xuất kho: bình quân cuối kỳ, bình quân tức thời, đích danh, nhập trước xuất trước.\r\n\r\n\r\n4. Kế toán bán hàng\r\n\r\n- Phân hệ bán hàng giúp doanh nghiệp thực hiện các nghiệp vụ bán hàng chính như lập báo giá, lập đơn đặt hàng, lập hóa đơn bán sản phẩm/dịch vụ. Ngoài ra, phân hệ còn hỗ trợ theo dõi, hạch toán các khoản chiết khấu, giảm giá, hàng bán bị trả lại, theo dõi công nợ phải thu theo từng khách hàng.\r\n\r\n- Tại đây, phần mềm kế toán EasyBooks đáp ứng đầy đủ các nghiệp vụ bán hàng trong nước, bán hàng xuất khẩu, bán qua đại lý bán đúng giá, bán hàng ủy thác xuất khẩu, bán hàng thu tiền ngay, bán hàng chưa thu tiền.\r\n\r\n- Bên cạnh đó, hệ thống hỗ trợ chức năng thiết lập các chính sách giá cho từng khách hàng, đại lý… tính giá bán dựa trên nhiều loại giá, theo dõi được lãi nợ quá hạn, kèm theo chức năng thông báo công nợ. Phần mềm còn có chức năng đối trừ chứng từ, tự động tạo phiếu xuất kho, tự động tính toán và hạch toán giá vốn hàng bán.\r\n\r\n- Hệ thống báo cáo gồm: sổ chi tiết bán hàng, sổ nhật ký bán hàng, sổ tổng hợp công nợ phải thu, sổ chi tiết công nợ phải thu… giúp doanh nghiệp theo dõi tình hình xuất hàng bán và công nợ một cách đầy đủ và chính xác nhất.\r\n\r\n\r\n5. Kế toán công cụ dụng cụ\r\n\r\n- Với phân hệ công cụ dụng cụ (CCDC), EasyBooks giúp doanh nghiệp quản lý, theo dõi CCDC chi tiết đến từng phòng ban sử dụng và đáp ứng được đầy đủ các nghiệp vụ như: ghi tăng, ghi giảm, điều chuyển, điều chỉnh, phân bổ, kiểm kê.\r\n\r\n- Tại đây, phân hệ cho phép quản lý các công cụ dụng cụ từ thời điểm nhập mua đến khi xuất dùng, gồm các CCDC của các kỳ trước, đã phân bổ hoặc chưa phân bổ, các công cụ mua sắm mới trong kỳ, được cho biếu tặng, hoặc sản xuất được đưa vào sử dụng…. Đồng thời, cho phép phân bổ chi phí cho một hoặc nhiều đối tượng, phần mềm cũng tự động tạo các bút toán hạch toán giá trị phân bổ đều hàng kỳ cho các đối tượng tại chức năng phân bổ.\r\n\r\n\r\n6. Kế toán tài sản cố định\r\n\r\n- Phân hệ Tài sản cố định (TSCĐ) trên phần mềm kế toán EasyBooks giúp kế toán thực hiện đơn giản các nghiệp vụ kế toán TSCĐ như: ghi tăng, ghi giảm, điều chỉnh (đánh giá lại), điều chuyển, kiểm kê, tính khấu hao.\r\n\r\n- Tại phân hệ này, kế toán có thể quản lý các tài sản đang theo dõi từ các kỳ trước, các tài sản mua sắm mới trong kỳ và các tài sản góp vốn hoặc được cho biếu tặng… Phần mềm đáp ứng cho doanh nghiệp tính khấu hao theo phương pháp đường thẳng và tuân thủ đúng các quy định của nhà nước về quản lý và sử dụng TSCĐ theo Thông tư 45/2013/TT-BTC. Lúc này, hệ thống tự động hạch toán giá trị khấu hao hàng tháng, tính toán lại giá trị đã khấu hao và giá trị còn lại.\r\n    \r\n    \r\n7. Kế toán tổng hợp\r\n\r\n- Phân hệ tổng hợp trong EasyBooks là trung tâm tiếp nhận dữ liệu của các phân hệ và Module kế toán khác. Tại đây, kế toán có thể thực hiện các nghiệp vụ tổng hợp: quyết toán tạm ứng, hạch toán lương, thuế, bảo hiểm, khấu trừ thuế, phân bổ chi phí, xử lý chênh lệch tỷ giá… trước khi tiến hành kết chuyển lãi lỗ và lập báo cáo tài chính.\r\n\r\n- Ngoài ra, phân hệ tổng hợp còn có chức năng khóa sổ kỳ kế toán/ bỏ khóa sổ kỳ kế toán, để doanh nghiệp kiểm soát được số liệu cụ thể nhất theo từng kỳ báo cáo, rà soát chứng từ sổ sách khi cần. Hệ thống còn có chức năng bù trừ công nợ, áp dụng đối với các đối tượng vừa là khách hàng, vừa là nhà cung cấp của doanh nghiệp.\r\n    \r\n    \r\n8. Kế toán hợp đồng\r\n\r\n- Phân hệ hợp đồng trên phần mềm kế toán EasyBooks giúp kế toán đơn giản hóa việc theo dõi và quản lý dễ dàng những hợp đồng bán hàng, hợp đồng mua phát sinh cho phép kế toán quản lý được hợp đồng theo từng dự án, theo đơn hàng.\r\n\r\nĐồng thời, kế toán dễ dàng xem được danh sách các hợp đồng phát sinh theo thời gian, dự án, thống kê dự toán, thực thu, thực chi… Hàng hóa, dịch vụ đã giao hoặc đã nhận từ các phân hệ bán hàng, mua hàng được ghi nhận theo hợp đồng sẽ tự động thể hiện trên báo cáo tình hình thực hiện hợp đồng bán, hợp đồng mua\r\n\r\n- Với phân hệ này, kế toán có thể lập hợp đồng từ đơn hàng để tiết kiệm thời gian không phải nhập lại thông tin, nắm bắt được doanh số ghi nhận từ hợp đồng, theo dõi được tình trạng hợp đồng và giá trị thanh lý hợp đồng.\r\n\r\n>> EasyBooks đáp ứng đầy đủ nghiệp vụ Kế toán tài chính – Kế toán quản trị cho mọi loại hình doanh nghiệp áp dụng chế độ kế toán theo Thông tư 200/2014/TT-BTC và Thông tư 133/2016/TT-BTC. Để dùng thử phần mềm kế toán EasyBooks, Anh/chị vui lòng đăng ký dùng thử miễn phí tại link: http://dangkydemo.easybooks.vn/\r\n\r\n\r\n9. Kế toán tiền lương\r\n\r\n- Chấm công trực tiếp, lập bảng tổng hợp công từ các bảng theo dõi khác một cách nhanh chóng\r\n\r\n- Tính lương theo lương thỏa thuận hoặc theo hệ số lương và lương cơ sở chính xác\r\n\r\n- Hỗ trợ sinh các chứng từ hạch toán lương tự động, thanh toán bảo hiểm và theo dõi việc thanh toán lương nhân viên dễ dàng\r\n\r\n- Chủ động tạo ký hiệu chấm công, cài đặt quy định lương – thuế – bảo hiểm theo quy chuẩn của riêng doanh nghiệp, chủ động thay đổi phù hợp với quy định hiện hành.\r\n    \r\n    \r\n10. Kế toán giá thành\r\n\r\n- Phân hệ giá thành trong phần mềm kế toán EasyBooks là công cụ đắc lực cho kế toán thực hiện công việc quản lý tập hợp chi phí, tính giá thành sản xuất. Với phân hệ này, kế toán dễ dàng tính giá thành cho các thành phẩm sản xuất, công trình xây lắp, vụ việc, đơn hàng, phân xưởng sản xuất, theo hợp đồng.\r\n\r\n- Tại phân hệ này, người dùng tự thiết lập được định mức nguyên vật liệu công trình, định mức giá thành của thành phẩm, định mức phân bổ chi phí… cho phép phân bổ chi phí theo nhiều tiêu thức, đánh giá dở dang theo nhiều phương pháp khác nhau phù hợp với phương thức tính toán của từng doanh nghiệp.\r\n\r\n- Với phần mềm kế toán EasyBooks, những công việc liên quan đến tính toán giá thành sẽ trở nên đơn giản hơn rất nhiều, hạn chế tối đa những sai sót.\r\n    \r\n    \r\n11. Quản lý hóa đơn\r\n\r\n- Với phân hệ quản lý hóa đơn của EasyBooks, kế toán thực hiện theo dõi hóa đơn xuất đi từ phân hệ bán hàng, theo dõi tình hình sử dụng hóa đơn hàng quý hàng tháng.\r\n\r\n- Ngoài ra, phân hệ có khả năng quản lý cả hóa đơn tự in, hóa đơn đặt in, hóa đơn điện tử. Theo đó, kế toán có thể nhập dữ liệu khởi tạo mẫu hóa đơn, đăng ký sử dụng và thông báo phát hành hóa đơn. Đáp ứng đầy đủ nghiệp vụ báo mất cháy hỏng hóa đơn, hủy hóa đơn, xóa hóa đơn…\r\n\r\n- Với chức năng này, EasyBooks có thể hỗ trợ tối đa cho bộ phận kế toán doanh nghiệp trong việc quản lý, tra cứu, lưu trữ hóa đơn.\r\n\r\n\r\n12. Tích hợp hóa đơn điện tử\r\n\r\nNhằm khắc phục những bất cập trong việc sử dụng hóa đơn giấy và kế toán truyền thống, Easybooks được xây dựng để dễ dàng tích hợp với các hệ thống hóa đơn điện tử. Thay vì, vừa sử dụng phần mềm kế toán vừa sử dụng hệ thống hóa đơn điện tử độc lập, thì giờ đây với EasyBooks người dùng chỉ cần nhập liệu 1 lần trên phần mềm kế toán, dữ liệu tự động đồng bộ lên hệ thống hóa đơn điện tử được kết nối đến.\r\n\r\nTích hợp hóa đơn điện tử với phần mềm kế toán mang lại hiệu quả cao trong công việc, tiết kiệm thời gian, chi phí cũng như dễ dàng lưu trữ và bảo mật, thuận tiện trong việc đối chiếu số sách, chứng từ… Sự kết hợp này sẽ là một bước tiến mạnh mẽ, nâng cao hiệu quả kinh doanh trong xu thế hội nhập hiện nay.\r\n\r\nPhần mềm kế toán EasyBooks cho phép người dùng người dùng có thể thực hiện mọi thao tác liên quan đến nghiệp vụ hóa đơn điện tử như:\r\n\r\n- Thực hiện lập và phát hành hóa đơn ngay trên phần mềm\r\n\r\n- Chuyển đổi hóa đơn điện tử sang hóa đơn giấy\r\n\r\n- Thực hiện xóa hóa đơn và lập hóa đơn thay thế\r\n\r\n- Dễ dàng gửi hóa đơn cho khách qua Email\r\n\r\n- Quản lý, tra cứu hóa đơn điện tử xem và lập các báo cáo về hóa đơn điện tử\r\n\r\n- Ngoài ra, còn nhiều tiện ích hỗ trợ nghiệp vụ hóa đơn điện tử khác.\r\n\r\n\r\n13. Thuế\r\n\r\n- Phân hệ Thuế hỗ trợ người dùng lập tờ khai thuế cho cả 2 trường hợp nộp thuế theo phương pháp khấu trừ và trực tiếp trên doanh thu\r\n\r\n- Tự động lập cùng các phụ lục cần thiết, kết xuất tờ khai sang định dạng XML để nộp điện tử\r\n\r\n- Lập tờ khai thuế GTGT, thuế TNDN, thuế tài nguyên… theo định kỳ tháng hoặc quý, đáp ứng cho cả 2 phương pháp kê khai thuế khấu trừ và trực tiếp\r\n\r\n- Hỗ trợ lập bảng kê Hàng hóa dịch vụ mua vào và bán ra, cùng các phụ lục khác…\r\n\r\n- Hệ thống mẫu biểu khai thuế cập nhật theo các thông tư bổ sung mới nhất cho TT133\r\n\r\n- Kết xuất dữ liệu dễ dàng để kê khai điện tử và quản lý nội bộ\r\n\r\n- Bổ sung chức năng Khấu trừ thuế và Nộp thuế cho các tờ khai đã lập', NULL, '2026-06-13 08:43:37'),
(8, 7, 'Hệ thống quản lý phân phối', 'Viettel DMS là một hệ thống quản lý phân phối trực tuyến được phát triển bởi Viettel, nhằm hỗ trợ doanh nghiệp tối ưu hóa hoạt động bán hàng, tăng hiệu quả kinh doanh và nâng cao năng lực cạnh tranh trên thị trường.\r\n\r\nViettel DMS là gì?\r\n\r\nNói một cách đơn giản, Viettel DMS là một công cụ giúp doanh nghiệp quản lý toàn bộ quá trình bán hàng, từ việc lên kế hoạch, theo dõi đơn hàng, quản lý nhân viên bán hàng cho đến việc phân tích dữ liệu thị trường. Hệ thống này hoạt động dựa trên nền tảng công nghệ đám mây, cho phép người dùng truy cập và sử dụng mọi lúc mọi nơi thông qua các thiết bị di động hoặc máy tính.\r\n\r\nTại sao nên chọn Viettel DMS?\r\n\r\n- Tăng hiệu quả quản lý: Viettel DMS giúp doanh nghiệp theo dõi sát sao hoạt động của nhân viên bán hàng, từ đó đánh giá hiệu quả công việc và đưa ra các quyết định điều chỉnh kịp thời.\r\n\r\n- Nâng cao năng suất bán hàng: Với các tính năng hỗ trợ như lên kế hoạch bán hàng, quản lý khách hàng, đơn hàng, Viettel DMS giúp nhân viên bán hàng tập trung vào các hoạt động cốt lõi, tăng năng suất làm việc.\r\n\r\n- Cải thiện chất lượng dịch vụ khách hàng: Viettel DMS cung cấp các công cụ để quản lý thông tin khách hàng, lịch sử giao dịch, giúp doanh nghiệp phục vụ khách hàng tốt hơn và xây dựng lòng trung thành.\r\n\r\n- Quyết định dựa trên dữ liệu: Hệ thống cung cấp các báo cáo chi tiết về doanh số, thị phần, hành vi khách hàng, giúp doanh nghiệp đưa ra các quyết định kinh doanh chính xác dựa trên dữ liệu thực tế.', 'Các tính năng chính của Viettel DMS\r\n\r\n- Quản lý kế hoạch bán hàng: Lên kế hoạch bán hàng chi tiết, theo dõi tiến độ thực hiện.\r\n\r\n- Quản lý khách hàng: Quản lý thông tin khách hàng, lịch sử giao dịch, phân khúc khách hàng.\r\n\r\n- Quản lý đơn hàng: Tạo, quản lý và theo dõi đơn hàng từ khi tiếp nhận đến khi giao hàng.\r\n\r\n- Quản lý hàng tồn: Kiểm soát hàng tồn kho, tránh tình trạng thiếu hàng hoặc tồn kho quá nhiều.\r\n\r\n- Quản lý nhân viên bán hàng: Theo dõi vị trí, hoạt động của nhân viên bán hàng, đánh giá hiệu quả công việc.\r\n\r\n- Báo cáo và phân tích: Cung cấp các báo cáo chi tiết về doanh số, thị phần, hiệu quả bán hàng.', NULL, '2026-06-13 08:45:49'),
(9, 8, 'Nền tảng chuyển đổi số cho doanh nghiệp', 'Viettel Cyber Work là giải pháp quản lý tự động hóa quy trình, công việc và kho lưu trữ tài liệu, cung cấp các giải pháp quản trị và điều hành doanh nghiệp đơn giản, từ xa, trên một nền tảng, ứng dụng tinh hoa của các mô hình quản lý nổi tiếng trên thế giới, giúp các doanh nghiệp 4.0 tối ưu hiệu quả quản lý và vận hành, tăng hiệu suất làm việc nhân sự.\r\n\r\n\r\n1. Số hóa mọi quy trình - thủ tục, tự động hóa các tác vụ\r\n\r\nMọi quy trình nghiệp vụ thực tế của doanh nghiệp giờ đây sẽ được số hoá và quản lý, xóa bỏ các quy trình xét duyệt thủ công, giúp theo dõi, kiểm soát tiến độ công việc mọi lúc, mọi nơi, tại mọi thời điểm.\r\n\r\n\r\n2. Quản lý tập trung và đo lường hiệu suất\r\n\r\nLãnh đạo doanh nghiệp có thể điều hành công việc từ xa, mọi lúc mọi nơi, quản lý công việc đã giao một cách rõ ràng, minh bạch. Bên cạnh đó, lãnh đạo cũng nắm bắt được thông tin và đưa ra quyết định nhanh chóng và chính xác.\r\n\r\n\r\n3. Chia sẻ thông tin\r\n\r\nTài liệu, công việc, hồ sơ… sẽ được tiếp cận chỉ qua một lần đăng nhập vào hệ thống. Tại đây, mọi người có thể dễ dàng trao đổi ý kiến, chia sẻ thông tin một cách đầy đủ, nhanh chóng, kịp thời.\r\n\r\n\r\n4. Tiết kiệm thời gian, chi phí\r\n\r\nNgười dùng có thể truy cập phần mềm mọi lúc, mọi nơi, từ bất kỳ thiết bị nào có kết nối internet để tác nghiệp, xử lý công việc. Giảm thời gian xử lý công việc tối đa, tiết kiệm nhân lực, chi phí.\r\n\r\n\r\n5. Tích hợp công nghệ xử lý thông minh AX OCR\r\n\r\nCông nghệ nhận dạng, xử lý ngôn ngữ tự nhiên, xử lý dữ liệu lớn với độ chính xác tới 98%. Việc ứng dụng các công nghệ này vào phần mềm Viettel Cyber Work giúp công việc quản lý, biên soạn lại các tài liệu dạng ảnh, tìm kiếm tài liệu trở nên đơn giản và thuận tiện.\r\n\r\n\r\n6. Giao diện thân thiện, dễ dàng tích hợp\r\n\r\nViettel Cyber Work cung cấp đầy đủ tính năng cần thiết và linh hoạt trong phát triển và mở rộng tính năng, giúp doanh nghiệp vận hành hiệu quả. Giao diện Viettel Cyber Work thân thiện, đơn giản trong thao tác, không cần tốn quá nhiều thời gian để thích nghi và làm quen.', '1. Quản trị hệ thống - Thiết lập, cài đặt không giới hạn các nhóm quyền trong hệ thống\r\n\r\n● Cập nhật thông tin mô hình doanh nghiệp bằng báo cáo thống kê số lượng người dùng, số lượng các phòng ban và lịch sử truy cập của từng nhân viên.\r\n\r\n● Dễ dàng trao quyền quản lý cho từng cá nhân, nhóm người, phòng ban cụ thể.\r\n\r\n● Thiết lập người dùng, nhóm người, các phòng ban mới nhanh chóng khi doanh nghiệp phát triển, mở rộng.\r\n\r\n● Nắm bắt thông tin chức vụ của từng cá nhân trong doanh nghiệp, dễ dàng trong phân chia công việc và giao tiếp nội bộ\r\n\r\n\r\n2. Quy trình thủ tục - Chuẩn hóa quy trình, kết nối tất cả người dùng trên một hệ thống duy nhất\r\n\r\n● Số hoá toàn bộ quy trình - thủ tục, các form thông tin và biểu mẫu thực tế của doanh nghiệp trên 1 hệ thống\r\n\r\n● Quy trình xử lý linh hoạt cho phép tạo lập quy trình đường thẳng, rẽ nhánh, hoặc tạo quy trình con nằm trong quy trình lớn\r\n\r\n● Đặt điều kiện xử lý tự động tại mỗi bước của quy trình và tích hợp chữ ký số nội bộ giúp tiết kiệm thời gian phê duyệt, xử lý công việc\r\n\r\n● Báo cáo, giám sát chi tiết công việc theo thời gian thực, tự động cảnh báo, nhắc nhở trạng thái thực hiện\r\n\r\n\r\n3. Quản lý công việc - Quản lý công việc tập trung và duy nhất trên một nền tảng\r\n\r\n● Giao việc 1:1, giao việc theo quy trình, giao việc theo nhóm công việc và dự án\r\n\r\n● Trao đổi công việc, cập nhật, kiểm soát tiến độ theo thời gian thực\r\n\r\n● Báo cáo công việc trực quan, khoa học đồng thời hỗ trợ xuất báo cáo ra file excel\r\n\r\n● Thống kê & đo lường chính xác hiệu suất công việc, phục vụ công tác quản lý\r\n\r\n\r\n4. Quản lý kho tài liệu - Thông tin tài liệu bạn cần chỉ qua một cú nhấp chuột\r\n\r\n● Cho phép kết nối máy scan để đẩy trực tiếp tài liệu từ máy scan lên hệ thống hoặc đồng bộ trực tiếp thư mục tài liệu trong máy tính lên hệ thống.\r\n\r\n● Tìm kiếm tài liệu dễ dàng theo chế độ tìm kiếm nâng cao, tìm theo từ khóa\r\n\r\n● Cho phép đính kèm tài liệu liên quan, tạo ghi chú trên tài liệu, lưu lại lịch sử các phiên bản chỉnh sửa thuận tiện cho việc tra cứu, sử dụng và làm việc chung trên cùng một tài liệu\r\n\r\n● Bảo mật tài liệu lưu trữ nhờ cơ chế phân quyền chi tiết và cho phép đặt password cho từng file/ folder', NULL, '2026-06-13 08:48:00'),
(10, 10, 'Thông minh - Hiệu quả - Tiện lợi', 'Tendoo là dịch vụ được đánh giá là một giải pháp quản lý bán hàng phù hợp với nhiều loại hình kinh doanh tại Việt Nam, từ cửa hàng nhỏ lẻ đến các chuỗi cửa hàng. Dịch vụ này được thiết kế để đáp ứng nhu cầu quản lý bán hàng đa dạng của các cửa hàng và doanh nghiệp thuộc nhiều lĩnh vực khác nhau.\r\n\r\nDịch vụ Tendoo ra đời đã mang lại nhiều lợi ích cho doanh nghiệp như:\r\n\r\n- Tiết kiệm thời gian và chi phí: Quản lý tập trung mọi hoạt động bán hàng trên một nền tảng duy nhất, giảm thiểu việc sử dụng nhiều công cụ khác nhau.\r\n\r\n- Tăng hiệu quả quản lý: Dễ dàng theo dõi và kiểm soát tình hình kinh doanh, quản lý kho hàng chính xác, tránh thất thoát.\r\n\r\n- Nắm bắt dữ liệu kinh doanh: Các báo cáo chi tiết giúp đưa ra quyết định kinh doanh nhanh chóng và chính xác hơn.\r\n\r\n- Nâng cao trải nghiệm khách hàng: Phản hồi nhanh chóng, quản lý đơn hàng chuyên nghiệp, cung cấp nhiều phương thức thanh toán tiện lợi.\r\n\r\n- Mở rộng kênh bán hàng: Dễ dàng tiếp cận và quản lý khách hàng trên nhiều nền tảng trực tuyến.', '1. Mở rộng đa kênh\r\n\r\n- Bán hàng online: Tạo website, catalog bán hàng chuyên nghiệp chỉ trong 2 phút trên di động.\r\n\r\n- Kết nối sàn TMĐT: Cập nhật tồn kho, giá bán trên Shopee, TiktokShop, Lazada và xuất hoá đơn tự động.\r\n\r\n- Kết nối Facebook, Zalo OA: Thuận tiện chăm sóc khách hàng và tăng nhận diện thương hiệu.\r\n\r\n- Tích hợp đa kênh: Đồng bộ thông tin và đơn hàng từ tất cả các kênh trên một nền tảng duy nhất.\r\n    \r\n    Quản lý lãi lỗ - công nợ\r\n\r\n- Nắm rõ doanh thu, chi phí bán hàng: Tạo website, catalog bán hàng chuyên nghiệp chỉ trong 2 phút trên di động\r\n\r\n- Trợ lý AI phân tích lãi lỗ thông minh: Theo dõi hiệu quả, chính xác, giúp tối ưu quản lý tài chính\r\n\r\n- Thu hồi công nợ: Theo dõi và tự động gửi nhắc nợ đến khách hàng, thu tiền về nhanh chóng\r\n\r\n- Đối soát tự động: Tích hợp đối soát với tài khoản cá nhân không cần tải sao kê ngân hàng\r\n\r\n- Thông báo tiền về qua loa tiện lợi: Kết nối dễ dàng, biết trạng thái thanh toán mà không cần kiểm tra điện thoại\r\n\r\nVà nhiều tính năng khác hỗ trợ doanh nghiệp như:\r\n\r\n- Tích điểm khách hàng: Giúp giữ chân khách hàng, tăng trưởng doanh thu\r\n\r\n- Kết nối thiết bị: Hỗ trợ in hoá đơn, quét mã, in tem món, in bếp\r\n\r\n- Quản lý ca: Điều phối nhân viên, kiểm tra hiệu suất ca làm\r\n\r\n- In tem mã vạch: Quản lý hàng hóa chính xác, tránh thất thoát\r\n\r\n- Đặt bàn: Tăng doanh thu giờ cao điểm, tránh lãng phí chỗ\r\n\r\n- Khuyến mãi: Thu hút khách hàng mới, kích thích chi tiêu\r\n\r\n- Quản lý kho: Giảm tồn kho dư thừa, tiết kiệm chi phí lưu kho\r\n\r\nCông nợ: Nhắc nợ tự động, thu hồi nhanh, tránh thất thoát', NULL, '2026-06-14 08:08:36'),
(11, 11, 'Quảng cáo và chăm sóc khách hàng đa kênh', 'Tendoo Marketing là nền tảng marketing số đa kênh cung cấp giải pháp quảng cáo và chăm sóc khách hàng toàn diện cho hộ kinh doanh và doanh nghiệp. Nền tảng cho phép người dùng tạo, quản lý và đo lường hiệu quả chiến dịch truyền thông trên một hệ thống tập trung, hỗ trợ triển khai qua nhiều kênh như SMS, ZNS, Email và các kênh số khác.\r\n\r\nTendoo Marketing mang lại các giá trị chính:\r\n\r\n● Dễ dàng triển khai và quản lý chiến đa kênh trên một nền tảng mà không cần đội ngũ kỹ thuật chuyên sâu.\r\n\r\n● Khai thác tập khách hàng Viettel tiếp cận khách hàng tiềm năng chính xác.\r\n\r\n● Tự động hóa hoạt động truyền thông và chăm sóc khách hàng theo kịch bản.\r\n\r\n● Đo lường hiệu quả chiến dịch dựa trên dữ liệu toàn trình.\r\n\r\nVới định hướng trở thành nền tảng marketing và chăm sóc khách hàng toàn diện, Tendoo Marketing giúp doanh nghiệp nâng cao hiệu quả truyền thông và mở rộng khả năng tăng trưởng trong kỷ nguyên kinh doanh số.', 'Quản lý chiến dịch Marketing & CSKH đa kênh\r\n\r\nTạo, triển khai và theo dõi chiến dịch truyền thông, chăm sóc khách hàng trên một nền tảng duy nhất, lựa chọn kênh, nội dung và thời điểm gửi linh hoạt.\r\n\r\nTiếp cận khách hàng tiềm năng chính xác\r\n\r\nKhai thác tệp khách hàng Viettel theo các tiêu chí phù hợp, kết hợp triển khai đa kênh để tiếp cận đúng đối tượng và tối ưu hiệu quả cho từng chiến dịch quảng bá.\r\n\r\nTự động hóa Marketing & CSKH\r\n\r\nThiết lập kịch bản gửi thông báo, nhắc lịch, chăm sóc định kỳ, quảng bá sản phẩm hoặc khuyến mãi tự động theo hành vi và thời điểm phù hợp.\r\n\r\nBáo cáo và đo lường hiệu quả\r\n\r\nCung cấp dữ liệu về trạng thái gửi, chi phí và hiệu quả tương tác, hỗ trợ tối ưu hoạt động truyền thông.', NULL, '2026-06-14 08:08:36'),
(12, 12, 'Ký kết tiện lợi và Số hóa quy trình nội bộ', 'SẢN PHẨM sCONTRACT LÀ GÌ?\r\n\r\nHợp đồng điện tử Viettel (sContract) cho phép doanh nghiệp quản lý và ký số các loại hợp đồng, tài liệu với khách hàng, đối tác qua internet. Hợp đồng điện tử Viettel đáp ứng các quy định của pháp luật và là giải pháp thay thế hợp đồng giấy hiệu quả, có giá trị pháp lý như việc ký kết hợp đồng giấy theo phương thức truyền thống.\r\n\r\n\r\n\r\nƯU ĐIỂM VƯỢT TRỘI\r\n\r\n· Miễn phí data với thuê bao Viettel khi truy cập ứng dụng trên di động.\r\n\r\n· Đa dạng hình thức ký kết: chữ ký số USB Token, MySign, OTP.\r\n\r\n· Quy trình tạo lập, ký kết đơn giản, nhanh chóng.\r\n\r\n· Kho hợp đồng mẫu đa dạng, miễn phí.\r\n\r\n· Sẵn sàng tích hợp với các phần mềm lớn.\r\n\r\n· Ưu đãi SMS Brandname và eKYC giá tốt nhất thị trường.', '1. TÍNH NĂNG CƠ BẢN\r\n\r\nKhởi tạo và ký hợp đồng\r\n\r\n• Khởi tạo hợp đồng đơn lẻ/ theo lô thuận tiện nhanh chóng\r\n\r\n• Thiết lập luồng ký linh hoạt: ký tuần tự, song song…\r\n\r\n• Ký kết hợp đồng với đa dạng phương thức ký ( ký số/OTP/eKYC+OTP)\r\n\r\n• Dễ dàng theo dõi tiến trình ký kết hợp đồng qua email/SMS\r\n\r\nQuản lý và lưu trữ hợp đồng\r\n\r\n• Dễ dàng quản lý hợp đồng theo tiến trình ký kết\r\n\r\n• Đa dạng báo cáo các loại hợp đồng\r\n\r\n• Tổ chức sắp xếp, lưu trữ, phân loại hợp đồng cho phép tra cứu dễ dàng\r\n\r\n\r\n2. QUY TRÌNH LẬP VÀ KÝ HỢP ĐỒNG\r\n\r\nNgười Lập Hợp đồng\r\n\r\n· Upload file hợp đồng/chọn hợp đồng từ mẫu.\r\n\r\n· Thiết lập các bên tham gia và thứ tự phê duyệt, ký kết.\r\n\r\n· Trình ký  hợp đồng.\r\n\r\nNgười Phê Duyệt\r\n\r\n· Hệ thống gửi thông báo hợp đồng cần phê duyệt đến người phê duyệt qua email/SMS.\r\n\r\n· Duyệt trước nội dung.\r\n\r\nNgười Ký\r\n\r\n· Hệ thống gửi thông báo hợp đồng cần ký đến người ký qua email/SMS.\r\n\r\n· Thực hiện ký bằng OTP hoặc Chữ ký số.\r\n\r\nHoàn Thành Hợp đồng\r\n\r\n· Hệ thống gửi thông báo hợp đồng hoàn thành cho các bên.\r\n\r\n· Hợp đồng được mã hóa và lưu trữ.', NULL, '2026-06-14 08:08:36'),
(14, 14, '10h kém 7 ', 'si lùn', '', '', '2026-06-22 03:13:06');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_packages`
--

CREATE TABLE `product_packages` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `package_name` varchar(255) NOT NULL,
  `quantity` int(11) DEFAULT 0,
  `duration_time` varchar(100) DEFAULT NULL,
  `setup_fee` decimal(15,2) DEFAULT 0.00,
  `total_price` decimal(15,2) DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_packages`
--

INSERT INTO `product_packages` (`id`, `product_id`, `package_name`, `quantity`, `duration_time`, `setup_fee`, `total_price`, `created_at`) VALUES
(1, 3, 'vContract gói 10.000 hợp đồng', 10000, '12 tháng', 0.00, 41040000.00, '2026-06-13 12:14:10'),
(2, 3, 'vContract gói 5.000 hợp đồng', 5000, '12 tháng', 0.00, 21600000.00, '2026-06-13 12:14:10'),
(3, 3, 'vContract gói 1.000 hợp đồng', 1000, '12 tháng', 0.00, 5076000.00, '2026-06-13 12:14:10'),
(4, 1, 'Gói 100 chừng từ khấu trừ thuế TNCN', 100, 'Không giới hạn', 140000.00, 140000.00, '2026-06-13 13:47:56'),
(5, 1, 'Gói 100 hóa đơn điện tử', 100, '6 tháng', 140000.00, 140000.00, '2026-06-13 13:47:56'),
(6, 1, 'Gói 100 hóa đơn đại trà', 100, 'Không giới hạn', 140000.00, 140000.00, '2026-06-13 13:47:56'),
(7, 1, 'Phí khởi tạo', 0, 'Không giới hạn', 0.00, 500000.00, '2026-06-13 13:47:56'),
(8, 1, 'Phí khởi tạo', 0, 'Không giới hạn', 0.00, 1000000.00, '2026-06-13 13:47:56'),
(9, 1, 'Phí khởi tạo', 0, 'Không giới hạn', 0.00, 2000000.00, '2026-06-13 13:47:56'),
(10, 2, 'Gói cước MySign 1 năm cho Doanh nghiệp', 100, '12 tháng', 245000.00, 1570000.00, '2026-06-13 13:54:07'),
(11, 2, 'Gói cước MySign 2 năm cho Doanh nghiệp', 100, '24 tháng', 245000.00, 2650000.00, '2026-06-13 13:54:07'),
(12, 2, 'Gói cước MySign 3 năm cho Doanh nghiệp', 100, '36 tháng', 0.00, 3136000.00, '2026-06-13 13:54:07'),
(13, 2, 'Gói MySign Doanh nghiệp 3 tháng ', 50, '3 tháng', 0.00, 0.00, '2026-06-13 13:54:07'),
(14, 5, 'Gói BASIC quy mô từ 21 - 50 nhân sự', 50, '12 tháng', 11000.00, 6590000.00, '2026-06-13 14:04:02'),
(15, 5, 'Gói BASIC quy mô từ 11 - 20 nhân sự', 20, '12 tháng', 13500.00, 3690000.00, '2026-06-13 14:04:02'),
(16, 2, 'Gói PREMIUM khối HC từ 50 - 100 nhân sự', 50, '12 tháng', 235000.00, 18100000.00, '2026-06-13 14:04:02'),
(17, 5, 'Gói PREMIUM khối HC từ 101 - 200 nhân sự', 50, '12 tháng', 22500.00, 33270000.00, '2026-06-13 14:04:02'),
(18, 5, 'Gói PREMIUM khối HC từ 200 - 499 nhân sự', 10, '12 tháng', 12000.00, 35300000.00, '2026-06-13 14:04:02'),
(20, 5, 'Gói STANDARD quy mô từ 200 - 299 nhân sự', 50, '12 tháng', 3000.00, 12000000.00, '2026-06-13 14:05:55'),
(21, 5, 'Gói STANDARD quy mô từ 500 nhân sự', 50, '12 tháng', 2000.00, 22000000.00, '2026-06-13 14:05:55'),
(22, 6, 'Gói Easybooks 1 năm 5000 chứng từ thông tư 133', 5000, '12 tháng', 1000000.00, 3000000.00, '2026-06-13 14:13:19'),
(23, 6, 'Gói Easybooks 1 năm 5000 chứng từ thông tư 200', 5000, '12 tháng', 1000000.00, 3000000.00, '2026-06-13 14:13:19'),
(24, 6, 'Gói Easybooks 2 năm 5000 chứng từ thông tư 200', 5000, '24 tháng', 1000000.00, 4600000.00, '2026-06-13 14:13:19'),
(25, 6, 'Gói Easybooks 2 năm 5000 chứng từ thông tư 133', 5000, '24 tháng', 1000000.00, 4600000.00, '2026-06-13 14:13:19'),
(26, 6, 'Gói Easybooks 3 năm 5000 chứng từ thông tư 133', 5000, '36 tháng', 1000000.00, 6100000.00, '2026-06-13 14:13:19'),
(27, 6, 'Gói Easybooks 3 năm 5000 chứng từ thông tư 200', 5000, '36 tháng', 1000000.00, 6100000.00, '2026-06-13 14:13:19'),
(28, 7, 'Gói cước Viettel DMS cơ bản 3 tháng', 100, '3 tháng', 0.00, 235440.00, '2026-06-14 08:17:14'),
(29, 7, 'Gói cước Viettel DMS cơ bản 6 tháng', 100, '6 tháng', 0.00, 412560.00, '2026-06-14 08:17:14'),
(30, 7, 'Gói cước Viettel DMS cơ bản 12 tháng', 100, '12 tháng', 0.00, 707400.00, '2026-06-14 08:17:14'),
(31, 7, 'Gói cước Viettel dùng thử 30 ngày', 100, '1 tháng', 0.00, 0.00, '2026-06-14 08:17:14'),
(32, 9, 'Quản lý tài nguyên chung', 50, '12 tháng', 0.00, 528000.00, '2026-06-14 08:22:42'),
(33, 9, 'Quy trình di động', 50, '12 tháng', 0.00, 528000.00, '2026-06-14 08:22:42'),
(34, 9, 'Quản lý văn bản đi - đến', 50, '12 tháng', 0.00, 396000.00, '2026-06-14 08:22:42'),
(35, 9, 'Workspace (Không gian làm việc số)', 50, '12 tháng', 0.00, 132000.00, '2026-06-14 08:22:42'),
(36, 9, 'Quản lý công việc lịch trình làm việc', 50, '12 tháng', 0.00, 396000.00, '2026-06-14 08:22:42'),
(37, 9, 'Khảo sát ý kiến', 50, '12 tháng', 0.00, 198000.00, '2026-06-14 08:22:42'),
(38, 10, 'Gói quản lý bán hàng 1 năm tặng 3 tháng', 200, '15 tháng', 0.00, 1944000.00, '2026-06-14 08:29:10'),
(39, 10, 'Gói quản lý bán hàng 2 năm tặng 6 tháng', 200, '30 tháng', 0.00, 3693600.00, '2026-06-14 08:29:10'),
(40, 10, 'Gói quản lý bán hàng 3 năm tặng 9 tháng', 200, '45 tháng', 0.00, 5248800.00, '2026-06-14 08:29:10'),
(41, 10, 'Gói 1 năm DVQLBH', 100, '12 tháng', 0.00, 785000.00, '2026-06-14 08:29:10'),
(42, 10, 'Gói 2 năm DVQLBH', 200, '24 tháng', 0.00, 1423000.00, '2026-06-14 08:29:10'),
(43, 10, 'Gói 3 năm DVQLBH', 200, '36 tháng', 0.00, 1963000.00, '2026-06-14 08:29:10'),
(44, 11, 'Gói 3TM3', 100, '12 tháng', 0.00, 18000000.00, '2026-06-14 08:34:58'),
(45, 11, 'Gói 3TM2', 100, '12 tháng', 0.00, 3600000.00, '2026-06-14 08:34:58'),
(46, 11, 'Gói 3TM1', 100, '12 tháng', 0.00, 1800000.00, '2026-06-14 08:34:58'),
(47, 11, 'Gói lẻ 500.000Đ', 100, '12 tháng', 0.00, 500000.00, '2026-06-14 08:34:58'),
(48, 11, 'Gói lẻ 200.000Đ', 100, '12 tháng', 0.00, 200000.00, '2026-06-14 08:34:58'),
(49, 11, 'Gói dùng thử', 100, '15 ngày', 0.00, 0.00, '2026-06-14 08:34:58'),
(50, 12, 'sContract gói 10000 hợp đồng', 2000, '12 tháng', 0.00, 41040000.00, '2026-06-14 08:39:55'),
(51, 12, 'sContract gói 5000 hợp đồng', 2000, '12 tháng', 0.00, 21600000.00, '2026-06-14 08:39:55'),
(52, 12, 'sContract gói 1000 hợp đồng', 2000, '12 tháng', 0.00, 5076000.00, '2026-06-14 08:39:55'),
(53, 12, 'sContract gói 500 hợp đồng', 1000, '12 tháng', 0.00, 2754000.00, '2026-06-14 08:39:55'),
(54, 12, 'sContract gói 100 hợp đồng', 1000, '12 tháng', 0.00, 594000.00, '2026-06-14 08:39:55'),
(55, 12, 'sCotract gói hợp đồng dùng thử', 1000, '12 tháng', 0.00, 0.00, '2026-06-14 08:39:55');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `statistics`
--

CREATE TABLE `statistics` (
  `id` int(11) NOT NULL,
  `number` varchar(50) NOT NULL,
  `label` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `statistics`
--

INSERT INTO `statistics` (`id`, `number`, `label`, `description`, `icon`, `sort_order`, `is_active`, `created_at`) VALUES
(1, '2000+', 'Giờ', 'Phát triển', 'bar-chart', 0, 1, '2026-06-21 16:57:22'),
(2, '4.231+', 'Khách hàng', 'sử dụng', 'users', 1, 1, '2026-06-21 16:57:22'),
(3, '15+', 'Giải Thưởng', 'Đã nhận', 'map-pin', 2, 1, '2026-06-21 16:57:22'),
(4, '9+', 'Sản phẩm', 'Dịch vụ', 'star', 3, 1, '2026-06-21 16:57:22');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` varchar(100) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `quote` text DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT 5.0,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `role`, `avatar`, `quote`, `rating`, `sort_order`, `is_active`, `created_at`) VALUES
(1, 'Nguyễn Văn An', 'Giám đốc', 'images/feedback_2.png', 'Đội ngũ bán hàng và CSKH của Viettel rất nhiệt tình, hỗ trợ 24/7. Khi sử dụng dịch vụ của Viettel chúng tôi rất an tâm.', 5.0, 0, 1, '2026-06-21 16:57:22'),
(2, 'Trần Thị Bình', 'Chủ doanh nghiệp', 'images/feedback_3.png', 'Các giải pháp số của Viettel đã giúp doanh nghiệp chúng tôi tiết kiệm 40% chi phí vận hành.', 5.0, 1, 1, '2026-06-21 16:57:22'),
(3, 'Lê Văn Cường', 'Chủ cửa hàng', 'images/feedback_3.png', 'Phần mềm quản lý bán hàng Tendoo rất dễ sử dụng, giúp tôi quản lý cửa hàng hiệu quả hơn.', 4.0, 2, 1, '2026-06-21 16:57:22');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Chỉ mục cho bảng `consultations`
--
ALTER TABLE `consultations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `product_details`
--
ALTER TABLE `product_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `product_packages`
--
ALTER TABLE `product_packages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `statistics`
--
ALTER TABLE `statistics`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `consultations`
--
ALTER TABLE `consultations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `partners`
--
ALTER TABLE `partners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `product_details`
--
ALTER TABLE `product_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `product_packages`
--
ALTER TABLE `product_packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT cho bảng `statistics`
--
ALTER TABLE `statistics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Các ràng buộc cho bảng `product_details`
--
ALTER TABLE `product_details`
  ADD CONSTRAINT `product_details_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `product_packages`
--
ALTER TABLE `product_packages`
  ADD CONSTRAINT `product_packages_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
