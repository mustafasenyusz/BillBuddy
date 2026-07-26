# BillBuddy

> A polished mobile workspace for organizing bills, due dates, and personal payment history.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat-square&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white)

## Overview

BillBuddy is one of my frontend-focused React Native projects. It combines typed state management, persistent local data, file-based navigation, and a detailed mobile interface in a complete bill-management experience.

## Product features

- Register and sign in through a structured onboarding flow
- Add bills with payment details and due dates
- Review active and historical bill records
- Update account data and password within the local app flow
- Restore user and bill state after restarting the application
- Access help, FAQ, product, and developer information screens

## Frontend focus

The project is designed around reusable screens, clear visual hierarchy, responsive layouts, and predictable state transitions. Redux slices isolate user and bill operations, while Redux Persist and AsyncStorage provide a continuous local experience.

## Tech stack

| Area | Technology |
| --- | --- |
| Mobile UI | React Native, Expo |
| Language | TypeScript |
| Navigation | Expo Router |
| State | Redux Toolkit, React Redux |
| Persistence | Redux Persist, AsyncStorage |
| UI details | Expo Blur, Haptics, Lucide icons |

## Project structure

```text
app/       authentication, dashboard, bills, support screens
store/     user and bill slices, store configuration
assets/    application branding
constants/ shared theme values
```

## Run locally

```bash
git clone https://github.com/mustafasenyusz/BillBuddy.git
cd BillBuddy
npm install
npx expo start
```

## Next steps

- Add automated tests for reducers and important user flows
- Introduce reusable form and feedback components
- Improve validation and accessibility
- Connect the client to an API-backed account and bill service

## Developer

Built by [Mustafa Şenyüz](https://github.com/mustafasenyusz), focused on React Native frontend development and growing full-stack skills.
