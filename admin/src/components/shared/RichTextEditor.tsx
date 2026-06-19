import { forwardRef } from 'react'
import ReactQuill, { ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

type RichTextEditorProps = ReactQuillProps

export type RichTextEditorRef = ReactQuill

const RichTextEditor = forwardRef<RichTextEditorRef, RichTextEditorProps>(
    (props, ref) => {
        const modules = {
            toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ font: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
                ['link', 'image', 'video'],
                ['clean']
            ]
        }

        return (
            <div className="rich-text-editor">
                <ReactQuill ref={ref} modules={modules} {...props} />
            </div>
        )
    }
)

RichTextEditor.displayName = 'RichTextEditor'

export default RichTextEditor
