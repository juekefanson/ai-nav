import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/options';
import LoginForm from './LoginForm';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/admin');
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Aigood 管理后台
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
