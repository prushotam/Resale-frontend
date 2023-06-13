import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyData, getUsersData } from "./service";
import {getAllStages} from "../../redux/extra-services/stages.services";
import {getAllRoles} from "../../redux/extra-services/roles.services"
import { useHistory } from "react-router-dom";

import { Bar } from "react-chartjs-2";
import { DatePicker } from "antd";
import Main from "../../layout/Main";
import "./style.scss";

const { RangePicker } = DatePicker;

function Dashboard(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const adminList = useSelector((state) => state.admins);
  const role = sessionStorage.getItem("role");
  const chartData = useSelector((state) => state.superAdminDashboard);

  const loggedInUser = useSelector((state) => state.loggedInUser);

  const accessToken = useSelector((state) => state.loggedInUser?.data?.data?.accessToken) || "";

  useEffect(() => {
    if (!accessToken) {
      history.push("/admin-login");
    }
  }, []);

  useEffect(() => {
    dispatch(getPropertyData());
    dispatch(getUsersData());
    dispatch(getAllStages());
    dispatch(getAllRoles());
  }, []);

  let propertyTypes = [];
  if (chartData && chartData.propertyData) {
    propertyTypes = chartData.propertyData.reduce((types, property) => {
      if (!types.includes(property.PropertyType)) {
        types.push(property.PropertyType);
      }
      return types;
    }, []);
  }

  const chartLabels = propertyTypes;
  const chartDataPoints = propertyTypes.map((type) => {
    return chartData.propertyData.filter(
      (property) => property.PropertyType === type
    ).length;
  });

  const chart1 = {
    labels: chartLabels,
    datasets: [
      {
        label: "Number of Holders",
        data: chartDataPoints,
        backgroundColor: "#0062AE",
        barThickness: 50,
        borderWidth: 1,
        hoverBackgroundColor: "#59a9ff",
        hoverBorderColor: "#0062AE",
        hoverBorderWidth: 1,
        clip: { left: 5, top: false, right: -2, bottom: 0 },
        indexAxis: "y",
        options: {
          scales: {
            y: {
              min: 0,
            },
          },
        },
      },
    ],
  };

  return (
    <Main
      showNav={!props?.showNav}
      showFooter={!props?.showFooter}
      showLogo={!props?.showLogo}
      showAdminNavbar={!props?.showAdminNavbar}
    >
      <div className="dashboard-content">
        {role === "SUPERADMIN" ? (
          <h2>
            Welcome {loggedInUser.data.data.superAdminByEmail.first_name}!
          </h2>
        ) : (
          <h2>Welcome {loggedInUser.data?.data?.adminByEmail.first_name}!</h2>
        )}
        <div className="content-chart">
          <RangePicker className="date-picker" />
          <div className="chart-box">
            <Bar data={chart1} />
          </div>
          <div className="document-chart">
            <RangePicker className="date-picker" />
            <div className="chart-box">
              <Bar data={chart1} />
            </div>
          </div>
          <div className="users-box"></div>
        </div>
        {/* <div className="box-area"></div> */}
        <div className="document-area"></div>
      </div>
    </Main>
  );
}
export default Dashboard;
