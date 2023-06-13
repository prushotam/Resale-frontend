import React, { useEffect, useState } from "react";
import { getManagePropData } from "./service";
import Pagination from '@mui/material/Pagination';
import { useSelector, useDispatch } from "react-redux";
import PropertyBox from "../../commonComponent/property/propertyBox";
import { useCallback } from "react";

const AddProperties = ({ event, selectedValue }) => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [totalCount, setTotalCount] = useState(0);

    const countPerPage = 4;

    const managePropertiesData = useSelector(
        (state) => state.superAdminProperties.managePropertyData
    );

    const updatePage = (event, page) => {
        setCurrentPage(page);
        const to = countPerPage * page;
        const from = to - countPerPage;
        if (managePropertiesData?.length) {
            let data = [...managePropertiesData];
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

    useCallback(() => {
        getProperties();
    }, []);

    const getProperties = () => {
        setIsLoading(true)
        dispatch(getManagePropData()).then(() => setIsLoading(false));
    }

    useEffect(() => {
        if (managePropertiesData?.length) {
            let data = [...managePropertiesData];
            if (!selectedValue) {
                setTotalCount(data?.length);
                setData(data?.slice(0, countPerPage));
            } else {
                const res = data?.filter((property) => !selectedValue || property.CurrentStage === selectedValue)
                setTotalCount(res?.length);
                setData(res?.slice(0, countPerPage));
            }
        }
    }, [managePropertiesData, selectedValue]);

    useEffect(() => {

        handleSearch(event);
    }, [event]);

    const handleSearch = (e) => {
        let res = [];
        res = managePropertiesData?.filter((item) => {
            return (item?.PropertyType?.includes(e) || item?.PropertyType?.includes(e?.toUpperCase()) || item?.re_id?.toString()?.includes(e) || item?.flat_no?.includes(e) || item?.current_stage?.includes(e) || item?.current_stage?.includes(e?.toUpperCase()))
        })
        setData(res);
    }

    return (
        <div>
            {(data?.length > 0) ?
                (<div>
                    {data?.map((property) => (
                        <PropertyBox data={property} />
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
                        <span className="no-record-found">No property found</span>
                    </div>
                )
            }
        </div>
    )
}

export default AddProperties;