<template>
  <q-page padding>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-form v-if="isLoggedIn()" class="row justify-center" @submit.prevent="handleResetPassword">
        <div class="col-12 text-h5 text-center q-mt-md">
          Alterar senha
        </div>
        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md q-mt-md">
          <!-- <q-input
            v-model="password"
            :rules="rules.password"
            label="Nova senha"
            type="password"
            lazy-rules
          /> -->
          <q-input
            v-model="password"
            :rules="rules.password"
            :type="typePassword ? 'password' : 'text'"
            label="Nova senha"
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
          <!-- <q-input
            v-model="passwordConfirm"
            label="Confirmar nova senha"
            :rules="rules.passwordConfirm"
            type="password"
            lazy-rules
          /> -->
          <q-input
            v-model="passwordConfirm"
            :rules="rules.passwordConfirm"
            :type="typePassword ? 'password' : 'text'"
            label="Confirmar nova senha"
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
            label="Salvar"
            class="full-width first-btn"
            color="primary"
            type="submit"
            outline
            rounded
          />
          <q-btn
            v-if="showBackButton"
            label="Voltar"
            class="full-width q-mt-md"
            color="primary"
            size="sm"
            flat
            @click="handleBackButton"
          />
        </div>
      </q-form>
    </transition>
    <q-inner-loading
      :showing="!isLoggedIn()"
      label="Identificando usuário..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/useAuthUser'
import useNotify from 'src/composables/useNotify'
import useFormRules from 'src/composables/useFormRules'
import { useRouter } from 'vue-router'

const showBackButton = ref(true)

export default defineComponent({
  name: 'ResetPasswordPage',

  setup () {
    const router = useRouter()
    const { update, isLoggedIn } = useAuthUser()
    const { notifyError, notifySuccess } = useNotify()
    const rules = useFormRules()
    const password = ref('')
    const passwordConfirm = ref('')
    const typePassword = ref(true)

    const handleResetPassword = async () => {
      try {
        if (!isLoggedIn()) throw new Error('Usuário não reconhecido!')
        if (passwordConfirm.value === password.value) {
          await update({ password: password.value })
          notifySuccess('Senha alterada!')
          router.push({ name: 'me' })
        } else {
          notifyError('A confirmação de senha não está correta')
        }
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleBackButton = () => {
      router.back()
    }

    return {
      password,
      passwordConfirm,
      typePassword,
      rules,
      showBackButton,
      isLoggedIn,
      handleResetPassword,
      handleBackButton
    }
  },
  beforeRouteEnter (to, from, next) {
    // console.log('route enter:', to, from, showBackButton.value)
    if (typeof from.name === 'undefined') {
      showBackButton.value = false
    }
    next()
  }
})
</script>

<style scoped>
  .first-btn {
    margin-top: 40px;
  }
</style>
