# Ubuntu Nexus Website Project

## Overview

This repository contains the source code for the official website and internal management platform for Ubuntu Nexus, a non-profit, humanitarian organization based in Kenya.

### Our Mission

Ubuntu Nexus is dedicated to empowering the youth of Kenya, working to prevent crime, exclusion, inequality, and injustice. Our approach is Afrocentric, rooted in the spirit of Ubuntu: "I am because we are." We aim to build peaceful communities through a variety of programs and initiatives.

### The Project

The goal of this project is to create a robust online platform that supports our mission and streamlines our internal operations. The website will serve as a central hub for our team, our volunteers, and the community we serve.

## Key Features

*   **Internal Team Management:** Secure authentication, team dashboards, check-in/out functionality, objective tracking, and an article publishing platform.
*   **Department-Specific Functionality:** Tailored features for Research, Programs, Digital Operations, and other departments.
*   **Community Engagement:** Donation system (Mpesa), volunteer applications, and a contact form.
*   **Executive Features:** CRUD functionality for managing official documents like meeting minutes.

## Technical Details

### Tech Stack

*   **Frontend:** React, Vite, TypeScript, Tailwind CSS
*   **Backend:** Node.js, Express, TypeScript, MongoDB
*   **Payments:** Mpesa

### Project Structure

The project is a monorepo managed with `pnpm workspaces`, organized into the following directories:

*   `/frontend`: Contains the React-based frontend application.
*   `/backend`: Contains the Node.js/Express backend server.
*   `/docs`: Contains all project-related documentation.

### Guiding Principles

*   **Security:** Adherence to strict security best practices.
*   **Scalability:** Designed to grow with our organization.
*   **Usability:** User-friendly and intuitive for all users.
*   **Beauty:** A modern, award-winning design aesthetic.
*   **Resilience:** Built with Murphy's Law in mind—robust and fault-tolerant.

## Getting Started

For a detailed technical overview, architecture, and development plan, please see the **Technical Overview** document.

For details on how to set up and run the applications, please see the `README.md` files within the `/frontend` and `/backend` directories.
