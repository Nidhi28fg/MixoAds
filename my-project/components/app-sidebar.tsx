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
    SidebarMenuAction,

} from "@/components/ui/sidebar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,


} from "@/components/ui/dropdown-menu"

// Menu items.
const items = [
    {
        title: "Campaigns",
        url: "/campaigns",
        icon: Home,
    },
    {
        title: "Insights",
        url: "/campaigns/insights",
        icon: Inbox,
    },
    {
        title: "Contacts",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Email",
        url: "#",
        icon: Search,
    },
    {
        title: "Phone",
        url: "#",
        icon: Settings,
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

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="#">
                                        <Home />
                                        <span>Home</span>
                                    </a>
                                </SidebarMenuButton>
                                <DropdownMenu >
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuAction className="hover:bg-transparent hover:text-inherit border-0 text-white">
                                            <MoreHorizontal  />
                                        </SidebarMenuAction>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side="right" align="start">
                                        <DropdownMenuItem>
                                            <span>Edit Project</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <span>Delete Project</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        </SidebarMenu>

                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}