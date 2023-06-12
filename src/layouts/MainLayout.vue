<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <q-btn-dropdown flat color="white" icon="person">
          <q-list>
            <q-item-label header>
              {{ user.user_metadata.name }}
            </q-item-label>
            <q-separator />
            <q-item clickable v-close-popup to="reset-password">
              <q-item-section>
                <q-item-label>Alterar senha</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="lock_reset" />
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="logout" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import useAuthUser from 'src/composables/useAuthUser'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const router = useRouter()
    const { logout, user } = useAuthUser()
    const $q = useQuasar()

    const handleLogout = async () => {
      $q.dialog({
        title: 'Sair',
        message: 'Deseja realmente sair?',
        persistent: true,
        cancel: true
      }).onOk(async () => {
        await logout()
        router.replace({ name: 'login' })
      })
    }

    return {
      user,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      handleLogout
    }
  }
})
</script>
