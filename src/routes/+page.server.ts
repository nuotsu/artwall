import type { Actions } from './$types'
import { JSDOM } from 'jsdom'

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData()

		const response = await fetch(data.get('url') as string, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
			}
		})
		const text = await response.text()
		const dom = new JSDOM(text)

		const image = dom.window.document.querySelector('meta[property="og:image"]')?.getAttribute('content') as string

		cookies.set('media', JSON.stringify({
			url: data.get('url') as string,
			image,
			position: [0,0]
		} satisfies App.Media))

		return {
			media: JSON.parse(cookies.get('media') as string ?? '{}'),
		}
	}
} satisfies Actions
