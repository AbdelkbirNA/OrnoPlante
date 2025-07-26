'use client'

import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AdminSidebar } from '@/components/admin-sidebar'

export default function DashboardLayout({ children }) {
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
