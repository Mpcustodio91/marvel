// api.service.ts
import axios from 'axios'
import md5 from 'md5'

const publicKey = 'ccb437ac717435d0cad187da54e5fc8a'
const privateKey = '0d4945b2eec5c4041c87d71833ec39f01bff3e24'

function getAuthParams() {
  const timestamp = new Date().getTime()
  if (!privateKey) {
    throw new Error('Chave privada da Marvel não definida.')
  }
  const hash = md5(timestamp + privateKey + publicKey)
  return {
    ts: timestamp,
    apikey: publicKey,
    hash: hash
  }
}

export async function fetchComics(page: number = 2, pageSize: number = 10, sort: string = '') {
  try {
    const params = {
      ...getAuthParams(),
      format: 'comic',
      offset: page,
      limit: pageSize,
      orderBy: sort
    }
    const response = await axios.get('https://gateway.marvel.com/v1/public/comics', {
      params
    })

    const filteredResults = response.data.data.results.filter((comic: any) => {
      return !comic.thumbnail || !comic.thumbnail.path.includes('image_not_available')
    })

    return filteredResults
  } catch (error: any) {
    throw new Error('Erro ao carregar quadrinhos da Marvel: ' + error.message)
  }
}
