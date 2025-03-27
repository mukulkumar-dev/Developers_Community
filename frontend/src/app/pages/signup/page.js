// pages/signup/page.js
import SignupForm from '@/app/components/SignupForm';
import Link from 'next/link'; // Import Link for routing

export default function Signup() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        {/* Signup form or other content here */}
        <SignupForm />
        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link href="/pages/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
