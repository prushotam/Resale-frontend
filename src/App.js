import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications';


import ScreenWrapper from './utils/ScreenWrapper';

import ManageTemplates from './pages/manage-templates';
import ManageChecklist from './pages/manage-checklist'
import ManageAdmins from "./pages/manage-admins";

import UserTypeSelectionModal from "./layout/UserTypeSelection"
import Login from "./pages/login";
import ForgotPassword from "./pages/super-admin-forgot-pswrd.js";
import ResetPassword from "./pages/super-admin-reset-pswrd.js";
import Dashboard from "./pages/super-admin-dashboard";
import SuperAdminSettings from "./pages/super-admin-settings";
import ManageUsers from "./pages/manage-users";
import ViewProperty from "./pages/super-admin-manageProperties/viewProperty";
import ManageProperties from "./pages/super-admin-manageProperties";
import ManageProfile from "./pages/manage-profile";
import UserHome from "./pages/user-home";
import ProfileSettings from "./pages/buyer-profileSettings";
import PlatformFee from "./pages/platform-fee";
import InitiateOffer from "./pages/initiate-offer";
import ReviewMou from "./pages/review-mou";
import ReviewSaleAgreement from "./pages/review-saleAgreement";
import ReviewSaleDeed from "./pages/review-saleDeed";
import EditMou from "./pages/review-mou/editMou";
import ReviewDocuments from "./pages/review-documents";
import PropertPayment from "./pages/property-payment";
import UpdateTdsDetails from "./pages/update-tds-details";
import Backout from "./pages/backout";
import Fallback from './pages/fallback-404'
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/swiper.min.css';
import 'swiper/modules/free-mode/free-mode.min.css';
import SetRegistrationDate from "./pages/set-registration-date";
import LegalVerification from "./pages/legal-verification";
import PropertyEvaluation from "./pages/property-evaluation";
import LoanAgreement from "./pages/loan-agreement";
import LoanSanction from "./pages/loan-sanction";
import AgentProfile from "./pages/agent-profile";

import LandingHome from "../src/pages/general-landing-page/LandingHome"
import About from "../src/pages/general-landing-page/About"
import ContactUs from "../src/pages/general-landing-page/ContactUs"
import PrivacyPolicy from "../src/pages/general-landing-page/PrivacyPolicy"
import TermsOfUse from "../src/pages/general-landing-page/TermsOfUse"


import { store } from "./redux/store";
import "./main.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import OfferLetter from "./pages/offer-letter";

import SignUp from "./pages/signup";

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from "redux-persist";

const persistor = persistStore(store)
class App extends Component {
  render() {
    return (
      <ToastProvider>
      <ScreenWrapper>
        <Provider store={store}>
          <PersistGate persistor={persistor}>   
            <Router basename={process.env.PUBLIC_URL}>
            <UserTypeSelectionModal/>
              <Switch>

              <Route exact path="/" component={LandingHome} />
              <Route path="/AboutUs" component={About} />
              <Route path="/ContactUs" component={ContactUs} />
              <Route path="/PrivacyPolicy" component={PrivacyPolicy} />
              <Route path="/TermsOfUse" component={TermsOfUse} />

                <Route exact path="/manage-templates" component={ManageTemplates} />
                <Route exact path="/manage-checklist" component={ManageChecklist} />
                <Route exact path="/manage-admins" component={ManageAdmins}/>
                <Route exact path="/manage-users" component={ManageUsers}/>
                <Route exact path="/manage-properties" component={ManageProperties}/>
                <Route exact path="/view-property" component={ViewProperty}/>

                <Route exact path="/super-admin-login" component={Login}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/admin-login" component={Login}/>
                <Route exact path="/user-login" component={Login}/>
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/reset-password" component={ResetPassword} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/super-admin-settings" component={SuperAdminSettings}/>
                <Route exact path="/manage-profile" component={ManageProfile}/>

              <Route exact path="/user-home" component={UserHome}/>
              <Route exact path="/profile-settings" component={ProfileSettings}/>
              <Route exact path="/initiate-offer" component={InitiateOffer}/>
              <Route exact path="/offer-letter" component={OfferLetter}/>
              <Route exact path="/platform-fee" component={PlatformFee}/>
              <Route exact path="/token" component={PropertPayment}/>
              <Route exact path="/registration" component={PropertPayment}/>
              <Route exact path="/review-mou" component={ReviewMou}/>
              <Route exact path="/review-sale-agreement" component={ReviewSaleAgreement}/>
              <Route exact path="/review-sale-deed" component={ReviewSaleDeed}/>
              <Route exact path="/review-documents" component={ReviewDocuments}/>
              <Route exact path="/edit-mou" component={EditMou}/>
              <Route exact path="/update-tds-details" component={UpdateTdsDetails}/>
              <Route exact path="/set-registration-date" component={SetRegistrationDate}/>


              <Route exact path="/legal-verification" component={LegalVerification}/>
              <Route exact path="/property-inspection" component={PropertyEvaluation}/>
              <Route exact path="/loan-agreement" component={LoanAgreement}/>
              <Route exact path="/loan-sanction" component={LoanSanction}/>
              <Route exact path="/agent-profile" component={AgentProfile}/>

                <Route exact path="/backout" component={Backout}/>
                <Route exact path="**" component={Fallback} />
              </Switch>
            </Router>
          </PersistGate>
        </Provider>
      </ScreenWrapper>
      </ToastProvider>
    );
  }
}

export default App;