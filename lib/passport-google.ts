import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// Define a custom type for the user based on the profile returned by Google
interface GoogleUser {
    id: string;
    displayName: string;
    email: string;
    imageUrl?: string;
}

// Configure Google OAuth strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!, // Your Google client ID
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // Your Google client secret
            callbackURL: "/api/auth/google/callback", // Redirect URL after successful login
        },
        (accessToken, refreshToken, profile, done) => {
            // Check if emails array exists and has at least one email
            const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

            if (!email) {
                return done(new Error("No email found in profile"));
            }

            const user: GoogleUser = {
                id: profile.id,
                displayName: profile.displayName,
                email: email,
                imageUrl: profile.photos ? profile.photos[0].value : undefined,
            };

            done(null, user); // Pass the user profile to Passport
        }
    )
);

// Serialize user (store the user's ID in session)
// passport.serializeUser((user: GoogleUser, done) => {
//     done(null, user.id); // Store only user ID in session
// });

// Deserialize user (retrieve user data from session)
passport.deserializeUser((id: string, done) => {
    // Fetch the user from the database or session storage (simplified here)
    done(null, { id }); // For simplicity, just return the user ID
});
