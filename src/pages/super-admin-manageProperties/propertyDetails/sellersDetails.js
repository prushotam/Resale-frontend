import React, { useEffect, useState } from "react";
import dash from "../../../assets/dash.svg";
import AddUsers from "../../super-admin-addUsers";
import ownerName from '../../../assets/Icons/Owner Name.svg';
import ownerHighlight from '../../../assets/Icons/Owner Name1.svg';
import POA from '../../../assets/Icons/POA.svg';
import POAHighlight from '../../../assets/Icons/POA1.svg';
import Broker from '../../../assets/Icons/Broker Name.svg';
import BrokerHighlight from '../../../assets/Icons/Broker Name1.svg';
import Lawyer from '../../../assets/Icons/Lawyer Name.svg';
import LaywerHighlight from '../../../assets/Icons/Lawyer Name1.svg';
import BankAgent from '../../../assets/Icons/Bank AGent Name.svg';
import BankAgentHighlight from '../../../assets/Icons/Bank AGent Name1.svg';
import CA from '../../../assets/Icons/CA Name.svg';
import CAHighlight from '../../../assets/Icons/CA Name1.svg';
import '../style.scss';
import { Button } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import { useSelector } from "react-redux";

const SellerDetailsData = ({ data, user, viewProperty }) => {
    const [showSellerDelete, setShowSellerDelete] = useState(false);
    const [showBuyerDelete, setShowBuyerDelete] = useState(false);
    const [addUserModal, setAddUserModal] = useState(false);
    const [addUserType, setAddUserType] = useState("BUYER");
    const [seller, setSeller] = useState([]);
    const [buyer, setBuyer] = useState([]);
    const role = useSelector((state) => state.loggedInUser.preferredRole);
    const roleName = useSelector((state) => state.loggedInUser?.roles[0]?.role_name);
    const roleId = useSelector((state) => state.loggedInUser?.data?.data?.userByEmail);
    useEffect(() => {
        var buyers = data?.filter(function (obj) {
            return obj.role_side === "BUYER";
        });
        setBuyer(buyers);
        var sellers = data?.filter(function (obj) {
            return obj.role_side === "SELLER";
        });
        setSeller(sellers);
    }, [data])
    return (
        <div className="details-container">
            <div className="details">
                <div className="seller-details fw-bold">
                    <h4>Seller Details</h4>
                    <Button
                        className={roleName === 'SELLER' || roleName === 'ADMIN' || roleName === 'SUPERADMIN' ? '' : 'not-allowed'}
                        onClick={() => { setAddUserModal(!addUserModal); setAddUserType('SELLER') }}>
                        Add User
                    </Button>
                    <Button
                        className={roleName === 'SELLER' || roleName === 'ADMIN' || roleName === 'SUPERADMIN' ? '' : 'not-allowed'}
                        onClick={() => setShowSellerDelete(!showSellerDelete)}>
                        Delete User
                    </Button>
                </div>
                <img src={dash} alt="dash" />
                <div className="buyer-details fw-bold">
                    <h4>Buyer Details</h4>
                    <Button
                        className={roleName === 'BUYER' || roleName === 'ADMIN' || roleName === 'SUPERADMIN' ? '' : 'not-allowed'}
                        onClick={() => { setAddUserModal(!addUserModal); setAddUserType('BUYER') }}>
                        Add User
                    </Button>
                    <Button
                        className={roleName === 'BUYER' || roleName === 'ADMIN' || roleName === 'SUPERADMIN' ? '' : 'not-allowed'}
                        onClick={() => setShowBuyerDelete(!showBuyerDelete)}>
                        Delete User
                    </Button>
                </div>
            </div>
            <div className="users-details-left">
                <div className="userslist">
                    {seller?.length ? seller?.map(item => {
                        return <div style={{ position: 'relative' }}>
                            <div className="hover-text" style={{
                                backgroundColor: item?.user_id?._id === roleId?._id ? "#0062ae" : "white",
                                height: "6rem",
                                width: "6rem",
                                borderRadius: "50%",
                                padding: "1.4rem",
                            }}>
                                {showSellerDelete && (
                                    <div className="delete-icon">
                                        <CancelIcon sx={{ color: "var(--red)" }} />
                                    </div>
                                )}
                                <img src={(item?.role?.role_name === "SELLER" || item?.role?.role_name === "BUYER") ? (item?.user_id?._id === roleId?._id ? ownerHighlight : ownerName) :
                                    item?.role?.role_name.includes("CA") ? (item?.user_id?._id === roleId?._id ? CAHighlight : CA) :
                                        item?.role?.role_name.includes("LAWYER") ? (item?.user_id?._id === roleId?._id ? LaywerHighlight : Lawyer) :
                                            item?.role?.role_name.includes("POA") ? (item?.user_id?._id === roleId?._id ? POAHighlight : POA) :
                                                item?.role?.role_name.includes("AGENT") ? (item?.user_id?._id === roleId?._id ? BrokerHighlight : Broker) :
                                                    item?.role?.role_name.includes("BANK_AGENT") && (item?.user_id?._id === roleId?._id ? BankAgentHighlight : BankAgent)
                                } alt="owner-name" />
                                <span className="seller-name">{item?.role?.role_name}<br />
                                    <span className={item?.user_id?.first_name.length > 10 ? "marquee" : ""}><p>{item?.user_id?.first_name}</p></span></span>
                            </div>
                            <div className="hover-content">
                                <p><span className="fw-bold">Email Id: </span>{item?.user_id?.email_id}</p>
                                <p><span className="fw-bold">Phone no.: </span>{item?.user_id?.phone}</p>
                            </div>
                        </div>
                    }) : <span className="no-record">No Record Found</span>}
                </div>
            </div>
            <div className="users-details-right">
                <div className="userslist">
                    {buyer?.length ? buyer?.map((item, index) => {
                        return <div style={{ position: 'relative' }}>
                            <div className="hover-text" style={{
                                backgroundColor: item?.user_id?._id === roleId?._id ? '#0062ae' : "white",
                                height: "6rem",
                                width: "6rem",
                                borderRadius: "50%",
                                padding: "1.4rem",
                            }}>
                                {showBuyerDelete && (
                                    <div className="delete-icon">
                                        <CancelIcon sx={{ color: "var(--red)" }} />
                                    </div>
                                )}
                                <img src={(item?.role?.role_name === "SELLER" || item?.role?.role_name === "BUYER") ? (item?.user_id?._id === roleId?._id ? ownerHighlight : ownerName) :
                                    item?.role?.role_name.includes("CA") ? (item?.user_id?._id === roleId?._id ? CAHighlight : CA) :
                                        item?.role?.role_name.includes("LAWYER") ? (item?.user_id?._id === roleId?._id ? LaywerHighlight : Lawyer) :
                                            item?.role?.role_name.includes("POA") ? (item?.user_id?._id === roleId?._id ? POAHighlight : POA) :
                                                item?.role?.role_name.includes("AGENT") ? (item?.user_id?._id === roleId?._id ? BrokerHighlight : Broker) :
                                                    item?.role?.role_name.includes("BANK_AGENT") && (item?.user_id?._id === roleId?._id ? BankAgentHighlight : BankAgent)
                                } alt="owner-name" />
                                <span className="seller-name">{item?.role?.role_name}<br />
                                    <span className={item?.user_id?.first_name.length > 10 ? "marquee" : ""}><p>{item?.user_id?.first_name}</p></span></span>
                            </div>
                            <div className="hover-content">
                                <p><span className="fw-bold">Email Id: </span>{item?.user_id?.email_id}</p>
                                <p><span className="fw-bold">Phone no.: </span>{item?.user_id?.phone}</p>
                            </div>
                        </div>
                    }) : <span className="no-record">No Record Found</span>}
                </div>
            </div>
            <AddUsers
                setIsDisplay={() => setAddUserModal(!addUserModal)}
                isDisplay={addUserModal}
                userType={addUserType}
                name={user}
                roleName={roleName}
                viewProperty={viewProperty}
                data={data}
            />
        </div>

    )

}
export default SellerDetailsData;