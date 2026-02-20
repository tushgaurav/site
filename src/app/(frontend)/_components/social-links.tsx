import Link from 'next/link'

import { SiGithub, SiDeviantart, SiMastodon, SiTwitch } from '@icons-pack/react-simple-icons'
import { SiX } from '@icons-pack/react-simple-icons'
import { Linkedin } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@/payload.config'

function getIcon(iconName?: string) {
  if (!iconName) return null
  switch (iconName.toLowerCase()) {
    case 'github':
      return <SiGithub aria-label="GitHub" />
    case 'x':
      return <SiX aria-label="X" />
    case 'twitter':
      return <SiX aria-label="X" />
    case 'linkedin':
      return <Linkedin />
    case 'deviantart':
      return <SiDeviantart aria-label="DeviantArt" />
    case 'mastodon':
      return <SiMastodon aria-label="Mastodon" />
    case 'twitch':
      return <SiTwitch aria-label="Twitch" />
    default:
      return null
  }
}

export default async function SocialLinks() {
  const payload = await getPayload({
    config: config,
  })
  const { docs: socialLinks } = await payload.find({
    collection: 'social-links',
  })

  return (
    <div className="flex gap-4 mb-12">
      {socialLinks.map((socialLink) => (
        <Link
          key={socialLink.id}
          href={socialLink.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={socialLink.platform}
        >
          {getIcon(socialLink['si-icon-name'] || socialLink.platform)}
        </Link>
      ))}
    </div>
  )
}
