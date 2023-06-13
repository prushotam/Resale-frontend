import React, { useEffect, useState } from "react";
import Main from "../../layout/Main";

import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector, connect } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  AddChecklistData,
  GetChecklistData,
  UpdateChecklistData,
  DeleteChecklistData,
} from "./service";

import Table from "react-bootstrap/Table";
import AddChecklist from "./AddChecklist";
import EditChecklist from "./EditChecklist";

import "./style.scss";

import circlePlus from "../../assets/circle-plus.svg";

import { Button, Dialog, DialogTitle, DialogActions } from "@mui/material";

function Page(props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const Dispatch = useDispatch();
  const adminChecklist = useSelector((state) => state.adminChecklist);
  const [state, setState] = useState({ currentChecklist: {} });
  const { addToast } = useToasts();
  const history = useHistory();

  const accessToken =
    useSelector((state) => state.loggedInUser?.data?.data?.accessToken) || "";

  useEffect(() => {
    if (!accessToken) {
      history.push("/super-admin-login");
    }
  }, []);

  useEffect(() => {
    Dispatch(GetChecklistData());
  }, []);

  useEffect(() => {
    if (adminChecklist.message) {
      if (adminChecklist.status == "Success") {
        addToast(adminChecklist.message, {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        addToast(adminChecklist.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  }, [adminChecklist.message, adminChecklist.status]);

  const handleCloseDeleteDialog = () => {
    setState({ ...state, currentChecklist: {} });
    setDeleteDialogOpen(false);
  };

  const handleDeleteChecklist = (checklist) => {
    setState({ ...state, currentChecklist: checklist });
    setDeleteDialogOpen(true);
  };

  const PropertyType = {
    FlatApartment: "Flat_Apartment",
    VillaIndependentHouseRowHouse: "Villa_Independent_house_Row_house",
    PentHouse: "Pent_house",
    EmptyLand: "Empty_land",
  };

  const propertyTypes = Object.values(PropertyType);

  return (
    <Main
      showNav={!props?.showNav}
      showFooter={!props?.showFooter}
      showLogo={!props?.showLogo}
      showAdminNavbar={!props?.showAdminNavbar}
    >
      <div className="row manage-checklist">
        <div className="btn-group-right">
          <select
            className="form-select select-menu"
            onChange={(e) =>
              setState({
                ...state,
                checklist_type: String(e.target.value).toLowerCase(),
              })
            }
          >
            <option value="">-- Select Property Type --</option>
            <option value="Flat_Apartment">Flat Apartment</option>
            <option value="Villa_Independent_house_Row_house">
              Villa / Independent House / Raw House
            </option>
            <option value="Pent_house">Pent House</option>
            <option value="Empty_land">Empty Land</option>
          </select>
        </div>
        {state.checklist_type ? (
          <>
            <div className="checklist-area col-12">
              <div className="plus-btn-wrap">
                <img
                  src={circlePlus}
                  className="plus-btn"
                  onClick={() => setState({ ...state, isAddOpen: true })}
                />
              </div>
              <div className="checklist-table-row">
                {adminChecklist?.checklists &&
                adminChecklist?.checklists.length ? (
                  <Table className="checklist-table ">
                    {adminChecklist?.checklists?.filter(
                      (i) =>
                        String(i.PropertyType).toLowerCase() ==
                        String(state.checklist_type).toLowerCase()
                    ).length ? (
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Document Name </th>
                          <th>Description</th>
                          <th>Stage</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                    ) : null}
                    <tbody>
                      {adminChecklist?.checklists
                        ?.filter(
                          (i) =>
                            String(i.PropertyType).toLowerCase() ==
                            String(state.checklist_type).toLowerCase()
                        )
                        .map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="document">{item.title}</td>
                            <td>{item.description}</td>
                            <td>
                              {item.stages ? item.stages.stage_name : "-"}
                            </td>
                            <td>
                              <img
                                src="/imgs/edit.svg"
                                 className="editIcon large-icon"
                                onClick={() =>
                                  setState({
                                    ...state,
                                    isEditOpen: true,
                                    currentChecklist: item,
                                  })
                                }
                              />
                              <img
                                src="/imgs/delete-icon.svg"
                                 className="editIcon large-icon"
                                onClick={() => handleDeleteChecklist(item)}
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                ) : null}
              </div>
            </div>{" "}
          </>
        ) : null}
      </div>
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle
          sx={{ background: "var(--darkBlue)", color: "var(--white)" }}
        >
          Are you sure you want to delete this checklist?
        </DialogTitle>
        <DialogActions sx={{ background: "var(--darkBlue)" }}>
          <Button
            onClick={handleCloseDeleteDialog}
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
            onClick={() => {
              Dispatch(DeleteChecklistData(state.currentChecklist._id));
              handleCloseDeleteDialog();
            }}
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

      <AddChecklist
        isOpen={state.isAddOpen}
        onClose={(e) => {
          setState({ ...state, isAddOpen: false });
        }}
        onSubmit={(data) => {
          Dispatch(AddChecklistData(data));
        }}
        currentType={propertyTypes}
      />

      {state.currentChecklist ? (
        <EditChecklist
          isOpen={state.isEditOpen}
          currentChecklist={state.currentChecklist}
          currentType={state.checklist_type}
          onSubmit={(data) => {
            Dispatch(UpdateChecklistData(data));
          }}
          onClose={(e) => {
            setState({ ...state, isEditOpen: false });
          }}
        />
      ) : null}
    </Main>
  );
}

export default Page;
