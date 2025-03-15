import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { loginSchema, type LoginInput } from '../schemas';
import { useAuth } from '../context/AuthContext';

export const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginInput) => {
        try {
            await login(data.email, data.password);

            // Redirect based on simple logic (can be enhanced later)
            if (data.email === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            // Error handled in context
            console.error(error);
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Welcome back</h2>
                <p style={{ color: 'var(--color-slate-500)' }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: 'var(--color-foreground)', fontWeight: 500 }}>
                        Sign up
                    </Link>
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Input
                    label="Email or Username"
                    type="text"
                    placeholder="admin or email@example.com"
                    error={errors.email?.message}
                    {...register('email')}
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        error={errors.password?.message}
                        {...register('password')}
                    />
                    <Link
                        to="/forgot-password"
                        style={{
                            fontSize: '0.875rem',
                            color: 'var(--color-slate-500)',
                            alignSelf: 'flex-end'
                        }}
                    >
                        Forgot password?
                    </Link>
                </div>

                <Button type="submit" isLoading={isSubmitting} size="lg">
                    Sign in
                </Button>
            </form>
        </div>
    );
};
