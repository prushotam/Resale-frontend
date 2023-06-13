import React, { useState,useEffect } from "react";
import Main from "../../layout/Main";
import View from "./view";
import Axios from "axios";
import { v4 } from 'uuid';
import { endpoint } from "../../utils/endpoints";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
const env = process.env.REACT_APP_ENV;

const Token = (props) => {

  const initialAddTransactionState = [{
    id: v4(),
    addButton: true,
    deleteButtton: false,
    transactionId: "",
    amount: "",
  }]

  const history = useHistory();
  const location = useLocation();
  const route = location.pathname.slice(1);

  const accessToken = useSelector((state) => state.loggedInUser?.data?.data?.accessToken) || "";
  const propertyId = useSelector((state)=> state?.buyerHomeData?.selectedProperty?._id) || '';
  const pid = location.search.split("=")[1]

  const { addToast } = useToasts();

  const [proceed, setProceed] = useState(false);
  const [token, setToken] = useState({});
  const [historySteps, setHistorySteps] = useState([]);
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [addTransaction, setAddTransaction] = useState(initialAddTransactionState);

  const userId = useSelector((state) => state.loggedInUser.data.data.userByEmail._id);

  useEffect(() => {
    if (!accessToken) {
      history.push("/user-login");
    }else{
      if(!propertyId) history.push("/user-home");
      else if(pid != propertyId) history.push(`/${route}?pid=${propertyId}`)
    }

  }, [])
  

  useEffect(() => {
    getPropertyPaymentDetail(propertyId);
  }, [propertyId])

  const handleAddTransaction = () => {
    if (addTransaction.length < 3) {
      let addTransactionRecall = [...addTransaction];
      addTransactionRecall = addTransactionRecall.map((transaction) => {
        transaction.addButton = false;
        return transaction
      })
      let transaction = { ...initialAddTransactionState[0], deleteButtton: true };
      if (addTransaction.length === 2) transaction = { ...initialAddTransactionState[0], deleteButtton: true, addButton: false }
      setAddTransaction([...addTransactionRecall, transaction])
    }
  }

  const handleDeleteTransaction = (id) => {
    let addTransactionRecall = [...addTransaction];
    const filteredTransaction = addTransactionRecall.filter((transaction) => transaction.id !== id);
    if (filteredTransaction.length > 1) {
      addTransactionRecall = filteredTransaction.map((transaction, index) => {
        if (index) transaction.addButton = true;
        return transaction
      })
    } else {
      addTransactionRecall = [{ ...filteredTransaction[0], addButton: true }]
    }
    setAddTransaction([...addTransactionRecall])
  }

  const getPropertyPaymentDetail = async (propertyId) => {
    try {
      const response = await Axios({
        url: `${endpoint[env].baseUrl}payment/getPropertyPaymentDetails/${propertyId}`,
        method: "get",
        headers:{
          "Authorization": `Bearer ${accessToken}`
        },
        params:{
          paymentType:route.toUpperCase()
        }
      })
      if (response.status == 200) {
        const transactionData = response?.data?.data?.transactionDetails || [];
        const remaningAmount = response?.data?.data?.remaningAmount;
        if (remaningAmount === 0) setProceed(true)
        let history = []
        transactionData.forEach((transaction) => {
          const { date, amount, id: transactionId } = transaction
          const data = { date, amount, transactionId };
          history.push(data)
        })
        setHistorySteps([...history])
        setToken({ ...response.data.data });
      }
    } catch (error) {
      addToast(`Unable to fetch details`, { appearance: "error", autoDismiss: true });

    }
  }

  const handleClick = async () => {
    setVerifyLoading(true);
    const data = addTransaction.map((transaction) => {
      let data = {};
      data.transactionId = transaction.transactionId;
      data.amount = parseInt(transaction.amount);
      return data;
    })
    await verifyTransaction(propertyId, data);
    setVerifyLoading(false);
    setAddTransaction(initialAddTransactionState)
  }

  const verifyTransaction = async (propertyId, data) => {
    try {
      const response = await Axios({
        url: `${endpoint[env].baseUrl}payment/verifyPropertyPaymentDetails`,
        method: "post",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          'content-type': 'application/json'
        },
        data: { userId, transactionDetails: data, propertyId , paymentType:route.toUpperCase()}
      });
      if (response?.status == 200) {
        await getPropertyPaymentDetail(propertyId);
        const transactionVerify = response?.data?.data || [];
        transactionVerify.forEach((transaction) => {
          if (transaction.status == 'Failed') {
            addToast(transaction.message, { appearance: "error", autoDismiss: true });
          }
          if (transaction.status == 'Verified') {
            addToast(transaction.message, { appearance: "success", autoDismiss: true });
          }
        })
      }
    } catch (error) {
      addToast(`Unable to verify transactions`, { appearance: "error", autoDismiss: true });
    }
  }

  const handleChange = (e, id) => {
    const recallTransaction = addTransaction
    const foundTransaction = recallTransaction.find((transaction) => transaction.id == id);
    foundTransaction[e.target.name] = e.target.value;
    setAddTransaction([...recallTransaction])
  }

  const createData = (name, value = '') => {
    return { name, value };
  }

  const amountRow = [
    createData('Payment Type', token.type),
    createData('Total Amount', token.totalAmount),
    createData('Paid Amount', token.paidAmount),
    createData('Remaining Amount', token.remaningAmount),
  ];

  const transactionCredRow = [
    createData('Account Name', token?.transferCred?.name),
    createData('Account No', token?.transferCred?.accountId),
    createData('IFSC Code', token?.transferCred?.ifsc),
    createData('Bank Name', token?.transferCred?.bank),

  ];

  const amountStyle = {
    'Total Amount': "bold",
    'Paid Amount': "paid",
    'Remaining Amount': "remaining"
  }

  const tableAttributes = [
    {
      key: "amountDetails",
      heading: "Amount",
      rowDetails: amountRow,
      containerStyle: { width: '49%', overflowX: "hidden" },
      tableStyle: { minWidth: '40%', marginRight: '5px' },
      headStyle: { backgroundColor: "var(--cyanBlue)" },
      amountStyle
    },
    {
      key: "credDetails",
      heading: "Escrow Account",
      rowDetails: transactionCredRow,
      containerStyle: { width: '49%', overflowX: "hidden" },
      tableStyle: { minWidth: '40%' },
      headStyle: { backgroundColor: "var(--cyanBlue)" },
    }
  ]

  const inputAttributes = [
    {
      key: 'transactionId',
      label: "Transaction Id(UTR)",
    },
    {
      key: 'amount',
      label: "Amount",
    }
  ]



  return (
    <>
      <div>
        <Main
          showUserNavbar={!props?.showUserNavbar}
          showUser={!props?.showUser}
        >
          <View
            label={route}
            tableAttributes={tableAttributes}
            addTransaction={addTransaction}
            inputAttributes={inputAttributes}
            handleChange={handleChange}
            proceed={proceed}
            handleClick={handleClick}
            verifyLoading={verifyLoading}
            handleAddTransaction={handleAddTransaction}
            handleDeleteTransaction={handleDeleteTransaction}
            historySteps={historySteps}
          />
        </Main>
      </div>
    </>
  );
};
export default Token;
