import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {useParams} from 'react-router-dom'
import Axios from "axios";
import apiUrls, {axiosHeader} from "../../environment";
import {message} from "antd";
import List from "antd/es/list";
import PitchRead from "../../Pitch/read/read";

const PitchesFromCategory = ()=>{
    const [category, setCategory] = useState([]);
    const {category_id} = useParams();
    const [previousCategory_id, setPreviousCategory_id] = useState(null);
    const current_user = useSelector(state=>state.user.currentUser)
    console.log(current_user)
    useEffect(() => {
        if (previousCategory_id !==category_id){
            Axios.get(apiUrls.category.read+category_id,{
                headers:{
                    ...axiosHeader,
                    Authorization:`Bearer ${current_user.access_token}`
                }
            }).then(res=>{
                setPreviousCategory_id(category_id)
                setCategory(res.data)
            })
                .catch(err=>{
                    if (err.response?.status===404){
                        message.error("Category does not exist!",7)
                    }
                    console.log(err)
                    message.error(err?.response?.data?.msg,7)
                })
        }
        return () => {

        };
    });

    return(
        <List
            itemLayout="horizontal"
            dataSource={category?.pitches}
            renderItem={item => (
                <List.Item>
                    <div className="col-sm-12">
                    <PitchRead pitch={item}/>

                    </div>
                </List.Item>
            )}
        />
    )
}
export  default PitchesFromCategory
