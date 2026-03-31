# EVOLV Contractor Solutions - Lead Magnet Website

This repository contains the source code for the EVOLV Contractor Solutions single-page lead magnet website. The site is designed to be fast, responsive, and conversion-focused, built with HTML5, CSS3, and vanilla JavaScript.

## 📂 Project Structure

- `index.html`: The main HTML structure, including all 6 sections (Nav, Hero, Money Leaks, About, Contact, Footer).
- `styles.css`: The complete design system, responsive layout, and custom properties.
- `script.js`: Interactivity, including scroll animations, fixed navigation behavior, and form validation/submission.
- `README.md`: This file, containing deployment and setup instructions.

## 🚀 Deployment Guide (GitHub Pages)

The website is ready to be hosted for free on GitHub Pages. Follow these steps to deploy:

### Step 1: Create a GitHub Repository
1. Log in to your [GitHub account](https://github.com/).
2. Click the **"+"** icon in the top right corner and select **"New repository"**.
3. Name the repository (e.g., `evolv-website`).
4. Keep it **Public** and do not initialize it with a README (since you already have one).
5. Click **"Create repository"**.

### Step 2: Upload Your Files
1. On the repository page, click the **"uploading an existing file"** link.
2. Drag and drop all four files (`index.html`, `styles.css`, `script.js`, `README.md`) into the upload area.
3. Add a commit message (e.g., "Initial commit") and click **"Commit changes"**.

### Step 3: Enable GitHub Pages
1. Go to the **"Settings"** tab of your repository.
2. On the left sidebar, scroll down and click on **"Pages"**.
3. Under **"Build and deployment"**, look for the **"Source"** dropdown.
4. Select **"Deploy from a branch"**.
5. Under the **"Branch"** dropdown, select `main` (or `master`) and keep the folder as `/ (root)`.
6. Click **"Save"**.

GitHub will now build and deploy your site. After a few minutes, you will see a message at the top of the Pages settings with your live URL (e.g., `https://yourusername.github.io/evolv-website`).

---

## ✉️ Formspree Setup Guide

The contact form in Section 5 uses [Formspree](https://formspree.io/) to handle submissions without needing a backend server. Follow these steps to connect the form to your email:

### Step 1: Create a Formspree Account
1. Go to [Formspree.io](https://formspree.io/) and sign up for a free account.
2. Verify your email address.

### Step 2: Create a New Form
1. In your Formspree dashboard, click **"New Form"**.
2. Name it (e.g., "EVOLV Diagnostic Request").
3. Enter the email address where you want to receive the form submissions (e.g., `cesar@evolvcontractorsolutions.com`).
4. Click **"Create Form"**.

### Step 3: Get Your Form ID
1. Once the form is created, Formspree will give you an integration URL that looks like this:
   `https://formspree.io/f/YOUR_FORM_ID`
2. Copy the `YOUR_FORM_ID` part (it will be a random string of letters and numbers).

### Step 4: Update `index.html`
1. Open `index.html` in a text editor.
2. Locate the form tag in Section 5 (around line 178):
   ```html
   <form class="form fade-in" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" id="diagnostic-form" novalidate>
   ```
3. Replace `YOUR_FORM_ID` with the actual ID you copied from Formspree.
4. Save the file and upload the updated `index.html` to your GitHub repository.

### Step 5: Test the Form
1. Go to your live website.
2. Fill out the form with test data and click submit.
3. Check your email (and spam folder) to confirm you received the test submission.

---

## 🎨 Customization Notes

- **Colors & Typography:** All colors and fonts are defined as CSS Custom Properties (`:root`) at the top of `styles.css`. You can easily change the amber accent or dark background by modifying these variables.
- **Images:** The "About Cesar" section includes a placeholder for a photo. To add your real photo, replace the `.photo-placeholder` div in `index.html` with an `<img>` tag and update the CSS if necessary.
- **SEO:** Update the meta tags in the `<head>` of `index.html` to reflect your exact domain and branding if you choose to use a custom domain.

Built with focus on performance, accessibility, and conversion.
