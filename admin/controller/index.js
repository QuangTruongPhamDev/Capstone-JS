const MAIN_URL = "https://67769a8b12a55a9a7d0c4d98.mockapi.io/sanpham";

let fetchProduct = () => {
  axios({
    url: MAIN_URL,
    method: "GET",
  })
    .then((result) => {
      let list = result.data;
      renderSanPham(list);
    })
    .catch((err) => {
      console.log(err);
    });
};

fetchProduct();

// Xóa sản phẩm
let deleteProduct = (id) => {
  axios({
    url: `${MAIN_URL}/${id}`,
    method: "DELETE",
  })
    .then(() => {
      fetchProduct();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Thêm sản phẩm
let createProduct = () => {
  // lấy dữ liệu từ form => tạo ra object
  let product = getDataForm();
  // gửi object lên server
  // axios.post(url, data cần gửi lên server)
  axios({
    url: MAIN_URL,
    method: "POST",
    data: product,
  })
    .then(() => {
      // gọi lại api lấy dữ liệu mới nhất từ server
      fetchProduct();
      // reset form
      document.querySelector("form").reset();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Sửa sản phẩm
let idProductEdit = null;
// Lấy dữ liệu sản phẩm cần sửa
let editProduct = (id) => {
  // lưu lại id sản phẩm cần sửa
  idProductEdit = id;
  console.log("id: ", id);
  axios
    .get(`${MAIN_URL}/${id}`)
    .then((result) => {
      // lấy dữ liệu thành công từ server
      let product = result.data;
      console.log("product: ", product);
      // fill dữ liệu vào form
      showDataForm(product);
      // hiển thị modal
      document.getElementById("modal").classList.remove("hidden");
      document.getElementById("btnThemSanPham").classList.add("hidden");
    })
    .catch((error) => {
      console.log("Lỗi: ", error);
    });
};

// Cập nhật sản phẩm
let updateProduct = () => {
  console.log("idProductEdit: ", idProductEdit);
  // Lấy dữ liệu từ form
  let product = getDataForm();
  // gọi api cập nhật sản phẩm
  axios({
    method: "PUT",
    url: `${MAIN_URL}/${idProductEdit}`,
    data: product,
  })
    .then((result) => {
      // Tắt modal
      document.getElementById("modal").classList.add("hidden");
      document.getElementById("btnThemSanPham").classList.remove("hidden");
      // Reset form
      document.querySelector("form").reset();
      // Gọi lại api lấy dữ liệu mới nhất từ server
      fetchProduct();

      console.log("Sửa sản phẩm thành công: ", result);
    })
    .catch((error) => {
      console.log("Sửa sản phẩm thất bại: ", error);
    });
};
