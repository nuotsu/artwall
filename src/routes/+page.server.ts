import type { Actions, PageServerLoad } from './$types'
import { JSDOM } from 'jsdom'

export const load = (async ({ url }) => {
	if (url.searchParams.has('json')) {
		return {
			json: JSON.parse(url.searchParams.get('json') as string),
		}
	}
}) satisfies PageServerLoad

export const actions = {
	upload: async ({ request, cookies }) => {
		const data = await request.formData()
		const url = data.get('url') as string

		const response = await fetch(url, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
			}
		})
		const text = await response.text()
		const dom = new JSDOM(text)

		const oldMedia = JSON.parse(cookies.get('artwall-media') as string ?? '[]') as App.Media[]

		const newMedia: App.Media = {
			url,
			image: dom.window.document.querySelector('meta[property="og:image"]')?.getAttribute('content') as string,
			position: [0,0],
		}

		const updatedMedia = [newMedia, ...oldMedia.filter(media => media.url !== url)]

		cookies.set('artwall-media', JSON.stringify(updatedMedia))

		return {
			media: updatedMedia,
		}
	},

	share: async ({ cookies }) => {
		return {
			json: cookies.get('artwall-media') as string ?? '[]',
		}
	},

	delete: async ({ request, cookies }) => {
		const data = await request.formData()
		const url = data.get('url') as string

		const oldMedia = JSON.parse(cookies.get('artwall-media') as string ?? '[]') as App.Media[]
		const updatedMedia = [...oldMedia].filter(media => media.url !== url)

		cookies.set('artwall-media', JSON.stringify(updatedMedia))

		return {
			media: updatedMedia,
		}
	},
} satisfies Actions
