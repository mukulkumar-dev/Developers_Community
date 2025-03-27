"use client";  // This makes the file a client-side component
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  // Import useRouter from next/router

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isClient, setIsClient] = useState(false);  // To ensure it's client-side
    const router = useRouter();  // This is the client-side router

    // This will only run on the client after the component is mounted
    useEffect(() => {
        setIsClient(true);  // Set to true once mounted client-side
    }, []);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Logged in successfully');
                localStorage.setItem('authToken', data.token); // Save token in localStorage

                // Now navigate to the dashboard after login
                if (isClient) {
                    router.push('/dashboard');  // This ensures router.push happens only client-side
                }
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('An error occurred');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleLoginSubmit} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Login
            </button>
        </form>
    );
};

export default LoginForm;
