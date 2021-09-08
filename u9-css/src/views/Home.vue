<template>
  <div class="home">
    <section class="hero is-medium">
      <div class="hero-body has-text-centered-mobile">
        <div class="container">
          <div class="columns">
            <div class="column is-one-quarter is-full-mobile">
              <img alt="Vue logo" src="../assets/logo.png" />
            </div>
            <div class="column">
              <p class="is-size-3 is-hidden-tablet">Vue.js</p>
              <p class="is-size-1 is-size-4-mobile mb-3 has-text-weight-light">
                The Progressive
                <br />
                JavaScript Framework
              </p>
              <p class="subtitle">
                <b-button
                  class="mr-3 mb-3 is-primary"
                  size="is-medium"
                  icon-left="play-circle"
                  rounded
                >
                  Why Vue.js?
                </b-button>
                <b-button
                  class="mr-3 mb-3 is-primary"
                  size="is-medium"
                  rounded
                  outlined
                >
                  Get Started
                </b-button>
                <b-button
                  class="mr-3 mb-3 is-light"
                  size="is-medium"
                  icon-left="github"
                  rounded
                >
                  GitHub
                </b-button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container has-text-centered">
        <div class="columns">
          <div class="column">
            <h2 class="subtitle">Approachable</h2>
            <p>
              Already know HTML, CSS and JavaScript? Read the guide and start
              building things in no time!
            </p>
          </div>
          <div class="column">
            <h2 class="subtitle">Versatile</h2>
            <p>
              An incrementally adoptable ecosystem that scales between a library
              and a full-featured framework.
            </p>
          </div>
          <div class="column">
            <h2 class="subtitle">Performant</h2>
            <p>
              20KB min+gzip Runtime Blazing Fast Virtual DOM Minimal
              Optimization Efforts
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import '@/main.scss';

h2.subtitle {
  color: $primary;
}

h2.subtitle + p {
  margin: 0 auto;
  max-width: 16rem;
}
</style>
