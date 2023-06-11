<template>
  <q-page padding>
    <p class="text-center q-mt-md text-h6">
      Obrigado por se registrar!
    </p>
    <p class="text-center q-mt-md text-body1">
      Confirme seu e-mail para concluir o registro.<br>
      Um e-mail com instruções foi enviado para <strong>{{ $route.query.email }}</strong>.
    </p>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmailConfirmationPage'
})
</script>
