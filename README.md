# Disk Cleanup Assistant

Disk Cleanup Assistant is a web application that helps users analyze folders, identify large files, estimate potential disk space savings, and save cleanup plans.

The application was developed as part of Engineering Design 2.

## Live Application

Netlify deployment link:

https://disk-cleanup-assistant.netlify.app/

## Demo Video

YouTube demo video:

`https://youtu.be/qpy_2yoT9yw`
## Features

- Select and scan a local folder
- Recursively analyze files and subfolders
- Display file sizes
- Display total analyzed storage
- Identify the largest files
- Group files by file type
- Filter files by minimum size
- Filter files by file type
- Display file modification dates
- Identify possible system-risk files
- Mark files for cleanup review
- Estimate potential disk space savings
- User registration
- User login and logout
- Save cleanup plans
- View cleanup history
- Edit saved notes
- Delete cleanup history records
- Separate database records for each user

## Safety

Disk Cleanup Assistant does not automatically delete files.

The application only analyzes file metadata and allows users to estimate how much space selected files use.

The safety classifications shown by the application are only warnings based on file paths and file extensions. They do not guarantee that a file is safe to delete.

## Technologies Used

- HTML
- CSS
- JavaScript
- Supabase
- Supabase Authentication
- Supabase Database
- Git
- GitHub
- Netlify
- ChatGPT

## Database

Supabase is used to store cleanup history.

The `cleanup_sessions` table stores:

- User ID
- Folder name
- Number of files scanned
- Total size analyzed
- Number of files selected for cleanup
- Estimated cleanup size
- Notes
- Creation time
- Update time

Row Level Security is enabled so each authenticated user can only access their own cleanup history.

## CRUD Operations

The application implements CRUD operations:

- Create: Save a new cleanup plan
- Read: View saved cleanup history
- Update: Edit notes for a saved cleanup plan
- Delete: Delete a cleanup history record

## Authentication

Supabase Authentication is used for:

- User registration
- User login
- User logout

Users must be authenticated before cleanup plans can be saved or modified.

## Project Structure

```text
Disk-Cleanup-Assistant/
│
├── index.html
├── style.css
├── app.js
└── README.md