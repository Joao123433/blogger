import dayjs from 'dayjs';
import { client, db } from '.';
import { comments, posts } from './schema';

async function seed() {
	await db.delete(comments);
	await db.delete(posts);

	const dateFormat = dayjs().format('YYYY-MM-DD HH:mm:ss');

	const [post] = await db
		.insert(posts)
		.values([
			{
				title: 'Blog tips for beginners',
				introduction:
					'Readymade godard brooklyn, kogi shoreditch hashtag hella shaman kitsch man bun pinterest flexitarian. Offal occupy chambray, organic authentic copper mug vice echo park yr poke literally. Ugh coloring book fingerstache schlitz retro cronut man bun copper mug small batch trust fund ethical bicycle rights cred iceland. Celiac schlitz la croix 3 wolf moon butcher. Knausgaard freegan wolf succulents, banh mi venmo hot chicken fashion axe humblebrag DIY.',
				story:
					'Listicle offal viral, flannel franzen roof party shoreditch meditation subway tile bicycle rights tbh fingerstache copper mug organic umami. Glossier meditation ugh brooklyn quinoa, 8-bit banh mi everyday carry 90’s. Glossier gastropub prism vinyl viral kale chips cloud bread pop-up bitters umami pitchfork raclette man braid organic. Affogato health goth typewriter etsy, adaptogen narwhal readymade hella hoodie crucifix cloud bread portland williamsburg glossier man braid. Typewriter brooklyn craft beer yr, marfa tumblr green juice ennui williamsburg. Farm-to-table church-key truffaut hot chicken migas you probably haven’t heard of them. Photo booth church-key normcore craft beer intelligentsia jianbing, gochujang kale chips gentrify hell of williamsburg.',
				conclusion:
					'Venmo fixie knausgaard readymade. 3 wolf moon blue bottle sartorial blog. Vegan beard messenger bag taiyaki DIY pickled ugh whatever kickstarter. Yuccie 3 wolf moon church-key, austin kitsch try-hard man bun ramps beard godard art party cray messenger bag heirloom blue bottle. Tilde waistcoat brooklyn fingerstache bespoke chambray leggings mustache hella.',
				createdAt: dayjs(new Date()).format('YYYY-MM-DD'),
				updatedAt: dayjs(new Date()).format('YYYY-MM-DD'),
			},
		])
		.returning();

	await db.insert(comments).values([
		{
			name: 'Teste',
			email: 'Teste@gmail.com',
			comment: 'lorem ialksdf',
			idPost: post.id,
			createdAt: dayjs(new Date()).format('YYYY-MM-DD'),
			updatedAt: dayjs(new Date()).format('YYYY-MM-DD'),
		},
	]);
}

seed().then(() => {
	console.log('Seed Generate!!!');
	client.end();
});
