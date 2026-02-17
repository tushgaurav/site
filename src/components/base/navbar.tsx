'use client'

import Link from 'next/link'
import Image from 'next/image'
import { type ComponentPropsWithoutRef, type ReactNode, useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import { AnimatedThemeToggler } from '../animated-theme-toggle'
import { ModeToggle } from '../theme-toggle'
import { useIsMobile } from '@/components/hooks/use-mobile'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const aboutLinks = [
  {
    title: 'About',
    href: '/about',
    description: "My background, what I'm working on, and the tech that keeps me up at night.",
  },
  {
    title: 'Resume',
    href: '/resume',
    description:
      'Work experience, technical skills, and everything recruiters actually want to see.',
  },
]

const exclusivesLinks = [
  {
    title: 'Archives',
    href: '/archive',
    description: 'A complete collection of articles, tutorials, and project write-ups.',
  },
  {
    title: 'Voice',
    href: '/voice',
    description:
      'Voice-enabled AI assistant for natural conversations about code, projects, or life.',
  },
]

const mobileNavLinks = [
  { href: '/voice', label: 'Voice' },
  { href: '/archive', label: 'Archive' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const height = document.body.scrollHeight - document.documentElement.clientHeight
      setScrolled(window.scrollY / height * 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])  

  return (
    <header className={
      cn("fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border")
    }>
      <nav className="flex justify-between items-center p-4 py-4 max-w-7xl mx-auto">
        <Link href="/" className="z-50">
          <Image
            src="/tushar-sign.png"
            alt="Tushar Gaurav"
            width={150}
            height={50}
            className="hidden dark:block h-8 transition-all duration-300 hover:drop-shadow-[0_0_12px_white] hover:brightness-110"
          />
          <Image
            src="/tushar-sign-light.jpg"
            alt="Tushar Gaurav"
            width={150}
            height={40}
            className="dark:hidden h-8 transition-all duration-300 hover:drop-shadow-[0_0_12px_white] hover:brightness-110"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 text-sm items-center relative">
          <NavigationMenu viewport={!isMobile} className="text-base font-medium">
            <NavigationMenuList className="gap-1">
              {/* About Section */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 p-1 md:w-[400px] lg:w-[520px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/projects"
                          className="from-muted/50 to-muted flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b p-4 no-underline outline-none transition-all duration-200 focus:shadow-md md:p-6"
                        >
                          <div className="mb-2 text-lg font-semibold sm:mt-4">Projects</div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            In-progress prototypes, notes, and experiments from my personal
                            projects.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {aboutLinks.map((item) => (
                      <ListItem key={item.title} title={item.title} href={item.href}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Exclusives Section */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Exclusives</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 p-1 sm:w-[420px] md:w-[520px] md:grid-cols-2 lg:w-[600px]">
                    {exclusivesLinks.map((item) => (
                      <ListItem key={item.title} title={item.title} href={item.href}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/contact">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuIndicator />
          </NavigationMenu>
          <div className="ml-1 mt-1">
            <AnimatedThemeToggler />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="flex flex-col p-4 space-y-2 text-sm">
            {mobileNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-2 py-2 transition-colors hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 ml-2 gap-4 flex items-center">
              <span className="text-muted-foreground text-sm">Color Scheme</span>
              <ModeToggle />
            </div>
          </div>
        </div>
      )}

      {/* Scroll progress indicator*/}
      {pathname.includes('/article/') && (
        <div className="h-[2px] bg-muted/30 hidden md:block">
          <div
            className="h-full bg-primary/40 transition-[width] duration-150 ease-out"
            style={{ width: `${scrolled}%` }}
          />
        </div>
      )}
    </header>
  )
}

type ListItemProps = ComponentPropsWithoutRef<'li'> & {
  title: string
  href: string
  children: ReactNode
}

function ListItem({ title, children, href, ...props }: ListItemProps) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none space-y-1 rounded-md p-3 text-sm no-underline outline-none transition-colors hover:bg-accent focus:bg-accent"
        >
          <div className="font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
