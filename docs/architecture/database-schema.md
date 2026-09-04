# Database Schema Summary (SQLite / Turso)

| Table | Key Columns | Purpose |
| :--- | :--- | :--- |
| `products` | `id`, `name`, `category`, `type`, `price`, `moq`, `capacity`, `dispatch`, `specifications`, `image`, `published` | Product catalog items |
| `categories` | `id`, `name`, `slug`, `description`, `image` | Product categories |
| `inquiries` | `id`, `name`, `email`, `phone`, `company`, `subject`, `message`, `status`, `createdAt` | Customer lead inquiries |
| `company` | `id`, `key`, `value` | Company profile & contact information |
| `site_content` | `id`, `section`, `key`, `value` | CMS editable website content sections |
| `media_files` | `id`, `filename`, `originalName`, `mimeType`, `size`, `path`, `category` | Uploaded media assets |
| `admin_users` | `id`, `username`, `password_hash`, `role` | Admin authentication accounts |
