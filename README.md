# CampusConnect Security Project

## Project Description
CampusConnect is a student portal security project developed using Node.js, Express.js, and SQLite.

The purpose of this project is to protect the login system from SQL Injection and secure the profile picture upload functionality.

## Technologies Used
- Node.js
- Express.js
- SQLite
- Multer
- Crypto
- File-Type

## Task 1: SQL Injection Protection
- Created an Express.js and SQLite login system.
- Demonstrated an insecure login implementation.
- Applied parameterized queries.
- Tested successful and unsuccessful login attempts.

## Task 2: Secure File Upload
- Allowed only JPG and PNG images.
- Applied a maximum file size of 2MB.
- Generated unique filenames.
- Checked actual image formats.
- Stored uploaded images in a private folder.

## Testing Results

| Test | Result |
|---|---|
| Correct login details | Successful |
| Incorrect login details | Rejected |
| Valid PNG image | Accepted |
| Invalid TXT file | Rejected |
| Oversized 3MB file | Rejected |

## Project Structure
- `server.js` – Main Express server.
- `database/db.js` – SQLite database.
- `routes/login.js` – Login functionality.
- `routes/upload.js` – Secure image upload.
- `private_uploads/` – Private image storage.
- `screenshots/` – Assignment screenshots.

## How to Run the Project

1. Install Node.js.
2. Open the project folder in the terminal.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open `http://localhost:3000` in your browser.

## Conclusion
This project demonstrates how parameterized queries and secure file upload validation help protect a web application from common security risks.