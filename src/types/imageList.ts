import { Dispatch, SetStateAction } from 'react'
import { FormDataType } from './selectImage'

export type ImageListProps<T extends FormDataType> = {
  images: string[]
  setImagePreviews: Dispatch<SetStateAction<string[]>>
  setFormData: Dispatch<SetStateAction<T>>
}

export type ImageListType = <T extends FormDataType>(
  props: ImageListProps<T>,
) => JSX.Element
