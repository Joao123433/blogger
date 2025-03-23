import { createId } from '@paralleldrive/cuid2';
import { pgTable, text, date } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId())
		.notNull(),
	email: text('email').notNull(),
	password: text('password').notNull(),
	name: text('name').notNull(),
	createdAt: date('created_at').notNull(),
	updatedAt: date('updated_at').notNull(),
});
