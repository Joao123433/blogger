import z from 'zod';

const envParse = z.object({
	DATABASE_URL: z.string().url(),
});

export const env = envParse.parse(process.env);
