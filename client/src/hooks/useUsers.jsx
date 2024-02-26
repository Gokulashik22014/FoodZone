import React from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';

function useUsers() {
    const axisoSecure=useAxiosSecure()
    const { refetch, data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
          const res = await axisoSecure.get(`/getusers`);
          //console.log(res.data.users);
          return res.data.users;
        },
      });
  return [users,refetch]
}

export default useUsers