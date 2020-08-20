<template>
  <v-app>
    <v-navigation-drawer
      v-model="showSideBar"
      temporary
      app
    >
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
          link
        >
          <v-list-item-icon>
            <v-icon> {{ item.icon }} </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> {{ item.title }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list
        dense
        nav
      >
        <v-list-item
          v-if="userIsAuthenticated"
          link
          @click="onSignout"
        >
          <v-list-item-icon>
            <v-icon> exit_to_app </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Sign Out </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <div>
      <v-toolbar
        dense
        dark
        class="purple darken-1"
      >
        <v-app-bar-nav-icon
          class="hidden-sm-and-up"
          @click="showSideBar = !showSideBar"
        />
        <v-toolbar-title>
          <router-link
            to="/"
            tag="span"
            style="cursor: pointer"
          >
            Meetups
          </router-link>
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items
          class="hidden-xs-only"
        >
          <v-btn
            v-for="item in menuItems"
            :key="item.title"
            text
            :to="item.link"
          >
            <v-icon left>
              {{ item.icon }}
            </v-icon>
            {{ item.title }}
          </v-btn>
          <v-btn
            v-if="userIsAuthenticated"
            text
            @click="onSignout"
          >
            <v-icon left>
              exit_to_app
            </v-icon>
            Sign Out
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>

    <main>
      <router-view />
    </main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  components: {
  },
  data: () => ({
    showSideBar: false,
    unAuthenticatedMenuItems: [
      { icon: 'face', title: 'Sign up', link: '/signup' },
      { icon: 'lock_open', title: 'Sign in', link: '/signin' }
    ],
    authenticatedMenuItems: [
      { icon: 'supervisor_account', title: 'View Meetups', link: '/meetups' },
      { icon: 'room', title: 'Organize Meetup', link: '/meetup/new' },
      { icon: 'person', title: 'Profile', link: '/profile' },
    ]
  }),
  computed: {
    menuItems () {
      if (this.userIsAuthenticated) {
        return this.authenticatedMenuItems
      }
      return this.unAuthenticatedMenuItems;
    },
    userIsAuthenticated () {
      const authenticated = this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
      // console.log(authenticated)

      return authenticated
    }
  },
  methods: {
    onSignout () {
      this.$store.dispatch('signoutAction')
    }
  }
})
</script>
