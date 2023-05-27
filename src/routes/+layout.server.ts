import type { LayoutServerLoad } from './$types'

export const load = (async ({ cookies }) => {
	return {
		media: JSON.parse(cookies.get('artwall-media') as string ?? '[]'),
	}
}) satisfies LayoutServerLoad
