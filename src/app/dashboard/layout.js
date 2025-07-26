"use client"
import { AppSidebar } from '@/components/appSidebar'
import Loader from '@/components/loader'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useLoader } from '@/store/loadingStore'

export default function DashboardLayout({ children }) {
  const loading=useLoader((state) => state.loading)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
        <div className='p-4 w-full'>
        {loading?<Loader/>:
          <>{children}</>
        }
        </div>
    </SidebarProvider>
  )
}
