export interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface Order {
    id: string;
    date: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
    total: number;
    items: OrderItem[];
    customer: {
        name: string;
        email: string;
    };
}

export const MOCK_ORDERS: Order[] = [
    {
        id: 'ORD-001',
        date: '2023-10-25',
        status: 'delivered',
        total: 129.99,
        customer: { name: 'John Doe', email: 'john@example.com' },
        items: [
            {
                productId: '1',
                name: 'Minimalist Leather Backpack',
                price: 129.99,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'
            }
        ]
    },
    {
        id: 'ORD-002',
        date: '2023-10-28',
        status: 'processing',
        total: 45.00,
        customer: { name: 'Jane Smith', email: 'jane@example.com' },
        items: [
            {
                productId: '3',
                name: 'Ceramic Pour-Over Set',
                price: 45.00,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800'
            }
        ]
    }
];
