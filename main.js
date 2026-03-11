const tbodyEl = document.querySelector("tbody");
const tfootEl = document.querySelector("tfoot");
let count = 1;
let totalPrice = 0;
let userOrderInfo = {};

//add data to the tfoot
function addDataToFooter(price) {
    tfootEl.innerHTML = `
        <tr>
            <td colspan="2"><strong>Total Price</strong></td>
            <td>₹${Number(price)}</td>
        </tr>
    `;
}
function addPngtotable(){
    const emptyCart = document.getElementById("empty-cart");
    if(tbodyEl.nodeValue){
        emptyCart.style.display = "none"
    }
}

//add data to tbody 
function addServiceToTable(btn) {
    const emptyCart = document.getElementById("empty-cart");
    const price = Number(btn.value);
    const service = btn.parentElement.querySelector(".name-of-service").innerText;

    if (btn.classList.contains("added")) {
        totalPrice -= price;
        btn.row.remove();
        delete userOrderInfo[service];
        btn.classList.remove("added");
        btn.innerHTML = `Add item <ion-icon name="add-circle-outline"></ion-icon>`;
        btn.style.color = "#1ab4ec";
        count--;
    } else {
        const row = document.createElement("tr");
        row.innerHTML += `
            <td>${count}</td>
            <td>${service}</td>
            <td>₹${price}</td>
        `;
        tbodyEl.appendChild(row);
        btn.row = row;
        totalPrice += price;
        count++;
        userOrderInfo[service] = price;
        addPngtotable();
        btn.classList.add("added");
        btn.innerHTML = `Remove item <ion-icon name="remove-circle-outline"></ion-icon>`;
        btn.style.color = "red";
    }
    addDataToFooter(totalPrice);
};
function sendMail(event) {
    event.preventDefault();

    const phone = document.getElementById("phone").value;
    const names = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (phone !== "" && names !== "" && email !== "") {
        // send mail
        console.log("Mail sent");
    } else {
        alert("Enter contact details");
    }
}


emailjs.init({
    publicKey: "SXlD_oiGsUzoiUdMd"
});

function sendMail(event) {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (!name || !email) {
        alert("Enter contact details");
        return;
    }

    const orderText = Object.entries(userOrderInfo)
        .map(([service, price]) => `${service} : ₹${price}`)
        .join("\n");

    const templateParams = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        title: "Laundry Service Order",
        userOrder: orderText,
        totalAmount: `Total Amount : ₹${totalPrice}`,
    };

    emailjs.send("service_d3u7fe6", "template_1jluh99", templateParams)
        .then(
            (response) => {
                console.log('SUCCESS!', response.status, response.text);
            },
            (error) => {
                console.log('FAILED...', error);
            },
        );
}