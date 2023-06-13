import React, { useEffect, useState } from "react";
import { getBuyerPropData } from "./service";
import {getAllStages} from "../../redux/extra-services/stages.services"
import {getAllRoles} from "../../redux/extra-services/roles.services"
import { useSelector, useDispatch } from "react-redux";
import Pagination from '@mui/material/Pagination';
import PropertyBox from "../../commonComponent/property/propertyBox";
import Loader from "../../layout/Loader/Loader";

const BuyerHomeData = ({ searchData }) => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const loggedInUser = useSelector((state) => state.loggedInUser);


    const countPerPage = 4;
    const BuyerPropData = useSelector(
        (state) => state.buyerHomeData.buyerData?.properties
    );

    useEffect(() => {
        setIsLoading(true);
        dispatch(getAllStages())
        dispatch(getAllRoles())
        const userId = loggedInUser.data?.data?.userByEmail?._id;
        if (userId) {
          dispatch(getBuyerPropData(userId)).finally(() => setIsLoading(false));
        } else {
          setIsLoading(false);
        }
      }, []);
      
      

    const updatePage = (event, page) => {
        setCurrentPage(page);
        const to = countPerPage * page;
        const from = to - countPerPage;
        if (BuyerPropData?.length) {
            let data = [...BuyerPropData];
            if (!selectedValue) {
                setTotalCount(data?.length);
                setData(data?.slice(from, to));
            } else {
                const res = data?.filter((property) => !selectedValue || property.CurrentStage === selectedValue)
                setTotalCount(data?.length);
                setData(res?.slice(from, to));
            }

        }
    };

    useEffect(() => {
        handleSearch(searchData);
    }, [searchData]);
    const handleSearch = (e) => {
        let res = [];
        res = BuyerPropData?.filter((item) => {
            return (item?.PropertyType?.includes(e) || item?.PropertyType?.includes(e.toUpperCase()) || item?._id?.includes(e) || item?.flat_no?.includes(e) || item?.current_stage?.includes(e) || item?.current_stage?.includes(e.toUpperCase()))
        })
        setData(res);
    }

    useEffect(() => {
        if (BuyerPropData?.length) {
            let data = [...BuyerPropData];
            if (!selectedValue) {
                setTotalCount(data?.length);
                setData(data?.slice(0, countPerPage));
            } else {
                const res = data?.filter((property) => !selectedValue || property.CurrentStage === selectedValue)
                setTotalCount(res?.length);
                setData(res?.slice(0, countPerPage));
            }
        }
    }, [BuyerPropData, selectedValue]);

    return (
        <div>
            {isLoading && <Loader css={{ 'marginTop': '0px' }} />}
            {!isLoading && data?.length > 0 ?
                (<div>
                    {data?.map((property, index) => (
                        <PropertyBox key={index} data={property} />
                    ))}
                    {totalCount > 0 &&
                        <Pagination
                            className="mPage"
                            count={Math.ceil(totalCount / countPerPage)}
                            color="primary"
                            onChange={updatePage}
                        />
                    }
                </div>
                ) : (
                    <div className="">
                        <span className="no-record-found">No Record Found</span>
                    </div>
                )
            }
        </div>
    )
}

export default BuyerHomeData;
