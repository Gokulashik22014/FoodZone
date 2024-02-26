import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
function useMenu() {

    const {refetch,data:menu=[]}=useQuery({
        queryKey:["menu"],
        queryFn:async()=>{
            const res=await axios.get("http://localhost:3000/menu")
            return res.data.menu
        }
    })
  return [menu,refetch]
}

export default useMenu