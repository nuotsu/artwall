import COOKIE from '../utils/cookies'
import resolveMedia from '../utils/resolveMedia'
import type { Actions, PageServerLoad } from './$types'

export const load = (async ({ url }) => {
	if (url.searchParams.has('json')) return {
		json: JSON.parse(url.searchParams.get('json') as string),
	}
}) satisfies PageServerLoad

export const actions = {
	upload: async ({ request, cookies }) => {
		const data = await request.formData()
		const url = data.get('url') as string

		const oldMedia = JSON.parse(cookies.get(COOKIE.MEDIA) as string ?? '[]') as App.Media[]
		const newMedia = await resolveMedia(url)

		const updatedMedia = [newMedia, ...oldMedia.filter(media => media.url !== url)]

		cookies.set(COOKIE.MEDIA, JSON.stringify(updatedMedia))

		return {
			media: updatedMedia,
		}
	},
	delete: async ({ request, cookies }) => {
		const data = await request.formData()
		const url = data.get('url') as string

		const oldMedia = JSON.parse(cookies.get(COOKIE.MEDIA) as string ?? '[]') as App.Media[]
		const updatedMedia = [...oldMedia].filter(media => media.url !== url)

		cookies.set(COOKIE.MEDIA, JSON.stringify(updatedMedia))

		return {
			media: updatedMedia,
		}
	},
	move: async ({ request, cookies }) => {
		const data = await request.formData()
		const url = data.get('url') as string

		const oldMedia = JSON.parse(cookies.get(COOKIE.MEDIA) as string ?? '[]') as App.Media[]
		const updatedMedia = oldMedia.map(media => {
			if (media.url === url) {
				media.position = [
					Number(data.get('left')),
					Number(data.get('top')),
				]
			}
			return media
		})

		cookies.set(COOKIE.MEDIA, JSON.stringify(updatedMedia))

		return {
			media: updatedMedia,
		}
	},
} satisfies Actions
