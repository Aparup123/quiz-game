'use client'
import axios from 'axios'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import Link from 'next/link'
const items = [
    {
        title: "Create Quiz",
        url: "/dashboard/quiz/create",
        icon: Home,
    },
    {
        title: "Pending Quizzes",
        url: "/dashboard/quiz/pending",
        icon: Inbox,
    },
    {
        title: "Attempted Quizzes",
        url: "/dashboard/quiz/attempted",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]
export const AppSidebar = () => {

    const signIn=async(e)=>{
        try{
            e.preventDefault();
            console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signin`, {
                email:e.target.email.value,
                password:e.target.password.value
            }, {withCredentials: true});
            alert("Sign in successful");
        }
        catch(error){
            console.error("Sign in failed", error);
            alert("Sign in failed. Please try again.");
        }
    }

    return (
        <Sidebar>
            <SidebarHeader><h1 className='text-2xl font-bold'>LOGO</h1></SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline">Show Dialog</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>SignIn</AlertDialogTitle>
                            <AlertDialogDescription>Sign in here</AlertDialogDescription>
                            <form className="flex flex-col gap-2 px-2" onSubmit={signIn}>
                                <label htmlFor="email">Email</label>
                                <input name="email" type="email"/>
                                <label htmlFor="password">Password</label>
                                <input name="password" type="password"/>
                                <input type="submit" value="Sign In" className="bg-blue-500 text-white p-2 rounded cursor-pointer"/>
                            </form>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction >Sign in</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </SidebarFooter>
        </Sidebar>
    )
}

