import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { getPostsRouter } from './routes/getPosts';
import { getCommentsRouter } from './routes/getComments';
import { PostCommentsRouter } from './routes/comments/post';
import { PutCommentsRouter } from './routes/comments/put';
import { DeleteCommentsRouter } from './routes/comments/delete';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, { origin: '*' });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// ROTAS PRIMARIAS
app.register(getPostsRouter);
app.register(getCommentsRouter);

// CRUD COMMENTS
app.register(PostCommentsRouter);
app.register(PutCommentsRouter);
app.register(DeleteCommentsRouter);

app.listen({ port: 3000 }).then(() => {
	console.log('Server Running!!!');
});
