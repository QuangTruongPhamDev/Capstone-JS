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
      let totalAmount = getTotalAmount(cartItems);

      // Cập nhật số lượng vào giao diện
      document.getElementById("cart-count").innerText = totalQuantity;

      // Cập nhật tổng giá tiền lên giao diện
      document.getElementById("cart-total").innerText = totalAmount.toFixed(2);
    })
    .catch((err) => console.log("Lỗi khi lấy giỏ hàng:", err));
};

// RENDER CART
let renderCart = () => {
  axios
    .get(CART_URL)
    .then((response) => {
      let cartItems = response.data;
      let cartContent = document.getElementById("cart-content");

      if (cartItems.length === 0) {
        cartContent.innerHTML = `<p class="text-center text-gray-400">
          Looks Like You Haven't Added Any Product In The Cart
        </p>`;
        document.getElementById("cart-total").innerText = "0";
        return;
      }

      //  Hiển thị sản phẩm trong modal
      cartContent.innerHTML = cartItems
        .map((item) => {
          let price = Number(item.price) || 0; // Chuyển về số, nếu lỗi thì mặc định = 0
          let currentPrice = Number(item.currentPrice) || price * item.quantity;

          return `
    <div class="flex items-center justify-between border-b border-gray-700 py-2">
      <img src="${item.image}" class="w-16 h-16 rounded">
      <div class="flex-1 ml-4">
        <p class="text-white font-semibold">${item.productName}</p>
        <p class="text-gray-400">Price: $${price.toFixed(2)}</p>
      </div>
      <div class="flex items-center">
        <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})"
          class="bg-gray-600 px-2 py-1 text-white rounded">-</button>
        <span id="quantity-${item.id}" class="px-3 text-white">${
            item.quantity
          }</span>
        <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})"
          class="bg-gray-600 px-2 py-1 text-white rounded">+</button>
      </div>
      <p id="price-${item.id}" class="text-green-500 font-semibold">
        $${currentPrice.toFixed(2)}
      </p>
      <button onclick="removeFromCart('${
        item.id
      }')" class="text-red-500 ml-4">✖</button>
    </div>
  `;
        })
        .join("");

      // Cập nhật tổng giá tiền lên giao diện
      document.getElementById("cart-total").innerText = totalAmount.toFixed(2);

      updateCartTotal(); // Cập nhật tổng số lượng hiển thị
    })
    .catch((err) => console.log("Lỗi khi lấy danh sách giỏ hàng:", err));
};

renderCart();

// XÓA SẢN PHẨM CHỈ ĐỊNH KHỎI GIỎ HÀNG
let removeFromCart = (id) => {
  axios
    .delete(`${CART_URL}/${id}`)
    .then(() => {
      renderCart();
      updateCartTotal();
    })
    .catch((err) => console.log("Lỗi khi xóa sản phẩm:", err));
};

// UPDATE QUANTITY KHI CLICK VÀO BUTTON + / -
let updateQuantity = async (id, newQuantity) => {
  if (newQuantity < 1) {
    removeFromCart(id);
    return;
  }

  try {
    // Lấy lại dữ liệu từ giỏ hàng
    let response = await axios.get(CART_URL);
    let cartItems = response.data;
    let product = cartItems.find((item) => item.id == id);

    if (!product) return;

    let newCurrentPrice = product.price * newQuantity;

    await axios.put(`${CART_URL}/${id}`, {
      ...product,
      quantity: newQuantity,
      currentPrice: newCurrentPrice,
    });

    renderCart(); // Cập nhật lại toàn bộ giao diện
    updateCartTotal(); // Cập nhật số lượng tổng giỏ hàng
  } catch (err) {
    console.log("Lỗi khi cập nhật số lượng:", err);
  }
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
            // Nếu sản phẩm chưa có => Thêm mới (dùng productId riêng biệt) trong đó: thêm trường quantity lưu số lượng, currentPrice là giá tiền hiện tại sau khi nhân với số lượng
            let newProduct = {
              ...product,
              quantity: 1,
              productId: productId,
              price: Number(product.price),
              currentPrice: Number(product.price * 1),
            }; // Thêm productId để phân biệt
            axios
              .post(CART_URL, newProduct)
              .then((res) => {
                console.log("Sản phẩm đã thêm vào giỏ hàng:", res.data);
                updateCartTotal(); // Cập nhật tổng số lượng ngay lập tức
                renderCart();
              })
              .catch((err) => {
                console.log("Lỗi khi thêm sản phẩm:", err);
              });
          } else {
            // Nếu sản phẩm đã có => Cập nhật số lượng (dùng đúng ID trong giỏ hàng)
            let updatedQuantity = existingProduct.quantity + 1;
            let updatedProduct = {
              ...existingProduct,
              quantity: updatedQuantity,
              currentPrice: existingProduct.price * updatedQuantity,
            };

            axios
              .put(`${CART_URL}/${existingProduct.id}`, updatedProduct)
              .then((res) => {
                console.log("Cập nhật số lượng thành công:", res.data);
                updateCartTotal(); // Cập nhật tổng số lượng ngay lập tức
                renderCart();
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

    for (let item of cartItems) {
      await axios.delete(`${CART_URL}/${item.id}`);
    }

    console.log("Đã xóa toàn bộ giỏ hàng!");
    updateCartTotal(); // Cập nhật tổng số lượng
    renderCart(); // Cập nhật lại giao diện giỏ hàng

    // Ẩn modal giỏ hàng
    document.getElementById("cart-modal").classList.add("hidden");
  } catch (err) {
    console.log("Lỗi khi xóa giỏ hàng:", err);
  }
};

// Nhấn "Purchase" => Mở modal xác nhận.
document.getElementById("purchase-btn").addEventListener("click", () => {
  document.getElementById("confirm-modal").classList.remove("hidden");
});

// Chọn "Không" => Đóng modal xác nhận, quay lại giỏ hàng.
document.getElementById("confirm-no").addEventListener("click", () => {
  document.getElementById("confirm-modal").classList.add("hidden");
});

// Chọn "Có" => Xóa giỏ hàng, ẩn modal xác nhận, hiển thị modal thành công.
document.getElementById("confirm-yes").addEventListener("click", async () => {
  document.getElementById("confirm-modal").classList.add("hidden"); // Ẩn modal xác nhận
  await clearCart(); // Xóa giỏ hàng
  document.getElementById("success-modal").classList.remove("hidden"); // Hiển thị modal thành công
});

// Nhấn "OK" => Đóng modal thành công
document.getElementById("success-ok").addEventListener("click", () => {
  document.getElementById("success-modal").classList.add("hidden"); // Ẩn modal thành công
});
