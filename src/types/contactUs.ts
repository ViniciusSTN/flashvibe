export type ContactUsData = {
  name: string
  email: string
  subject: string
  description: string
  images: File[]
}

export type ContactUsErrors = {
  name: string[]
  email: string[]
  subject: string[]
  description: string[]
  images: string[]
}

export type InputName = keyof ContactUsData
