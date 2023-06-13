import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Main from "../../layout/Main";
import AddUsers from "../super-admin-addUsers";
import EditUsers from "../super-admin-editUsers";
import Pagination from '@mui/material/Pagination';
import { getData, getDeleteData } from "./service";
import { Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import { useToasts } from "react-toast-notifications";
import "./style.scss";
import circlePlus from "../../assets/circle-plus.svg";
import { Table } from "react-bootstrap";
import Loader from "../../layout/Loader/Loader";
import Switch from "@mui/material/Switch";
import { useHistory } from "react-router-dom";

const Page = (props) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const [userIdToEdit, setUserIdToEdit] = useState(null);
  const [userFirstNameToEdit, setUserFirstNameToEdit] = useState(null);
  const [userLastNameToEdit, setUserLastNameToEdit] = useState(null);
  const [userEmailIdToEdit, setUserEmailIdToEdit] = useState(null);
  const [userPhoneToEdit, setUserPhoneToEdit] = useState(null);




  const { addToast } = useToasts();
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const manageUsers = useSelector((state) => state.manageUsers.userData);
  const countPerPage = 10;
  const dispatch = useDispatch();
  const history = useHistory();

  const accessToken =
    useSelector((state) => state.loggedInUser?.data?.data?.accessToken) || "";

  useEffect(() => {
    if (!accessToken) {
      history.push("/admin-login");
    }
  }, []);
  useEffect(() => {
    setIsLoading(true);
    dispatch(getData()).then(() => setIsLoading(false));
  }, []);
  useEffect(() => {
    if (manageUsers?.length) {
      let data1 = [...manageUsers];
      setTotalCount(data1?.length);
      setData(data1?.slice(0, countPerPage));
    }
  }, [manageUsers]);
  const updatePage = (event, page) => {
    setCurrentPage(page);
    let cloneData = [...manageUsers];
    const to = countPerPage * page;
    const from = to - countPerPage;
    setData(cloneData?.slice(from, to));
    setTotalCount(cloneData?.length);
  };
  const handleSearch = (e) => {
    let res = [];
    res = manageUsers?.filter((item) => {
      return (
        item?.first_name?.includes(e) ||
        item?.first_name?.includes(e.toUpperCase()) ||
        item?.created_at?.includes(e)
      );
    });
    setTotalCount(res?.length);
    setData(res?.slice(0, countPerPage));
  };

  const onDelete = (id) => {
    setShowConfirmation(false);
    dispatch(getDeleteData(id));
    addToast(`User deleted successfully`, { appearance: "success" });
  };

  const handleDeleteClick = (id) => {
    setShowConfirmation(true);
    setUserIdToDelete(id);
  };

  const handleClose = () => {
    setShowConfirmation(false);
  };

  const handleEditClick = (id,first_name,last_name,phone,email_id,) => {
    setEditModal(true);
    setUserIdToEdit(id);
    setUserFirstNameToEdit(first_name)
    setUserLastNameToEdit(last_name)
    setUserPhoneToEdit(phone)
    setUserEmailIdToEdit(email_id)
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Main
          showNav={!props?.showNav}
          showFooter={!props?.showFooter}
          showLogo={!props?.showLogo}
          showAdminFooter={!props?.showAdminFooter}
          showAdminNavbar={!props?.showAdminNavbar}
          onChange={handleSearch}
        >
          <div className="plus-area">
            <div className="plus-btn-wrapper">
              <img
                src={circlePlus}
                className="plus-btn-img"
                onClick={() => setOpenModal(true)}
              />
            </div>
            <div>
              {data?.length > 0 ? (
                <div className="manage-users-container">
                  {editModal && (
                    <EditUsers
                      editModal={editModal}
                      setEditModal={setEditModal}
                      id={userIdToEdit}
                      first_name={userFirstNameToEdit}
                      last_name={userLastNameToEdit}
                      email_id={userEmailIdToEdit}
                      phone={userPhoneToEdit}
                    />
                  )}
                  <Table>
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Created Date</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((user) => (
                        <tr>
                          <td>{`${user.first_name} ${user.last_name}`}</td>
                          <td>
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                          <td>{user?.primary_role?.role_name}</td>
                          <td>{user?.status ? "Active" : "Inactive"}</td>
                          <td>
                            <img src="/imgs/edit.svg" className="editIcon" onClick={() => handleEditClick(user._id, user.first_name, user.last_name, user.phone, user.email_id)} />
                            <img
                              src="/imgs/delete-icon.svg"
                              className="editIcon"
                              onClick={() => handleDeleteClick(user._id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div>
                  <span className="no-record-found">No Record Found</span>
                </div>
              )}
            </div>
            <Pagination
              className="mPage"
              count={Math.ceil(totalCount / countPerPage)}
              color="primary"
              onChange={updatePage}
            />

          </div>
          {openModal && (
            <AddUsers
              isAssignDisplay={false}
              isDisplay={openModal}
              setIsDisplay={setOpenModal}
            />
          )}
          <Dialog open={showConfirmation} onClose={handleClose}>
            <DialogTitle
              sx={{ background: "var(--darkBlue)", color: "var(--white)" }}
            >
              {"Are you sure you want to delete this user?"}
            </DialogTitle>
            <DialogActions sx={{ background: "var(--darkBlue)" }}>
              <Button
                onClick={handleClose}
                sx={{
                  color: "var(--white)",
                  "&:hover": {
                    backgroundColor: "var(--white)",
                    color: "var(--drakBlack)",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => onDelete(userIdToDelete)}
                sx={{
                  color: "var(--white)",
                  "&:hover": {
                    backgroundColor: "var(--white)",
                    color: "var(--red)",
                  },
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Main>
      )}
    </>
  );
};
export default Page;
