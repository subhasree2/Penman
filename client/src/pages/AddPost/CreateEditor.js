import { useState } from 'react';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ]
    ]
};

function CreateEditor() {
    const Navigate = useNavigate();
    const [value, setValue] = useState();

    return (
        <div className='Container'>
            <div className="Editor">
                <ReactQuill theme='snow' value={value} onChange={setValue} modules={modules} />
            </div>
        </div>
    )
}

export default CreateEditor;