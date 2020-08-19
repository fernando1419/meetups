<template>
  <v-container>
    <v-layout>
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <v-card>
          <v-card-text>
            <v-container>
              <v-form>
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
                    <v-text-field
                      id="confirm-password"
                      v-model="confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      :rules="[comparePasswords]"
                    >
                      Confirm Password
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn
                      type="submit"
                    >
                      Sign up
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
      password: '',
      confirmPassword: '',
    }
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword ? 'Passwords do not match.' : null
    }
  },
  methods: {
    onSignup() {
      // reach out to firebase
      // create a new user
      console.log({email: this.email, password: this.password, confirmPassword: this.confirmPassword})
    }
  }
}
</script>

<style>

</style>
