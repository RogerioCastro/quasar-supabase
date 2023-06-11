export default function useFormRules () {
  const name = [val => (val && val.length > 0) || 'Informe um nome']

  const email = [val => (val && val.length > 0) || 'Informe um e-mail']

  const password = [val => (val && val.length >= 6) || 'Informe uma senha com no mínimo 6 caracteres']

  const passwordConfirm = [val => (val && val.length >= 6) || 'Informe uma senha com no mínimo 6 caracteres']

  return {
    name,
    email,
    password,
    passwordConfirm
  }
}
