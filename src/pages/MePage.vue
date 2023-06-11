<template>
  <q-page padding>
    <p v-if="user" class="text-center q-mt-md text-body1">
      Olá <strong>{{ user.user_metadata.name }}</strong>.
    </p>
    <q-separator />
    <div v-if="categories.length" class="text-center q-mt-lg justify-center">
      <p class="text-h5">
        Categorias
      </p>
      <q-list
        class="q-mx-auto"
        style="max-width: 350px"
        padding
        bordered
        separator
      >
        <q-item
          v-for="item in categories"
          :key="item.id"
        >
        <q-item-section>
          <q-item-section>
            {{ item.name }}
          </q-item-section>
          <q-item-label caption>
            {{ item.description }}
          </q-item-label>
        </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import useAuthUser from 'src/composables/useAuthUser'
import useApi from 'src/composables/useApi'

export default defineComponent({
  name: 'MePage',

  setup () {
    const { user } = useAuthUser()
    const { list } = useApi()
    const categories = ref([])

    onMounted(async () => {
      categories.value = await list('categories')
      // console.info('data:', categories.value)
    })

    return {
      user,
      categories
    }
  }
})
</script>
