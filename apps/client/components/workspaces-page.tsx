'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { WorkspaceCard } from './workspace-card'
import { CreateWorkspaceDialog } from './create-workspace-dialog'
import { DeleteWorkspaceDialog } from './delete-workspace-dialog'
import { ManageCollaboratorsDialog } from './manage-collaborators-dialog'
import { Workspace } from './types'
import { useRouter } from 'next/navigation'

// Mock data for workspaces
const mockWorkspaces: Workspace[] = [
    {
        id: 1,
        title: 'Project Brainstorm',
        lastModified: '2023-06-15T10:30:00Z',
        collaborators: [{ email: 'john@example.com', name: 'John Doe' }],
    },
    {
        id: 2,
        title: 'Website Wireframe',
        lastModified: '2023-06-14T14:45:00Z',
        collaborators: [],
    },
    {
        id: 3,
        title: 'App Flow Diagram',
        lastModified: '2023-06-13T09:15:00Z',
        collaborators: [{ email: 'jane@example.com', name: 'Jane Smith' }],
    },
    {
        id: 4,
        title: 'Team Organization',
        lastModified: '2023-06-12T16:20:00Z',
        collaborators: [],
    },
    {
        id: 5,
        title: 'Product Roadmap',
        lastModified: '2023-06-11T11:00:00Z',
        collaborators: [],
    },
    {
        id: 6,
        title: 'Marketing Strategy',
        lastModified: '2023-06-10T13:30:00Z',
        collaborators: [],
    },
]

export function WorkspacesPageComponent() {
    const router = useRouter()
    const [workspaces, setWorkspaces] = useState<Workspace[]>(mockWorkspaces)
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isCollaboratorDialogOpen, setIsCollaboratorDialogOpen] =
        useState(false)
    const [selectedWorkspace, setSelectedWorkspace] =
        useState<Workspace | null>(null)

    const handleOpenWorkspace = (id: number) => {
        // Here you would typically navigate to the workspace page
        router.push(`/workspace/${id}`)
    }

    const handleCreateNewWorkspace = (title: string) => {
        const newWorkspace: Workspace = {
            id: workspaces.length + 1,
            title: title,
            lastModified: new Date().toISOString(),
            collaborators: [],
        }
        setWorkspaces([...workspaces, newWorkspace])
        setIsCreateDialogOpen(false)
    }

    const handleDeleteWorkspace = () => {
        if (selectedWorkspace) {
            setWorkspaces(
                workspaces.filter((w) => w.id !== selectedWorkspace.id)
            )
            setIsDeleteDialogOpen(false)
            setSelectedWorkspace(null)
        }
    }

    const handleAddCollaborator = (email: string) => {
        if (selectedWorkspace) {
            const updatedWorkspaces = workspaces.map((w) => {
                if (w.id === selectedWorkspace.id) {
                    return {
                        ...w,
                        collaborators: [
                            ...w.collaborators,
                            { email, name: 'New Collaborator' },
                        ],
                    }
                }
                return w
            })
            setWorkspaces(updatedWorkspaces)
        }
    }

    const handleRemoveCollaborator = (email: string) => {
        if (selectedWorkspace) {
            const updatedWorkspaces = workspaces.map((w) => {
                if (w.id === selectedWorkspace.id) {
                    return {
                        ...w,
                        collaborators: w.collaborators.filter(
                            (c) => c.email !== email
                        ),
                    }
                }
                return w
            })
            setWorkspaces(updatedWorkspaces)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Workspaces</h1>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Workspace
                </Button>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workspaces.map((workspace) => (
                    <WorkspaceCard
                        key={workspace.id}
                        workspace={workspace}
                        onOpen={handleOpenWorkspace}
                        onDelete={(w) => {
                            setSelectedWorkspace(w)
                            setIsDeleteDialogOpen(true)
                        }}
                        onManageCollaborators={(w) => {
                            setSelectedWorkspace(w)
                            setIsCollaboratorDialogOpen(true)
                        }}
                    />
                ))}
            </div>

            <CreateWorkspaceDialog
                isOpen={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onSubmit={handleCreateNewWorkspace}
            />

            <DeleteWorkspaceDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDeleteWorkspace}
            />

            <ManageCollaboratorsDialog
                isOpen={isCollaboratorDialogOpen}
                onClose={() => setIsCollaboratorDialogOpen(false)}
                workspace={selectedWorkspace}
                onAddCollaborator={handleAddCollaborator}
                onRemoveCollaborator={handleRemoveCollaborator}
            />
        </div>
    )
}
