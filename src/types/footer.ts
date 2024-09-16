import { NavItemProps } from './navItem'

export type FooterProps = {
  theme: 'light' | 'dark'
}

export type FooterType = (props: FooterProps) => JSX.Element

export type FooterLinksSectionProps = {
  items: NavItemProps[]
}

export type FooterLinksSectionType = (
  props: FooterLinksSectionProps,
) => JSX.Element

export type socialMediaType = {
  name: string
  wthiteImage: string
  blackImage: string
  link: string
}

export type linkType = {
  name: string
  link: string
}
