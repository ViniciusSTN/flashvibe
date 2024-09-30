import { FooterType } from '@/types/footer'
import Image from 'next/image'
import Link from 'next/link'
import { FooterLinksSection } from './FooterLinksSection'
import { items } from '@/mocks/navItems'
import { otherLinks, socialMedias } from '@/mocks/footerLinks'

const Footer: FooterType = ({ theme }) => {
  return (
    <footer
      className={`${theme === 'dark' ? 'bg-principal-blue text-white' : 'bg-light-gray50'} pb-16 pt-12 sm:pt-20 md:px-10 md:pt-24 lg:pt-28`}
    >
      <div className="container mx-auto flex flex-col items-center">
        <div className="mb-16 flex flex-col gap-8 2xl:flex-row">
          <Link href="/" className="self-start hover:scale-105">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/logo-2.svg?alt=media&token=e631c314-ed21-4534-af6c-53ef41630d9b"
              alt="flashvibe logo"
              width={62}
              height={52}
              priority
            />
          </Link>

          <FooterLinksSection items={items} />
        </div>

        <div className="mb-6 flex items-center gap-10">
          {socialMedias.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105"
            >
              <Image
                src={theme === 'dark' ? item.wthiteImage : item.blackImage}
                alt={item.name}
                width={40}
                height={40}
              />
            </Link>
          ))}
        </div>

        <div
          className={`${theme === 'dark' ? 'border-white' : 'border-light-gray250'} flex w-full flex-col flex-wrap items-center justify-center gap-5 border-t pb-8 pt-8 sm:flex-row`}
        >
          {otherLinks.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="transition-colors hover:text-light-blue200"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <p className="text-center">
          @ 2024 FlashVibe. Todos os direitos reservados
        </p>
      </div>
    </footer>
  )
}

export default Footer
