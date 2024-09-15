'use client'

import ExcalidrawWrapper from '@/components/excalidraw-wrapper'
import {
    ExcalidrawImperativeAPI,
    ExcalidrawInitialDataState,
} from '@excalidraw/excalidraw/types/types'
import React, { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface WorkspacePageProps {
    params: {
        id: string
    }
}

function WorkspacePage({ params: { id } }: WorkspacePageProps) {
    const [excalidrawAPI, setExcalidrawAPI] =
        useState<ExcalidrawImperativeAPI>()
    const [data, setData] = useState<ExcalidrawInitialDataState>({})

    const debounced = useDebouncedCallback(
        // function
        (value) => {
            console.log(value)
            //   setValue(value);
        },
        // delay in ms
        500
    )
    return (
        <div className="h-screen w-screen">
            <ExcalidrawWrapper
                initialData={data}
                onChange={(elements, appState, files) => {
                    debounced({
                        elements,
                        appState,
                        files,
                    })
                }}
                excalidrawAPI={(api) => {
                    setExcalidrawAPI(api)
                }}
            />
        </div>
    )
}

export default WorkspacePage
