import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Mail, Lock, Sprout } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

function AdminLogin() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (isAuthenticated) navigate('/admin');
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate('/admin');
    } catch (err) {
      setError('root', {
        message: err?.response?.data?.message || 'Invalid email or password',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - WelfareOrg</title>
      </Helmet>
      <div className="min-h-screen flex">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 items-center justify-center p-12">
          <div className="text-center">
            <Sprout className="h-16 w-16 text-white mx-auto mb-6" />
            <h1 className="font-display text-4xl text-white font-bold">WelfareOrg</h1>
            <p className="text-primary-200 text-lg mt-2">Admin Dashboard</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <h2 className="font-display text-2xl font-bold text-primary-800">Welcome Back</h2>
            <p className="text-gray-500 mt-1 mb-8">Sign in to your admin account</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {errors.root && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
                  {errors.root.message}
                </div>
              )}

              <Input
                label="Email Address"
                type="email"
                icon={Mail}
                placeholder="admin@welfareorg.org"
                error={errors.email?.message}
                {...register('email')}
              />

              <Input
                label="Password"
                type="password"
                icon={Lock}
                placeholder="Enter your password"
                error={errors.password?.message}
                {...register('password')}
              />

              <Button type="submit" loading={isSubmitting} className="w-full">
                Sign In
              </Button>

              <p className="text-center text-sm text-gray-400 mt-4">
                <span className="cursor-not-allowed">Forgot password?</span>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
