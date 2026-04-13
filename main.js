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


// Add the message when the no data in the table
function addPngtotable() {
    let emptyCart = document.getElementById("empty-cart");

    if (!emptyCart) {
        emptyCart = document.createElement("tr");
        emptyCart.className = "empty-cart";
        emptyCart.id = "empty-cart";

        emptyCart.innerHTML = `
            <td colspan="3">
                <ion-icon name="alert-circle-outline"></ion-icon>
                <p>No Items Added</p>
                <p>Add Items to the cart from the service bar</p>
            </td>
        `;

        tbodyEl.appendChild(emptyCart);
    }

    if (Object.keys(userOrderInfo).length == 0) {
        emptyCart.style.display = "flex";
    } else {
        emptyCart.style.display = "none";
    }
}

// add data to tbody 
// function addServiceToTable(btn) {
//     const price = Number(btn.value);
//     const service = btn.parentElement.querySelector(".name-of-service").innerText;

//     if (btn.classList.contains("added")) {
//         totalPrice -= price;
//         btn.row.remove();
//         delete userOrderInfo[service];
//         btn.classList.remove("added");
//         btn.innerHTML = `Add item <ion-icon name="add-circle-outline"></ion-icon>`;
//         btn.style.color = "#1ab4ec";
//         addPngtotable();
//         count--;
//     } else {
//         const row = document.createElement("tr");
//         row.innerHTML += `
//             <td>${count}</td>
//             <td>${service}</td>
//             <td>₹${price}</td>
//         `;

//         tbodyEl.appendChild(row);

//         btn.row = row;
//         totalPrice += price;
//         count++;
//         userOrderInfo[service] = price;
//         addPngtotable();

//         btn.classList.add("added");
//         btn.innerHTML = `Remove item <ion-icon name="remove-circle-outline"></ion-icon>`;
//         btn.style.color = "red";
//     }
//     addDataToFooter(totalPrice);
// };
function addServiceToTable(btn) {
    const price = Number(btn.value);
    const service = btn.parentElement.querySelector(".name-of-service").innerText;

    // Add the service when the use click on the add items
    userOrderInfo[service] = price;
    // Remove the items on the table when the user click on remove item
    if (btn.classList.contains("added")) {
        totalPrice -= price;
        btn.row.remove();
        delete userOrderInfo[service];
        btn.classList.remove("added");
        btn.innerHTML = `Add item <ion-icon name="add-circle-outline"></ion-icon>`;
        btn.style.color = "#1ab4ec";
        addPngtotable();
        count--;
    } else {
        const row = document.createElement("tr");
        
        for(let value in userOrderInfo){
            row.innerHTML += `
                <td>${count}</td>
                <td>${value}</td>
                <td>₹${userOrderInfo[value]}</td>
            `;
            tbodyEl.appendChild(row);
            count++;
        }
        btn.row = row;
        totalPrice += price;
        
        // userOrderInfo[service] = price;
        addPngtotable();

        btn.classList.add("added");
        btn.innerHTML = `Remove item <ion-icon name="remove-circle-outline"></ion-icon>`;
        btn.style.color = "red";
    }
    addDataToFooter(totalPrice);
};
// Add the nav links when the user click on the three links 
function threeLinks(){
    // fetch both elements to change the display properties 
    const navLinksOnShow = document.getElementById("second-header");

    if(!navLinksOnShow.classList.contains("#added")){
        navLinksOnShow.classList.add("#added");
        navLinksOnShow.style.display="block";
    }else{
        navLinksOnShow.classList.remove("#added");
        navLinksOnShow.style.display="none";
    }
    

}

// Pop up msg after mail has been send successfully
function popUpMessage(){
    const contactDetailsElement = document.getElementById("popmsg");
    const popUpMsg = document.createElement("p");
    popUpMsg.innerHTML='<ion-icon name="checkmark-done-outline"></ion-icon>Mail has been send successfully';
    contactDetailsElement.appendChild(popUpMsg);
    setTimeout(()=>{
        popUpMsg.innerText="";
        contactDetailsElement.removeChild(popUpMsg);
    },3000);

}


// Reset the value after form has submited
function resetValues() {
    document.getElementById("phone").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.querySelector("tfoot").innerText = "";

    for (let data in userOrderInfo) {
        delete userOrderInfo[data];
    }
    
    tbodyEl.innerHTML = "";
    addPngtotable();
    document.querySelectorAll("#btns").forEach((el) => {
        el.innerHTML = `Add item <ion-icon name="add-circle-outline"></ion-icon>`;
        el.style.color = "#1ab4ec";
    })

}
// send a mail
emailjs.init({
    publicKey: "SXlD_oiGsUzoiUdMd"
});

function sendMail(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    if (!name || !email || !phone) {
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
                popUpMessage();
                console.log('SUCCESS!', response.status, response.text);
            },
            (error) => {
                console.log('FAILED...', error);
            },
        );
    resetValues();
}
addPngtotable();