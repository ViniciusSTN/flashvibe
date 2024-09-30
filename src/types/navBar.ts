import { NavItemProps } from './navItem'

export type NavbarProps = {
  items: NavItemProps[]
  mobile: boolean
}

export type NavbarType = (props: NavbarProps) => JSX.Element
