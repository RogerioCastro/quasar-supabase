<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleResetRequest">
      <div class="col-12 text-h5 text-center q-mt-md">
        Recuperar senha
      </div>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md q-mt-md">
        <q-input
          v-model="email"
          :rules="rules.email"
          label="E-mail"
          type="email"
          lazy-rules
        />
        <q-btn
          label="Enviar e-mail"
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
  name: 'ResetRequestPage',

  setup () {
    const router = useRouter()
    const { sendPasswordRestEmail } = useAuthUser()
    const { notifyError, notifySuccess } = useNotify()
    const rules = useFormRules()
    const email = ref('')

    const handleResetRequest = async () => {
      try {
        await sendPasswordRestEmail(email.value)
        notifySuccess(`E-mail enviado para: ${email.value}`)
        router.push({
          name: 'login'
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      email,
      rules,
      handleResetRequest
    }
  }
})
</script>

<style scoped>
  .first-btn {
    margin-top: 40px;
  }
</style>
