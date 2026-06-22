<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = rtrim($uri, '/');
$path = str_replace('/api', '', $uri);
$path = $path ?: '/';

$params = $_GET;

if ($method === 'GET') {
    switch (true) {
        case $path === '/banners':
            handleGetBanners();
            break;
        case $path === '/categories':
            handleGetCategories();
            break;
        case $path === '/testimonials':
            handleGetTestimonials();
            break;
        case $path === '/partners':
            handleGetPartners();
            break;
        case $path === '/statistics':
            handleGetStatistics();
            break;
        case preg_match('#^/products/(\d+)$#', $path, $m) === 1:
            handleGetProductDetail((int)$m[1]);
            break;
        case $path === '/products':
            if (isset($params['featured'])) {
                handleGetFeaturedProducts($params);
            } else {
                handleGetProducts($params);
            }
            break;
        case $path === '/admin/consultations':
            handleGetConsultations();
            break;
        case $path === '/admin/users':
            handleGetUsers();
            break;
        case preg_match('#^/admin/products/(\d+)$#', $path, $m) === 1:
            handleGetAdminProduct((int)$m[1]);
            break;
        case $path === '/admin/products':
            handleGetAdminProducts($params);
            break;
        default:
            jsonError('Not found', 404);
    }
} elseif ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? [];

    switch (true) {
        case $path === '/consultation':
            handleSubmitConsultation($input);
            break;
        case $path === '/auth/register':
            handleRegister($input);
            break;
        case $path === '/auth/login':
            handleLogin($input);
            break;
        case $path === '/auth/logout':
            handleLogout();
            break;
        case $path === '/auth/admin-login':
            handleAdminLogin($input);
            break;
        case $path === '/admin/products':
            handleCreateProduct($input);
            break;
        case preg_match('#^/admin/products/(\d+)/packages$#', $path, $m) === 1:
            handleCreatePackage((int)$m[1], $input);
            break;
        default:
            jsonError('Not found', 404);
    }
} elseif ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true) ?? [];

    if (preg_match('#^/admin/consultations/(\d+)$#', $path, $m) === 1) {
        handleUpdateConsultationStatus((int)$m[1], $input);
    } elseif (preg_match('#^/admin/products/(\d+)$#', $path, $m) === 1) {
        handleUpdateProduct((int)$m[1], $input);
    } elseif (preg_match('#^/admin/products/(\d+)/details$#', $path, $m) === 1) {
        handleUpdateProductDetails((int)$m[1], $input);
    } elseif (preg_match('#^/admin/packages/(\d+)$#', $path, $m) === 1) {
        handleUpdatePackage((int)$m[1], $input);
    } else {
        jsonError('Not found', 404);
    }
} elseif ($method === 'DELETE') {
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $path = rtrim($path, '/');
    $path = str_replace('/api', '', $path);
    $path = $path ?: '/';

    if (preg_match('#^/admin/products/(\d+)$#', $path, $m) === 1) {
        handleDeleteProduct((int)$m[1]);
    } elseif (preg_match('#^/admin/packages/(\d+)$#', $path, $m) === 1) {
        handleDeletePackage((int)$m[1]);
    } else {
        jsonError('Not found', 404);
    }
} else {
    jsonError('Method not allowed', 405);
}

// GET handlers

function handleGetBanners() {
    $db = getDB();
    $res = $db->query("SELECT id, image, title, link, sort_order FROM banners WHERE is_active = 1 ORDER BY sort_order ASC");
    $data = $res->fetch_all(MYSQLI_ASSOC);
    jsonResponse($data);
}

function handleGetCategories() {
    $db = getDB();
    $res = $db->query("SELECT id, name, slug, description FROM categories ORDER BY id ASC");
    $data = $res->fetch_all(MYSQLI_ASSOC);
    jsonResponse($data);
}

function handleGetTestimonials() {
    $db = getDB();
    $res = $db->query("SELECT id, name, role, avatar, quote, rating FROM testimonials WHERE is_active = 1 ORDER BY sort_order ASC");
    $data = $res->fetch_all(MYSQLI_ASSOC);
    jsonResponse($data);
}

function handleGetPartners() {
    $db = getDB();
    $res = $db->query("SELECT id, name, logo, url FROM partners WHERE is_active = 1 ORDER BY sort_order ASC");
    $data = $res->fetch_all(MYSQLI_ASSOC);
    jsonResponse($data);
}

function handleGetProducts($params) {
    $db = getDB();
    $where = [];

    if (!empty($params['category_id'])) {
        $catId = (int)$params['category_id'];
        $where[] = "p.category_id = $catId";
    }
    if (!empty($params['category'])) {
        $catName = $db->real_escape_string($params['category']);
        $where[] = "c.name = '$catName'";
    }
    if (!empty($params['search'])) {
        $search = $db->real_escape_string($params['search']);
        $where[] = "p.name LIKE '%$search%'";
    }

    $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

    $countRes = $db->query("SELECT COUNT(*) as total FROM products p LEFT JOIN categories c ON p.category_id = c.id $whereClause");
    $total = (int)$countRes->fetch_assoc()['total'];

    $limit = !empty($params['limit']) ? min((int)$params['limit'], 100) : 12;
    $page = !empty($params['page']) ? max(1, (int)$params['page']) : 1;
    $offset = ($page - 1) * $limit;

    $sql = "SELECT p.id, p.category_id, p.name, p.slug, p.short_description, p.image, p.developer, p.rating, p.is_featured, c.name as category_name
            FROM products p LEFT JOIN categories c ON p.category_id = c.id
            $whereClause ORDER BY p.id ASC LIMIT $limit OFFSET $offset";
    $res = $db->query($sql);
    $data = $res->fetch_all(MYSQLI_ASSOC);
    jsonResponse(['data' => $data, 'total' => $total]);
}

function handleGetFeaturedProducts($params) {
    $db = getDB();
    $limit = !empty($params['limit']) ? (int)$params['limit'] : 8;
    $sql = "SELECT p.id, p.category_id, p.name, p.slug, p.short_description, p.image, p.developer, p.rating, p.is_featured, c.name as category_name
            FROM products p LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.is_featured = 1 ORDER BY p.id ASC LIMIT $limit";
    $res = $db->query($sql);
    $data = $res->fetch_all(MYSQLI_ASSOC);
    jsonResponse(['data' => $data, 'total' => count($data)]);
}

function handleGetStatistics() {
    $db = getDB();
    $res = $db->query("SELECT id, number, label, description, icon FROM statistics WHERE is_active = 1 ORDER BY sort_order ASC");
    $data = $res->fetch_all(MYSQLI_ASSOC);
    jsonResponse($data);
}

function handleGetProductDetail($id) {
    $db = getDB();
    $id = (int)$id;
    $res = $db->query("SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = $id");
    $product = $res->fetch_assoc();
    if (!$product) {
        jsonError('Product not found', 404);
    }
    $res = $db->query("SELECT * FROM product_details WHERE product_id = $id");
    $product['details'] = $res->fetch_all(MYSQLI_ASSOC);
    $res = $db->query("SELECT * FROM product_packages WHERE product_id = $id ORDER BY total_price ASC");
    $product['packages'] = $res->fetch_all(MYSQLI_ASSOC);
    jsonResponse($product);
}

function handleGetConsultations() {
    requireAdmin();
    $db = getDB();
    $res = $db->query("SELECT * FROM consultations ORDER BY created_at DESC");
    $data = $res->fetch_all(MYSQLI_ASSOC);
    jsonResponse($data);
}

function handleGetUsers() {
    requireAdmin();
    $db = getDB();
    $res = $db->query("SELECT id, name, email, phone, birthdate, address, created_at FROM users ORDER BY created_at DESC");
    $data = $res->fetch_all(MYSQLI_ASSOC);
    jsonResponse($data);
}

function requireAdmin() {
    $headers = array_change_key_case(getallheaders(), CASE_LOWER);
    $token = str_replace('Bearer ', '', $headers['authorization'] ?? '');
    if (!$token) jsonError('Unauthorized', 401);
    $db = getDB();
    $token = $db->real_escape_string($token);
    $res = $db->query("SELECT id, name FROM admins WHERE token = '$token'");
    $admin = $res->fetch_assoc();
    if (!$admin) jsonError('Unauthorized', 401);
    return $admin['id'];
}

// POST handlers

function handleSubmitConsultation($input) {
    $db = getDB();
    $name = $db->real_escape_string($input['name'] ?? '');
    $phone = $db->real_escape_string($input['phone'] ?? '');
    $email = $db->real_escape_string($input['email'] ?? '');
    $product = $db->real_escape_string($input['product'] ?? '');
    $message = $db->real_escape_string($input['message'] ?? '');

    if (!$name || !$phone) {
        jsonError('Họ tên và số điện thoại là bắt buộc', 400);
    }

    $db->query("INSERT INTO consultations (name, phone, email, product, message) VALUES ('$name', '$phone', '$email', '$product', '$message')");
    jsonResponse(['success' => true, 'message' => 'Gửi yêu cầu thành công!'], 201);
}

function handleRegister($input) {
    $db = getDB();
    $name = $db->real_escape_string($input['name'] ?? '');
    $email = $db->real_escape_string($input['email'] ?? '');
    $phone = $db->real_escape_string($input['phone'] ?? '');
    $password = $input['password'] ?? '';

    if (!$name || !$email || !$password) {
        jsonError('Họ tên, email và mật khẩu là bắt buộc', 400);
    }

    $check = $db->query("SELECT id FROM users WHERE email = '$email'");
    if ($check->fetch_assoc()) {
        jsonError('Email đã được đăng ký', 409);
    }

    $hash = password_hash($password, PASSWORD_BCRYPT);
    $token = bin2hex(random_bytes(32));

    $db->query("INSERT INTO users (name, email, phone, password, token) VALUES ('$name', '$email', '$phone', '$hash', '$token')");
    $userId = $db->insert_id;

    jsonResponse([
        'success' => true,
        'token' => $token,
        'user' => ['id' => $userId, 'name' => $name, 'email' => $email, 'phone' => $phone],
    ], 201);
}

function handleLogin($input) {
    $db = getDB();
    $email = $db->real_escape_string($input['email'] ?? '');
    $password = $input['password'] ?? '';

    if (!$email || !$password) {
        jsonError('Email và mật khẩu là bắt buộc', 400);
    }

    $res = $db->query("SELECT * FROM users WHERE email = '$email'");
    $user = $res->fetch_assoc();

    if (!$user || !password_verify($password, $user['password'])) {
        jsonError('Email hoặc mật khẩu không đúng', 401);
    }

    $token = bin2hex(random_bytes(32));
    $db->query("UPDATE users SET token = '$token' WHERE id = {$user['id']}");

    jsonResponse([
        'success' => true,
        'token' => $token,
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'phone' => $user['phone'],
        ],
    ]);
}

function handleAdminLogin($input) {
    $db = getDB();
    $email = $db->real_escape_string($input['email'] ?? '');
    $password = $input['password'] ?? '';

    if (!$email || !$password) {
        jsonError('Email và mật khẩu là bắt buộc', 400);
    }

    $res = $db->query("SELECT * FROM admins WHERE email = '$email'");
    $admin = $res->fetch_assoc();

    if (!$admin || !password_verify($password, $admin['password'])) {
        jsonError('Email hoặc mật khẩu không đúng', 401);
    }

    $token = bin2hex(random_bytes(32));
    $db->query("UPDATE admins SET token = '$token' WHERE id = {$admin['id']}");

    jsonResponse([
        'success' => true,
        'token' => $token,
        'user' => [
            'id' => $admin['id'],
            'name' => $admin['name'],
            'email' => $admin['email'],
        ],
    ]);
}

function handleLogout() {
    $headers = getallheaders();
    $token = str_replace('Bearer ', '', $headers['Authorization'] ?? '');
    if ($token) {
        $db = getDB();
        $token = $db->real_escape_string($token);
        $db->query("UPDATE users SET token = NULL WHERE token = '$token'");
    }
    jsonResponse(['success' => true]);
}

// PUT handlers

function handleUpdateConsultationStatus($id, $input) {
    $db = getDB();
    $id = (int)$id;
    $status = $db->real_escape_string($input['status'] ?? '');

    if (!in_array($status, ['pending', 'contacted', 'closed'])) {
        jsonError('Trạng thái không hợp lệ', 400);
    }

    $db->query("UPDATE consultations SET status = '$status' WHERE id = $id");
    if ($db->affected_rows === 0) {
        jsonError('Không tìm thấy yêu cầu tư vấn', 404);
    }

    jsonResponse(['success' => true]);
}

// ============================================
// ADMIN — Product CRUD
// ============================================

function saveBase64Image($image) {
    if (!preg_match('#^data:image/(\w+);base64,#i', $image, $m)) return $image;
    $ext = $m[1] === 'jpeg' ? 'jpg' : $m[1];
    $allowed = ['jpg','jpeg','png','gif','webp','svg'];
    if (!in_array($ext, $allowed)) return $image;
    $data = base64_decode(substr($image, strpos($image, ',') + 1));
    if ($data === false || strlen($data) > 2 * 1024 * 1024) return $image;
    $filename = time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
    file_put_contents(__DIR__ . '/../../frontend/images/' . $filename, $data);
    return $filename;
}

function handleGetAdminProducts($params) {
    requireAdmin();
    $db = getDB();
    $search = $db->real_escape_string($params['search'] ?? '');
    $where = $search ? "WHERE p.name LIKE '%$search%'" : '';
    $res = $db->query("SELECT p.id, p.category_id, p.name, p.slug, p.short_description, p.image, p.developer, p.rating, p.is_featured, c.name as category_name
                       FROM products p LEFT JOIN categories c ON p.category_id = c.id
                       $where ORDER BY p.id DESC");
    $data = $res->fetch_all(MYSQLI_ASSOC);
    jsonResponse(['data' => $data, 'total' => count($data)]);
}

function handleGetAdminProduct($id) {
    requireAdmin();
    $db = getDB();
    $id = (int)$id;
    $res = $db->query("SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = $id");
    $product = $res->fetch_assoc();
    if (!$product) jsonError('Product not found', 404);

    $res = $db->query("SELECT * FROM product_details WHERE product_id = $id");
    $product['details'] = $res->fetch_all(MYSQLI_ASSOC);

    $res = $db->query("SELECT * FROM product_packages WHERE product_id = $id ORDER BY total_price ASC");
    $product['packages'] = $res->fetch_all(MYSQLI_ASSOC);

    jsonResponse($product);
}

function handleCreateProduct($input) {
    requireAdmin();
    $db = getDB();
    $name = $db->real_escape_string($input['name'] ?? '');
    if (!$name) jsonError('Tên sản phẩm là bắt buộc', 400);

    $slug = $db->real_escape_string($input['slug'] ?? '');
    if (!$slug) $slug = strtolower(trim(preg_replace('/[^a-zA-Z0-9-]+/', '-', $name), '-'));

    $category_id = (int)($input['category_id'] ?? 0);
    $short_description = $db->real_escape_string($input['short_description'] ?? '');
    $description = $db->real_escape_string($input['description'] ?? '');
    $image = saveBase64Image($input['image'] ?? '');
    $image = $db->real_escape_string($image);
    $developer = $db->real_escape_string($input['developer'] ?? '');
    $rating = (float)($input['rating'] ?? 0);
    $is_featured = !empty($input['is_featured']) ? 1 : 0;

    $db->query("INSERT INTO products (category_id, name, slug, short_description, description, image, developer, rating, is_featured)
                VALUES ($category_id, '$name', '$slug', '$short_description', '$description', '$image', '$developer', $rating, $is_featured)");
    $pid = $db->insert_id;

    $db->query("INSERT INTO product_details (product_id) VALUES ($pid)");

    jsonResponse(['success' => true, 'id' => $pid], 201);
}

function handleUpdateProduct($id, $input) {
    requireAdmin();
    $db = getDB();
    $id = (int)$id;

    $fields = [];
    foreach (['name', 'slug', 'short_description', 'description', 'developer'] as $f) {
        if (isset($input[$f])) {
            $v = $db->real_escape_string($input[$f]);
            $fields[] = "$f = '$v'";
        }
    }
    if (isset($input['image'])) {
        $image = saveBase64Image($input['image']);
        $image = $db->real_escape_string($image);
        $fields[] = "image = '$image'";
    }
    if (isset($input['category_id'])) $fields[] = "category_id = " . (int)$input['category_id'];
    if (isset($input['rating'])) $fields[] = "rating = " . (float)$input['rating'];
    if (isset($input['is_featured'])) $fields[] = "is_featured = " . (!empty($input['is_featured']) ? 1 : 0);

    if (!$fields) jsonError('Không có dữ liệu cập nhật', 400);

    $db->query("UPDATE products SET " . implode(', ', $fields) . " WHERE id = $id");
    jsonResponse(['success' => true]);
}

function handleDeleteProduct($id) {
    requireAdmin();
    $db = getDB();
    $id = (int)$id;

    $db->query("DELETE FROM product_packages WHERE product_id = $id");
    $db->query("DELETE FROM product_details WHERE product_id = $id");
    $db->query("DELETE FROM products WHERE id = $id");

    jsonResponse(['success' => true]);
}

function handleUpdateProductDetails($id, $input) {
    requireAdmin();
    $db = getDB();
    $id = (int)$id;

    $fields = [];
    foreach (['slogan', 'overview', 'feature_content', 'guide_content'] as $f) {
        if (isset($input[$f])) {
            $v = $db->real_escape_string($input[$f]);
            $fields[] = "$f = '$v'";
        }
    }
    if (!$fields) jsonError('Không có dữ liệu cập nhật', 400);

    $db->query("UPDATE product_details SET " . implode(', ', $fields) . " WHERE product_id = $id");
    if ($db->affected_rows === 0 && $db->query("SELECT id FROM product_details WHERE product_id = $id")->num_rows === 0) {
        $db->query("INSERT INTO product_details (product_id) VALUES ($id)");
        $db->query("UPDATE product_details SET " . implode(', ', $fields) . " WHERE product_id = $id");
    }
    jsonResponse(['success' => true]);
}

function handleCreatePackage($productId, $input) {
    requireAdmin();
    $db = getDB();
    $productId = (int)$productId;
    $package_name = $db->real_escape_string($input['package_name'] ?? '');
    if (!$package_name) jsonError('Tên gói là bắt buộc', 400);

    $quantity = (int)($input['quantity'] ?? 1);
    $duration_time = $db->real_escape_string($input['duration_time'] ?? '');
    $setup_fee = (float)($input['setup_fee'] ?? 0);
    $total_price = (float)($input['total_price'] ?? 0);

    $db->query("INSERT INTO product_packages (product_id, package_name, quantity, duration_time, setup_fee, total_price)
                VALUES ($productId, '$package_name', $quantity, '$duration_time', $setup_fee, $total_price)");
    jsonResponse(['success' => true, 'id' => $db->insert_id], 201);
}

function handleUpdatePackage($id, $input) {
    requireAdmin();
    $db = getDB();
    $id = (int)$id;

    $fields = [];
    foreach (['package_name', 'duration_time'] as $f) {
        if (isset($input[$f])) {
            $v = $db->real_escape_string($input[$f]);
            $fields[] = "$f = '$v'";
        }
    }
    if (isset($input['quantity'])) $fields[] = "quantity = " . (int)$input['quantity'];
    if (isset($input['setup_fee'])) $fields[] = "setup_fee = " . (float)$input['setup_fee'];
    if (isset($input['total_price'])) $fields[] = "total_price = " . (float)$input['total_price'];

    if (!$fields) jsonError('Không có dữ liệu cập nhật', 400);
    $db->query("UPDATE product_packages SET " . implode(', ', $fields) . " WHERE id = $id");
    jsonResponse(['success' => true]);
}

function handleDeletePackage($id) {
    requireAdmin();
    $db = getDB();
    $id = (int)$id;
    $db->query("DELETE FROM product_packages WHERE id = $id");
    jsonResponse(['success' => true]);
}

function handleAdminUpload() {
    requireAdmin();
    if (empty($_FILES['file'])) {
        jsonError('No file uploaded', 400);
    }
    $file = $_FILES['file'];
    if ($file['error'] !== UPLOAD_ERR_OK) {
        jsonError('Upload error code: ' . $file['error'], 400);
    }
    $allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, $allowed)) {
        jsonError('Only ' . implode(', ', $allowed) . ' allowed', 400);
    }
    $maxSize = 2 * 1024 * 1024;
    if ($file['size'] > $maxSize) {
        jsonError('File too large (max 2MB)', 400);
    }
    $filename = time() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '', $file['name']);
    $dest = __DIR__ . '/../../frontend/images/' . $filename;
    if (!move_uploaded_file($file['tmp_name'], $dest)) {
        jsonError('Failed to save file', 500);
    }
    jsonResponse(['url' => 'images/' . $filename], 201);
}
