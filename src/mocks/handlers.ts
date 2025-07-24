import { http, HttpResponse } from 'msw';
import { UserRole } from 'src/shared';
import { transactions } from './data/transactions';

export const handlers = [
  // POST /api/auth/login
  http.post('/api/auth/login', async ({ request }) => {
    const { username, password } = (await request.clone().json()) as { username: string; password: string };

    if (username === 'admin') {
      if (password === '123456') {
        return HttpResponse.json({ token: 'fake-jwt-token-admin', role: 'admin' }, { status: 200 });
      } else {
        return HttpResponse.json(null, { status: 401 });
      }
    } else if (username && password) {
      return HttpResponse.json({ token: 'fake-jwt-token-user', role: 'user' }, { status: 200 });
    }

    return HttpResponse.json({ message: 'Неверный логин или пароль' }, { status: 401 });
  }),

  // GET /api/auth/logout
  http.post('/api/auth/logout', async () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  // GET /api/profile
  http.get('/api/profile', async ({ request }) => {
    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return HttpResponse.json(
      {
        id: '1',
        nickname: token.includes('admin') ? 'admin' : 'user',
        about:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        role: token.includes('admin') ? UserRole.ADMIN : UserRole.USER,
      },
      { status: 200 }
    );
  }),

  // GET /api/transactions
  http.get('/api/transactions', async () => {
    return HttpResponse.json(transactions, { status: 200 });
  }),

  // GET /api/transactions/:id
  http.get('/api/transactions/:id', async ({ params }) => {
    const { id } = params;
    const transaction = transactions.find((transaction) => transaction.id === id);
    return HttpResponse.json(transaction, { status: 200 });
  }),
];
