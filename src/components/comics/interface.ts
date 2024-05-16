export interface Comic {
  id: number
  title: string
  description: string
  prices: { type: string; price: number }[]
  price: string | number | undefined
  thumbnail: {
    path: string
    extension: string
  }
  textObjects: [
    {
      type: string
      language: string
      text: string
    }
  ]
}
