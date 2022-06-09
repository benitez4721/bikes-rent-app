export const required = (value: string) => {
  if (!value) {
    return '* This field is required'
  }
}

export const validateEmail = (value: string) => {
  let error
  if (!value) {
    error = '* This field is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = '* Invalid email address'
  }
  return error
}
