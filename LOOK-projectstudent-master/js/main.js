const customersList = document.querySelector(".customers-list"),
  foodsSelect = document.querySelector("#foodsSelect"),
  ordersList = document.querySelector(".orders-list"),
  clientId = document.querySelector("#clientId"),
  customerName = document.querySelector("#userHeader"),
  userAdd = document.querySelector("#userAdd"),
  userNameInput = document.querySelector("#usernameInput"),
  telephoneInput = document.querySelector("#telephoneInput"),
  foodsForm = document.querySelector("#foodsForm"),
  foodsCount = document.querySelector("#foodsCount");

let activeUserId = null;



const loadFromStorage = () => {
  const storedUsers = localStorage.getItem("users");
  const storedOrders = localStorage.getItem("orders");

  if (storedUsers) users = JSON.parse(storedUsers);
  if (storedOrders) orders = JSON.parse(storedOrders);
};

const saveToStorage = () => {
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("orders", JSON.stringify(orders));
};



const renderUsers = () => {
  customersList.innerHTML = "";

  users.forEach(user => {
    const [li, span, a] = createElement("li", "span", "a");

    li.className = "customer-item";
    span.className = "customer-name";
    a.className = "customer-phone";

    span.textContent = user.userName;
    a.textContent = user.contact;
    a.href = `tel:${user.contact}`;

    li.addEventListener("click", () => {
      activeUserId = user.userId;
      clientId.textContent = user.userId;
      customerName.textContent = user.userName;
      renderOrders();
    });

    li.append(span, a);
    customersList.append(li);
  });
};



const renderFoods = () => {
  foodsSelect.innerHTML = "";

  foods.forEach(food => {
    const option = document.createElement("option");
    option.value = food.foodId;
    option.textContent = food.foodName;
    foodsSelect.append(option);
  });
};



const renderOrders = () => {
  ordersList.innerHTML = "";

  if (!activeUserId) return;

  orders
    .filter(order => order.userId === activeUserId)
    .forEach(order => {
      const food = foods.find(f => f.foodId === order.foodId);

      const [li, img, div, name, count] =
        createElement("li", "img", "div", "span", "span");

      li.className = "order-item";
      name.className = "order-name";
      count.className = "order-count";

      img.src = `./img/${food.foodImg}`;
      name.textContent = food.foodName;
      count.textContent = order.count;

      div.append(name, count);
      li.append(img, div);
      ordersList.append(li);
    });
};



userAdd.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = userNameInput.value.trim();
  const phone = telephoneInput.value.trim();
  const phoneRegex = /^\+998\d{9}$/;

  if (name.length < 3 || name.length > 20) {
    alert("Ism kamida 3 ta va ko‘pi bilan 20 ta harf bo‘lsin");
    return;
  }

  if (!phoneRegex.test(phone)) {
    alert("Telefon raqam noto‘g‘ri. Masalan: +998901234567");
    return;
  }

  users.push({
    userId: users.length ? users[users.length - 1].userId + 1 : 1,
    userName: name,
    contact: phone
  });

  saveToStorage(); 
  renderUsers();
  userAdd.reset();
});



// foodsForm.addEventListener("submit", e => {
//   e.preventDefault();

//   if (!activeUserId) {
//     alert("Avval mijoz tanlang!");
//     return;
//   }

//   orders.push({
//     userId: activeUserId,
//     foodId: Number(foodsSelect.value),
//     count: Number(foodsCount.value)
//   });

//   saveToStorage(); 
//   foodsCount.value = "";
//   renderOrders();
// });

// foodsForm.addEventListener("submit", e => {
//   e.preventDefault();

//   if (!activeUserId) {
//     alert("Avval mijoz tanlang!");
//     return;
//   }

//   const countValue = Number(foodsCount.value);
  
//   if (isNaN(countValue) || countValue <= 0) {
//     alert("Iltimos, 0 dan katta son kiriting");
//     return;
//   }

//   orders.push({
//     userId: activeUserId,
//     foodId: Number(foodsSelect.value),
//     count: countValue
//   });

//   saveToStorage(); 
//   foodsCount.value = "";
//   renderOrders();
// });

foodsForm.addEventListener("submit", e => {
  e.preventDefault();

  if (!activeUserId) {
    alert("Avval mijoz tanlang!");
    return;
  }

  const count = Number(foodsCount.value);

  if (count <= 0 || isNaN(count)) {
    alert("Miqdor 1 dan katta bo‘lishi kerak!");
    return;
  }

  orders.push({
    userId: activeUserId,
    foodId: Number(foodsSelect.value),
    count: count
  });

  saveToStorage(); 
  foodsCount.value = "";
  renderOrders();
});





loadFromStorage(); 
renderUsers();
renderFoods();

