// This repo only implements the ticketing functionality other repos are comping out soon!!
# 🎟️ Veritix: A Web3-Based Ticketing Ecosystem and Safety Device

An end-to-end decentralized solution for secure ticketing and real-time crowd safety monitoring, combining **NFT-based blockchain ticketing**, **BLE-enabled smart wearables**, and **AI-driven analytics**.

---

## 📌 Abstract

The event industry faces massive losses due to ticket fraud (~$8B annually) and tragic incidents caused by crowd mismanagement. **Veritix** addresses these dual challenges through a **Web3 ticketing system** and a **BLE-powered smart wearable** that ensures transparency, security, and real-time safety.

The project uses:
- **NFTs** to secure tickets on the blockchain.
- **Custodian wallets + Secure Enclave** to prevent unauthorized resale.
- **Smart BLE wearables** to monitor crowd density and physiological stress.
- **Emergency buttons with GPS**, haptic alerts, and cloud-based dashboards for rapid response.

---

## 🧱 Architecture Overview

### 1. 🔗 Blockchain-Based NFT Ticketing System

- **User Onboarding**:
  - Secure registration
  - UPI-integrated payments via custodian wallet

- **Ticket Generation**:
  - NFTs minted with event metadata
  - Metadata stored securely in a Secure Shell Enclave (SSE)

- **Verification & Entry**:
  - Dynamic QR codes at entry points
  - On-the-spot decryption and validation by hardware-based scanners

---

### 2. 🩺 BLE Smart Wearable Safety System

- **Hardware Components**:
  - NRF52840 SoC with BLE
  - Heart rate sensor
  - GPS module
  - Emergency button
  - Vibration motor
  - Li-Po battery + charging module

- **Functionality**:
  - Tracks real-time heart rate and crowd proximity
  - BLE mesh forms dynamic crowd maps
  - Alerts triggered for abnormal vitals or overcrowding

---

### 3. ☁️ Oragniser Analytics & Safety Dashboard

- BLE scanners forward wearable data to the cloud
- AI detects anomalies (stress, density spikes)
- Haptic feedback alerts users + notifies organizers
- Web dashboard shows real-time crowd health and locations

---

## 📦 Tech Stack

| Layer | Technology |
|------|------------|
| Blockchain | Solidity, Hardhat, Polygon |
| Backend | Node.js, Express |
| Frontend | React, TailwindCSS |
| Mobile | Swift (iOS) |
| IoT | NRF52840, BLE, GPS, Sensors |
| Cloud | AWS / Firebase |
| AI | Python, TensorFlow / PyTorch (event recommendation) |
| Web3 | Ethers.js, MetaMask integration |

---

## 🎯 Objectives & Deliverables

✅ NFT-based ticketing  
✅ UPI + custodian wallet integration  
✅ iOS app with AI personalization  
✅ BLE smart bands for vitals and GPS  
✅ Cloud-based dashboard with live metrics  
✅ Emergency alert system with haptic and GPS triggers

---

## 📁 Project Structure

Veritix/ ├── client/ # React Frontend ├── server/ # Express Backend ├── contracts/ # Solidity Smart Contracts ├── wearable/ # Embedded code for BLE wearable ├── dashboard/ # Cloud analytics and admin UI └── README.md

yaml
Copy
Edit

---

## 🧪 Methodology

- 🧠 Research: Literature review on NFT ticketing and BLE crowd safety
- 💻 Software:
  - Smart contracts, iOS app, payment and auth, AI personalization
- ⚙️ Hardware:
  - Sensor integration, gateway nodes, real-time cloud data flow
- 🧪 Testing:
  - Unit, system, and real-world user acceptance simulations

---

## 💰 Cost Overview (Prototype)

| Component | Cost (INR) |
|-----------|------------|
| NRF52840 SoC | 1000 |
| Heart Rate Sensor | 300 |
| GPS Module | 1000 |
| Vibration Motor | 100 |
| BLE Gateway + LoRa | 3800 |
| Battery + Power Mgmt | 320 |
| Smart Contract Deployment | 1500 |
| Misc | 1980 |
| **Total** | **~₹10,000** |

---
