<template>
  <q-page padding>
    <p v-if="user" class="text-center q-mt-md text-body1">
      Olá <strong>{{ user.user_metadata.name }}</strong>.
    </p>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import useAuthUser from 'src/composables/useAuthUser'

export default defineComponent({
  name: 'MePage',

  setup () {
    const { user } = useAuthUser()

    return {
      user
    }
  }
})
</script>
