import React from "react";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.scss'

import man from '../../assets/man.svg';
import manCog from '../../assets/man-cog.svg';
import properties from '../../assets/properties.svg';
import templates from '../../assets/template.svg';
import checklist from '../../assets/checklist.svg';
import cog from '../../assets/cog.svg';
import logout from "../../assets/logout.svg";

import review from "../../assets/review.svg"
import contract from "../../assets/contract.svg"
import searchData from "../../assets/search-data.svg"
import signature from "../../assets/signature.svg"
import wallet from "../../assets/wallet.svg"
import writing from "../../assets/writing.svg"
import money from "../../assets/money.svg"




import {logoutUser} from '../../pages/login/slices';
import { useDispatch } from "react-redux";

function NavItem({ icon, text, path, currentPath }) {
  const dispatch = useDispatch()
  let updatedPath = currentPath;
 if(updatedPath?.includes("view-property") && path==='/manage-properties'){
  updatedPath=path;
 }
    const handleClick = ()=>{
      if(text === 'Logout'){
        sessionStorage.clear();
        dispatch(logoutUser())
      } 
    }
 
 
  return (
    <div className={`nav-item ${updatedPath == path ? 'active' : ''}`} onClick={handleClick}>
      <div className="nav-icon"><img className="pic" src={icon} /> </div>
      <div className="nav-text"><Link to={path}>{text}</Link></div>
    </div>
  )
}
//showNav : admin & superadmin screen , showUser : userScreen (buyer,lawyer,seller,CA)

function Page(props) {
  const {role} = props
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <>
      <>
     {
      role === 'BUYER' || role === 'POA' || role === 'AGENT' ?
      <>
      <div className="nav">
      <NavItem icon={wallet} text="Pay Platform Fee" currentPath={currentPath} path={'/platform-fee'} />
      <NavItem icon={searchData} text="Initiate Offer" currentPath={currentPath} path={'/initiate-offer'} />
      <NavItem icon={contract} text="Initiate MOU" currentPath={currentPath} path={'/review-mou'} />
      <NavItem icon={money} text="Pay Token Amount" currentPath={currentPath} path={'/token'} />
      <NavItem icon={signature} text="Sign MOU" currentPath={currentPath} path={'/'} />
      <NavItem icon={contract} text="Initiate Sale Agreement" currentPath={currentPath} path={'/review-sale-agreement'} />
      <NavItem icon={wallet} text="Pay Agreement Fee" currentPath={currentPath} path={'/registration'} />
      <NavItem icon={writing} text="Sign Sale Agreement" currentPath={currentPath} path={'/'} />
      <NavItem icon={searchData} text="Initiate Sale Deed" currentPath={currentPath} path={'/review-sale-deed'} />
      <NavItem icon={money} text="Pay TDS" currentPath={currentPath} path={'/'} />
      <NavItem icon={review} text="Sign Sale Deed" currentPath={currentPath} path={'/'} />
      </div>
      </>
      : role === 'SELLER' ?
      <>
      <div className="nav">
      <NavItem  icon={contract} text="Offer Letter" currentPath={currentPath} path={'/offer-letter'} />
      <NavItem icon={review} text="Review MOU" currentPath={currentPath} path={'/review-mou'} />
      <NavItem icon={writing} text="Review Sale Agreement" currentPath={currentPath} path={'/review-sale-agreement'} />
      <NavItem icon={searchData} text="Review Sale Deed" currentPath={currentPath} path={'/'} />
      </div>
      </>
      : role === "BUYER_BANK_AGENT" ?
      <>
      <div className="nav">
      <NavItem  icon={money} text="Legal Verification" currentPath={currentPath} path={'/legal-verification'} />
      <NavItem  icon={searchData} text="Property Inspection" currentPath={currentPath} path={'/property-inspection'} />
      <NavItem  icon={wallet} text="Loan Agreement" currentPath={currentPath} path={'/loan-agreement'} />
      <NavItem  icon={searchData} text="Loan Sanction" currentPath={currentPath} path={'/loan-sanction'} /> 
      </div>
      </>
      : role === "BUYER_LAWYER" ?
      <div className="nav">
       <NavItem icon={review} text="Review MOU" currentPath={currentPath} path={'/review-mou'} />
       <NavItem  icon={searchData} text="Review Property Documents" currentPath={currentPath} path={'/review-documents'} />
       <NavItem  icon={writing} text="Review Sale Agreement" currentPath={currentPath} path={'/review-sale-agreement'} />
       <NavItem icon={contract} text="Review Sale Deed" currentPath={currentPath} path={'/review-sale-deed'} />
       <NavItem icon={writing} text="Set Registration Date" currentPath={currentPath} path={'/set-registration-date'} />

      </div>
      : role === "CA" ?
      <div className="nav">
      <NavItem icon={writing} text="Update TDS Details" currentPath={currentPath} path={'/update-tds-details'} />
      </div>
      : role === "ADMIN" ?
      <div className="nav">
      <NavItem icon={man} text="Manage Profile" currentPath={currentPath} path={'/manage-profile'}  />
      <NavItem icon={manCog} text="Manage Users" currentPath={currentPath} path={'/manage-users'} /> 
      <NavItem icon={properties} text="Manage Properties" currentPath={currentPath} path={'/manage-properties'} />
      </div>
      :
      <div className="nav">
        <NavItem icon={man} text="Manage Profile" currentPath={currentPath} path={'/manage-profile'}  />
        <NavItem icon={manCog} text="Manage Admins" currentPath={currentPath} path={'/manage-admins'} />
        <NavItem icon={manCog} text="Manage Users" currentPath={currentPath} path={'/manage-users'} /> 
        <NavItem icon={properties} text="Manage Properties" currentPath={currentPath} path={'/manage-properties'} />
        <NavItem icon={templates} text="Manage Templates" currentPath={currentPath} path={'/manage-templates'} />
        <NavItem icon={checklist} text="Manage Checklist" currentPath={currentPath} path={'/manage-checklist'} />
        <NavItem icon={cog} text="Settings" currentPath={currentPath} path={'/super-admin-settings'} />
      </div>


    }

{props?.showFooter && (
      <div className="nav footer-nav">
        <NavItem icon={logout} text="Logout" currentPath={currentPath} path={role === 'SUPERADMIN'? '/super-admin-login':role === 'ADMIN'? '/admin-login': '/user-login'}/>
      </div>
     )}
    </>
    </>
  )
}

export default Page;