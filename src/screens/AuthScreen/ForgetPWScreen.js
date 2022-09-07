import React from "react";
//Components
import {ForgetPWForm} from "./components";
import {useTranslation} from "react-i18next";

export const ForgetPWScreen = () => {
  const { t } = useTranslation();
  return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-12 col-xl-10 auth_col">
            <div className="card shadow-lg o-hidden border-0 my-5">
              <div className="card-body p-0">
                <div className="p-5">
                  <div className="text-center">
                    <h4 className="text-dark mb-4">{t('FORGET_PASSWORD')}</h4>
                  </div>
                  <ForgetPWForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
