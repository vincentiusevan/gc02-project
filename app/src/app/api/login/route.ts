import User from '@/server/models/User';
import { ZodError } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = await User.login(body);

    return Response.json({ message }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const issues = err.issues;
      const messages = issues.map((issue) => {
        return `${issue.path} - ${issue.message}`;
      });

      const message = messages.join('; ');
      return Response.json({ message }, { status: 400 });
    }

    if (err instanceof Error) {
      return Response.json({ message: err.message }, { status: 400 });
    }

    return Response.json({ message: 'ISE' }, { status: 500 });
  }
}
