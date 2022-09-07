import React from 'react';
import {useNavigate} from "react-router-dom";

//redux
import {useDispatch} from "react-redux";
import {ForgetPassword as ForgetPasswordAction} from "../../../reducers";
//final form
import { Form, Field } from 'react-final-form'

import renderField from './RenderField';
import i18n from "../../../i18n";
import {useTranslation} from "react-i18next";

//Validation
const validate = (values) => {
    const errors = {};
    if (!values.username) {
        errors.username = i18n.t('Require');
    } else if (values.username.length < 6) {
        errors.username = i18n.t('Username_min_6');
    }
    return errors;
};

export const ForgetPWForm = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (values) => {
        try {
            await dispatch(ForgetPasswordAction(values.username));
        } catch (err) {
            window.alert(err);
            return;
        }
        navigate(`/auth/reset_password`);
    };
    return (
        <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form className="user" onSubmit={handleSubmit}>
                    <div className="row mb-3"><Field className="form-control form-control-user"
                                                     type="text"
                                                     name="username"
                                                     component={renderField}
                                                     placeholder={t('Username')}/></div>
                    <button className="btn btn-primary d-block btn-user w-100" type="submit">{t('Next_step')}</button>
                    <hr/>
                </form>
            )}
        />
    )
};
