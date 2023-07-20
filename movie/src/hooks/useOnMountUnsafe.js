import { useEffect, useRef } from "react"

export function useOnMountUnsafe(effect) {
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      effect()
    }
  }, [])
}