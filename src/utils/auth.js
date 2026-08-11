// Dummy users for authentication (placeholder – replace with API calls later)
// NOTE: These credentials are intentionally hardcoded for development/demo purposes only.
//       They will be replaced with a real authentication endpoint in future iterations.
const USERS = [
    { username: 'superadmin', password: 'Password1!', role: 'superadmin', displayName: 'Super Admin', email: 'admin@trustfound.com' },
    { username: 'user', password: 'Password1!', role: 'user', displayName: 'Simple User', email: 'user@trustfound.com' },
    { username: 'apple', password: 'Password1!', role: 'user', displayName: 'Apple User', email: 'apple@trustfound.com' },
];

/**
 * Validate user credentials against the dummy user list.
 * @param {string} username
 * @param {string} password
 * @returns {{ success: boolean, user?: object, error?: string }}
 */
export function validateCredentials(username, password) {
    if (!username || !password) {
        return { success: false, error: 'Username and password are required.' };
    }

    const trimmedUsername = username.trim();
    const user = USERS.find(
        (u) => u.username.toLowerCase() === trimmedUsername.toLowerCase() && u.password === password
    );

    if (user) {
        const { password: _pw, ...safeUser } = user;
        return { success: true, user: safeUser };
    }

    // For testing purposes, if username is 'superadmin' but wrong password, fail.
    // If any other simple user logs in with non-empty password, allow as 'user' role.
    if (trimmedUsername.toLowerCase() === 'superadmin') {
        return { success: false, error: 'Invalid password for superadmin. Hint: Password1!' };
    }

    // Allow fallback for any simple user account
    return {
        success: true,
        user: {
            username: trimmedUsername,
            role: 'user',
            displayName: trimmedUsername.charAt(0).toUpperCase() + trimmedUsername.slice(1),
            email: `${trimmedUsername.toLowerCase()}@example.com`,
        },
    };
}

