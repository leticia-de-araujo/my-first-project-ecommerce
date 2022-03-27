let mainContainerShop = document.getElementById("containerShop");

function createProduct(
  srcImg,
  altImg,
  productCategory,
  productName,
  productDescription,
  productPrice
) {
  let divContainerProduct = document.createElement("div");
  divContainerProduct.setAttribute("class", "containerProduct");

  divContainerProduct.innerHTML = `<img
   src=${srcImg}
   alt=${altImg} class="productImg"
 />
 <div class="productContent">
   <div class="productCategory">${productCategory}</div>
   <div class="productName">${productName}</div>
   <div class="productDescription">
     ${productDescription}
   </div>
   <div class="productPrice">$${productPrice}</div>
   <button class="btnAdd">Add to cart</button>
 </div>`;

  mainContainerShop.appendChild(divContainerProduct);
}

function showProductsWindow() {
  dataBase.forEach((item) =>
    createProduct(
      item.srcImg,
      item.altImg,
      item.productCategory,
      item.productName,
      item.productDescription,
      item.productPrice
    )
  );
}

function addToCart() {
  let buttonsAdd = document.getElementsByClassName("btnAdd");
  for (let i = 0; i < buttonsAdd.length; i++) {
    let button = buttonsAdd[i];
    button.addEventListener("click", addToCartClicked);
  }
}

function addToCartClicked(event) {
  let btnClicked = event.target;
  let containerProduct = btnClicked.parentElement.parentElement;
  let name =
    containerProduct.getElementsByClassName("productName")[0].innerText;
  let price =
    containerProduct.getElementsByClassName("productPrice")[0].innerText;
  let imgSrc = containerProduct.getElementsByClassName("productImg")[0].src;
  let emptyCart = document.getElementsByClassName("emptyCart")[0];

  if (document.getElementsByClassName("cartProductRow")[0] == undefined) {
    emptyCart.style.display = "none";
    createCartProductRow(name, price, imgSrc);
    updateTotalPriceAndAmount();
  } else {
    createCartProductRow(name, price, imgSrc);
    updateTotalPriceAndAmount();
  }
}

function createCartProductRow(name, price, imgSrc) {
  let cartProductRow = document.createElement("div");
  cartProductRow.setAttribute("class", "cartProductRow");
  let containerCartContent = document.getElementById("cartContent");
  let cartProductsNames =
    containerCartContent.getElementsByClassName("cartProductRowName");

  for (let i = 0; i < cartProductsNames.length; i++) {
    if (cartProductsNames[i].innerText == name) {
      let modal = document.getElementById("myModal");
      modal.style.display = "block";
      let span = document.getElementsByClassName("close")[0];
      span.onclick = function () {
        modal.style.display = "none";
      };
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
      return;
    }
  }

  cartProductRow.innerHTML = ` <img
src="${imgSrc}"
/>
<div class="cartProductRowInfo">
<div class="cartProductRowName">${name}</div>
<div class="cartProductRowPrice">${price}</div>
</div>
<div class="cartQuantity">
<input class="inputCartQuantity" type="number" value="1">
<button class="btnRemove" type="button">Remove</button>
</div>`;

  containerCartContent.append(cartProductRow);
  cartProductRow
    .getElementsByClassName("btnRemove")[0]
    .addEventListener("click", removeCart);
  cartProductRow
    .getElementsByClassName("inputCartQuantity")[0]
    .addEventListener("change", quantityChange);
}

addToCart();

function updateQuantityInput() {
  let quantityInputs = document.getElementsByClassName("inputCartQuantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChange);
  }
}

function quantityChange(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotalPriceAndAmount();
}

updateQuantityInput();

function updateTotalPriceAndAmount() {
  let cartContentContainer = document.getElementById("cartContent");
  let cartRows = cartContentContainer.getElementsByClassName("cartProductRow");
  let totalPr = 0;
  let totalQuant = 0;

  for (let i = 0; i < cartRows.length; i++) {
    let cartProductRow = cartRows[i];

    let priceElement = cartProductRow.getElementsByClassName(
      "cartProductRowPrice"
    )[0];
    let quantityElement =
      cartProductRow.getElementsByClassName("inputCartQuantity")[0];

    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = parseFloat(quantityElement.value);

    totalPr = totalPr + price * quantity;
    totalQuant = totalQuant + quantity;
  }

  let totalPrice = document.getElementsByClassName("value")[0];
  totalPr = Math.round(totalPr * 100) / 100;
  totalPrice.innerText = `$${totalPr}`;

  let totalQuantity = document.getElementsByClassName("quant")[0];
  totalQuantity.innerText = totalQuant;
}

let removeButtons = document.getElementsByClassName("btnRemove");

function removeCart(event) {
  let emptyCart = document.getElementsByClassName("emptyCart")[0];
  for (let i = 0; i < removeButtons.length; i++) {
    let button = removeButtons[i];
    button = event.target;
    button.addEventListener(
      "click",
      button.parentElement.parentElement.remove()
    );
    updateTotalPriceAndAmount();
  }
  if (document.getElementsByClassName("cartProductRow")[0] == undefined) {
    emptyCart.style.display = "";
  }
}

let allProductsSection = document.getElementById("allProductsSection");
let notebooksSection = document.getElementById("notebooksSection");
let pensPencilsSection = document.getElementById("pensPencilsSection");
let bottlesSection = document.getElementById("bottlesSection");

function filterNav() {
  allProductsFilter();
  notebooksSection.addEventListener("click", notebooksFilter);
  pensPencilsSection.addEventListener("click", pensPencilsFilter);
  bottlesSection.addEventListener("click", bottlesFilter);
  allProductsSection.addEventListener("click", allProductsFilter);
}

filterNav();

function deleteProductsWindow() {
  let containerShop = document.getElementById("containerShop");
  containerShop.innerText = ``;
}

function allProductsFilter() {
  pensPencilsSection.removeAttribute("class");
  bottlesSection.removeAttribute("class");
  notebooksSection.removeAttribute("class");

  allProductsSection.setAttribute("class", "currentElement");
  deleteProductsWindow();
  showProductsWindow();
  addToCart();
}

function notebooksFilter() {
  allProductsSection.removeAttribute("class");
  pensPencilsSection.removeAttribute("class");
  bottlesSection.removeAttribute("class");

  notebooksSection.setAttribute("class", "currentElement");
  deleteProductsWindow();
  for (let i = 0; i < dataBase.length; i++) {
    let currentProduct = dataBase[i];
    if (currentProduct.productCategory == "Notebooks") {
      createProduct(
        currentProduct.srcImg,
        currentProduct.altImg,
        currentProduct.productCategory,
        currentProduct.productName,
        currentProduct.productDescription,
        currentProduct.productPrice
      );
    }
  }
  addToCart();
}

function pensPencilsFilter() {
  allProductsSection.removeAttribute("class");
  bottlesSection.removeAttribute("class");
  notebooksSection.removeAttribute("class");

  pensPencilsSection.setAttribute("class", "currentElement");
  deleteProductsWindow();
  for (let i = 0; i < dataBase.length; i++) {
    let currentProduct = dataBase[i];
    if (currentProduct.productCategory == "Pens & pencils") {
      createProduct(
        currentProduct.srcImg,
        currentProduct.altImg,
        currentProduct.productCategory,
        currentProduct.productName,
        currentProduct.productDescription,
        currentProduct.productPrice
      );
    }
  }
  addToCart();
}

function bottlesFilter() {
  allProductsSection.removeAttribute("class");
  pensPencilsSection.removeAttribute("class");
  notebooksSection.removeAttribute("class");

  bottlesSection.setAttribute("class", "currentElement");
  deleteProductsWindow();
  for (let i = 0; i < dataBase.length; i++) {
    let currentProduct = dataBase[i];
    if (currentProduct.productCategory == "Bottles") {
      createProduct(
        currentProduct.srcImg,
        currentProduct.altImg,
        currentProduct.productCategory,
        currentProduct.productName,
        currentProduct.productDescription,
        currentProduct.productPrice
      );
    }
  }
  addToCart();
}

let inputSearchBar = document.getElementById("searchBar");
let buttonSearch = document.getElementById("btnSearch");

buttonSearch.addEventListener("click", searchContent);

function searchContent(event) {
  let inputValue = inputSearchBar.value;
  event.preventDefault();

  pensPencilsSection.removeAttribute("class");
  bottlesSection.removeAttribute("class");
  notebooksSection.removeAttribute("class");
  allProductsSection.setAttribute("class", "currentElement");

  for (let i = 0; i < dataBase.length; i++) {
    if (inputValue.toUpperCase() == dataBase[i].productName.toUpperCase()) {
      deleteProductsWindow();
      createProduct(
        dataBase[i].srcImg,
        dataBase[i].altImg,
        dataBase[i].productCategory,
        dataBase[i].productName,
        dataBase[i].productDescription,
        dataBase[i].productPrice
      );
      addToCart();
      return;
    } else if (
      inputValue.toUpperCase() == dataBase[i].productCategory.toUpperCase() &&
      inputValue.toUpperCase() == dataBase[i + 1].productCategory.toUpperCase()
    ) {
      deleteProductsWindow();
      createProduct(
        dataBase[i].srcImg,
        dataBase[i].altImg,
        dataBase[i].productCategory,
        dataBase[i].productName,
        dataBase[i].productDescription,
        dataBase[i].productPrice
      );
      createProduct(
        dataBase[i + 1].srcImg,
        dataBase[i + 1].altImg,
        dataBase[i + 1].productCategory,
        dataBase[i + 1].productName,
        dataBase[i + 1].productDescription,
        dataBase[i + 1].productPrice
      );
      addToCart();
      return;
    } else {
      searchInvalid();
    }
  }
}

function searchInvalid() {
  deleteProductsWindow();
  let invalidSearch = document.createElement("div");
  invalidSearch.setAttribute("id", "invalidSearch");
  invalidSearch.innerText =
    "Sorry, we didn't find any products matching this search.";
  let containerShop = document.getElementById("containerShop");
  containerShop.appendChild(invalidSearch);
}

let logo = document.getElementById("logo");
logo.addEventListener("click", allProductsFilter);
