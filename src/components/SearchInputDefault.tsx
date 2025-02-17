import { SearchInputDefaultType } from '@/types/searchInput'
import { useState } from 'react'

export const SearchInputDefault: SearchInputDefaultType = ({
  setSearch,
  placeholder = 'Pesquisar',
}) => {
  const [value, setValue] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValue(value)
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearch(value)
  }

  return (
    <form
      className="flex rounded-lg border border-light-gray250"
      onSubmit={handleFormSubmit}
    >
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full rounded-l-lg px-4 placeholder:font-medium"
      />

      <button
        type="submit"
        className="flex h-8 w-12 items-center justify-center rounded-r-lg border-l border-light-gray250 bg-light-gray200"
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/Search.svg?alt=media&token=7cb5ac9d-0e06-47fd-b66c-6d6e043c6c3a"
          alt="buscar"
        />
      </button>
    </form>
  )
}
