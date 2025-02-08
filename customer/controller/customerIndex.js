const BASE_URL = "https://67769a8b12a55a9a7d0c4d98.mockapi.io/sanpham"; // link mockapi sản phẩm
const CART_URL = "https://67a742eb203008941f67112d.mockapi.io/cart"; // link mockapi giỏ hàng

// Render trang sản phẩm
let fetchProduct = () => {
  axios({
    url: BASE_URL,
    method: "GET",
  })
    .then((result) => {
      let list = result.data;
      renderListSanPham(list);
    })
    .catch((err) => {
      console.log(err);
    });
};

fetchProduct();

// Cập nhật số lượng giỏ hàng trên giao diện
let updateCartTotal = () => {
  axios
    .get(CART_URL)
    .then((result) => {
      let cartItems = result.data;
      let totalQuantity = getTotalQuantity(cartItems);

      // Cập nhật số lượng vào giao diện
      document.getElementById("cart-count").innerText = totalQuantity;
    })
    .catch((err) => console.log("Lỗi khi lấy giỏ hàng:", err));
};

// THÊM SẢN PHẨM VÀO GIỎ HÀNG
let addProductCart = (id) => {
  axios
    .get(`${BASE_URL}/${id}`)
    .then((result) => {
      let product = result.data;
      let productId = String(product.id); // Đảm bảo ID là chuỗi

      axios
        .get(CART_URL)
        .then((result) => {
          let cartItems = result.data;
          console.log("Giỏ hàng hiện tại:", cartItems);

          // Tìm sản phẩm trong giỏ hàng bằng product.id, không dùng MockAPI ID
          let existingProduct = cartItems.find(
            (item) => String(item.productId) === productId
          );

          if (!existingProduct) {
            // Nếu sản phẩm chưa có => Thêm mới (dùng productId riêng biệt)
            let newProduct = { ...product, quantity: 1, productId: productId }; // Thêm productId để phân biệt
            axios
              .post(CART_URL, newProduct)
              .then((res) => {
                console.log("Sản phẩm đã thêm vào giỏ hàng:", res.data);
                updateCartTotal(); // Cập nhật tổng số lượng ngay lập tức
              })
              .catch((err) => {
                console.log("Lỗi khi thêm sản phẩm:", err);
              });
          } else {
            // Nếu sản phẩm đã có => Cập nhật số lượng (dùng đúng ID trong giỏ hàng)
            let updatedProduct = {
              ...existingProduct,
              quantity: existingProduct.quantity + 1,
            };

            axios
              .put(`${CART_URL}/${existingProduct.id}`, updatedProduct)
              .then((res) => {
                console.log("Cập nhật số lượng thành công:", res.data);
                updateCartTotal(); // Cập nhật tổng số lượng ngay lập tức
              })
              .catch((err) => {
                console.log("Lỗi khi cập nhật số lượng:", err);
              });
          }
        })
        .catch((err) => {
          console.log("Lỗi khi lấy danh sách giỏ hàng:", err);
        });
    })
    .catch((error) => console.log("Lỗi khi lấy sản phẩm:", error));
};

// CLEAR GIỎ HÀNG
let clearCart = async () => {
  try {
    let response = await axios.get(CART_URL);
    let cartItems = response.data;

    if (cartItems.length === 0) {
      console.log("Giỏ hàng đã trống!");
      return;
    }

    // Xóa từng sản phẩm một theo thứ tự để tránh lỗi
    for (let item of cartItems) {
      await axios.delete(`${CART_URL}/${item.id}`);
    }

    console.log("Đã xóa toàn bộ giỏ hàng!");
    updateCartTotal(); // Cập nhật giao diện
  } catch (err) {
    console.log("Lỗi khi xóa giỏ hàng:", err);
  }
};
