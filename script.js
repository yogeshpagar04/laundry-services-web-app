let cart = [];
let total = 0;

const cartItems = document.getElementById("cartItems");
const totalDisplay = document.getElementById("total");

document.getElementById("scrollBtn")
.addEventListener("click", () => {

  document.getElementById("services")
  .scrollIntoView({
    behavior: "smooth"
  });

});

function addItem(name, price){

  cart.push({name, price});

  total += price;

  updateCart();

}

function removeItem(name, price){

  const index = cart.findIndex(
    item => item.name === name
  );

  if(index !== -1){

    cart.splice(index,1);

    total -= price;

    updateCart();
  }

}

function updateCart(){

  cartItems.innerHTML = "";

  cart.forEach(item => {

    const li = document.createElement("li");

    li.textContent =
      `${item.name} - ₹${item.price}`;

    cartItems.appendChild(li);

  });

  totalDisplay.textContent = total;

}

(function () {
  emailjs.init("YOUR_PUBLIC_KEY");
})();

function sendMail(){

  const name =
    document.getElementById("name").value;

  const email =
    document.getElementById("email").value;

  const phone =
    document.getElementById("phone").value;

  if(
    name === "" ||
    email === "" ||
    phone === ""
  ){
    alert("Please fill all fields");
    return;
  }

  const templateParams = {

    customer_name: name,
    customer_email: email,
    customer_phone: phone,
    order_items: cart.map(
      item => item.name
    ).join(", "),

    total_amount: total

  };

  emailjs.send(
    "YOUR_SERVICE_ID",
    "YOUR_TEMPLATE_ID",
    templateParams
  )
  .then(() => {

    alert("Booking Successful!");

  })
  .catch((error) => {

    console.log(error);

    alert("Failed to send email");

  });

}
