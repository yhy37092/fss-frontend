import React from 'react';

//Redux
import {useDispatch} from 'react-redux';
//Action
import {Register as RegisterAction} from '../../../reducers';

//final form
import {Form, Field} from 'react-final-form'

import renderField from './RenderField';
import i18next from "../../../i18n";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

//Validation
const validate = (values) => {
    const errors = {};
    if (!values.username) {
        errors.username = i18next.t('Require');
    } else if (values.username.length < 6) {
        errors.username = i18next.t('Username_min_6');
    }
    if (!values.password) {
        errors.password = i18next.t('Require');
    } else if (values.password.length < 6) {
        errors.password = i18next.t('Password_min_6');
    }
    if (!values.confirm) {
        errors.confirm = i18next.t('Require');
    } else if (values.confirm.length < 6) {
        errors.confirm = i18next.t('Password_min_6');
    } else if (values.password !== values.confirm) {
        errors.confirm = i18next.t('Password_equal');
    }
    if (!values.question) {
        errors.question = i18next.t('Require');
    } else if (values.question.length < 6) {
        errors.question = i18next.t('Question_min_6');
    }
    if (!values.answer) {
        errors.answer = i18next.t('Require');
    } else if (values.answer.length < 6) {
        errors.answer = i18next.t('Answer_min_6');
    }
    return errors;
};

export const RegisterForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async values => {
        try {
            await dispatch(RegisterAction(values.username, values.password, values.question, values.answer));
        } catch (err) {
            window.alert(err);
            return;
        }
       navigate("/auth/login");
    }

    return (
        <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({handleSubmit, form, submitting, pristine, values}) => (
                <form className="user" onSubmit={handleSubmit}>
                    <div className="row mb-3"><Field className="form-control form-control-user"
                                                     type="text"
                                                     name="username"
                                                     component={renderField}
                                                     placeholder={t('Username')}/></div>
                    <div className="row mb-3">
                        <div className="col-sm-6 mb-3 mb-sm-0"><Field className="form-control form-control-user"
                                                                      type="password"
                                                                      name="password"
                                                                      component={renderField}
                                                                      placeholder={t('Password')}/></div>
                        <div className="col-sm-6"><Field className="form-control form-control-user"
                                                         type="password"
                                                         name="confirm"
                                                         component={renderField}
                                                         placeholder={t('Confirm')}/></div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6 mb-3 mb-sm-0"><Field className="form-control form-control-user"
                                                                      type="password"
                                                                      name="question"
                                                                      component={renderField}
                                                                      placeholder={t('Question')}/></div>
                        <div className="col-sm-6 mb-3 mb-sm-0"><Field className="form-control form-control-user"
                                                                      type="password"
                                                                      name="answer"
                                                                      component={renderField}
                                                                      placeholder={t('Answer')}/></div>
                    </div>
                    <button className="btn btn-primary d-block btn-user w-100" type="submit">{t('Submit')}</button>
                    <hr/>
                </form>
            )}
        />
    )
};
