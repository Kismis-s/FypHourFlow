const express = require('express');
const passport = require('passport');
const authRouter = express.Router();

// Route to display the "Login with Google" page
authRouter.get("/", (req, res) => {
    res.send(`
        <html>
            <body>
                <h1>Login</h1>
                <p>Click the button below to log in with Google.</p>
                <a href="/users/auth/google">
                    <button>Login with Google</button>
                </a>
            </body>
        </html>
    `);
});

// Route to initiate the Google OAuth 2.0 authentication flow
authRouter.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback route for Google OAuth 2.0
authRouter.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // On successful authentication, redirect to the dashboard
        res.redirect('/users/dashboard');
    }
);

// Protected route to display the dashboard (user must be logged in via OAuth)
authRouter.get('/dashboard', (req, res) => {
        res.send(`
            <html>
                <body>
                    <h1>Welcome, ${req.user.name}!</h1>
                    <a href="/users/logout">Logout</a>
                </body>
            </html>
        `);
});

// Logout route
authRouter.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error logging out:', err);
            return res.redirect('/users');
        }
        res.redirect('/users'); // Redirect to home page after logout
    });
});

module.exports = authRouter;
