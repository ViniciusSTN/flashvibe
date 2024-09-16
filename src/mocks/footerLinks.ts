import { linkType, socialMediaType } from '@/types/footer'

export const socialMedias: socialMediaType[] = [
  {
    name: 'instagram',
    wthiteImage:
      'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/instagram-svgrepo-com.svg?alt=media&token=9ca53460-a8b9-49f1-bc64-72eebac058ba',
    blackImage: 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/instagram-svgrepo-com-black.svg?alt=media&token=ff31adab-5405-4019-83ce-02980c932379',
    link: 'https://www.instagram.com/',
  },
  {
    name: 'discord',
    wthiteImage:
      'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/discord-outline-svgrepo-com.svg?alt=media&token=6f2cb19b-3085-4215-9809-1e20ecd3bbbe',
    blackImage: 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/discord-outline-svgrepo-com-black.svg?alt=media&token=f47cd45e-7daf-43e2-bc99-6831d65f1874',
    link: 'https://discord.gg/gynseUJT',
  },
  {
    name: 'youtube',
    wthiteImage:
      'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/youtube-svgrepo-com.svg?alt=media&token=aac5db68-b68a-4472-a2f7-06b1bd97724f',
    blackImage: 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/youtube-svgrepo-com-black.svg?alt=media&token=4b98b5f8-1db5-497a-8c20-1bda027385f4',
    link: 'https://www.youtube.com/',
  },
  {
    name: 'linkedin',
    wthiteImage:
      'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/linkedin-161-svgrepo-com.svg?alt=media&token=a13de0c1-8f3a-4522-ad1d-aecb888d29c4',
    blackImage: 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/linkedin-161-svgrepo-com-black.svg?alt=media&token=9e2f29cc-cc26-490e-9aef-db2f44f232f5',
    link: 'https://www.linkedin.com',
  },
]

export const otherLinks: linkType[] = [
  {
    name: 'Privacidade',
    link: '/privaciade',
  },
  {
    name: 'Aviso legal',
    link: '/aviso-legal',
  },
  {
    name: 'Termos',
    link: '/termos',
  },
  {
    name: 'Cookies',
    link: '/cookies',
  },
  {
    name: 'Central de denuncias',
    link: '/central-denuncias',
  },
]
