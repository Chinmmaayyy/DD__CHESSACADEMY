import { Hero } from '@/sections/Hero'
import { Stats } from '@/sections/Stats'
import { WhyChoose } from '@/sections/WhyChoose'
import { Coach } from '@/sections/Coach'
import { Schools } from '@/sections/Schools'
import { Achievements } from '@/sections/Achievements'
import { Gallery } from '@/sections/Gallery'
import { Testimonials } from '@/sections/Testimonials'
import { Branches } from '@/sections/Branches'
import { Faq } from '@/sections/Faq'
import { BlogTeaser } from '@/sections/BlogTeaser'
import { Contact } from '@/sections/Contact'

export function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <WhyChoose />
      <Coach />
      <Schools />
      <Achievements />
      <Gallery />
      <Testimonials />
      <Branches />
      <Faq />
      <BlogTeaser />
      <Contact />
    </>
  )
}
