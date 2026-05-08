import { LangProvider } from './(site)/lang-context'
import { WizardProvider } from './(site)/wizard-context'
import { DaycareNav } from './(site)/daycare-nav'
import Hero from './(site)/hero'
import Mission from './(site)/mission'
import Services from './(site)/services'
import Why from './(site)/why'
import Journey from './(site)/journey'
import Gallery from './(site)/gallery'
import Testimonials from './(site)/testimonials'
import Locations from './(site)/locations'
import FAQ from './(site)/faq'
import Social from './(site)/social'
import DaycareFooter from './(site)/footer'
import { WaitlistWizard } from './(site)/waitlist-wizard'

export default function Page() {
  return (
    <LangProvider>
      <WizardProvider>
        <div className="min-h-screen bg-porcelain font-display text-charcoal-deep paper-grain">
          <DaycareNav />
          <main>
            <Hero />
            <Mission />
            <Services />
            <Why />
            <Journey />
            <Gallery />
            <Testimonials />
            <Locations />
            <FAQ />
            <Social />
          </main>
          <DaycareFooter />
        </div>
        <WaitlistWizard />
      </WizardProvider>
    </LangProvider>
  )
}
