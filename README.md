# 💼 Job Tracker

A clean, minimal mobile app built with **React Native & Expo** to help you stay on top of your job search — track applications, monitor statuses, and never lose sight of an opportunity.

---

## 📱 Features

- **Add & Edit Jobs** — Log job applications with company name, position, and status
- **Status Tracking** — Mark each application as `Applied`, `Interview`, `Offer`, or `Rejected`
- **Filter by Status** — Quickly view jobs by their current stage
- **Stats Dashboard** — At-a-glance counts for each status category
- **Persistent Storage** — Data is saved locally using AsyncStorage, so nothing is lost between sessions
- **FAQ Screen** — Built-in help section for new users
- **Dark UI** — Sleek dark theme designed for readability

---

## 🗂️ Project Structure

```
app/
├── (tabs)/
│   ├── _layout.tsx       # Tab navigator (Jobs, Analytics, Settings)
│   ├── index.tsx         # Main job list + add/edit/delete
│   ├── analytics.tsx     # Analytics screen
│   ├── settings.tsx      # Settings screen
│   └── explore.tsx       # FAQ screen
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/job-tracker.git
cd job-tracker

# Install dependencies
npm install

# Start the development server
npx expo start
```

Then scan the QR code with the **Expo Go** app on your phone, or press `i` for iOS simulator / `a` for Android emulator.

---

## 🛠️ Built With

| Tech | Purpose |
|------|---------|
| [React Native](https://reactnative.dev/) | Mobile framework |
| [Expo](https://expo.dev/) | Development platform |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | Local data persistence |
| [Expo Router](https://docs.expo.dev/router/introduction/) | File-based navigation |
| [Ionicons](https://ionic.io/ionicons) | Tab bar icons |

---

## 📊 Status Types

| Status | Color | Meaning |
|--------|-------|---------|
| 🔵 Applied | Blue | Application submitted |
| 🟡 Interview | Amber | Interview scheduled or ongoing |
| 🟢 Offer | Green | Offer received |
| 🔴 Rejected | Red | Application closed |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---