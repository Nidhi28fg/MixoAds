import { Calendar, Home, Inbox, Search, Settings, MoreHorizontal } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,

} from "@/components/ui/sidebar";


const items = [
     {
        title: "Daily Budgets",
        url: "/campaigns3",
        icon: Inbox,
    },
    
    {
        title: "Campaigns Table ",
        url: "/campaigns1",
        icon: Calendar,
    },
    {
        title: "Insights",
        url: "/campaigns/insights",
        icon: Inbox,
    },
    {
        title: "Total Budgets",
        url: "/campaigns2",
        icon: Inbox,
    },
    {
        title: "All Campaigns ",
        url: "/campaigns",
        icon: Home,
    },
    
]

export function AppSidebar() {
    return (
        <Sidebar >
            <SidebarContent className="bg-blue-900 font-bold text-white" >
                <SidebarGroup >
                    <SidebarGroupLabel className="text-2xl text-white mb-8">Desktop</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
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