import { AppSidebar } from '@/components/appSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Sidebar } from 'lucide-react'
import React from 'react'

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <div className='p-4'>

        {children}
      </div>
    </SidebarProvider>
  )
}
