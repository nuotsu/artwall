import { writable } from 'svelte/store'

export const media = writable<App.Media[]>([])
