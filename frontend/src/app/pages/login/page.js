import LoginForm from "@/app/components/LoginForm";
import Link from 'next/link';

export default function Login() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                <LoginForm />
                <p className="text-center mt-4">
                    Don't have an account?{' '}
                    <Link href="/pages/signup" className="text-blue-500 hover:underline">
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
}
