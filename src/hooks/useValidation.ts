import { useState } from 'react'
const useValidation = () => {
  const [valid, setValid] = useState(true)
  const [dynamicValidationOn, setDynamicValidationOn] = useState(false)

  const dynamicValidation = (isValid: boolean) => {
    if (!dynamicValidationOn) {
      setValid(true)
      return
    }
    setValid(isValid)
  }

  const enableDynamicValidation = (enable: boolean) => {
    setValid(!enable)
    setDynamicValidationOn(enable)
  }

  return {
    valid,
    enableDynamicValidation,
    dynamicValidation,
  }
}

export default useValidation
