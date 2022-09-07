import React from "react";
//Components
import {LoginForm} from "./components";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

export const LoginScreen = () => {
  const { t } = useTranslation();
  return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-12 col-xl-10 auth_col">
            <div className="card shadow-lg o-hidden border-0 my-5">
              <div className="card-body p-0">
                <div className="p-5">
                  <div className="text-center">
                    <h4 className="text-dark mb-4">{t('LOGIN')}</h4>
                  </div>
                  <LoginForm/>
                  <div className="text-center"><Link to='/auth/forget_password' className="small">{t('FORGET_PASSWORD')}</Link></div>
                  <div className="text-center"><Link to='/auth/register' className="small">{t('REGISTER')}</Link></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
