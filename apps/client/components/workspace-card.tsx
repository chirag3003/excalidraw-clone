'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Clock, MoreVertical, Trash, Users } from "lucide-react"
import { Workspace } from "./types"

type WorkspaceCardProps = {
  workspace: Workspace;
  onOpen: (id: number) => void;
  onDelete: (workspace: Workspace) => void;
  onManageCollaborators: (workspace: Workspace) => void;
}

export function WorkspaceCard({ workspace, onOpen, onDelete, onManageCollaborators }: WorkspaceCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{workspace.title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onDelete(workspace)}>
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onManageCollaborators(workspace)}>
              <Users className="mr-2 h-4 w-4" />
              <span>Manage Collaborators</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent onClick={() => onOpen(workspace.id)}>
        <div className="bg-gray-200 h-32 rounded-md flex items-center justify-center">
          <span className="text-gray-500">Thumbnail</span>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-gray-500 flex items-center">
        <Clock className="mr-2 h-4 w-4" />
        Last modified: {new Date(workspace.lastModified).toLocaleDateString()}
      </CardFooter>
    </Card>
  )
}