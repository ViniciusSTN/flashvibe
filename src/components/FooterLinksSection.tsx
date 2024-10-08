import { FooterLinksSectionType } from '@/types/footer'
import Link from 'next/link'

export const FooterLinksSection: FooterLinksSectionType = ({ items }) => {
  return (
    <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7">
      {items.map((item, index) => (
        <div key={index}>
          <h4 className="mb-5 text-lg font-semibold">{item.title}</h4>
          <ul className="flex flex-col gap-3">
            {item.links.map((link, index) => (
              <li
                key={index}
                className="max-w-64 self-start transition-colors hover:text-light-blue200"
              >
                <Link href={link.link}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
