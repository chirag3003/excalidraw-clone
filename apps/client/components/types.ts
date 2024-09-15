'use client'

export type Collaborator = {
  email: string;
  name: string;
}

export type Workspace = {
  id: number;
  title: string;
  lastModified: string;
  collaborators: Collaborator[];
}