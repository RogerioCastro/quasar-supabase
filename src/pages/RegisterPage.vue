<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <div class="col-12 text-h5 text-center q-mt-md">
        Registro
      </div>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md q-mt-md">
        <q-input
          v-model="form.name"
          :rules="rules.name"
          label="Nome completo"
          lazy-rules
        />
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
          label="Enviar"
          class="full-width first-btn"
          color="primary"
          type="submit"
          outline
          rounded
        />
        <q-btn
          label="Voltar"
          class="full-width q-mt-sm"
          color="primary"
          size="sm"
          :to="{ name: 'login' }"
          flat
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/useAuthUser'
import useNotify from 'src/composables/useNotify'
import useFormRules from 'src/composables/useFormRules'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'RegisterPage',

  setup () {
    const router = useRouter()
    const { register } = useAuthUser()
    const { notifyError, notifySuccess } = useNotify()
    const rules = useFormRules()
    const form = ref({
      name: '',
      email: '',
      password: ''
    })
    const typePassword = ref(true)

    const handleRegister = async () => {
      try {
        await register(form.value)
        notifySuccess('Usuário cadastrado. Aguardando confirmação de e-mail.')
        router.push({
          name: 'email-confirmation',
          query: { email: form.value.email }
        })
      } catch (error) {
        notifyError(error.message)
        // alert(error.message)
      }
    }

    return {
      form,
      typePassword,
      rules,
      handleRegister
    }
  }
})
</script>

<style scoped>
  .first-btn {
    margin-top: 40px;
  }
</style>
