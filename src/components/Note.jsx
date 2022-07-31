import React, { useState } from "react";
import {db} from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import NoteModal from "./NoteModal";

const Note = () => {
    const [open, setOpen] = useState(false);
    const onFinish = async (values) => {
        if(values !== undefined){
            await addDoc(collection(db, "notes"), {
                title: values.title,
                tagline: values.tagline,
                content: values.content,
                pin: false
            })
        }
      };
    const note = {
        title: '',
        tagline: '',
        content: ''
    }
    return (
        <div className="flex justify-center items-center mt-20">
            <div className="flex items-center">
                <p className="text-lg font-medium">Start adding Note..</p>
                <button className="ml-3 py-2 px-4 rounded text-white bg-blue-500 hover:bg-blue-400" onClick={() => setOpen(true)}>+</button>
            </div>
            <NoteModal visible={open} onFinish={onFinish} setOpen={setOpen} note={note}/>
        </div>
    );
};

export default Note;
