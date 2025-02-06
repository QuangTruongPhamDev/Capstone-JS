let renderSanPham = (productArr) => {
  let contentHTML = "";

  productArr.reverse().forEach((product) => {
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
                <td class=" border-gray-200 flex flex-col items-center">
                    <button class="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700 m-2" onclick="editProduct('${product.id}')">Sửa</button>
                    <button class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 m-2" onclick="deleteProduct('${product.id}')">Xóa</button>
                </td>
            </tr>
        `;
  });
  document.getElementById("tblDanhSachSanPham").innerHTML = contentHTML;
};

let showDataForm = (product) => {
  document.getElementById("TenSP").value = product.productName;
  document.getElementById("GiaSP").value = product.price;
  document.getElementById("HinhSP").value = product.image;
  document.getElementById("loaiSP").value = product.category;
  document.getElementById("MoTaSP").value = product.desc;
};

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
