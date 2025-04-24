import React, {useState, useEffect } from "react";
import {getAllBidsOfAProject} from "../../api";
import EachBiddedBid from "./EachBiddedBid.jsx";
const GetEachProjectAllBids = ({project}) => {
    const[allBids,setAllBids]= useState([])

    useEffect(()=>{
        const handleBids = async () => {
            console.log(project);
            const bidsData = await getAllBidsOfAProject(project._id);
            setAllBids(bidsData.data);
        };
        handleBids();
    },[])
    console.log(allBids);
    
    
    return(
        <>    
        {
            
            allBids.map((eachBid)=>{
               return <EachBiddedBid eachBid={eachBid} key= {eachBid._id}/>
            })
        }
        </>
    )
}

export default GetEachProjectAllBids;