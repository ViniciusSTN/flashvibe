'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { DeckCard } from '@/components/DeckCard'
import { InputDefault } from '@/components/InputDefault'
import { TextAreaDefault } from '@/components/TextAreaDefault'
import { colorClasses } from '@/mocks/deckColors'
import { CustomDeckData, CustomDeckDataErrors } from '@/types/deck'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const initialData: CustomDeckData = {
  name: '',
  description: '',
  photo: null,
  colorPredefinition: 4,
  preferences: {
    new: 3,
    learning: 15,
    reviewing: 2,
  },
}

const initialErrors: CustomDeckDataErrors = {
  name: [],
  description: [],
  photo: [],
}

export const CustomDeckSection = () => {
  const filteredColors = Object.entries(colorClasses).filter(
    ([key]) => Number(key) > 3,
  )

  const [fileName, setFileName] = useState<string>('')
  const [formData, setFormData] = useState<CustomDeckData>(initialData)
  const [formErrors, setFormErrors] =
    useState<CustomDeckDataErrors>(initialErrors)

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target

    switch (name) {
      case 'name':
      case 'description':
        setFormData((prevState) => ({
          ...prevState,
          [name]: value.charAt(0).toUpperCase() + value.slice(1),
        }))
        break
      case 'color':
        console.log(value)
        break
      case 'new':
      case 'learning':
      case 'reviewing':
        setFormData((prevState) => ({
          ...prevState,
          preferences: {
            ...prevState.preferences,
            [name]: value,
          },
        }))
        break
      default:
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }))
    }
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

  return (
    <section className="mx-auto my-24 min-h-screen-header max-w-1440px px-6 md:px-10">
      <h1 className="mb-16 text-center text-3xl font-semibold">
        Adicionar deck personalizado
      </h1>

      <form className="flex w-full flex-wrap justify-center gap-32">
        <fieldset className="flex max-w-420px flex-col gap-6">
          <legend className="mb-6 text-xl font-semibold">
            Informações do deck
          </legend>

          <InputDefault
            label="Nome *"
            name="name"
            type="text"
            value={formData.name}
            placeholder="Ex: English words"
            error={formErrors.name}
            onChange={handleInputChange}
          />

          <TextAreaDefault
            name="description"
            error={formErrors.description}
            label="Descrição"
            onChange={handleInputChange}
            placeholder="Ex: Palavras mais usadas no dia a dia"
            value={formData.description}
          />

          <div>
            <p className="font-medium">Imagem de capa</p>
            <div className="flex items-center justify-between gap-6">
              <div className="grow">
                <InputDefault
                  name="image"
                  type="text"
                  disable
                  placeholder="Nenhuma imagem selecionada"
                  value={fileName}
                />
              </div>

              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-light-gray200 bg-[#fbfbfb] shadow-input"
              >
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/upload-svgrepo-com.svg?alt=media&token=4de64682-3122-4673-a05b-ee6f45bae71c"
                  alt="enviar imagem"
                  height={30}
                  width={30}
                />
              </button>
            </div>
          </div>

          <div>
            <p className="mb-1 font-medium">Cor</p>

            <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
              {filteredColors.map(([key, { light }]) => (
                <label key={key} className="cursor-pointer">
                  <input
                    type="radio"
                    name="color"
                    value={key}
                    className="hidden"
                    checked={formData.colorPredefinition === Number(key)}
                    onChange={() => {
                      setFormData((prevState) => ({
                        ...prevState,
                        colorPredefinition: Number(key),
                      }))
                    }}
                  />
                  <div
                    className={`h-12 w-12 rounded border-2 transition ${light} ${
                      formData.colorPredefinition === Number(key)
                        ? `scale-110 border-secondary-blue`
                        : `border-transparent`
                    }`}
                  />
                </label>
              ))}
            </div>
          </div>

          <fieldset className="mt-8">
            <legend className="mb-6 text-xl font-semibold">Preferências</legend>

            <div className="mb-5 font-medium text-light-gray500">
              <p className="mb-3">
                Aqui você pode alterar a quantidade de flashcards que deseja
                estudar no dia.
              </p>

              <p>
                Recomendamos deixar padrão e alterar depois conforme sua
                necessidade.
              </p>
            </div>

            <div className="mb-5 flex gap-8">
              <InputDefault
                name="new"
                type="number"
                label="Novos"
                onChange={handleInputChange}
                value={formData.preferences.new.toString()}
              />

              <InputDefault
                name="learning"
                type="number"
                label="Aprendendo"
                onChange={handleInputChange}
                value={formData.preferences.learning.toString()}
              />

              <InputDefault
                name="reviewing"
                type="number"
                label="Revisando"
                onChange={handleInputChange}
                value={formData.preferences.reviewing.toString()}
              />
            </div>

            <ButtonDefault
              text="Resetar preferências"
              type="button"
              paddingy="py-2"
              paddingx="px-6"
              style="outDark"
              radius="rounded-lg"
              onClick={() =>
                setFormData((prevState) => ({
                  ...prevState,
                  preferences: {
                    new: 3,
                    learning: 15,
                    reviewing: 2,
                  },
                }))
              }
            />
          </fieldset>
        </fieldset>

        <fieldset className="max-w-310px">
          <legend className="mb-6 text-center text-xl font-semibold">
            Pré visualização
          </legend>

          <div className="mb-8">
            <DeckCard
              colorPredefinition={formData.colorPredefinition}
              description=""
              favorite={false}
              flashcards={0}
              image={
                formData.photo
                  ? URL.createObjectURL(formData.photo)
                  : 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/deck-image-example.png?alt=media&token=7905dc10-fde7-4729-a088-fb87c94e2683'
              }
              lastModification={Date.now()}
              learning={0}
              new={0}
              reviewing={0}
              reviews={null}
              public={false}
              situation="New"
              stars={null}
              title={formData.name.length > 0 ? formData.name : 'Deck name'}
              type="Custom deck"
              disabled
            />
          </div>

          <div className="flex flex-col gap-6">
            <ButtonDefault
              text="Cancelar"
              type="link"
              link="/meus-decks"
              paddingy="py-2"
              tailwind="w-full"
              radius="rounded-lg"
              style="outDark"
            />

            <ButtonDefault
              text="Adicionar deck"
              type="button"
              tailwind="w-full h-[42px]"
              radius="rounded-lg"
              submit
            />
          </div>
        </fieldset>
      </form>
    </section>
  )
}
