<template>
  <v-app>
    <v-navigation-drawer
      v-model="showSideBar"
      temporary
      app
    >
      <v-list
        v-for="item in menuItems"
        :key="item.title"
        dense
        nav
      >
        <!-- <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

        <!-- <v-divider /> -->

        <!-- <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Application
            </v-list-item-title>
            <v-list-item-subtitle>
              subtext
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item> -->

        <v-list-item link>
          <v-list-item-icon>
            <v-icon> {{ item.icon }} </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> {{ item.title }} </v-list-item-title>
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
        <v-toolbar-title>Meetups</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items
          v-for="item in menuItems"
          :key="item.title"
          class="hidden-xs-only"
        >
          <v-icon left>
            {{ item.icon }}
          </v-icon>
          <v-btn text>
            {{ item.title }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>


    <main></main>
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
    menuItems: [
      { icon: 'supervisor_account', title: 'View Meetups'},
      { icon: 'room', title: 'Organize Meetup' },
      { icon: 'person', title: 'Profile' },
      { icon: 'face', title: 'Sign up' },
      { icon: 'lock_open', title: 'Sign in' }
    ]
  })
})
</script>
