"use client"

import CodeMirror from '@uiw/react-codemirror';
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { highlightActiveLine, highlightActiveLineGutter, keymap, lineNumbers } from "@codemirror/view";
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { indentOnInput, bracketMatching, defaultHighlightStyle, HighlightStyle } from "@codemirror/language"
import { javascript } from "@codemirror/lang-javascript"
import type React from "react"

interface EditorProps {
    initialDoc: string,
    onChange: (doc: string) => void
}

const Editor: React.FC<EditorProps> = ({ onChange, initialDoc }) => {
    return <CodeMirror className='w-full h-full' style={{ flexGrow: 2 }} value={initialDoc}
        extensions={[
            basicSetup,
            keymap.of([...defaultKeymap, ...historyKeymap]),
            javascript()
        ]}
        maxHeight='90%'
        onChange={onChange} />
}

export default Editor