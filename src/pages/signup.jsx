import React, { useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';

export default function Signup() {
    const [formdata, setformdata] = useState({});
    const [error, seterror] = useState(null);
    const [loading, setloading] = useState(false);
    const navigate = useNavigate()

    const handlechange = (e) => {
        setformdata({
            ...formdata,
            [e.target.id]: e.target.value,
        });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        seterror(null);

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formdata),
            });

            const data = await res.json();
            console.log(data);

            if (data.success === false) {
                seterror(data.message);
                setloading(false);
                return;
            }

            setloading(false);
            seterror(null)
            navigate('/signin')
        } catch (error) {
            setloading(false);
            seterror(error.message);
        }
    };

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Signup</h1>
            <form onSubmit={handlesubmit} className='flex flex-col gap-4'>
                <input onChange={handlechange} type='text' placeholder='username' className='border p-3 rounded-lg' id='username' />
                <input onChange={handlechange} type='email' placeholder='email' className='border p-3 rounded-lg' id='email' />
                <input onChange={handlechange} type='password' placeholder='password' className='border p-3 rounded-lg' id='password' />
                <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'Loading...' : 'Sign up'}
                </button>
            </form>

            <div className="flex gap-2 mt-5">
                <p>Have an account?</p>
                <Link to="/signin">
                    <span className="text-blue-700">Sign in</span>
                </Link>
            </div>

            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    );
}
