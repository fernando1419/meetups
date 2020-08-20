<template>
  <v-container>
    <v-layout
      v-if="errorProperty"
    >
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <app-alert
          :text="errorProperty.message"
          @dismissed="onDismissed"
        />
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <v-card>
          <v-card-text>
            <v-container>
              <v-form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      id="email"
                      v-model="email"
                      name="email"
                      label="Email"
                      type="email"
                      required
                    >
                      Email
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      id="password"
                      v-model="password"
                      name="password"
                      label="Password"
                      type="password"
                      required
                    >
                      Password
                    </v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-btn
                      type="submit"
                      :loading="loadingProperty"
                    >
                      Sign in
                      <span
                        slot="loader"
                        class="custom-loader"
                      >
                        <v-icon light> cached </v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser; // returns a user from store using a getter.
    },
    errorProperty() {
      return this.$store.getters.getError;
    },
    loadingProperty() {
      return this.$store.getters.getLoading;
    }
  },
  watch: { // watches the computed property "user"
    user (value) { // whenever the value changes, when the getter retrieves us another state value.
      if (value !== null && value !== undefined) {
        return this.$router.push('/') // redirect to "/" after successful signup.
      }
    }
  },
  methods: {
    onSignin() {
      // console.log({email: this.email, password: this.password, confirmPassword: this.confirmPassword})
      this.$store.dispatch('signinUserAction', { email: this.email, password: this.password})
    },
    onDismissed () {
      // console.log('Dismissed Alert')
      this.$store.dispatch('clearErrorAction')
    }
  }
}
</script>

<style>

</style>
