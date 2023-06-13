import React, { useState, useEffect } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import { useToasts } from "react-toast-notifications";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { addSelectedProperty } from "../../pages/user-home/slices";

import {
  getStagesData,
  deletePropertiesData,
} from "../../pages/super-admin-manageProperties/service";
import { getData } from "../../pages/manage-users/service";

import "../../pages/super-admin-manageProperties/style.scss"

const PropertyBox = ({ data }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showWaiverDialog, setShowWaiverDialog] = useState(false);

  const { addToast } = useToasts();

  const history = useHistory();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.loggedInUser.preferredRole);
  const allStagesData = useSelector((state) => state?.stagesData?.stages);
  const manageUsers = useSelector((state) => state.manageUsers.userData);

  const onChange = (id) => {
    sessionStorage.setItem("propertyID", id);
    dispatch(addSelectedProperty(data));
    history.push(`/view-property?pid=${id}`);
  };
  const waiveOff = (id) => {
    addToast(`Platform-Fee is waived off for ${id}`, { appearance: "success" });
  };

  const onDelete = (id) => {
    setShowConfirmation(false);
    dispatch(deletePropertiesData(id));
    addToast(`Property deleted successfully ${id}`, { appearance: "success" });
  };

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleClose = () => {
    setShowConfirmation(false);
  };

  useEffect(() => {
    dispatch(getStagesData());
    dispatch(getData());
  }, []);

  const formatFlatNo = (flatNo) => {
    if (flatNo?.length > 5) {
      return flatNo?.slice(0, 5) + "...";
    }
    return flatNo;
  };

  const currentStage = allStagesData?.find(
    (stage) => stage?._id === data?.current_stage
  );

  const stageName = currentStage ? currentStage.stage_name : null;

  const userArray = manageUsers ? Object.values(manageUsers) : [];
  const seller = userArray.find(
    (user) =>
      user.primary_role?._id ===
      data.property_parties_details.find(
        (detail) => detail.role_side === "SELLER"
      )?.user_id
  );
  const sellerName = seller ? `${seller.first_name} ${seller.last_name}` : null;

  const buyer = userArray.find(
    (user) =>
      user.primary_role?._id ===
      data.property_parties_details.find(
        (detail) => detail.role_side === "BUYER"
      )?.user_id
  );
  const buyerName = buyer ? `${buyer.first_name} ${buyer.last_name}` : null;

  const handleWaiverDialogOpen = () => {
    setShowWaiverDialog(true);
  };

  const handleWaiverDialogClose = () => {
    setShowWaiverDialog(false);
  };

  return (
    <Row className="adding-property mt-3">
      {role !== "ADMIN" && role !== "SUPERADMIN" && (
        <span className="user-type-display">{role}</span>
      )}
      <Col xs={12} md={2} className="imageContainer">
        <Image
          src="/imgs/interior.jpg"
          alt="addProp"
          className="manage-image"
        />
      </Col>
      <Col xs={12} md={3} className="fieldsContainer">
        <p>
          <span className="labelArea">ID No:</span> <span>{data?.re_id}</span>
        </p>
        <p>
          <span className="labelArea">Seller: </span>
          <span>{sellerName}</span>
        </p>
        <p>
          <span className="labelArea">Current Stage:</span>
          <span>{stageName}</span>
        </p>
      </Col>
      <Col xs={12} md={4} className="fieldsContainer" >
        <p>
          <span className="labelArea">Property type:</span>{" "}
          {data.PropertyType?.replaceAll("_", "/")}
        </p>
        <p>
          <span className="labelArea">Buyer:</span>
          <span>{buyerName}</span>
        </p>
        <p>
          <span className="labelArea">Listed Date: </span>{" "}
          {new Date(data?.created_at).toLocaleDateString()}
        </p>
      </Col>
      <Col xs={12} md={3} className="fieldsContainer">
        <p>
          <span className="labelArea">Flat no:</span>{" "}
          {formatFlatNo(data.flat_no)}
        </p>
        <div className="d-flex justify-content-end">
          <Button
            variant="text"
            sx={{ textTransform: "none", color: "var(--darkBlue)" }}
            onClick={() => onChange(data._id)}
          >
            View More
            <ArrowForwardIcon />
          </Button>
        </div>
        <div className="d-flex justify-content-end">
          {role === "ADMIN" && (
            <Button
              variant="contained"
              sx={{ textTransform: "none", bgcolor: "var(--darkBlue)" }}
              onClick={handleWaiverDialogOpen}
            >
              {" "}
              Waive-Off
            </Button>
          )}

          <Dialog open={showWaiverDialog} onClose={handleWaiverDialogClose}>
            <DialogTitle
              sx={{ background: "var(--darkBlue)", color: "var(--white)" }}
            >
              {"Are you sure you want to waive off the platform fee?"}
            </DialogTitle>
            <DialogActions sx={{ background: "var(--darkBlue)" }}>
              <Button
                onClick={handleWaiverDialogClose}
                sx={{
                  color: "var(--white)",
                  "&:hover": {
                    backgroundColor: "var(--white)",
                    color: "var(--red)",
                  },
                }}
              >
                No
              </Button>
              <Button
                onClick={() => waiveOff(data._id)}
                sx={{
                  color: "var(--white)",
                  "&:hover": {
                    backgroundColor: "var(--white)",
                    color: "var(--darkBlack)",
                  },
                }}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>

          {role === "SUPERADMIN" && (
            <Button
              variant="contained"
              sx={{ textTransform: "none", bgcolor: "var(--darkBlue)" }}
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          )}
        </div>
      </Col>
      <Dialog open={showConfirmation} onClose={handleClose}>
        <DialogTitle
          sx={{ background: "var(--darkBlue)", color: "var(--white)" }}
        >
          {"Are you sure you want to delete this property?"}
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
            onClick={() => onDelete(data._id)}
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
    </Row>
  );
};

export default PropertyBox;
