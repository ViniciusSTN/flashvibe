import { toast } from 'react-toastify'
import { ButtonDefault } from './ButtonDefault'
import { SelectImageButtonType } from '@/types/selectImage'

export const SelectImageButton: SelectImageButtonType = ({
  validations,
  setImagePreviews,
  setFormData,
  text,
  id,
}) => {
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (files) {
      const filesArray = Array.from(files)

      const validationResult = validations.safeParse(filesArray)
      if (!validationResult.success) {
        const fieldErrors = validationResult.error.formErrors
          .fieldErrors as Record<string, string[]>

        const errorKeys = Object.keys(fieldErrors)

        const firstKey = errorKeys[0]
        if (firstKey) {
          const firstErrorMessage = fieldErrors[firstKey][0]
          if (firstErrorMessage) toast.warning(firstErrorMessage)
        }
      } else {
        const newImagePreviews = filesArray.map((file) =>
          URL.createObjectURL(file),
        )

        setImagePreviews((prev) => [...prev, ...newImagePreviews])

        setFormData((prevState) => ({
          ...prevState,
          images: [...prevState.images, ...filesArray],
        }))
      }
    }
  }

  return (
    <div>
      <input
        id={id}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        onChange={handleFileChange}
        multiple
        className="hidden"
      />

      <label
        htmlFor={id}
        className="flex h-full w-full cursor-pointer items-center justify-center rounded-md border border-principal-blue hover:border-secondary-blue"
      >
        <ButtonDefault
          text={text}
          type="button"
          style="outDark"
          radius="rounded-md"
          paddingy="py-2"
          tailwind="w-full pointer-events-none border-none"
        />
      </label>
    </div>
  )
}
