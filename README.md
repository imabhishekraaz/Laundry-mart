# 🧺 Laundry Service Booking Website

A simple **Laundry Service Booking Web Application** built using **HTML, CSS, and JavaScript**.
Users can select laundry services, add them to a cart, see the total price, and book the service.
The booking details are sent via **EmailJS** directly to the service provider.

---

# 📌 Features

* 🧾 **Service Selection**

  * Users can select laundry services from a list.

* 🛒 **Add to Cart**

  * Services can be added to a dynamic cart table.

* 💰 **Automatic Total Calculation**

  * Total price updates automatically when services are added.

* 📧 **Email Booking System**

  * Booking details are sent via **EmailJS**.

* 📱 **Responsive Layout**

  * Works on desktop and mobile screens.

---

# 🛠️ Technologies Used

| Technology | Purpose                  |
| ---------- | ------------------------ |
| HTML       | Structure of the website |
| CSS        | Styling and layout       |
| JavaScript | Dynamic functionality    |
| EmailJS    | Sending booking emails   |
| Ionicons   | Icons used in UI         |

---

# 📂 Project Structure

```
Laundry-Service-Website
│
├── index.html        # Main HTML file
├── style.css         # Website styling
├── main.js           # JavaScript logic
├── resources/        # Images and assets
└── README.md         # Project documentation
```

---

# ⚙️ How It Works

### 1️⃣ Select Services

Users click **Add item** to add laundry services.

### 2️⃣ Cart Updates

The service appears in the cart table with:

* Serial number
* Service name
* Price

### 3️⃣ Total Calculation

The total price is automatically calculated and displayed.

### 4️⃣ Book Service

Users enter their:

* Name
* Email
* Phone number

Then click **Book Now**.

### 5️⃣ Email Sent

Using **EmailJS**, the order details are sent to the email.

Example Email:

```
Hi John,

Your Laundry Service Order:

Dry Cleaning : ₹200
Ironing : ₹30

Best regards,
Laundry Team
```

---

# 🚀 How to Run the Project

1. Clone the repository

```
git clone https://github.com/your-username/laundry-service.git
```

2. Open the folder

```
cd laundry-service
```

3. Open **index.html** in your browser.

---

# 📧 EmailJS Setup

1. Create an account at
   https://www.emailjs.com/

2. Create:

* Email Service
* Email Template

3. Add template variables:

```
{{name}}
{{email}}
{{title}}
{{userOrder}}
```

4. Replace your keys in `main.js`:

```javascript
emailjs.init({
  publicKey: "YOUR_PUBLIC_KEY"
});

emailjs.send(
  "YOUR_SERVICE_ID",
  "YOUR_TEMPLATE_ID",
  templateParams
);
```

---

# 📸 Preview

The website includes sections for:

* Home
* Services
* Cart Table
* Booking Form
* About
* Contact
* Footer

---

# 🔮 Future Improvements

* Add remove service functionality
* Store orders in a database
* Add payment integration
* Add admin dashboard
* Improve UI animations

---

# 👨‍💻 Author

**Abhishek Raj**

Software Developer
Interested in **Web Development**


⭐ If you like this project, consider giving it a **star on GitHub**.
