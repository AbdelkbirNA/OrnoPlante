"use client"

import { Leaf, MessageSquare, User, HelpCircle, Home } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation'

const menuItems = [
  {
    title: "Tableau de bord",
    icon: Home,
    route: "home", // correction ici
  },
  {
    title: "Gestion des plantes",
    icon: Leaf,
    route: "plants",
  },
  {
    title: "Gestion des utilisateurs",
    icon: User,
    route: "users",
  },
  {
    title: "FAQ & Questions",
    icon: HelpCircle,
    route: "faq",
  },
  {
    title: "Analytics Chatbot",
    icon: MessageSquare,
    route: "chatbot",
  },
]

export function AdminSidebar() {
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Leaf className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">OrnoPlante</span>
            <span className="truncate text-xs text-muted-foreground">Admin Dashboard</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.route}>
                  <SidebarMenuButton onClick={() => router.push(`/dashboard/${item.route}`)}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
