import { db } from '../../db';
import { posts } from '../../db/schema';

export function getPublication() {
	const publication = db.select({
		id: posts.id,
		title: posts.title,
		introduction: posts.introduction,
		story: posts.story,
		conclusion: posts.conclusion,
		createdAt: posts.createdAt,
		updatedAt: posts.updatedAt,
	});
}
