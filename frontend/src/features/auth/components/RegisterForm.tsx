import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { registerSchema, type RegisterInput } from '../schemas';
import { useAuth } from '../context/AuthContext';

export const RegisterForm = () => {
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: 'customer'
        }
    });

    const onSubmit = async (data: RegisterInput) => {
        try {
            await registerUser(data.name, data.email, data.password, data.role);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Create an account</h2>
                <p style={{ color: 'var(--color-slate-500)' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: 'var(--color-foreground)', fontWeight: 500 }}>
                        Sign in
                    </Link>
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Input
                    label="Name"
                    placeholder="John Doe"
                    error={errors.name?.message}
                    {...register('name')}
                />

                <Input
                    label="Email"
                    type="email"
                    placeholder="name@example.com"
                    error={errors.email?.message}
                    {...register('email')}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="Create a password"
                    error={errors.password?.message}
                    {...register('password')}
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                    error={errors.confirmPassword?.message}
                    {...register('confirmPassword')}
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>I want to be a</label>
                    <select
                        {...register('role')}
                        style={{
                            width: '100%',
                            padding: '0.5rem 0.75rem',
                            borderRadius: 'var(--radius)',
                            border: '1px solid var(--color-border)',
                            fontSize: '0.875rem',
                            backgroundColor: 'white',
                        }}
                    >
                        <option value="customer">Customer (Buy items)</option>
                        <option value="seller">Seller (Sell items)</option>
                    </select>
                    {errors.role && (
                        <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>
                            {errors.role.message}
                        </span>
                    )}
                </div>

                <Button type="submit" isLoading={isSubmitting} size="lg">
                    Create Account
                </Button>
            </form>
        </div>
    );
};
