import React, {useState} from 'react';

//Redux
import {useDispatch, useSelector} from 'react-redux';
//Action
import {CreatDir as CreatDirAction,ListDir as ListDirAction} from "../../../reducers";

//final form
import { Form, Field } from 'react-final-form'

import renderField from './RenderField';
import {Button, Modal} from "react-bootstrap";

//Validation
const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Require';
    }
    return errors;
};

export const NewDirButton = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const fss = useSelector(state => state.fss)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = async (values) => {
        try {
            await dispatch(CreatDirAction(fss.path,values.name,auth.token));
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
                                <Field className="form-control form-control-user"
                                       type="text"
                                       name="name"
                                       component={renderField}
                                       placeholder="dir name"/>
                            </form>
                        )}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button form="form" className="btn-primary d-block" type="submit">Create</Button>
                </Modal.Footer>
            </Modal>
            <p className="btn btn-sm btn-outline-secondary" onClick={handleShow}><i className="fa fa-plus font-24"></i>new dir
            </p>
        </>
    );
};

