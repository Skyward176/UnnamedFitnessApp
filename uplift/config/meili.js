import {MeiliSearch} from 'meilisearch';
const searchClient = new MeiliSearch({
    host: process.env.NEXT_PUBLIC_MEILI_URL,
    apiKey: process.env.NEXT_PUBLIC_MEILI_KEY
})
export {searchClient}