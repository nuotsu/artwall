import COOKIE from '../utils/cookies'
import type { LayoutServerLoad } from './$types'

export const load = (async ({ cookies }) => {
	return {
		media: JSON.parse(cookies.get(COOKIE.MEDIA) as string ?? '[]'),
	}
}) satisfies LayoutServerLoad
