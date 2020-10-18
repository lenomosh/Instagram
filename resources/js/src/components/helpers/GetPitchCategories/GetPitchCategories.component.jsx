import React, {useEffect, useState} from 'react';
import Axios from "axios";
import apiUrls, {axiosHeader} from "../../environment";
import {useSelector} from "react-redux";
import List from "antd/es/list";
import {Link} from "react-router-dom";

const GetCategoryPitches = ()=>{
    const [categories, setCategories] = useState([]);
    const access_token  = useSelector(state=>state.user.currentUser.access_token)
    useEffect(() => {
        if (categories.length<1){
            Axios.get(apiUrls.category.index,{
                headers:{
                    ...axiosHeader,
                    Authorization:`Bearer ${access_token}`
                }
            }).then(
                res=>{
                    console.log(res.data)
                    setCategories(res.data)
                }
            ).catch(err=>{
                console.log(err.response)
            })
        }
    });


    return(
        <List
            size="large"
            bordered
            dataSource={categories}
            renderItem={item => <List.Item><Link to={'/categories/'+item.id}>{item.name}</Link> </List.Item>}
        />
    )
}
export default GetCategoryPitches
