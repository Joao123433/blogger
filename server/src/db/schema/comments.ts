import { createId } from '@paralleldrive/cuid2';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { posts } from './posts';

export const comments = pgTable('comments', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId())
		.notNull(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	comment: text('comment').notNull(),
	idPost: text('id_post')
		.references(() => posts.id)
		.notNull(),
});
