import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Note from "./components/Note";
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import NoteCard from "./components/NoteCard";
import { List } from "antd";

function App() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "notes"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let notesArray = [];
            querySnapshot.forEach((doc) => {
                notesArray.push({ ...doc.data(), id: doc.id });
            });
            setNotes(notesArray);
        });
        return () => unsub();
    }, []);

    const handleEdit = async (note, value) => {
        await updateDoc(doc(db, "notes", note.id), { title: value.title, tagline: value.tagline, content: value.content });
    };

    const togglePin = async (note) => {
        await updateDoc(doc(db, "notes", note.id), { pin: !note.pin });
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "notes", id));
    };

    return (
        <div className="w-screen h-screen">
            <Navbar />
            <Note />
            {notes && notes.length > 0 && (
                <div className="mt-24 p-28">
                    <p className="text-xl font-semibold p-8">Notes :</p>
                    <List
                        pagination={{
                            pageSize: 6,
                        }}
                        dataSource={notes}
                        renderItem={(item) => (
                            <List.Item>
                                <NoteCard key={item.id} note={item} togglePin={togglePin} handleDelete={handleDelete} handleEdit={handleEdit} />
                            </List.Item>
                        )}
                    />
                </div>
            )}
        </div>
    );
}

export default App;
