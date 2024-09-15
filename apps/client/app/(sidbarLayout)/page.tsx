import { Button } from '@/components/ui/button'
import { WorkspacesPageComponent } from '@/components/workspaces-page'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-background px-24 py-10">
            <WorkspacesPageComponent />
        </main>
    )
}
