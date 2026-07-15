export interface AuthUser {
    _id: string;
    name: string;
    email: string;
    picUrl: string;
}

export interface AuthData {
    user: AuthUser;
    isLoggedIn: boolean;
}

const KEY = "library-auth-storage";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export function saveAuth(user: AuthUser) {
    const payload: AuthData = { user, isLoggedIn: true };
    localStorage.setItem(KEY, JSON.stringify(payload));
    document.cookie = `isLoggedIn=true; path=/; max-age=${COOKIE_MAX_AGE}`;
    window.dispatchEvent(new Event("auth-changed"));
}

export function clearAuth() {
    localStorage.removeItem(KEY);
    document.cookie = "isLoggedIn=; path=/; max-age=0";
    window.dispatchEvent(new Event("auth-changed"));
}

export function readAuth(): AuthData | null {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw) as AuthData;
        return parsed?.isLoggedIn ? parsed : null;
    } catch {
        return null;
    }
}