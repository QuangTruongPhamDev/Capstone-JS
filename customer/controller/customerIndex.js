const BASE_URL = "https://67769a8b12a55a9a7d0c4d98.mockapi.io/sanpham";

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
