import { Hero } from '@/sections/Hero'
import { Stats } from '@/sections/Stats'
import { WhyChoose } from '@/sections/WhyChoose'
import { Coach } from '@/sections/Coach'
import { Courses } from '@/sections/Courses'
import { Achievements } from '@/sections/Achievements'
import { Gallery } from '@/sections/Gallery'
import { Testimonials } from '@/sections/Testimonials'
import { Events } from '@/sections/Events'
import { Branches } from '@/sections/Branches'
import { Faq } from '@/sections/Faq'
import { Contact } from '@/sections/Contact'

export function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <WhyChoose />
      <Coach />
      <Courses />
      <Achievements />
      <Gallery />
      <Testimonials />
      <Events />
      <Branches />
      <Faq />
      <Contact />
    </>
  )
}
