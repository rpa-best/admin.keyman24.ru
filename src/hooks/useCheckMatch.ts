import { useCallback } from 'react'
import { useMatch } from 'react-router-dom'

const useCheckMatch = () => {
    const checkMatch = useCallback((path: string) => {
        return useMatch({
            path,
            end: path.length === 1,
        })
    }, [])

    return checkMatch
}

export default useCheckMatch
