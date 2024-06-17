import React from 'react'
import TopNavigation from "./TopNavigation";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    let navigate = useNavigate();
    let storeObj = useSelector((store) => {
        console.log(store);
        return store;
    });
    let deleteAccount = async () => {
        let dataToSend = new FormData();
        dataToSend.append("email", storeObj.reducer.userDetails.email);
        let requestOptions = {
            method: "DELETE",
            body: dataToSend,
        };
        let JSONData = await fetch("http://localhost:4567/deleteAccount", requestOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData);
        alert(JSOData.msg);
        if (JSOData.status === "success") {
            navigate("/");
        }

    }
    return (
        <div>
            <TopNavigation />
            <h2>Dashboard</h2>
            <h2>Welcome {storeObj.reducer.userDetails.firstName} {storeObj.reducer.userDetails.lastName}</h2>
            <img alt='' src={`http://localhost:4567/${storeObj.reducer.userDetails.profilePic}`}></img>
            <button onClick={() => {
                deleteAccount();
            }}>Delete Account</button>
        </div>
    )
}

export default Dashboard