<p align="center">
  <img src="public/ana.svg" alt="Aji Nur Aji Logo" width="120" />
</p>

<h1 align="center">Aji Nur Aji - Personal Portfolio Website</h1>

<p align="center">
  <a href="https://github.com/AjiNurAji/personal-website/stargazers"><img src="https://img.shields.io/github/stars/AjiNurAji/personal-website?style=for-the-badge&color=eab308" alt="GitHub Stars"/></a>
  <a href="https://github.com/AjiNurAji/personal-website/network/members"><img src="https://img.shields.io/github/forks/AjiNurAji/personal-website?style=for-the-badge&color=3b82f6" alt="GitHub Forks"/></a>
  <img src="https://komarev.com/ghpvc/?username=AjiNurAji-portfolio&label=Profile%20Views&color=10b981&style=for-the-badge" alt="Profile Views" />
</p>

A modern, highly interactive personal portfolio website built with a focus on premium aesthetics, following "UI/UX Pro Max" principles. It features a stunning glassmorphism design, interactive bento grids, and dynamic animations.

## 🚀 Tech Stack

- **Framework**: Laravel 11
- **Frontend**: React 18, TypeScript, Inertia.js
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Remix Icons
- **Database**: MySQL / SQLite (configured via `.env`)
- **Image Processing**: Intervention Image v4

## ✨ Key Features

### 🎨 Public Interface (Landing Page)
- **Hero Section**: Engaging introduction with dynamic elements.
- **Experience & Education**: Interactive tab system with a modern masonry layout.
- **Projects Showcase**: Detailed project cards with technology tags.
- **Achievements Gallery**: Infinite-scroll style gallery with live search and category filtering for awards, certifications, and events.
- **Dark/Light Mode**: Full support for system-wide or manual theme toggling.

### 🔒 Admin Dashboard (`/admin`)
- **Secure Authentication**: Built with Laravel Breeze.
- **Content Management**: Full CRUD capabilities for Projects, Skills, Experiences, and Achievements.
- **Optimized Data Tables**: Features list layouts with built-in search functionality and pagination to handle large datasets effortlessly.
- **Image Uploads**: Automatic image resizing and preview generation.

## 🛠️ Installation & Setup

1. **Clone the repository**
2. **Install PHP Dependencies**:
   ```bash
   composer install
   ```
3. **Install Node Dependencies**:
   ```bash
   npm install
   ```
4. **Environment Setup**:
   Copy `.env.example` to `.env` and configure your database settings.
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
5. **Run Migrations**:
   ```bash
   php artisan migrate
   ```
6. **Storage Link**:
   ```bash
   php artisan storage:link
   ```
7. **Run Development Servers**:
   ```bash
   # Terminal 1: Start Laravel server
   php artisan serve

   # Terminal 2: Start Vite dev server
   npm run dev
   ```

## 📜 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
