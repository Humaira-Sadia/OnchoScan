# OnchoScan — Multimodal Breast Cancer Diagnosis System

A multimodal deep learning web application for breast cancer diagnosis, combining ultrasound imaging with patient clinical metadata to generate AI-powered diagnostic reports.

> M.Tech Research Project · 2027

> Project Live Link : https://oncho-scan.vercel.app/

> Github Repo : https://github.com/Humaira-Sadia/OnchoScan

---

## Overview

OnchoScan integrates two data modalities — ultrasound scan images and structured patient clinical data — through a feature fusion module to improve classification accuracy over single-modality systems.

| Model Component       | Details                        |
|-----------------------|--------------------------------|
| Image backbone        | EfficientNet-B4                |
| Segmentation          | U-Net (Dice: 88.7%)            |
| Clinical processing   | MLP (Fully Connected)          |
| Fusion strategy       | Concatenation                  |
| Dataset               | BUSI (Breast Ultrasound Images)|
| Classification        | Benign / Malignant / Normal    |

---

## Features

- **Ultrasound upload** — drag-and-drop DICOM, PNG, JPEG, or NIfTI files
- **Patient form** — age, BI-RADS score, family history, hormonal status
- **AI analysis** — runs segmentation, feature extraction, and multimodal fusion
- **Diagnostic report** — classification probabilities, confidence score, evaluation metrics
- **Export** — download a `.txt` diagnostic report
- **Responsive UI** — split-panel layout, animated image slider, sticky header

---

## Tech Stack

**Frontend**
- React 18 + Vite
- CSS (custom, no UI library)
- Fonts: Sora, DM Mono (Google Fonts)

**AI / Backend (research)**
- Python · PyTorch
- EfficientNet-B4 · U-Net · MLP Fusion
- Dataset: BUSI

---

## Project Structure

```
oncoscan/
├── public/
│   └── logo.png
├── src/
│   ├── assets/
│   │   └── logo.png
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Diagnosis.jsx
│   │   ├── Report.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/oncoscan.git
cd oncoscan

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## Usage

1. Open the app and upload an ultrasound scan (DICOM / PNG / JPEG)
2. Fill in patient details — age, BI-RADS score, family history
3. Click **Run analysis**
4. View the diagnostic report — confidence score, class probabilities, evaluation metrics
5. Click **Export report** to download a `.txt` summary


---

## Disclaimer

> This system is AI-generated and intended for **research purposes only**.
> It does not replace professional medical diagnosis.
> All reports require clinical validation by a qualified radiologist or physician.

---

## License

MIT License — see [LICENSE](./LICENSE) for details.