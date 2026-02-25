# 🎨 Art Institute of Chicago – Artwork Data Table

A **React + TypeScript** application built using **Vite** and **PrimeReact DataTable** to display artwork data from the **Art Institute of Chicago API** with **server-side pagination** and **persistent row selection**, strictly following performance and memory-safe best practices.

---

## 🚀 Overview

This project demonstrates how to efficiently handle large datasets using:
- Server-side pagination
- Persistent row selection across pages
- PrimeReact DataTable with TypeScript
- No prefetching or cross-page data storage

---

## ✨ Features

- 📊 PrimeReact **DataTable**
- 🌐 **Server-side pagination** (page-by-page API calls)
- ☑️ Checkbox row selection
- 🔁 **Persistent row selection across pages**
- 🎛️ Custom row selection overlay (select `n` rows on current page)
- 🚫 No prefetching of other pages
- 🟦 Fully written in **TypeScript**
- ⚡ Built with **Vite** for fast development

---

## 📊 Displayed Artwork Fields

The table displays the following fields from the API:

- 🖌️ **Title**
- 🌍 **Place of Origin**
- 👤 **Artist Display**
- ✍️ **Inscriptions**
- 📅 **Date Start**
- 📅 **Date End**

---

## 🌐 API Used

```text
https://api.artic.edu/api/v1/artworks?page=1
&limit=10
&fields=id,title,place_of_origin,artist_display,inscriptions,date_start,date_end
```
- `page`: Current page number (1-based)
- `limit`: Number of items per page (e.g., 10)
- `fields`: Comma-separated list of fields to return
