'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type CreateWorkspaceDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
}

export function CreateWorkspaceDialog({ isOpen, onClose, onSubmit }: CreateWorkspaceDialogProps) {
  const [newWorkspaceTitle, setNewWorkspaceTitle] = useState('')

  const handleSubmit = () => {
    if (newWorkspaceTitle.trim()) {
      onSubmit(newWorkspaceTitle.trim())
      setNewWorkspaceTitle('')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Workspace</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="Enter workspace title"
            value={newWorkspaceTitle}
            onChange={(e) => setNewWorkspaceTitle(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}