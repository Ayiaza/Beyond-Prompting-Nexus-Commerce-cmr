## NEXUS COMMERCE
Nexus Commerce is an e-commerce website with a built-in mini CRM, HTML, CSS and JavaScript.
Customers can browse and buy products, while Admins manage customers, orders and sales from one dashboard.
## ✨ Features

### 🛍️ Storefront
- Product grid with 8 sample products
- Live search and category filter
- Shopping cart with add, remove and quantity controls
- Checkout with name and email validation
- Automatic order creation after checkout

### 📇 Mini CRM (CRM Admin tab)
- **Dashboard:** total revenue, number of orders, customers and VIPs, plus top customers
- **Customers:** created automatically at checkout, with a status (New, Active, VIP, Inactive) and follow-up notes
- **Orders:** full order list with status updates (Pending, Shipped, Delivered, Cancelled)
- **Smart rules:** customers who spend $200 or more become VIP; repeat customers become Active
- **Demo data:** one click to load sample customers and orders, and a reset button to clear everything

### ⚙️ Technical highlights
- Data saved in the browser with `localStorage`, so no backend or database is needed
- Responsive layout that works on mobile and desktop
- Automatic light and dark theme
- User input is HTML-escaped to prevent injection
- No frameworks, no build step, no dependencies

---

## 🧰 Tech Stack
| Part | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (Grid, Flexbox, CSS variables) |
| Logic | Vanilla JavaScript (ES6) |
| Storage | Browser `localStorage` |
| Hosting | GitHub Pages |

---

## 📁 Project Structure
```
nexus-commerce/
├── index.html           # Page structure
├── css/
│   └── style.css        # Styling and themes
├── js/
│   └── app.js           # Shop, cart, checkout and CRM logic
├── docs/
│   └── screenshots/     # Project screenshots
├── PROMPTS.md           # Prompt documentation
├── LICENSE
└── README.md
```

---

## 🔄 How It Works
1. A customer adds products to the cart and enters their name and email at checkout.
2. The app creates the order, and creates a customer record if the email is new.
3. The customer appears in the CRM with a status, and the dashboard numbers update.
4. The admin can change customer status, add notes, and update order status.

---

## 📝 Prompt Documentation
The prompts used to build this project, with refinements and lessons learned, are in [PROMPTS.md](PROMPTS.md).

## 🚀 Future Improvements
- Real backend and database (Supabase or Node/Express)
- Admin login and user accounts
- Product management from the admin panel
- Payment integration

## 📄 License
MIT
## ▶️ Execution 
[Screen Recording 2026-11-14 224335.zip](https://github.com/user-attachments/files/34857585/Screen.Recording.2026-11-14.224335.zip)

## ▶️ Screenshots
<img width="950" height="494" alt="image" src="https://github.com/user-attachments/assets/b50bd14e-b848-417f-9c13-9993714eba0e" />

<img width="944" height="458" alt="image" src="https://github.com/user-attachments/assets/e0c0b4b1-1ff6-4ac8-943b-d4534d15542d" />
