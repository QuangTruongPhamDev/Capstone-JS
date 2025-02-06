let renderListSanPham = (productArr) => {
  let contentHTML = "";

  productArr.reverse().forEach((product) => {
    contentHTML += `
            <div
                class="relative bg-black text-white rounded-2xl shadow-lg overflow-hidden group product-card w-[200px] h-[300px] transition-all duration-300">
                <!-- Product Content -->
                <div class="content p-4">
                    <div class="absolute top-4 right-4 text-green-500 font-bold">In Stock</div>
                    <div class="h-52 flex items-center justify-center">
                        <img src="${product.image}" alt="${product.productName}" class="object-contain">
                    </div>
                    <h3 class="text-lg text-center font-bold mt-4">${product.productName}</h3>
                </div>

                <!-- Info Section (Hidden by default) -->
                <div class="info">
                    <h3 class="text-lg font-bold mt-4">${product.productName}</h3>
                    <p class="text-lg text-green-300">${product.price}$</p>
                    <p class="text-sm text-white">${product.category}</p>
                    <p class="text-sm text-gray-400">${product.desc}</p>
                    <div class="flex justify-between items-center mt-4">
                        <button class="text-white heart-btn" onclick="toggleHeart(this)">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 heart-icon">
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </button>
                        <button
                            onclick="addProductCart('${product.id}')"
                            class="bg-black text-white px-3 py-1 text-sm rounded-full border border-white flex items-center gap-1">
                            Add
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
  });
  document.getElementById("productList").innerHTML = contentHTML;
};
