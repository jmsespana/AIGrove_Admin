import { defineStore } from 'pinia'
import { supabase } from '../supabase/client'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  actions: {
    async fetchUser() {
      const { data } = await supabase.auth.getUser()
      this.user = data.user
    }
  }
})