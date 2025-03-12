import { NavItemProps } from '@/types/navItem'

export const items: NavItemProps[] = [
  {
    title: 'Aprender',
    links: [
      {
        name: 'Meus decks',
        link: '/meus-decks?pag=1',
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
        link: '/decks-da-comunidade?pag=1',
      },
      {
        name: 'Fórum de discussões',
        link: '/forum-de-discussoes?pag=1&orderBy=newer',
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
        link: '/quem-somos',
      },
    ],
  },
  {
    title: 'Contato',
    links: [
      {
        name: 'Fale conosco',
        link: '/fale-conosco',
      },
    ],
  },
]

export const loginItems: NavItemProps[] = [
  {
    title: 'Meu perfil',
    links: [
      {
        name: 'Alterar meus dados',
        link: '/meu-perfil',
      },
    ],
  },
  {
    title: 'Logar',
    links: [
      {
        name: 'Fazer Login',
        link: '/login',
      },
      {
        name: 'Registrar',
        link: '/registro',
      },
    ],
  },
]
