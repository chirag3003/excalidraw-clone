'use client'

import { ExcalidrawProps } from '@excalidraw/excalidraw/types/types'
import dynamic from 'next/dynamic'

// Since client components get prerenderd on server as well hence importing
// the excalidraw stuff dynamically with ssr false

const Excalidraw = dynamic(
    async () => (await import('@excalidraw/excalidraw')).Excalidraw,
    {
        ssr: false,
    }
)
interface ExcalidrawWrapperProps extends ExcalidrawProps {}
export default function ExcalidrawWrapper({ ...props }: ExcalidrawProps) {
    return <Excalidraw {...props} />
}
