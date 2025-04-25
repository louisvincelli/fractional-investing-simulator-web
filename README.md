# fractional-investing-simulator-web
 A Fractional Investing Simulator web application where users can experience and learn how fractional shares work while tracking their ROI over time using a fake wallet.

# Tech Stack

-   **Programming Language**: TypeScript
-   **Web Framework**: Next.js + React
-   **CSS Framework**: TailwindCSS
-   **Backend/Database/Auth**: Firebase/Supabase
-   **Firebase Setup:**
    - Authentication (Firebase Auth)
    - Firestore for data storage
    - Firebase functions for serverless logic
-   **Supabase Setup**
    - Authentication (using Supabase Auth)
    - PostgreSQL database (via Supabase)
    - Real-time sync (via Supabase API)
-   **Linting**: ESLint

-   **Firebase:** Firebase Hosting.
-   **Supabase:** Host frontend(Next.js app) elsewhere and connect to Supabase database.

Both backend setups are in the utils folder:

If you decide to use Firebase for your backend, you can set it up by creating a Firebase project in the Firebase console and using the Firebase SDK in your app.

If you choose Supabase, you’ll need to create a project in the Supabase console, configure your database, and use Supabase’s JavaScript client library to interact with it.
