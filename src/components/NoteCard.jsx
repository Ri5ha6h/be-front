import { Card } from "antd";
import { EditOutlined, DeleteOutlined, PushpinOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import NoteModal from "./NoteModal";

const NoteCard = ({ note, handleDelete, handleEdit, togglePin}) => {
    const [openM, setOpenM] = useState(false);
    const onFinish = (val) => {
        handleEdit(note, val);
    }
    
    return (
        <div>
            <Card title={note.title} actions={[<EditOutlined key="edit" onClick={()=> setOpenM(true)}/>, <PushpinOutlined style={{color: note.pin === true ? '#882fc6' : 'gray'}} key="pin" onClick={() => {togglePin(note);}}/>, <DeleteOutlined style={{color: 'red'}} key="delete" onClick={() => handleDelete(note.id)}/>]} style={{ width: 300 }}>
                <p>{note.content}</p>
            </Card>
            <NoteModal visible={openM} onFinish={onFinish} setOpen={setOpenM} note={note}/>
        </div>
    );
};

export default NoteCard;
