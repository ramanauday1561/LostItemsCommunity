// Dummy users for authentication (placeholder – replace with API calls later)
// NOTE: These credentials are intentionally hardcoded for development/demo purposes only.
//       They will be replaced with a real authentication endpoint in future iterations.
const USERS = [
    { username: 'superadmin', password: 'Password1!', role: 'superadmin', displayName: 'Super Admin' },
    { username: 'apple', password: 'Password1!', role: 'user', displayName: 'Apple User' },
];

/**
 * Validate user credentials against the dummy user list.
 * @param {string} username
 * @param {string} password
 * @returns {{ success: boolean, user?: object, error?: string }}
 */
export function validateCredentials(username, password) {
    const user = USERS.find(
        (u) => u.username === username && u.password === password
    );
    if (user) {
        const { password: _pw, ...safeUser } = user;
        return { success: true, user: safeUser };
    }
    return { success: false, error: 'Invalid username or password.' };
}
