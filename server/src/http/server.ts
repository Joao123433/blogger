import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { getPostsRouter } from './routes/getPosts';
import { getCommentsRouter } from './routes/getComments';

// CRUD COMMENT
import { PutCommentsRouter } from './routes/comments/put';
import { GetCommentRouter } from './routes/comments/get';
import { PostCommentsRouter } from './routes/comments/post';
import { DeleteCommentsRouter } from './routes/comments/delete';
import { GetPostRouter } from './routes/posts/get';
import { PostPostsRouter } from './routes/posts/post';
import { DeletePostRouter } from './routes/posts/delete';
import { PutPostRouter } from './routes/posts/put';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, { origin: '*' });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

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

app.listen({ port: 3000 }).then(() => {
	console.log('Server Running!!!');
});
