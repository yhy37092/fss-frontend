import React from "react";
import {Link} from "react-router-dom";
//Components
import {ResetPWForm} from "./components";
import {useTranslation} from "react-i18next";

export const ResetPWScreen = () => {
  const { t } = useTranslation();
  return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-12 col-xl-10 auth_col">
            <div className="card shadow-lg o-hidden border-0 my-5">
              <div className="card-body p-0">
                <div className="p-5">
                  <div className="text-center">
                    <h4 className="text-dark mb-4">{t('RESET_PASSWORD')}</h4>
                  </div>
                  <ResetPWForm />
                  <div className="text-center"><Link to='/auth/register' className="small">{t('REGISTER')}</Link></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
