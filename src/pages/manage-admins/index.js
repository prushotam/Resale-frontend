import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, addData, updateData } from "./service";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";

import Main from "../../layout/Main";
import AddAdminModal from "./addModal";
import EditAdmin from "./editModal";

import circlePlus from "../../assets/circle-plus.svg";
import editIcon from "../../assets/edit-icon.svg";
import phone from "../../assets/Icons/Phone.svg";
import email from "../../assets/Icons/Email.svg";

import "./style.scss";

const Page = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentEdit, setCurrectEdit] = useState({});
  const [editModal, setEditModal] = useState(false);
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const adminList = useSelector((state) => state.admins);
  const history = useHistory();

  const accessToken = useSelector((state) => state.loggedInUser?.data?.data?.accessToken) || "";

  useEffect(() => {
    if (!accessToken) {
      history.push("/super-admin-login");
    }
  }, []);

  useEffect(() => {
    dispatch(getData());
  }, []);

  useEffect(() => {
    if (adminList.message) {
      if (adminList.status == "Success") {
        addToast(adminList.message, { appearance: "success" });
      } else {
        addToast(adminList.message, { appearance: "error" });
      }
    }
  }, [adminList.message, adminList.status]);

  return (
    <Main
      showNav={!props?.showNav}
      showFooter={!props?.showFooter}
      showLogo={!props?.showLogo}
      showAdminFooter={!props?.showAdminFooter}
      showAdminNavbar={!props?.showAdminNavbar}
    >
      <div className="plus-area">
        <div className="plus-btn-wrapper">
          <img
            src={circlePlus}
            className="plus-btn-img"
            onClick={() => setOpenModal(true)}
          />
        </div>

        <div className="container-admin-list">
          <div>
            <AddAdminModal
              isOpen={openModal}
              onClose={() => {
                setOpenModal(false);
              }}
              onSubmit={(data) => {
                dispatch(addData(data));
              }}
            />
            <EditAdmin
              isOpen={editModal}
              item={currentEdit}
              onClose={() => {
                setEditModal(false);
              }}
              onSubmit={(data) => {
                dispatch(updateData(data));
              }}
            />
          </div>

          {adminList.adminData?.length > 0 &&
            adminList.adminData.map((ele) => {
              return (
                <div className="cards">
                  <div>
                    <img src="/imgs/boy.svg" alt="" className="image" />
                  </div>
                  <div className="title">
                    <div className="icon-group">
                      <img
                        className="icon"
                        src={editIcon}
                        onClick={() => {
                          setCurrectEdit(ele);
                          setEditModal(true);
                        }}
                      />
                    </div>
                    <h3 key={ele.id}>{ele.first_name}</h3>
                  </div>
                  <div className="des">
                    <li>
                      <img className="email" src={email} />
                      {ele.email_id}
                    </li>
                    <li>
                      <img className="phone" src={phone} />
                      {ele.phone}
                    </li>
                    <p>{ele.staus}Active</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Main>
  );
};
export default Page;
