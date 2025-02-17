export type SearchInputDefaultProps = {
  setSearch: (search: string) => void
  placeholder?: string
}

export type SearchInputDefaultType = (
  props: SearchInputDefaultProps,
) => JSX.Element
