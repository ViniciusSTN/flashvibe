import { NavItemProps } from './navItem'

export type NavbarProps = {
  items: NavItemProps[]
  loginItems: NavItemProps[]
  mobile: boolean
}

export type NavbarType = (props: NavbarProps) => JSX.Element
