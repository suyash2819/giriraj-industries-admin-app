import React, { useEffect, useState } from "react";
import { db } from "../config/FireBase";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import "../CSS/Orders.css";

const Orders = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderStatus, setOrderStatus] = useState({});
  const statuses = ["ordered", "dispatched", "delivered"];

  useEffect(() => {
    db.collectionGroup("Orders").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        setOrderDetails((orderDetails) => [
          ...orderDetails,
          { ...doc.data(), id: doc.id, parent_id: doc.ref.parent.parent.id },
        ]);
      });
    });
  }, []);

  const handleStatusChange = (e) => {
    setOrderStatus({ [e.target.name]: e.target.checked });
  };

  const handleUpdateStatus = (order) => {
    // const breakOrderStatus = orderStatus.split("_");
    let breakOrderStatus;
    for (const property in orderStatus) {
      breakOrderStatus = property.split("_");
    }
    db.collection("Users")
      .doc(order.parent_id)
      .collection("Orders")
      .doc(order.orderId)
      .get()
      .then((orderDoc) => {
        db.collection("Users")
          .doc(order.parent_id)
          .collection("Orders")
          .doc(order.orderId)
          .set({ ...orderDoc.data(), orderStatus: breakOrderStatus[2] })
          .then((statusSet) => {
            alert("updated status successfully");
          });
      });
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th rowSpan="2">User Email</th>
            <th rowSpan="2">Username</th>
            <th rowSpan="2">Contact Number</th>
            <th rowSpan="2">is Paid ?</th>
            <th rowSpan="2">Set Status</th>
            <th colSpan="8">Items Ordered</th>
          </tr>
          <tr>
            <th>Item Type</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Size Ordered</th>
            <th>Cost</th>
            <th>Color Ordered</th>
            <th>Desription</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((order) => {
            return (
              <>
                <tr>
                  <td
                    rowSpan={
                      order.itemsOrdered ? order.itemsOrdered.length + 1 : 1
                    }
                  >
                    {order.userEmail || ""}
                  </td>
                  <td
                    rowSpan={
                      order.itemsOrdered ? order.itemsOrdered.length + 1 : 1
                    }
                  >
                    {order.userDisplayName || ""}
                  </td>
                  <td
                    rowSpan={
                      order.itemsOrdered ? order.itemsOrdered.length + 1 : 1
                    }
                  >
                    {order.deliveryAddress
                      ? order.deliveryAddress.phonenumber
                      : ""}
                  </td>
                  <td
                    rowSpan={
                      order.itemsOrdered ? order.itemsOrdered.length + 1 : 1
                    }
                  >
                    {order.paymentVerified ? "true" : "false"}
                  </td>
                  <td
                    rowSpan={
                      order.itemsOrdered ? order.itemsOrdered.length + 1 : 1
                    }
                  >
                    {statuses.map((status) => {
                      const specificOrder = order.orderId + "_" + status;
                      return (
                        <>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={order.orderId + "_" + status}
                                color="primary"
                              />
                            }
                            key={specificOrder}
                            checked={orderStatus[specificOrder] || false}
                            onChange={handleStatusChange}
                            label={status}
                          />
                        </>
                      );
                    })}
                    <br />
                    <center>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="updateButton"
                        onClick={() => handleUpdateStatus(order)}
                      >
                        Update Status
                      </Button>
                    </center>
                  </td>
                </tr>

                {order.itemsOrdered
                  ? order.itemsOrdered.map((item) => {
                      return (
                        <>
                          <tr key={order.itemsOrdered.CompositeKey}>
                            <td>{item.Item_Type}</td>
                            <td>{item.Item_Name}</td>
                            <td>{item.Quantity}</td>
                            <td>{item.Size_Ordered}</td>
                            <td>{item.Cost}</td>
                            <td>{item.Color_Ordered}</td>
                            <td>""</td>
                          </tr>
                        </>
                      );
                    })
                  : null}
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Orders;
