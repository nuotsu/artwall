import type { Actions } from './$types'
import { JSDOM } from 'jsdom'

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData()

		const response = await fetch(data.get('url') as string, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
			}
		})
		const text = await response.text()
		const dom = new JSDOM(text)

		const image = dom.window.document.querySelector('meta[property="og:image"]')?.getAttribute('content')

		return {
			media: {
				url: data.get('url') as string,
				image,
			},
		}
	}
}
