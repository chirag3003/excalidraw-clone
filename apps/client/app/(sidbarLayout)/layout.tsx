import { SidebarComponent } from '@/components/sidebar'
import React from 'react'

interface SidebarLayoutProps {
    children: React.ReactNode
}

function SidebarLayout({ children }: SidebarLayoutProps) {
    return (
        <div className="w-screen h-screen overflow-hidden flex">
            <div className="sidebar">
                <SidebarComponent />
            </div>
            <div className="content flex-1 h-screen bg-red-50 overflow-x-hidden overflow-y-auto">
                {children}
            </div>
        </div>
    )
}

export default SidebarLayout
