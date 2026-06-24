<?php
$db = new mysqli('127.0.0.1', 'root', '', 'smeweb', 3306);
$db->set_charset('utf8mb4');

$db->query("CREATE TABLE IF NOT EXISTS staff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  position VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(100),
  avatar VARCHAR(255),
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci");

$db->query('TRUNCATE TABLE staff');

$staff = [
  ['Nguyễn Văn An', 'Giám đốc điều hành (CEO)', '0901 234 567', 'an.nguyen1@viettel.vn', 1],
  ['Trần Thị Bình', 'Phó giám đốc (COO)', '0902 345 678', 'binh.tran@viettel.vn', 2],
  ['Lê Văn Cường', 'Giám đốc Kỹ thuật (CTO)', '0903 456 789', 'cuong.le@viettel.vn', 3],
  ['Phạm Thị Dung', 'Giám đốc Tài chính (CFO)', '0904 567 890', 'dung.pham@viettel.vn', 4],
  ['Hoàng Văn Em', 'Trưởng phòng Kinh doanh', '0905 678 901', 'em.hoang@viettel.vn', 5],
  ['Ngô Thị Phương', 'Trưởng phòng Marketing', '0906 789 012', 'phuong.ngo@viettel.vn', 6],
  ['Đặng Văn Giàu', 'Trưởng phòng CSKH', '0907 890 123', 'giau.dang@viettel.vn', 7],
  ['Vũ Thị Hạnh', 'Chuyên viên Kỹ thuật', '0908 901 234', 'hanh.vu@viettel.vn', 8],
  ['Bùi Văn Inh', 'Chuyên viên Kinh doanh', '0909 012 345', 'inh.bui@viettel.vn', 9],
  ['Đỗ Thị Kim', 'Chuyên viên Marketing', '0910 123 456', 'kim.do@viettel.vn', 10],
  ['Hồ Văn Lộc', 'Chuyên viên CSKH', '0911 234 567', 'loc.ho@viettel.vn', 11],
  ['Mai Thị Mỹ', 'Trợ lý hành chính', '0912 345 678', 'my.mai@viettel.vn', 12],
];

$stmt = $db->prepare('INSERT INTO staff (name, position, phone, email, sort_order) VALUES (?, ?, ?, ?, ?)');
foreach ($staff as $s) {
  $stmt->bind_param('ssssi', $s[0], $s[1], $s[2], $s[3], $s[4]);
  $stmt->execute();
}
echo "Created staff table + seeded " . count($staff) . " members\n";
