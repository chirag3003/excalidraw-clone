'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Workspace } from "./types"

type ManageCollaboratorsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  workspace: Workspace | null;
  onAddCollaborator: (email: string) => void;
  onRemoveCollaborator: (email: string) => void;
}

export function ManageCollaboratorsDialog({ isOpen, onClose, workspace, onAddCollaborator, onRemoveCollaborator }: ManageCollaboratorsDialogProps) {
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState('')

  const handleAddCollaborator = () => {
    if (newCollaboratorEmail.trim()) {
      onAddCollaborator(newCollaboratorEmail.trim())
      setNewCollaboratorEmail('')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Collaborators</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="Enter collaborator email"
              value={newCollaboratorEmail}
              onChange={(e) => setNewCollaboratorEmail(e.target.value)}
            />
            <Button onClick={handleAddCollaborator}>Add</Button>
          </div>
          <div className="space-y-2">
            {workspace?.collaborators.map((collaborator) => (
              <div key={collaborator.email} className="flex justify-between items-center">
                <span>{collaborator.name} ({collaborator.email})</span>
                <Button variant="outline" size="sm" onClick={() => onRemoveCollaborator(collaborator.email)}>Remove</Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}