import React, {useState} from 'react';

//Redux
import {useDispatch, useSelector} from 'react-redux';
//Action
import {UploadFile as UploadFileAction,ListDir as ListDirAction} from "../../../reducers";

//final form
import { Form, Field } from 'react-final-form'

import {Button, Modal} from "react-bootstrap";

//Validation
const validate = (values) => {
    const errors = {};
    if (!values.file) {
        errors.file = 'Require';
    }
    console.log(values.file)
    return errors;
};

export const UploadFileButton = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const fss = useSelector(state => state.fss)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = async (values) => {
        try {
            await dispatch(UploadFileAction(fss.path,values.file,auth.token));
            await dispatch(ListDirAction(fss.path,auth.token));
        } catch (err) {
            window.alert(err);
            return;
        }
        handleClose();
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <Form
                        onSubmit={onSubmit}
                        validate={validate}
                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                            <form id="form" className="user" onSubmit={handleSubmit}>
                                <Field name="file">
                                    {({ input: { value, onChange, ...input } }) => (
                                        <input
                                            {...input}
                                            type="file"
                                            onChange={({ target }) => onChange(target.files[0])} // instead of the default target.value
                                        />
                                    )}
                            </Field>
                            </form>
                        )}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button form="form" className="btn-primary d-block" type="submit">Upload</Button>
                </Modal.Footer>
            </Modal>
            <p className="btn btn-sm btn-outline-secondary" onClick={handleShow}><i className="fa fa-plus font-24"></i>Upload
            </p>
        </>
    );
};

