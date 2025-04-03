import RegisterForm from "../components/RegisterForm";
import { redirect } from 'react-router-dom';
import config from "../../config";

function RegisterPage() {
    return <RegisterForm />;
}
export async function action({ request }) {

    const data = await request.formData();
    const authData = {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        password: data.get('password'),
        passwordConfirmation: data.get('confirm')
    };

    const response = await fetch(`${config.apiUrl}/Auth/Register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData),
    });

    if (response.status === 409 || response.status === 401) {
        return response;
    }

    if (!response.ok) {
        throw new Response(JSON.stringify({ message: 'Could not register user' }), { status: 500 });
    }

    alert("The account was succesfully created!");

    return redirect('/login');
}


export default RegisterPage;