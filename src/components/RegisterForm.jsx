import { Form, Link, useActionData, useNavigation } from 'react-router-dom';

export default function RegisterForm({ onSetScreen }) {
    const data = useActionData();
    const navigation = useNavigation();

    const isSubmitting = navigation.state === 'submitting';

    return (
        <div className="flex flex-col items-center h-screen w-screen">
            <Form method="post" className="flex-1 h-screen w-80">
                <h1 className="text-[#ffffff] text-4xl font-semibold mt-44 mb-5">{'Register'}</h1>
                <div className="flex flex-col mb-5">
                    <label htmlFor="firstName" className="text-[#ffffff] text-xl">First Name</label>
                    <input id="firstName" type="text" name="firstName" required className="border p-2 rounded" />
                </div>
                <div className="flex flex-col mb-5">
                    <label htmlFor="lastName" className="text-[#ffffff] text-xl">Last Name</label>
                    <input id="lastName" type="text" name="lastName" required className="border p-2 rounded" />
                </div>
                <div className="flex flex-col mb-5">
                    <label htmlFor="email" className="text-[#ffffff] text-xl">Email</label>
                    <input id="email" type="email" name="email" required className="border p-2 rounded" />
                </div>
                <div className="flex flex-col mb-5">
                    <label htmlFor="password" className="text-[#ffffff] text-xl">Password</label>
                    <input id="password" type="password" name="password" required className="border p-2 rounded" />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="confirm" className="text-[#ffffff] text-xl">Confirm Password</label>
                    <input id="confirm" type="password" name="confirm" required className="border p-2 rounded" />
                </div>
                {data && data && <div className='mb-5 text-[#f0ff1f] flex flex-row justify-end'>{data}</div>}
                <div className="flex flex-row justify-end">
                    {isSubmitting ? null : <Link to={'/login'} disabled={isSubmitting} className="text-[#ffffff] mr-2 bg-[#45413c] px-3 py-2 rounded-[8px]">{'Go to Login'}</Link>}
                    <button disabled={isSubmitting} className="text-[#ffffff] bg-[#45413c] px-3 py-2 rounded-[8px]">{isSubmitting ? 'Submitting...' : 'Confirm'}</button>
                </div>
            </Form>
        </div>
    )
}