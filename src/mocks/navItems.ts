import { NavItemProps } from '@/types/navItem'

export const items: NavItemProps[] = [
  {
    title: 'Aprender',
    links: [
      {
        name: 'Meus decks',
        link: '/decks',
      },
      {
        name: 'Aprendizado',
        link: '/aprendizado',
      },
    ],
  },
  {
    title: 'Comunidade',
    links: [
      {
        name: 'Decks da comunidade',
        link: '/decks-comunidade',
      },
      {
        name: 'Fórum de discuções',
        link: '/forum',
      },
    ],
  },
  {
    title: 'Ajuda',
    links: [
      {
        name: 'Perguntas frequentes (FAQS)',
        link: '/perguntas-frequentes',
      },
      {
        name: 'Central de ajuda',
        link: '/ajuda',
      },
    ],
  },
  {
    title: 'Novidades',
    links: [
      {
        name: 'Blog',
        link: '/blog',
      },
    ],
  },
  {
    title: 'Sobre',
    links: [
      {
        name: 'Quem somos',
        link: '/sobre',
      },
    ],
  },
  {
    title: 'Contato',
    links: [
      {
        name: 'Fale conosco',
        link: '/contato',
      },
    ],
  },
]
