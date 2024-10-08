import Slider from 'rc-slider'
import { useEffect, useState } from 'react'
import 'rc-slider/assets/index.css'
import { ButtonDefault } from '@/components/ButtonDefault'

export const MyDeckFilters = () => {
  const [defaultRange, setDefaultRange] = useState({ min: 0, max: 0 })
  const [minRange, setMinRange] = useState<number>(0)
  const [maxRange, setMaxRange] = useState<number>(0)

  useEffect(() => {
    // const result = getMinAndMaxFlashcardsAmount()
    const result = { min: 100, max: 1000 } // simulando o retorno da API

    setDefaultRange({ ...result })
    setMinRange(result.min)
    setMaxRange(result.max)
  }, [])

  useEffect(() => {
    console.log(minRange, maxRange)
  }, [minRange, maxRange])

  const handleSliderChange = (newValues: number | number[]) => {
    if (Array.isArray(newValues)) {
      setMinRange(newValues[0])
      setMaxRange(newValues[1])
    }
  }

  return (
    <form className="" action="">
      <h3>Filtros</h3>

      <fieldset className="flex">
        <button>Padrões</button>
        <button>Personalizados</button>
        <button>Todos</button>
      </fieldset>

      <fieldset>
        <legend>Ordenar por</legend>

        <label>
          <input type="radio" name="sort" value="newer" />
          Mais novos
        </label>

        <label>
          <input type="radio" name="sort" value="older" />
          Mais antigos
        </label>

        <label>
          <input
            type="radio"
            name="sort"
            value="lastModifications"
            defaultChecked
          />
          Modificações recentes
        </label>

        <label>
          <input type="radio" name="sort" value="lastStudied" />
          Últimos estudados
        </label>

        <label>
          <input type="radio" name="sort" value="flashcards" />
          Quantidade de flashcards
        </label>
      </fieldset>

      <fieldset>
        <legend>Quantidade de flashcards</legend>

        <div>
          <h3>Quantidade de flashcards</h3>
          <Slider
            range
            min={defaultRange.min}
            max={defaultRange.max}
            step={10}
            value={[minRange, maxRange]}
            onChange={handleSliderChange}
          />
          <div className="flex justify-between">
            <span>{minRange}</span>
            <span>{maxRange}</span>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Situação</legend>

        <label>
          <input type="checkbox" name="situation" value="favorites" />
          Favoritos
        </label>

        <label>
          <input type="checkbox" name="situation" value="learning" />
          Aprendendo
        </label>

        <label>
          <input type="checkbox" name="situation" value="finished" />
          Finalizado
        </label>
      </fieldset>

      <div>
        <ButtonDefault
          text="Redefinir"
          type="button"
          style="outDark"
          paddingy="py-2"
          radius="rounded-lg"
          tailwind="w-32"
        />

        <ButtonDefault
          text="Aplicar"
          type="button"
          style="dark"
          paddingy="py-2"
          radius="rounded-lg"
          tailwind="w-32"
          submit
        />
      </div>
    </form>
  )
}
