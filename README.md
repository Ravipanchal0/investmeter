# 📊 InvestMeter

A simple and interactive investment calculator built with React that helps users estimate returns for **SIP (Systematic Investment Plan)**, **Lumpsum investments** and **EMI Simplification**.

---

## 🚀 Features

- 📈 Calculate **maturity amount**, **total invested**, and **interest earned**
- 🔄 Switch between **SIP**, **Lumpsum** and **EMI**
- 🎯 Real-time updates as you adjust inputs
- 🎨 Clean and responsive UI
- ⚡ Optimized for performance

---

## 🛠️ Tech Stack

- **React**
- **Tailwind CSS**
- **React Icons**
- JavaScript (ES6+)

---

## 📂 Project Structure

```
src/
│
├── components/
│   ├── Header.jsx
│   ├── InputFrame.jsx
│   ├── EmiTable.jsx
│   ├── Result.jsx
│   ├── Button.jsx
│   └── utilitiesFunc.js
│
├── assets/
│   └── Logo.svg
│
├── App.jsx
└── main.jsx
```

---

## 🧮 How It Works

### SIP Formula

```
M = P × ((1 + r)^n - 1) / r × (1 + r)
```

### Lumpsum Formula

```
M = P × (1 + r)^t
```

### EMI Formula

```
P × r × (1 + r)^n / ((1 + r)^n - 1)
```

Where:

- `P` = Investment amount
- `r` = Rate of return
- `n` = Total months
- `t` = Time in years

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/Ravipanchal0/investmeter.git

# Navigate to project folder
cd investmeter

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📦 Build for Production

```bash
npm run build
```

---

## 📊 Performance

- Optimized with:
  - `React.memo`
  - `useMemo`
  - Reduced bundle size
  - Lightweight icon library

---

## 🎯 Future Improvements

- 📊 Advanced analytics

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🙌 Acknowledgements

- Inspiration from real-world financial tools
- Built for learning and performance optimization

---
