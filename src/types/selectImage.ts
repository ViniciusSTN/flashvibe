import { Dispatch, SetStateAction } from 'react'
import { ZodType } from 'zod'

export type FormDataType = {
  images: File[]
  [key: string]: unknown
}

export type SelectImageProps<T extends FormDataType> = {
  validations: ZodType
  setImagePreviews: Dispatch<SetStateAction<string[]>>
  setFormData: Dispatch<SetStateAction<T>>
  text: string
  id: string
}

export type SelectImageButtonType = <T extends FormDataType>(
  props: SelectImageProps<T>,
) => JSX.Element
