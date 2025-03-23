import { createId } from '@paralleldrive/cuid2';
import { pgTable, text, date } from 'drizzle-orm/pg-core';

export const users = pgTable('posts', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId())
		.notNull(),
	email: text('email').notNull(),
	password: text('password').notNull(),
	createdAt: date('created_at').notNull(),
	updatedAt: date('updated_at').notNull(),
});
