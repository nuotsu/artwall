import { JSDOM } from 'jsdom'

export default async function (urlData: string): Promise<App.Media> {
	const url = cleanUrl(urlData)

	const response = await fetch(url, {
		headers: {
			'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
		}
	})
	const text = await response.text()
	const dom = new JSDOM(text)

	return {
		url,
		title: resolveTitle(dom, url),
		image: resolveImage(dom, url),
		position: [0, 0],
	}
}

function cleanUrl(url: string) {
	const u = new URL(url)
	u.search = ''
	return u.toString()
}

function resolveTitle(dom: JSDOM, url: string) {
	if (url.includes('twitter.com')) {
		return dom.window.document.querySelector('meta[property="og:description"]')?.getAttribute('content') ?? ''
	}

	return dom.window.document.title
}

function resolveImage(dom: JSDOM, url: string) {
	const imageContent = dom.window.document.querySelector('meta[property="og:image"]')?.getAttribute('content') ?? ''

	if (!imageContent) return undefined

	return imageContent.startsWith('http')
		? imageContent
		: new URL(url).origin + imageContent
}
