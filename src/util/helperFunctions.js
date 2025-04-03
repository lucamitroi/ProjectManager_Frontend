import { redirect } from "react-router-dom";
import config from "../../config";

export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function getAuthToken() {
    const token = localStorage.getItem('token');
    const tokenDuration = getTokenDuration();

    if (!token) {
        return null;
    }

    if (tokenDuration < 0) {
        return 'EXPIRED';
    }

    return token;
}

export function loader() {
    return getAuthToken();
}

export function checkAuth() {
    const token = getAuthToken();

    if (!token) {
        return redirect('/login');
    }

    return null;
}

export function checkNotAuth() {
    const token = getAuthToken();

    if (token) {
        return redirect('/dashboard');
    }

    return null;
}

export function decodeJWT(token) {
    const [header, payload, signature] = token.split(".");

    const decodedHeader = JSON.parse(atob(header));
    const decodedPayload = JSON.parse(atob(payload));

    return decodedPayload;
}

export async function getProjects(userId, token) {
    const response = await fetch(`${config.apiUrl}/Project/UserProjects/` + userId, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
    });

    if (!response.ok) {
        throw new Error('Error Fetching the Data');
    }

    const resData = await response.json();
    return resData;
};

export async function getTasks(projectId, token) {
    const response = await fetch(`${config.apiUrl}/Project/ProjectTasks/` + projectId, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
    });

    if (!response.ok) {
        throw new Error('Error Fetching the Data');
    }

    const resData = await response.json();
    return resData;
};