# Applic

**Applic** is a web application designed to help users manage and organize their job applications. It provides features for tracking application status, scheduling interviews, managing documents, and receiving notifications.

![Screenshot 2024-08-23 194420](https://github.com/user-attachments/assets/d623127a-61ea-4512-aeef-8547250bd89f)


## Features

- **Job Application Tracking:**
    - **Bookmarked:** Jobs you're interested in but haven't applied to yet.
    - **Applied:** Applications you've submitted.
    - **Interview Scheduled:** Jobs where you've secured an interview.
    - **Got Offer:** Track offers you've received.

- **Interview Management:**
    - **Scheduled Interviews:** Keep track of interviews you’ve scheduled.
    - **Notifications:** Get alerts about upcoming interview dates.
    - **Conflicts:** Manage and resolve overlapping interview schedules.

- **Document Management:**
    - **Uploaded Documents:** Store and manage your resumes, cover letters, portfolios, and other relevant files.


## Tech Stack

-   **Frontend:** React, Tailwind CSS, Lucide icons
-   **Backend:** Flask (for Python-based tasks), Node.js, NextAuth for authentication
-   **Database:** MongoDB (for now), with plans to migrate to PostgreSQL
-   **Document Management:** UploadThing for file uploads
-   **State Management:** Zustand for managing the state of multiple documents and application statuses
-   **Editor:** Novel editor for a Notion-like text editor experience
-   **Authentication:** GitHub OAuth for user authentication

## Getting Started

### Installation

1. **Clone the repository:**
    ```bash
     git clone https://github.com/your-username/applic.git
    ```
2. **Install dependencies:**
    ```bash
     cd applic
     npm install

    ```
3. **Set up environment variables:** Create a `.env` file and add the following variables:

    ```ini
    # Next Auth
    AUTH_SECRET=your_next_auth_secret_here
    AUTH_URL=https://your-auth-url.com

    # GitHub OAuth
    AUTH_GITHUB_ID=your_github_client_id_here
    AUTH_GITHUB_SECRET=your_github_client_secret_here

    # Google OAuth
    AUTH_GOOGLE_ID=your_google_client_id_here
    AUTH_GOOGLE_SECRET=your_google_client_secret_here

    # UploadThing
    UPLOADTHING_SECRET=your_uploadthing_secret_here
    UPLOADTHING_APP_ID=your_uploadthing_app_id_here

    # Database URL
    APPLIC_POSTGRES_PRISMA_URL=postgresql://user:password@localhost:5432/db
    APPLIC_POSTGRES_URL_NON_POOLING=postgresql://user:password@localhost:5432/db_non_pooling

    ```

4. **Run the development server:**
    ```bash
    npm run dev

    ```

## Usage

1. Access the application at [http://localhost:3000](http://localhost:3000).
2. Create a new account or log in using OAuth.
3. Start adding job applications and managing your documents.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request to the main branch.

## License

This project is licensed under the [MIT License]().
