import { z } from 'zod';

export const checkoutSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    address: z.string().min(5, 'Address is required'),
    city: z.string().min(2, 'City is required'),
    postalCode: z.string().min(3, 'Postal code is required'),
    country: z.string().min(2, 'Country is required'),
    cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
    expiry: z.string().regex(/^\d{2}\/\d{2}$/, 'Format MM/YY'),
    cvc: z.string().regex(/^\d{3}$/, 'CVC must be 3 digits'),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
