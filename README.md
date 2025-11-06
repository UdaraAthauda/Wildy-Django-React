🐍 Sri Lankan Wildlife Information System - Ongoing Project


> **Explore. Learn. Conserve.**
> A modern full-stack web application built to showcase information about Sri Lankan snakes — combining science, education, and technology.

---

### 🌿 Overview

**Sri Lankan Wildlife Information System** is a full-stack project built using **Django REST Framework (DRF)** and **React**.
It provides users with detailed information about Sri Lankan snakes — including their habitats, venom type, regions, and conservation status.
Additionally, authenticated users can write and manage **blogs** about wildlife to share their knowledge and observations.

---

### 🚀 Features

#### 🐍 **Snake Information**

* Browse a complete collection of Sri Lankan snakes.
* View details: scientific name, Sinhala & Tamil names, venom type, family, conservation status.
* Linked **regions**, **habitats**, and **images** for each snake.

#### 🔍 **Smart Search**

* Real-time, API-based search by name or category.
* Built using Axios and DRF filtering backend.

#### 📰 **Blog System**

* Authenticated users can **create, edit, delete, and publish** blogs.
* Public users can view **published blogs** only.
* Each blog can be linked to a specific snake species and category.
* CRUD powered by DRF `ModelViewSet`.

#### 🔐 **Authentication**

* JWT-based authentication (with access & refresh tokens).
* Google social login integrated via `dj-rest-auth` + `django-allauth`.

#### ☁️ **Media Management**

* All media (snake and blog images) are stored using **Cloudinary** — a free and scalable cloud storage solution.

#### 💬 **Frontend**

* Built using **React** + **Chakra UI** for modern, responsive, and accessible design.
* Includes reusable components such as:

  * `Searchbar`
  * `LoadingSpinner`
  * `ProtectedRoute` (JWT-aware routing)
  * `Nocontent` (for empty search results)
  * `GoogleLoginButton`

---

### 🧩 Tech Stack

| Layer                      | Technology                                               |
| -------------------------- | -------------------------------------------------------- |
| **Frontend**               | React, Vite, Axios, Chakra UI                            |
| **Backend**                | Django, Django REST Framework                            |
| **Authentication**         | JWT (SimpleJWT), Google OAuth via dj-rest-auth & allauth |
| **Database**               | SQLite (development) / PostgreSQL (production)           |
| **Storage**                | Cloudinary (image/media hosting)                         |
| **Environment Management** | django-environ                                           |

