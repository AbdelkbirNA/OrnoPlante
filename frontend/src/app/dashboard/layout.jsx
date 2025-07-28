'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AdminSidebar } from '@/components/admin-sidebar'
import Unauthorized from '@/components/Unauthorized'

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    if (!loading) {
      setAuthorized(user?.user_type === 'admin')
    }
  }, [loading, user])

  if (loading) return <div className="p-8">Chargement...</div>

  if (!authorized) return <Unauthorized />

  return (
    <div className="flex-1 sidebar-integrated">
      <SidebarProvider>
        <div className="flex w-full h-full">
          <AdminSidebar />
          <SidebarInset className="flex-1">
            <div className="space-y-4 p-8 pt-6">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
