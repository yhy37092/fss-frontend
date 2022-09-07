import React from 'react';

//Redux
import {useDispatch, useSelector} from 'react-redux';
//Action
import {ResetPassword as ResetPasswordAction} from '../../../reducers';
//final form
import { Form, Field } from 'react-final-form'

import renderField from './RenderField';
import i18n from "../../../i18n";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

//Validation
const validate = (values) => {
    const errors = {};
    if (!values.password) {
        errors.password = i18n.t('Require');
    } else if (values.password.length < 6) {
        errors.password = i18n.t('Password_min_6');
    }
    if (!values.confirm) {
        errors.confirm = i18n.t('Require');
    } else if (values.confirm.length < 6) {
        errors.confirm =  i18n.t('Password_min_6');
    }else if (values.password !== values.confirm){
        errors.confirm = i18n.t('Password_equal');
    }
    if (!values.answer) {
        errors.answer = i18n.t('Require');
    } else if (values.answer.length < 6) {
        errors.answer = i18n.t('Answer_min_6');
    }
    return errors;
};

export const ResetPWForm = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const navigate = useNavigate();
    const onSubmit = async (values) => {
        try {
            await dispatch(ResetPasswordAction(user?user.username:"",values.password, values.answer));
        } catch (err) {
            window.alert(err);
            return;
        }
        navigate("/auth/login");
    };
    return (
        <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form className="user" onSubmit={handleSubmit}>
                    <div className="row mb-3"> <p>{i18n.t('Username')}: {user?user.username:""}</p></div>
                    <div className="row mb-3">
                        <div className="col-sm-6 mb-3 mb-sm-0"><p>{i18n.t('Question')}: {user?user.question:""}</p></div>
                        <div className="col-sm-6 mb-3 mb-sm-0"><Field className="form-control form-control-user"
                                                                      type="password"
                                                                      name="answer"
                                                                      component={renderField}
                                                                      placeholder={t('Answer')}/></div>
                    </div>
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
                    <button className="btn btn-primary d-block btn-user w-100" type="submit">{t('Submit')}</button>
                    <hr/>
                </form>
            )}
        />
    )
};