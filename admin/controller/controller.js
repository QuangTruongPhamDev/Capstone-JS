// Hàm render danh sách sản phẩm
let renderSanPham = (productArr) => {
  let contentHTML = "";

  // Duyệt qua các sản phẩm và tạo HTML
  productArr.forEach((product) => {
    contentHTML += `
      <tr class="border border-gray-200">
        <td class="border border-gray-200 text-center justify-center items-center">${product.id}</td>
        <td class="border border-gray-200 text-center justify-center items-center">${product.productName}</td>
        <td class="border border-gray-200 text-center items-center">${product.price}</td>
        <td>
            <img src="${product.image}" alt="${product.productName}" width="200px" />
        </td>
        <td class="border border-gray-200 text-center justify-center items-center">${product.category}</td>
        <td class="border border-gray-200 text-center justify-center items-center">${product.desc}</td>
        <td class="border-gray-200 flex flex-col items-center">
            <button class="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700 m-2" onclick="editProduct('${product.id}')">Sửa</button>
            <button class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 m-2" onclick="deleteProduct('${product.id}')">Xóa</button>
        </td>
      </tr>
    `;
  });

  // Đưa dữ liệu vào bảng
  document.getElementById("tblDanhSachSanPham").innerHTML = contentHTML;
};

// Hàm hiển thị dữ liệu vào form (sửa sản phẩm)
let showDataForm = (product) => {
  document.getElementById("TenSP").value = product.productName;
  document.getElementById("GiaSP").value = product.price;
  document.getElementById("HinhSP").value = product.image;
  document.getElementById("loaiSP").value = product.category;
  document.getElementById("MoTaSP").value = product.desc;
};

// Hàm lấy dữ liệu từ form (thêm hoặc sửa sản phẩm)
let getDataForm = () => {
  let productName = document.getElementById("TenSP").value;
  let price = document.getElementById("GiaSP").value;
  let image = document.getElementById("HinhSP").value;
  let category = document.getElementById("loaiSP").value;
  let desc = document.getElementById("MoTaSP").value;

  let product = {
    productName: productName,
    price: price,
    image: image,
    category: category,
    desc: desc,
  };
  return product;
};

// Hàm tìm kiếm sản phẩm theo tên
let searchProduct = (searchTerm, productArr) => {
  return productArr.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

// Hàm sắp xếp sản phẩm theo giá (tăng dần)
let sortProductsAsc = (productArr) => {
  return productArr.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
};

// Hàm sắp xếp sản phẩm theo giá (giảm dần)
let sortProductsDesc = (productArr) => {
  return productArr.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
};

// Lắng nghe sự kiện tìm kiếm sản phẩm theo tên
document.getElementById("searchInput").addEventListener("input", (event) => {
  let searchTerm = event.target.value;
  let filteredProducts = searchProduct(searchTerm, allProducts); // allProducts là danh sách sản phẩm
  renderSanPham(filteredProducts); // Cập nhật lại danh sách sản phẩm trên giao diện
});

// Lắng nghe sự kiện sắp xếp sản phẩm theo giá (tăng dần)
document.getElementById("sortAsc").addEventListener("click", () => {
  let sortedProducts = sortProductsAsc([...allProducts]); // Tạo bản sao của danh sách sản phẩm
  renderSanPham(sortedProducts); // Hiển thị sản phẩm đã sắp xếp
});

// Lắng nghe sự kiện sắp xếp sản phẩm theo giá (giảm dần)
document.getElementById("sortDesc").addEventListener("click", () => {
  let sortedProducts = sortProductsDesc([...allProducts]); // Tạo bản sao của danh sách sản phẩm
  renderSanPham(sortedProducts); // Hiển thị sản phẩm đã sắp xếp
});
