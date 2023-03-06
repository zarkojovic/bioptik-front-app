console.log("test");

const _BASEURL = "data/";
const _IMGURL = "images/";

function callback(file, resault) {
  $.ajax({
    type: "get",
    url: _BASEURL + file,
    dataType: "json",
    success: resault,
  });
}

function ucitajNav() {
  callback("menu.json", function (data) {
    let html = "";

    data.forEach((el) => {
      html += `<li class="nav-item">
                <a class="nav-link" href="${el.href}">${el.name}</a>
            </li>`;
    });

    $("#navMenu").html(html);
  });
}

function ucitajCover() {
  callback("carousel.json", function (data) {
    html = "";

    for (let i in data) {
      html += `<div class="carousel-item ${
        i == 0 ? "active" : "item" + (parseInt(i) + 1)
      }">
      <div class="carousel-caption text-center">
        <h3>
          ${data[i].title}
          <span>${data[i].text}</span>
        </h3>
        <a
          href="${data[i].button.href}"
          class="btn btn-sm animated-button gibson-three mt-4"
          >${data[i].button.text}</a
        >
      </div>
    </div>`;
    }

    $("#carouselWrap").html(html);
  });
}
function loadArticles(articlesList = 0, numberOfArticles = 0) {
  if (articlesList == 0) {
    var data = dohvatiLS("articles");
  } else {
    var data = articlesList;
  }
  let html = "";
  if (url == "/shop.html") {
    data = applyFilters(data);
  }
  if (data.length == 0) {
    html += "<h4 class='text-center w-100'>No Items!</h4>";
  } else {
    if (numberOfArticles != 0) {
      data.sort(function () {
        return Math.random() - 0.5;
      });
      data.length = numberOfArticles;
    }
    data.forEach((el) => {
      let starsCount = Math.round(el.rating);
      html += `<div class="col-md-3 product-men women_two mb-3">
            <div class="product-googles-info googles">
              <div class="men-pro-item">
                <div class="men-thumb-item">
                  <img src="${
                    _IMGURL + el.pictures.main.src
                  }" class="img-fluid" alt="" />
                  <div class="men-cart-pro">
                    <div class="inner-men-cart-pro">
                      <div data-id="${
                        el.id
                      }" class="link-product-add-cart single-modal"
                        >Quick View</div
                      >
                    </div>
                  </div>
                  <span class="product-new-top ${returnTagName(
                    el.tagId,
                    "class"
                  )}">${returnTagName(el.tagId, "name")}</span>
                  ${
                    el.discount != null
                      ? ` <span class="product-discount-top">${Math.round(
                          el.discount
                        )}%</span>`
                      : ""
                  }
                 
                </div>
                <div class="item-info-product">
                  <div class="info-product-price">
                    <div class="grid_meta">
                      <div class="product_price">
                        <h4>
                          <a href="single.html">${returnBrandName(
                            el.brandId
                          )}</a>
                        </h4>
                        <h4>
                        ${el.name}
                        </h4>
                        <div class="grid-price mt-2">
                         <br/>
                          <span class="money ">$${el.price.current}</span>${
        el.price.old != null
          ? `<span class="text-secondary text-small small"><s> $${el.price.old}</s></span>`
          : ""
      }
                        </div>
                      </div>
                      <ul class="stars">
                      `;

      for (let i = 0; i < starsCount; i++) {
        html += `<li>
                            <a href="#" class="mr-1 h5">
                              <i class="fa fa-star" aria-hidden="true"></i>
                            </a>
                          </li>`;
      }
      html += ` 
                        </li>
                      </ul>
                    </div>
                    <div class="googles single-item hvr-outline-out">
                      <form action="#" method="post">
                        <input type="hidden" name="cmd" value="_cart" />
                        <input type="hidden" name="add" value="1" />
                        <input
                          type="hidden"
                          name="googles_item"
                          value="Farenheit"
                        />
                        <input type="hidden" name="amount" value="575.00" />
                        <button
                          type="button"
                          data-id="${el.id}"
                          onClick="addToCart(${el.id})"
                          class="googles-cart pgoogles-cart"
                        >
                          <i class="fas fa-cart-plus "></i>
                        </button>
                      </form>
                    </div>
                  </div>
                  <div class="clearfix"></div>
                </div>
              </div>
            </div>
          </div>`;
    });
  }
  $("#featuredArticles").html(html);
}
function returnBrandName(brandId) {
  let brands = dohvatiLS("brands");
  let naziv;
  brands.forEach((el) => {
    if (el.id == brandId) {
      naziv = el.name;
    }
  });
  return naziv;
}
function returnTagName(id, att) {
  let data = dohvatiLS("tags");
  let name = "";
  data.forEach((el) => {
    if (el.id == id) {
      if (att == "name") {
        name = el.name;
      }
      if (att == "class") {
        name = el.class;
      }
    }
  });

  return name;
}
function getTestimonials() {
  callback("testimonials.json", function (data) {
    let html = "";
    for (let i in data) {
      html += `<div class="carousel-item ${i == 0 ? "active" : ""}">
        <div class="testimonials_grid text-center">
          <h3>
            ${data[i].name}
            <span>${data[i].role}</span>
          </h3>
          <label>${data[i].country}</label>
          <p>
            ${data[i].comment}
          </p>
        </div>
      </div>`;
    }

    html += `<a
    class="carousel-control-prev test"
    href="#carouselExampleControls"
    role="button"
    data-slide="prev"
  >
    <span class="fas fa-long-arrow-alt-left"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a
    class="carousel-control-next test"
    href="#carouselExampleControls"
    role="button"
    data-slide="next"
  >
    <span
      class="fas fa-long-arrow-alt-right"
      aria-hidden="true"
    ></span>
    <span class="sr-only">Next</span>
  </a>`;
    $("#testimonialsWrap").html(html);
  });
}
function addToCart(id, action = "add") {
  console.log(id);
  let cartCheck = dohvatiLS("cart");
  // const toastStack = document.getElementById("toastStack");
  if (cartCheck) {
    if (action == "add") {
      addNewArticle();
      renderCart();
      displayToast();
    }
    if (action == "remove") {
      removeArticle();
      displayToast("removed");
      renderCart();
    }
  } else {
    addFirstArticle();
    renderCart();
  }
  function addFirstArticle() {
    let firstItem = [
      {
        id: id,
        qty: 1,
      },
    ];
    setLS("cart", firstItem);
  }
  function addNewArticle() {
    let items = dohvatiLS("cart");
    let pom = 0;
    items.forEach((el) => {
      if (el.id == id) {
        pom = 1;
        el.qty++;
      }
    });
    if (!pom) {
      let x = { id: id, qty: 1 };
      items.push(x);
    }
    setLS("cart", items);
  }
  function removeArticle() {
    let items = dohvatiLS("cart");
    let pom = [];
    let i = 0;
    // console.log("remove");
    items.forEach((el) => {
      i++;
      if (el.id == id) {
        if (el.qty > 1) {
          el.qty--;
        }
      }
    });
    setLS("cart", items);
  }
  function displayToast(message = "added") {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.classList.add("show");

    const toastBody = document.createElement("div");
    toastBody.classList.add("toast-body");
    toastBody.textContent = `Product ${message} to cart!`;

    // toast.appendChild(toastHeader);
    toast.appendChild(toastBody);

    toastStack.appendChild(toast);

    $(".toast").last().toast({
      delay: 2000,
      autohide: true,
      animation: true,
    });
    $(".toast").last().toast("show");
    // $(".toast").toast("dispose");
  }
}
function dohvatiLS(name) {
  return JSON.parse(localStorage.getItem(name));
}
function setLS(name, data) {
  if (name == "cart") {
    localStorage.setItem(name, JSON.stringify(data));
  } else {
    callback(name + ".json", function (resault) {
      localStorage.setItem(name, JSON.stringify(resault));
    });
  }
}
function renderCart() {
  let cartItems = dohvatiLS("cart");
  let html = "";
  if (cartItems != null) {
    html = `<a
    class="top_googles_cart py-3 px-4 text-white primary-bg"
    href="checkout.html"
    >
    My Cart <span id="itemNumbers">(${cartItems.length})</span>
    <i class="fas fa-cart-arrow-down"></i>
    </a>`;
  } else {
    html = `<a
    href="checkout.html"
    class="top_googles_cart text-muted py-3 px-4 border"
    >
    My Cart <span id="itemNumbers">(0)</span>
    <i class="fas fa-cart-arrow-down"></i>
    </a>`;
  }
  $("#cartWrap").html(html);
}
function loadCart() {
  let cartItems = dohvatiLS("cart");
  let html = "";
  if (cartItems != null) {
    html += `<h4>Your shopping cart contains:
              <span>${cartItems.length} Products</span>
            </h4>
            <div class="container-fluid table-wrap">
            <table class="timetable_sub">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody id="checkoutTable">`;
    cartItems.forEach((el) => {
      html += printCartItem(el.id, el.qty);
    });

    html += `</tbody>
  </table>
  </div>`;
    cartReciept();
  } else {
    html += `<h1 class="text-center">The cart is empty!</h1>`;

    $("#checkoutReciept").html("");
  }
  function printCartItem(id, qty) {
    let items = dohvatiLS("articles");
    items = items.filter((x) => x.id == id)[0];

    // console.log(items);
    return `<tr class="rem1">
            <td class="invert-image">
              <a href="single.html">
                <img src="images/${items.pictures.main.src}" alt="${items.pictures.main.alt}" class="img-responsive" />
              </a>
            </td>
            <td class="invert">${items.name}</td>
            <td class="invert">
              <div class="quantity">
                <div class="quantity-select d-flex">
                  <div class="entry value-minus" onClick="removeItemQty(${items.id})">&nbsp;</div>
                  <div class="entry value">
                    <span>${qty}</span>
                  </div>
                  <div class="entry value-plus active " onClick="addItemQty(${items.id})">&nbsp;</div>
                </div>
              </div>
            </td>

            <td class="invert">$${items.price.current}</td>
            <td class="invert">
              <div class="rem removeItem" data-id="${items.id}" onClick="removeItem(${items.id})">
                <div class="close1 "></div>
              </div>
            </td>
          </tr>`;
  }

  function cartReciept() {
    let cartHtml = `<div class="col-md-4 checkout-left-basket">
    <a href="shop.html"><h4>  Continue shopping</h4></a>
    <ul >`;
    cartItems.forEach((el) => {
      cartHtml += `<li>
                ${prikaziNaziv(el.id, "name")}
                <i>-</i>
                <span>$${prikaziNaziv(el.id, "price", el.qty)} </span>
              </li>`;
    });

    cartHtml += `<li class="checkout-left-basket-final">
                    Total
                    <i>-</i>
                    <span class="text-black">$${prikaziSumu()}</span>
                  </li>
                </ul>

                </div>
                 <div class="col-md-8 address_form">
                <h4>Fill the contact form</h4>
                <form
                  action="#"
                  method="post"
                  name="orderForm"
                  class="creditly-card-form agileinfo_form"
                >
                  <section class="creditly-wrapper wrapper">
                    <div class="information-wrapper">
                      <div class="first-row form-group">
                        <div class="controls">
                          <label class="control-label">Full name: </label>
                          <input
                            class="billing-address-name form-control"
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="Full name"
                          />
                          <span id="fullNameError" class="text-danger small"></span>
                        </div>
                        <div class="card_number_grids">
                          <div class="card_number_grid_left">
                            <div class="controls mt-3">
                              <label class="control-label">Mobile number:</label>
                              <input
                                class="form-control"
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                placeholder="Mobile number"
                              />
                              <span id="phoneError" class="text-danger small"></span>
                            </div>
                          </div>
                          <div class="card_number_grid_right">
                          <div class="controls mt-3">
                          <label class="control-label">Email: </label>
                          <input
                            class="form-control"
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email"
                          />
                          <span id="mailError" class="text-danger small"></span>
                        </div>
                          </div>
                          <div class="clear"></div>
                        </div>
                      </div>
                      <div class="controls">
                        <label class="control-label">Tip lica: </label>
                        <div class="row">
                          <input
                          class="ml-3"
                          type="radio"
                          name="clientRadio"
                          value="Pravno"
                          id="clientRadioLegal"
                          /> 
                        <label for="clientRadioLegal" class="ml-2">Pravno lice</label> 
                        <input
                          class="ml-3"
                          name="clientRadio"
                          id="clientRadioPrivate"
                          value="Privatno"
                          type="radio"/> 
                      <label for="clientRadioPrivate" class="ml-2">Privatno lice</label> 
                      
                      </div>
                      <span id="clientError" class="text-danger small"></span>
                    </div>
                      <div class="controls mt-3">
                        <label class="control-label">Address type: </label>
                        <select class="option-w3ls form-control" id="addressType" name="addressType">
                          <option value="0">Choose</option>
                          <option value="office">Office</option>
                          <option value="home">Home</option>
                          <option value="commercial">Commercial</option>
                        </select>

                        <span id="addressTypeError" class="text-danger small"></span>
                      </div>
                    <div class="controls mt-3">
                      <label class="control-label">Town/City: </label>
                      <input
                        class="form-control"
                        type="text"
                        name="deliveryAddress"
                        id="deliveryAddress"
                        placeholder="Town/City"
                      />  
                      <span id="addressError" class="text-danger small"></span>
                    </div>
                    <div class="controls">
                        <div class="row mt-3">
                          <input
                            class="ml-3"
                            type="checkbox"
                            name="terms"
                            id="terms"
                          /> 
                        <label for="terms" class=" ml-2">Terms and conditions</label> 
                    </div>
                    <div class="row">
                      <span id="termsError" class="ml-3 text-danger small"></span>
                    </div>
                      <input type="button" value="Order Now" id="submitOrder" class="submit check_out  mt-3" />
                        
                    </div>
                  </section>
                </form>
              </div> 
          
                `;

    $("#checkoutReciept").html(cartHtml);

    $("#submitOrder").click(submitForm);
    function prikaziNaziv(id, prop, qty = 1) {
      let data = dohvatiLS("articles");
      let naziv = "";

      for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          if (prop == "name") {
            naziv = data[i].name;
          }
          if (prop == "price") {
            naziv = data[i].price.current * qty;

            naziv = parseFloat(naziv).toFixed(2);
          }
        }
      }

      return naziv;
    }

    function prikaziSumu() {
      let suma = 0;
      let artikli = dohvatiLS("articles");
      console.log(cartItems);
      cartItems.forEach((el) => {
        artikli.forEach((elem) => {
          if (el.id == elem.id) {
            suma += elem.price.current * el.qty;
          }
        });
      });
      suma = parseFloat(suma).toFixed(2);
      return suma;
    }
  }
  $("#checkout").html(html);
}
function removeItem(id) {
  // let id = $(this).data("id");

  let cartItems = dohvatiLS("cart");

  console.log(cartItems);
  cartItems = cartItems.filter((x) => x.id != id);

  if (cartItems.length == 0) {
    localStorage.removeItem("cart");
    renderCart();
  } else {
    setLS("cart", cartItems);
  }
  loadCart();
  renderCart();
}
function addItemQty(id) {
  addToCart(id);
  loadCart();
}
function removeItemQty(id) {
  addToCart(id, "remove");
  loadCart();
}
function loadFilters() {
  loadTags();
  loadDiscounts();
  loadBrands();
  loadPrices();
  loadSort();
  function loadTags() {
    let tagovi = dohvatiLS("tags");

    let html = ``;

    tagovi.forEach((t) => {
      html += `<li>
                <input type="checkbox" class="tagCheckbox" name="tag${t.id}" value="${t.id}" id="tag${t.id}" />
                <span class="span">${t.name}</span>
              </li>`;
    });

    $("#filterTags").html(html);
  }
  function loadDiscounts() {
    let discounts = [5, 10, 20, 30];
    let html = ``;
    discounts.forEach((el) => {
      html += `<li>
                <input type="checkbox" class="discountCheckbox" name="discount${el}" value="${el}" id="discount${el}"/>
                <span class="span">${el}% or More</span>
              </li>`;
    });

    $("#filterDiscounts").html(html);
  }
  function loadBrands() {
    let brands = dohvatiLS("brands");

    let html = ``;

    brands.forEach((t) => {
      html += `<li>
                <input type="checkbox" class="brandCheckbox" name="brand${t.id}" value="${t.id}" id="brand${t.id}" />
                <span class="span">${t.name}</span>
              </li>`;
    });

    $("#filterBrands").html(html);
  }
  function loadPrices() {
    let html = ``;
    let items = ["minPrice", "maxPrice"];
    items.forEach((el) => {
      html += `<div class="col">
                <input
                  class="form-control"
                  type="number"
                  name="${el}"
                  id="${el}"
                  min="0"
                  max="100000"
                  placeholder="${el.includes("min") ? "Min" : "Max"}. Price"
                  required=""
                />
              </div>`;
    });
    $("#filterPrices").html(html);
  }
  function loadSort() {
    let params = [
      ["priceDesc", "Price Descending"],
      ["priceAsc", "Price Ascending"],
      ["rating", "Highest Rating"],
      ["nameAsc", "Name Asceding"],
    ];
    let html = `<option value="0">Choose an option</option>`;

    params.forEach((el) => {
      html += `<option value="${el[0]}">${el[1]}</option>`;
    });

    $("#sortItems").html(html);
  }
}
function applyFilters(articles) {
  applySearch();
  applyTags();
  applyDiscounts();
  applyPrice();
  applyBrands();
  applySort();

  return articles;
  function applySearch() {
    var text = $("#searchFilter").val();

    articles = articles.filter((x) =>
      x.name.toLowerCase().trim().includes(text.toLowerCase())
    );
  }
  function applyTags() {
    var tagsId = [];
    for (let i = 0; i < tagovi.length; i++) {
      x = $("#tag" + (i + 1)).is(":checked");

      if (x) {
        tagsId.push(i + 1);
      }
    }
    articles = filterTags(tagsId);
    function filterTags(tags) {
      if (tags.length == 0) {
        return articles;
      } else {
        return articles.filter((x) => {
          return tags.some((y) => {
            return x.tagId == y;
          });
        });
      }
    }
  }
  function applyDiscounts() {
    let discounts = [5, 10, 20, 30];
    var disountsId = [];
    for (let i = 0; i < discounts.length; i++) {
      x = $("#discount" + discounts[i]).is(":checked");
      if (x) {
        disountsId.push(discounts[i]);
      }
    }
    articles = filterDiscounts(disountsId);
    function filterDiscounts(discounts) {
      if (discounts.length == 0) {
        return articles;
      } else {
        return articles.filter((x) => {
          return discounts.some((y) => {
            return x.discount > y;
          });
        });
      }
    }
  }
  function applyPrice() {
    var min = $("#minPrice").val();
    var max = $("#maxPrice").val();

    if (min == "" && max == "") {
      return articles;
    }
    if (max != "") {
      articles = articles.filter((x) => x.price.current < parseInt(max));
    }
    // console.log(max);
    if (min != "") {
      articles = articles.filter((x) => x.price.current > parseInt(min));
    }

    return articles;
  }
  function applyBrands() {
    var brandId = [];
    for (let i = 0; i < brands.length; i++) {
      x = $("#brand" + (i + 1)).is(":checked");

      if (x) {
        brandId.push(i + 1);
      }
    }
    articles = filterTags(brandId);
    function filterTags(brands) {
      if (brands.length == 0) {
        return articles;
      } else {
        return articles.filter((x) => {
          return brands.some((y) => {
            return x.brandId == y;
          });
        });
      }
    }
  }
  function applySort() {
    var sort = $("#sortItems").val();

    if (sort == "priceAsc") {
      return articles.sort((a, b) => a.price.current - b.price.current);
    }
    if (sort == "priceDesc") {
      return articles.sort((a, b) => b.price.current - a.price.current);
    }
    if (sort == "rating") {
      return articles.sort((a, b) => b.rating - a.rating);
    }
    if (sort == "nameAsc") {
      return articles.sort((a, b) => b.name - a.name);
    }
  }
}
function filterEvents() {
  $("#searchFilter").keyup(function () {
    loadArticles();
  });
  $(".tagCheckbox").change(function () {
    loadArticles();
  });
  $(".discountCheckbox").change(function () {
    loadArticles();
  });
  $("#minPrice").keyup(function () {
    loadArticles();
  });
  $("#maxPrice").keyup(function () {
    loadArticles();
  });
  $(".brandCheckbox").change(function () {
    loadArticles();
  });
  $("#sortItems").change(function () {
    loadArticles();
  });
}
function loadFeatures() {
  callback("features.json", function (data) {
    let html = ``;
    let x = $("#featuresWrap").val();
    let y = $("#featuresSecondaryWrap").val();

    if (x == "") {
      data.forEach((el) => {
        if (el.type == 1) {
          html += `<div class="col-lg-4 bottom-sub-grid text-center">
                <div class="bt-icon">
                  <span class="${el.icon}"></span>
                </div>

                <h4 class="sub-tittle-w3layouts my-lg-4 my-3">
                  ${el.title}
                </h4>
                <p>
                  ${el.text}
                </p>
                <p>
                  <a
                    href="${el.button.href}"
                    class="btn btn-sm animated-button gibson-three mt-4"> ${el.button.text}</a>
                </p>
              </div>`;
        }
      });
      $("#featuresWrap").html(html);
    }
    html = ``;
    if (y == "") {
      data.forEach((el) => {
        if (el.type == 2) {
          html += `<div class="col-lg-3 footer-top-w3layouts-grid-sec">
                    <div class="mail-grid-icon text-center">
                      <i class="${el.icon}"></i>
                    </div>
                    <div class="mail-grid-text-info">
                      <h3>${el.title}</h3>
                      <p>${el.text}</p>
                    </div>
                  </div>`;
        }
      });
      $("#featuresSecondaryWrap").html(html);
    }
  });
}
function loadOffer() {
  setInterval(() => {
    let currentDate = new Date();
    let endDate = new Date("2023/3/31");
    let diff = new Date(endDate - currentDate);
    if (diff > 0) {
      let dateText =
        diff.getDate() +
        "d " +
        diff.getHours() +
        "h " +
        diff.getMinutes() +
        "m " +
        diff.getSeconds() +
        "s ";
      $("#simplyCountdown").html(dateText);
    } else {
      $("#simplyCountdown").html("OFFER EXEPRIED");
    }
  }, 1000);
}
function modalOpen() {
  $(".single-modal").click(function () {
    localStorage.setItem("display", $(this).data("id"));
    $("#myModal").modal("show");
    var articles = dohvatiLS("articles");
    let id = $(this).data("id");
    display = articles.filter((x) => x.id == id)[0];
    // $("#modalImage").attr("src", "images/" + display.image.src);
    // $("#productTitle").html("NALOOo");
    // console.log(display);
  });
  $("#myModal").on("show.bs.modal", function () {
    let tren = dohvatiLS("display");
    let articles = dohvatiLS("articles");
    let display = articles.filter((x) => x.id == tren)[0];
    console.log(display);

    const modal = $(this);
    modal
      .find("#modalImage")
      .attr("src", "images/" + display.pictures.main.src);
    modal.find("#productTitle").text(display.name);
    modal.find("#productBrand").text(returnBrandName(display.brandId));
    modal.find("#currentPrice").text("$" + display.price.current);
    modal.find("#articleDesc").text(display.description.text);
  });
}
function loadFooter() {
  setLS("menu");
  var menu = dohvatiLS("menu");
  var year = new Date().getFullYear();
  var html = ` <div class="row footer-top-w3layouts" >
              <div class="col-lg-4 footer-grid-w3ls">
                <div class="footer-title">
                  <h3>About Us</h3>
                </div>
                <div class="footer-text">
                  <p>
                    Curabitur non nulla sit amet nislinit tempus convallis quis ac
                    lectus. lac inia eget consectetur sed, convallis at tellus.
                    Nulla porttitor accumsana tincidunt.
                  </p>
                  <ul class="footer-social text-left mt-lg-4 mt-3">
                    <li class="mx-2">
                      <a href="#">
                        <span class="fab fa-facebook-f"></span>
                      </a>
                    </li>
                    <li class="mx-2">
                      <a href="#">
                        <span class="fab fa-twitter"></span>
                      </a>
                    </li>
                    <li class="mx-2">
                      <a href="#">
                        <span class="fab fa-google-plus-g"></span>
                      </a>
                    </li>
                    <li class="mx-2">
                      <a href="#">
                        <span class="fab fa-linkedin-in"></span>
                      </a>
                    </li>
                    <li class="mx-2">
                      <a href="#">
                        <span class="fas fa-rss"></span>
                      </a>
                    </li>
                    <li class="mx-2">
                      <a href="#">
                        <span class="fab fa-vk"></span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-4 footer-grid-w3ls">
                <div class="footer-title">
                  <h3>Get in touch</h3>
                </div>
                <div class="contact-info">
                  <h4>Location :</h4>
                  <p>0926k 4th block building, king Avenue, New York City.</p>
                  <div class="phone">
                    <h4>Contact :</h4>
                    <p>Phone : +121 098 8907 9987</p>
                    <p>
                      Email :
                      <a href="mailto:info@example.com">info@example.com</a>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 footer-grid-w3ls">
                <div class="footer-title">
                  <h3>Quick Links</h3>
                </div>
                <ul class="links">`;
  menu.forEach((el) => {
    console.log("ccc");
    html += `<li>
      <a href="${el.href}">${el.name}</a>
    </li>`;
  });
  html += `
                </ul>
              </div>
              </div>
              <div class="copyright-w3layouts mt-4">
                <p class="copy-right text-center">
                  &copy; ${year} Goggles. All Rights Reserved 
                </p>
              </div>
              `;
  $("#footerWrap").html(html);
}
function submitForm() {
  let forma = document.orderForm;

  var numGreske = 0;
  let regFullName = /^[A-Z][a-z]{2,13}\s[A-Z][a-z]{2,13}$/;
  let regEmail =
    /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/;
  let regPhone = /^06[0-9]{6,9}\s*$/;
  let regAdresa =
    /^[A-ZČĆŠĐŽ][a-zčćšđž]{1,15}(\s[1-9](?:[AZČĆŠĐŽ]|[a-zčćšđž]))?(\s[A-ZČĆŠĐŽ][a-zčćšđž]{1,15})?(?:\s[0-9]{0,3}|\s[1-9](?:[A-ZČĆŠĐŽ]|[a-zčćšđž]))?\s*$/;

  let name = forma.fullName.value;
  let phone = forma.phoneNumber.value;
  let mail = forma.email.value;
  let client = forma.clientRadio.value;
  let addressType = forma.addressType[forma.addressType.selectedIndex].value;
  let address = forma.deliveryAddress.value;
  let terms = forma.terms.checked;
  console.log(terms);
  if (!regFullName.test(name)) {
    numGreske++;
    $("#fullNameError").html("Neispravan format imena. Npr. Zarko Jovic");
  } else {
    $("#fullNameError").html("");
  }
  if (!regPhone.test(phone)) {
    numGreske++;
    $("#phoneError").html("Neispravan format broja. Npr. 0643334440");
  } else {
    $("#phoneError").html("");
  }
  if (!regEmail.test(mail)) {
    numGreske++;
    $("#mailError").html("Neispravan format emaila. Npr. zarko@gmail.com");
  } else {
    $("#mailError").html("");
  }
  if (client.length == 0) {
    numGreske++;
    $("#clientError").html("Morate da izaberete tip lica.");
  } else {
    $("#clientError").html("");
  }
  if (addressType == 0) {
    numGreske++;
    $("#addressTypeError").html("Morate da izaberete tip adrese.");
  } else {
    $("#addressTypeError").html("");
  }
  if (!regAdresa.test(address)) {
    numGreske++;
    $("#addressError").html("Neispravan format adrese. Npr. Svete Popovic 52");
  } else {
    $("#addressError").html("");
  }
  if (!terms) {
    numGreske++;
    $("#termsError").html("Niste prihvatili uslove koriscenja!");
  } else {
    $("#termsError").html("");
  }
  console.log(numGreske);
  if (numGreske == 0) {
    forma.reset;
    localStorage.removeItem("cart");
    loadCart();
    $("#successForm").html("Uspesno si porucio!");
  }
}
var tagovi = dohvatiLS("tags");
var brands = dohvatiLS("brands");

var url = location.pathname;

window.onload = function () {
  setLS("articles");
  setLS("tags");
  setLS("brands");
  renderCart();
  ucitajNav();
  loadFooter();
  let preloader = document.getElementById("preloader");
  preloader.classList.add("opacity-0");
  function disappear() {
    preloader.classList.add("d-none");
  }
  setTimeout(disappear, 600);
  if (url == "/" || url == "/index.html") {
    ucitajCover();
    loadArticles(0, 4);
    getTestimonials();
    loadFeatures();
    modalOpen();
    loadOffer();
  }
  if (url == "/checkout.html") {
    loadCart();
    $("#submitOrder").click(submitForm);
  }
  if (url == "/shop.html") {
    loadFilters();
    loadArticles();
    filterEvents();
    modalOpen();
  }
  if (url == "/about.html") {
  }
};
