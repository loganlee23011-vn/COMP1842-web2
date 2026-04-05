<template>
  <div class="landing-page">
    <LandingNavbar />
    <main>
      <LandingHero />
      <LandingPreview />
    </main>
    <LandingFooter />
  </div>
</template>

<script>
import '../assets/landing.css'
import LandingFooter from '../components/landing/LandingFooter.vue'
import LandingHero from '../components/landing/LandingHero.vue'
import LandingNavbar from '../components/landing/LandingNavbar.vue'
import LandingPreview from '../components/landing/LandingPreview.vue'

export default {
  name: 'LandingView',
  components: {
    LandingNavbar,
    LandingHero,
    LandingPreview,
    LandingFooter,
  },
}
</script>
