# Tenfold Events Landing Page

A modern, mobile-first landing page for Tenfold Events, built with React and Vite. The site highlights the brand’s mascot entertainment, catering, and full event management services with a polished visual design, image galleries, and direct contact actions for WhatsApp, phone, email, and Instagram.

## Overview

Tenfold Events is a service-focused business website created to showcase events, celebrations, and hospitality offerings. The landing page is designed to help visitors quickly understand the services, browse gallery content, and get in touch with the business.

## Features

- Responsive landing page for mobile and desktop
- Three service sections:
  - Mascot Entertainment
  - Catering
  - Full Event Management
- Elegant brand styling with custom themes per service
- Image gallery sections for each category
- Contact options via phone, WhatsApp, email, and Instagram
- Bootstrap-based layout with custom CSS for premium visuals
- Fast local development using Vite

## Tech Stack

- React 19
- Vite
- Bootstrap 5
- CSS custom styling
- JavaScript (ES modules)

## Project Structure

```bash
.
├── public/
│   └── images/
│       ├── catering/
│       ├── event/
│       ├── mascot/
│       └── logo.png
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── assets/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (18 or later recommended)
- npm

### Installation

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal, typically:

```bash
http://localhost:5173
```

### Production build

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Customization

The main content and business information are managed in the React app file:

- `src/App.jsx`

You can customize:

- Business name and contact information
- Phone numbers and WhatsApp number
- Email address
- Instagram profile and link
- Service titles and descriptions
- Gallery items and image paths
- Hero content and promotional text

### Image assets

Place all site images inside the appropriate folders:

- `public/images/mascot/`
- `public/images/catering/`
- `public/images/event/`
- `public/images/logo.png`

The app already supports image fallbacks, so if an image is missing, the layout will still render smoothly.

## Business Information

The default brand details are:

- Business: Tenfold Events
- Email: eventtenfold@gmail.com
- Instagram: @tenfold*events*
- WhatsApp: +91 95914 46918

## Scripts

```bash
npm run dev     # start development server
npm run build   # create production build
npm run preview # preview production build
npm run lint    # run eslint checks
```

## Notes

This project is structured as a lightweight marketing website for a local events business. It is easy to extend with more sections such as:

- testimonials
- pricing packages
- booking form
- Google Maps section
- portfolio highlights
- blog/news updates

## License

This project is currently unlicensed unless you add a specific license file for public or commercial use.

## Contact

For updates or enhancements, contact the project owner or update the business information in `src/App.jsx`.

---

Built for Tenfold Events with React + Vite.
