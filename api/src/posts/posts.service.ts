import { Injectable } from '@nestjs/common';
import { Posts } from './entities/posts.entity';
import { createId } from '@paralleldrive/cuid2';

@Injectable()
export class PostsService {
	private posts: Posts[] = [
		{
			id: createId(),
			title: 'First Post',
			introduction: 'This is the content of the first post.',
			story: 'adsfasdfasdf',
			conclusion: 'asdfasdfasdf',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	];

	findAll() {
		return this.posts;
	}
}
