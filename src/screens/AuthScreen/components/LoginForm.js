import React from 'react';
import {useNavigate} from "react-router-dom";
//Redux
import {useDispatch} from 'react-redux';
//Action
import {Login as LoginAction} from '../../../reducers';

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
    if (!values.password) {
        errors.password = i18n.t('Require');
    } else if (values.password.length < 6) {
        errors.password = i18n.t('Password_min_6');
    }
    return errors;
};

export const LoginForm = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        try {
            await dispatch(LoginAction(values.username, values.password));
        } catch (err) {
            window.alert(err);
            return;
        }
        navigate("/");
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
                    <div className="row mb-3"><Field className="form-control form-control-user"
                                                                      type="password"
                                                                      name="password"
                                                                      component={renderField}
                                                                      placeholder={t('Password')}/>
                    </div>
                    <button className="btn btn-primary d-block btn-user w-100" type="submit">{t('Submit')}</button>
                    <hr/>
                </form>
            )}
        />
    )
};
