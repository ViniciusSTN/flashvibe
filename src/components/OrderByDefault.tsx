import { OrderByDefaultType } from '@/types/orderBy'

export const OrderByDefault: OrderByDefaultType = ({
  activeOrder,
  setActiveOrder,
  options,
}) => {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-2 rounded-lg border border-light-gray250 p-1">
      {options.map((option, index) => (
        <li
          key={index}
          className={`rounded-lg text-lg font-semibold ${activeOrder.value === option.value ? 'bg-secondary-blue text-white' : 'text-secondary-blue'}`}
        >
          <button
            className={`min-w-24 p-1 transition-colors ${activeOrder.value === option.value ? 'hover:text-light-blue200' : 'hover:text-principal-blue'}`}
            onClick={() => setActiveOrder(option)}
          >
            {option.text}
          </button>
        </li>
      ))}
    </ul>
  )
}
