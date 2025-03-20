import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { comments, posts } from '../../db/schema';

export function getPublication() {
	const publication = db
		.select({
			id: posts.id,
			title: posts.title,
			introduction: posts.introduction,
			story: posts.story,
			conclusion: posts.conclusion,
			createdAt: posts.createdAt,
			idComment: comments.id,
			name: comments.name,
			email: comments.email,
			comment: comments.comment,
		})
		.from(posts)
		.innerJoin(comments, eq(posts.id, comments.idPost));
}
