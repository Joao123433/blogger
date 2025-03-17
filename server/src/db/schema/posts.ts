import { createId } from '@paralleldrive/cuid2';
import { pgTable, text, date } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId())
		.notNull(),
	title: text('title').notNull(),
	introduction: text('introduction').notNull(),
	story: text('story').notNull(),
	conclusion: text('conclusion').notNull(),
	createdAt: date('created_at').notNull(),
	updatedAt: date('updated_at').notNull(),
});
