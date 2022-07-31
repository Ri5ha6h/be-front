import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";

const NoteModal = ({ visible, onFinish, setOpen, note }) => {
    const [title, setTitle] = useState("");
    const [tagline, setTagline] = useState("");
    const [content, setContent] = useState("");
    const [form] = Form.useForm();
    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
    };
    useEffect(()=>{
        if(note){
            setTitle(note.title);
            setTagline(note.tagline);
            setContent(note.content)
        }
    },[note])
    return (
        <div>
            <Modal
                title="Note"
                closable={false}
                centered={true}
                visible={visible}
                footer={[
                    <Button htmlType="button" danger key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        key={note && note.title && note.title !== '' ? 'Update' : 'Add'}
                        htmlType="submit"
                        onClick={() => {
                            form.validateFields()
                                .then((values) => {
                                    form.resetFields();
                                    onFinish(values);
                                    setOpen(false);
                                })
                                .catch((info) => {
                                    const err = info.errorFields;
                                    err.map((item) => (
                                        message.error(item.errors)
                                    ))
                                    setOpen(true);
                                });
                        }}
                    >
                        {note && note.title && note.title !== '' ? 'Update' : 'Add'}
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical" >
                    <Form.Item initialValue={note ? note.title : title} label="Title" name="title" tooltip="Add title to your note" rules={[{ required: true }, {min: 5, max: 50}]}>
                        <Input value={title} onChange={(e) => {e.preventDefault(); setTitle(e.target.value);}} placeholder="title..." />
                    </Form.Item>
                    <Form.Item initialValue={note ? note.tagline : tagline} label="Tagline" name="tagline" tooltip="Add tagline to your note" rules={[{min: 10, max: 200}]}>
                        <Input value={tagline} onChange={(e) => {e.preventDefault(); setTagline(e.target.value);}} placeholder="tagline..." />
                    </Form.Item>
                    <Form.Item initialValue={note ? note.content : content} label="Content" name="content" tooltip="Add body to your note" rules={[{ required: true }, {min: 10, max: 5000}]}>
                        <Input.TextArea value={content} onChange={(e) => {e.preventDefault(); setContent(e.target.value);}} placeholder="content..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default NoteModal;
