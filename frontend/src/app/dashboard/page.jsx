"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { DashboardOverview } from "@/components/dashboard-overview"
import { PlantsManagement } from "@/components/plants-management"
import { FAQManagement } from "@/components/faq-management"
import { ChatbotAnalytics } from "@/components/chatbot-analytics"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />
      case "plants":
        return <PlantsManagement />
      case "faq":
        return <FAQManagement />
      case "analytics":
        return <ChatbotAnalytics />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex-1 sidebar-integrated">
      <SidebarProvider>
        <div className="flex w-full h-full">
          <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          <SidebarInset className="flex-1">
            <div className="space-y-4 p-8 pt-6">{renderContent()}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}