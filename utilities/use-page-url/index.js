import { useEffect } from 'react'

const useCustomPageUrl = url => {
  useEffect(() => {
    if (url) {
      window.history.replaceState({}, null, url)
    }
  }, [url])
}

export default useCustomPageUrl
