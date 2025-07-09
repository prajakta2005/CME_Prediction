# ☀️ Halo CME Prediction Website

This is a solar-themed web dashboard built to visualize and predict Halo Coronal Mass Ejection (CME) events using particle data from the SWIS-ASPEX payload onboard Aditya-L1. The project helps identify CME events through derived parameters, visualization, and early warning indicators.

---

## 🌐 Live Features (Hardcoded Demo)
- Date and time input to check for CME event data
- Last known CME event summary
- Dynamic visualizations (Flux, Speed, Density, Temperature, etc.)
- Technical details and Parker Spiral impact estimation
- Model comparison and alert section

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/halo-cme-website.git
   cd halo-cme-website/cme_website_version_2/project

2. **Install dependencies**
   ```bash
   npm install

3. **Run the dev server**
   ```bash
   npm run dev

4. **Open in browser**
   ```bash
   http://localhost:5173

## 📦 Tech Stack

- **Frontend:** React + TypeScript  
- **Styling:** TailwindCSS  
- **Visualization:** Recharts / Custom SVG Charts  
- **Bundler:** Vite  

---

## 📁 Project Structure
    ```
    project/
    ├── public/               # Static assets
    ├── src/                  # Main app source
    │   ├── components/       # Dashboard and chart components
    │   ├── charts/           # Derived graphs
    │   ├── assets/           # Images and visuals
    ├── index.html            # Root HTML
    ├── vite.config.ts        # Vite config
    └── tailwind.config.js    # Tailwind styling


---

## 📌 Notes

- This is a demo version; actual data connection can be integrated later.
- Images and values are static or mock for now — you can replace with live API or particle datasets.

---

## 📄 License

MIT – feel free to use or modify with credit!
