import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod';

// MAIN ROUTES
import { getPostsRouter } from './routes/getPosts';
import { getCommentsRouter } from './routes/getComments';

// CRUD COMMENT
import { PutCommentsRouter } from './routes/comments/put';
import { GetCommentRouter } from './routes/comments/get';
import { PostCommentsRouter } from './routes/comments/post';
import { DeleteCommentsRouter } from './routes/comments/delete';

// CRUD POST
import { PostPostsRouter } from './routes/posts/post';
import { GetPostRouter } from './routes/posts/get';
import { PutPostRouter } from './routes/posts/put';
import { DeletePostRouter } from './routes/posts/delete';
import fastifyJwt from '@fastify/jwt';

import { UserLoginRouter } from './routes/user/login';
import { UserRegisterRouter } from './routes/user/register';
import { authMiddleware } from './middleware/authMiddleware';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, { origin: '*' });

// JWT PLUGIN
app.register(fastifyJwt, {
	secret: String(process.env.JWT_SECRET),
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Middleware para proteger rotas
app.addHook('onRequest', authMiddleware);

// ROTAS PRIMARIAS
app.register(getPostsRouter);
app.register(getCommentsRouter);

// CRUD POSTS
app.register(PostPostsRouter);
app.register(GetPostRouter);
app.register(PutPostRouter);
app.register(DeletePostRouter);

// CRUD COMMENTS
app.register(PostCommentsRouter);
app.register(GetCommentRouter);
app.register(PutCommentsRouter);
app.register(DeleteCommentsRouter);

// USERS
app.register(UserLoginRouter);
app.register(UserRegisterRouter);

app
	.listen({
		port: process.env.port ? Number(process.env.port) : 3000,
		host: '0.0.0.0',
	})
	.then(() => {
		console.log('Server Running!!!');
	});
