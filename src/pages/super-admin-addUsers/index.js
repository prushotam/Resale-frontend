import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./style.scss";
import { Table, Card, Form } from "react-bootstrap";
import { addUser } from "./service";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../manage-users/service";
import Modal from "react-bootstrap/Modal";
import users from "../../assets/Icons/user.png";
import SearchIcon from "@mui/icons-material/Search";
import { useToasts } from "react-toast-notifications";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
  Typography
} from "@mui/material";
import { updateManagePropData } from "../super-admin-manageProperties/service";
import { useLocation } from "react-router-dom";

const AddUsers = ({
  setIsDisplay,
  isDisplay,
  isAssignDisplay = true,
  userType,
  name,
  roleName,
  viewProperty,
  data
}) => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [selectOption, setSelectOption] = useState("");
  const getMessage = useSelector((state) => state.superAdminProperties);
  const getLoggedInUserId = useSelector(
    (state) => state.loggedInUser.data.data?.userByEmail
  );
  const [error, setError] = useState(false);
  const [click, setClick] = useState(isAssignDisplay);
  const [search, setSearch] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUser] = useState({});
  const [dataValue, setDataValue] = useState({
    password: "test@1234",
    is_admin: true,
  });
  const searchData = useLocation().search;
  const [searchUser, setSearchUser] = useState("");
  const searchParams = new URLSearchParams(searchData);
  const SELLER = data?.reduce((count, item) => {
    if (item?.role?.role_name === "SELLER") {
      count++;
    }
    return count;
  }, 0);

  const BUYER = data?.reduce((count, item) => {
    if (item?.role?.role_name === "BUYER") {
      count++;
    }
    return count;
  }, 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (_data, e) => {
    e.target.reset();
    let propHis = sessionStorage.getItem("propHis")
      ? JSON.parse(sessionStorage.getItem("propHis"))
      : [];
    let his = [];

    dispatch(addUser(dataValue))
      .then((res) => {
        let roleType = ""
        if (selectOption.includes('SELLER')) {
          roleType = "SELLER"
        } else {
          roleType = "BUYER"
        }
        const assignData = {
          property_parties_details: [
            {
              user_id: res?.payload?.data?._id,
              role: res?.payload?.data?.primary_role,
              role_side: roleType,
              assigned_date: new Date(),
              assigned_by: getLoggedInUserId?._id,
            },
          ],
        };

        if (roleName === 'ADMIN' || roleName === 'SUPERADMIN') {
          dispatch(
            updateManagePropData({
              ...assignData,
              id: searchParams.get("pid"),
            })
          );
        }

        const user = res?.payload?.data;
        his.push(
          `${user?.primary_role?.role_name
            ? user.primary_role.role_name +
            "(" +
            user.first_name +
            ")"
            : ""
          } has been added to ${assignData?.property_parties_details[0]?.role_side
          }`
        );

        propHis.push({
          name: name,
          time: new Date(),
          activity: his.join(", "),
        });

        sessionStorage.setItem("propHis", JSON.stringify(propHis));

        setIsSubmit(true);
        setIsDisplay(isDisplay);
      });
  };

  const onAssign = () => {
    let propHis = sessionStorage.getItem("propHis")
      ? JSON.parse(sessionStorage.getItem("propHis"))
      : [];
    let his = [];
    const findUser = getMessage?.propertyData?.property_parties_details?.filter(
      (item) => {
        return item?.user_id?._id === user?.value?._id;
      }
    );
    if (findUser.length) {
      addToast("Can not able to add duplicate user", { appearance: "error" });
    } else if (!user?.value?.status) {
      addToast("Can not able to add inactive user", { appearance: "error" });
    } else {
      let roleType = ""
      if (user?.value?.primary_role?.role_name.includes('SELLER')) {
        roleType = "SELLER"
      } else {
        roleType = "BUYER"
      }
      const assignData = {
        property_parties_details: [
          {
            user_id: user?.value?._id,
            role: user?.value?.primary_role?._id,
            role_side: roleType,
            assigned_date: new Date(),
            assigned_by: getLoggedInUserId?._id,
          },
        ],
        id: searchParams.get("pid"),
      };

      his.push(
        `${user?.value?.primary_role?.role_name
          ? user.value.primary_role.role_name +
          "(" +
          user.value.first_name +
          ")"
          : ""
        } has been added to ${assignData?.property_parties_details[0]?.role_side
        }`
      );
      propHis.push({
        name: name,
        time: new Date(),
        activity: his.join(", "),
      });
      sessionStorage.setItem("propHis", JSON.stringify(propHis));
      dispatch(updateManagePropData(assignData));
      setIsSubmit(true);
    }
  };

  useEffect(() => {
    if (getMessage.updateManageStatus && isSubmit) {
      if (getMessage.updateManageStatus === "Success") {
        addToast(getMessage.updateManagePropMessage, {
          appearance: "success",
        });
        setIsSubmit(false);
        setIsDisplay(isDisplay);
      } else {
        addToast(getMessage.updateManagePropMessage, { appearance: "error" });
        setIsSubmit(false);
      }
    }
  }, [getMessage, isSubmit]);

  useEffect(() => {
    dispatch(getData());
  }, []);
  const manageUsers = useSelector((state) => state.manageUsers?.userData);

  useEffect(() => {
    setSearch(manageUsers);
  }, [manageUsers]);

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
    const user = event.target.value;
    setSearchUser(user);

    if (user.length == 0) {
      setSearch(manageUsers);
    } else {
      let filterData = manageUsers?.filter((obj) => {
        return (
          obj.first_name.includes(user) ||
          obj.first_name.includes(user.toUpperCase()) ||
          obj.email_id.toLowerCase().startsWith(user.toLowerCase()) ||
          obj.phone.includes(user) ||
          obj.primary_role?.role_name.includes(user) ||
          obj.primary_role?.role_name.includes(user.toUpperCase())
        );
      });
      setSearch(filterData);

    }
  };

  const activeUser = (event) => {

    const rows = document.querySelectorAll("tr");
    rows.forEach((row) => {
      row.classList.remove("active");
    });
    const clickedRow = event.currentTarget;
    clickedRow.classList.add("active");
  };

  const handleRowClick = (event, item) => {
    const assign_role = item?.primary_role?.role_name;

    if ((assign_role === 'BUYER') && viewProperty.no_of_buyers > BUYER) {
      activeUser(event);
      setUser({
        value: item,
      });
    }
    else if (assign_role === 'SELLER' && viewProperty.no_of_owners > SELLER) {
      activeUser(event);
      setUser({
        value: item,
      });
    }
    else if (assign_role !== 'BUYER' && assign_role !== 'SELLER') {
      activeUser(event);
      setUser({
        value: item,
      });
    }
    else {
      addToast(`No of user for ${assign_role} role has reached to maximum`, { appearance: "error" });
    }
  };


  return (
    <Modal
      size="md"
      show={isDisplay}
      onHide={() => setIsDisplay(false)}
      aria-labelledby="example-modal-sizes-title-lg"
      className="editProperty"
      centered
    >
      <div className="add-form">
        <div className="add-user-form">
          <div
            className="close-btn"
            onClick={() => {
              setIsDisplay(false);
            }}
          >
            X
          </div>
          {isAssignDisplay && (
            <div className="text">
              <Button
                className={click ? "active" : "deActive"}
                onClick={() => setClick(!click)}
              >
                Assign
              </Button>
              <Button
                className={!click ? "active" : "deActive"}
                onClick={() => setClick(!click)}
              >
                Add
              </Button>
            </div>
          )}
          {!click ? (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="add-admin-column">
                <TextField
                  id="First Name"
                  label="First Name"
                  variant="outlined"
                  type="text"
                  onChange={(e) =>
                    setDataValue({ ...dataValue, first_name: e.target.value })
                  }
                />
                {errors.firstname ? (
                  <div className="form-errors">{errors.firstname.message}</div>
                ) : null}

                <TextField
                  id="last name"
                  label="Last name"
                  variant="outlined"
                  type="text"
                  onChange={(e) =>
                    setDataValue({ ...dataValue, last_name: e.target.value })
                  }
                />
                {errors.lastname ? (
                  <div className="form-errors">{errors.lastname.message}</div>
                ) : null}
              </div>
              <TextField
                id="Email-ID"
                label="Email-ID"
                variant="outlined"
                type="text"
                onChange={(e) =>
                  setDataValue({ ...dataValue, email_id: e.target.value })
                }
              />
              {errors.email ? (
                <div className="form-errors">{errors.email.message}</div>
              ) : null}

              <TextField
                id="Phone no"
                label="Phone no"
                variant="outlined"
                type="number"
                onChange={(e) =>
                  setDataValue({ ...dataValue, phone: e.target.value })
                }
              />
              {errors.phone ? (
                <div className="form-errors">{errors.phone.message}</div>
              ) : null}
              <div className="add-admin-column">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="SelectRole"
                    onChange={(e) => {
                      if (isAssignDisplay === true) {
                        if ((e.target.value?.role_name === 'BUYER') && viewProperty.no_of_buyers > BUYER) {
                          setSelectOption(e.target.value?.role_name)
                          setError(false)
                        }
                        else if (e.target.value?.role_name === 'SELLER' && viewProperty.no_of_owners > SELLER) {
                          setSelectOption(e.target.value?.role_name)
                          setError(false)
                        }
                        else if (e.target.value?.role_name !== 'BUYER' && e.target.value?.role_name !== 'SELLER') {
                          setSelectOption(e.target.value?.role_name)
                          setError(false)
                        }
                        else {
                          setSelectOption(e.target.value?.role_name)
                          setError(true)
                        }
                      } else {
                        setSelectOption(e.target.value?.role_name)
                      }
                      setDataValue({
                        ...dataValue,
                        primary_role: e.target.value?._id
                      });
                    }
                    }
                  >
                    {getMessage.roles
                      .filter(roleData => (
                        (roleName === 'BUYER') ? (roleData.role_name.includes("BUYER") || roleData.role_name === "SELLER") :
                          (roleName === 'SELLER') ? (roleData.role_name.includes("SELLER") || roleData.role_name === "BUYER") :
                            (roleName === 'ADMIN' || roleName === 'SUPERADMIN') && (roleData.role_name.includes("SELLER") || roleData.role_name.includes("BUYER"))
                      ))
                      .map(roleData => (
                        <MenuItem key={roleData} value={roleData}>
                          {roleData.role_name}
                        </MenuItem>
                      ))}


                  </Select>
                  {error && <Typography variant='p' className="text-light">No of user for {selectOption} role has reached to maximum</Typography>}
                </FormControl>
                {(selectOption === "SELLER" || selectOption === "BUYER") && (
                  <TextField
                    id="Percent Share"
                    label="Percent Share"
                    variant="outlined"
                    type="number"
                    value={dataValue?.percent_share}
                    InputProps={{
                      inputProps: {
                        max: 100, min: 0
                      }
                    }}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
                        setDataValue({
                          ...dataValue,
                          percent_share: value
                        });

                      }
                    }}


                  />

                )}
              </div>
              <div className="files-upload">
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  {...register("file")}
                  onChange={(e) =>
                    setDataValue({ ...dataValue, phone: e.target.value })
                  }
                />
                <p>Upload Photo ↑</p>
              </div>
              <div className="add-btn">
                <button type="submit" className={error ? "not-allowed" : "add-admin-btn"}>
                  Add
                </button>
              </div>
            </Form>
          ) : (
            <div>
              <div className="seacrhDiv">
                <Form className="searchForm">
                  <TextField
                    autoComplete="off"
                    className="search-bar"
                    type="search"
                    placeholder="Search by email"
                    variant="outlined"
                    onKeyUp={handleSearch}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon size="lg" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form>
              </div>
              {searchUser.toLowerCase().endsWith(".com") && (
                <Card>
                  <Card.Body>
                    <Table>
                      <tr>
                        <th></th>
                        <th>User Name</th>
                        <th>Email Id</th>
                        <th>Phone No.</th>
                        <th>Role Name</th>
                        <th>Percent User</th>
                      </tr>
                      <tbody>
                        {search?.length
                          ? search?.map((item) => {
                            return (
                              <tr onClick={(e) => handleRowClick(e, item)}>
                                <td>
                                  <img src={users} />
                                </td>
                                <td className="table-data">
                                  {item?.first_name}
                                </td>
                                <td className="table-data">
                                  {item?.email_id}
                                </td>
                                <td className="table-data">{item?.phone}</td>
                                <td className="table-data-role">
                                  {item?.primary_role?.role_name}
                                </td>
                                <td className="table-data-role">
                                </td>
                              </tr>
                            );
                          })
                          : "No Record Found"}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              )}
              {searchUser.toLowerCase().endsWith(".com") && (
                <div className="table-btn">
                  <Button className="tableAdd-btn" onClick={onAssign}>
                    Add
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
export default AddUsers;
