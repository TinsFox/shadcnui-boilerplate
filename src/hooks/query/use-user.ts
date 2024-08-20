import { useMutation, useQuery } from '@tanstack/react-query'

export function useUserInfo() {
  const { data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => fetch('/api/user').then(res => res.json())
  })
  return {
    userInfo: data
  }
}

export function useUserMutation() {
  const { mutate } = useMutation({
    mutationFn: (params: any) =>
      fetch('/api/userInfo', {
        method: 'POST',
        body: JSON.stringify(params)
      }).then(res => res.json())
  })
  return {
    mutate
  }
}
