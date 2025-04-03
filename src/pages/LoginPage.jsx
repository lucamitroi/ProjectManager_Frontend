import LoginForm from "../components/LoginForm";
import { redirect } from 'react-router-dom';
import config from "../../config";

function LoginPage() {
    return <LoginForm />;
}

export async function action({ request }) {

    const data = await request.formData();
    const authData = {
        email: data.get('email'),
        password: data.get('password'),
    };

    const response = await fetch(`${config.apiUrl}/Auth/Login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData),
    });

    if (response.status === 401 || response.status === 404) {
        return response;
    }

    if (!response.ok) {
        throw new Response(JSON.stringify({ message: 'Could not authenticate user' }), { status: 500 });
    }

    const resData = await response.json();
    const token = resData.token;

    localStorage.setItem('token', token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem('expiration', expiration.toISOString());

    return redirect('/dashboard');
}

export default LoginPage;