import React from "react";

const PropertyHistoryData = () => {
    const history = JSON.parse(sessionStorage.getItem("propHis"));
    return (
        <div>
            <div className="property-doc">
                <h4 className="fw-bold">Property History</h4>
                <div className="history-box">
                    <ul>
                        {history?.map((item) => {
                            return (
                                <li>{`${new Date(item.time).toDateString()} ${new Date(item.time).getHours() + ":" + new Date(item.time).getMinutes()} ${item.name
                                    } ${item.activity}`}</li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>

    )

}
export default PropertyHistoryData;