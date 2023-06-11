<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <div class="col-12 text-h5 text-center q-mt-md">
        Login
      </div>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md q-mt-md">
        <q-input
          v-model="form.email"
          :rules="rules.email"
          label="E-mail"
          type="email"
          lazy-rules
        />
        <!-- <q-input
          v-model="form.password"
          :rules="rules.password"
          label="Senha"
          type="password"
          lazy-rules
        /> -->
        <q-input
          v-model="form.password"
          :rules="rules.password"
          :type="typePassword ? 'password' : 'text'"
          label="Senha"
          lazy-rules
        >
          <template v-slot:append>
            <q-icon
              :name="typePassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="typePassword = !typePassword"
            />
          </template>
        </q-input>
        <q-btn
          label="Entrar"
          class="full-width first-btn"
          color="primary"
          type="submit"
          outline
          rounded
        />
        <q-btn
          label="Registrar"
          class="full-width"
          color="primary"
          to="/register"
          size="sm"
          flat
        />
        <q-btn
          label="Esqueci minha senha"
          class="full-width"
          color="secondary"
          to="/reset-request"
          size="sm"
          flat
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useAuthUser from 'src/composables/useAuthUser'
import useNotify from 'src/composables/useNotify'
import useFormRules from 'src/composables/useFormRules'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginPage',

  setup () {
    const router = useRouter()
    const { login, isLoggedIn } = useAuthUser()
    const { notifyError, notifySuccess } = useNotify()
    const rules = useFormRules()
    const form = ref({
      email: '',
      password: ''
    })
    const typePassword = ref(true)

    onMounted(() => {
      if (isLoggedIn()) {
        router.push({ name: 'me' })
      }
    })

    const handleLogin = async () => {
      try {
        await login(form.value)
        notifySuccess('Logado com sucesso!')
        router.push({ name: 'me' })
      } catch (error) {
        notifyError(error.message)
        // alert(error.message)
      }
    }

    return {
      form,
      typePassword,
      rules,
      handleLogin
    }
  }
})
</script>

<style scoped>
  .first-btn {
    margin-top: 40px;
  }
</style>
