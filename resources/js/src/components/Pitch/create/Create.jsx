import React, {useEffect} from 'react'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
import {useState} from "react";
import {Button,Select} from "antd";
import Axios from "axios";
import apiUrls, {axiosHeader} from "../../environment";
import {message} from "antd/es";
import {PlusOutlined} from '@ant-design/icons'
import Divider from "antd/es/divider";
import Input from "antd/es/input";
import {useSelector} from "react-redux";
import Spin from "antd/es/spin";
const {Option} = Select
const PitchCreate =()=>{
    const currentuser = useSelector(state=>state.user.currentUser)
    const [pitchValue, setPitchValue] = useState('');
    const [categories, setCategories] = useState(null);
    const [pitchCategoryID, setPitchCategoryID] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!categories){
            getCategories()
        }

    }, );
    const getCategories =()=>{
        setLoading(true)
        Axios.get(apiUrls.category.index,{
            headers:{
                Authorization:`Bearer ${currentuser.access_token}`
            }
        })
            .then(res=> {
                setLoading(false)
                setCategories(res.data)
            })
            .catch(err=>{
                message.error(err.response.data.description,10)
                setLoading(false)
                // console.log(err.response)
            })
    }

    const submitForm = ()=>{
        if (!pitchCategoryID){
            return message.warn("Select category to which the pitch should belong!",6)
        }
        if (!pitchValue){
            return message.info("You really want to submit a blank pitch? Wow",6)
        }
        // console.log(pitchValue.length)
        // console.log(pitchValue)
        if (pitchValue.length<9){
            return message.warn("Seriously, your pitch is too short. :XD",5)
        }
        setLoading(true)
        Axios.post(apiUrls.pitch.create
        ,{
                content:pitchValue,
                user_id:currentuser.user.id,
                category_id:pitchCategoryID
            },
            {
           headers: {
               ...axiosHeader,
               Authorization: `Bearer ${currentuser.access_token}`
           }
            })
            .then(res=>{
                message.success("Pitch created successfully.",5)
                setPitchCategoryID('')
                setPitchValue('')
                setLoading(false)
                // console.log(res.data)
        })
            .catch(err=>{

                if (err.response?.status===500){
                    message.error("Looks like your pitch is too long!",5)
                }
                else{

                    message.error(err.response.data.description,10)
                }
                setLoading(false)
        })
    }

    const createCategory=()=> {
        if (categories.filter(data=>data.name.toLowerCase() ===newCategory.toLowerCase()).length>0){
           return  message.error("The category you are trying to create already exists",5)
        }
        setLoading(true)
        Axios.post(
            apiUrls.category.create,
            {
            name:newCategory.charAt(0).toUpperCase()+newCategory.slice(1).toLowerCase()
        },
            {
                headers: {
                    ...axiosHeader,
                    Authorization: `Bearer ${currentuser.access_token}`
                }
            })
            .then(res=>{
                setLoading(false)
                getCategories()
            return message.success("Category created successfully!",5)

        })
            .catch(err=>{
                setLoading(false)
                return  message.error(err.response.data.description,5)
        })
    }

    return (
        <Spin spinning={loading}>
            <div className="card">
                <div className="card-body">
                    <p>Category:</p>
                    <Select
                        style={{ width: 240 }}
                        placeholder="Select Category"
                        dropdownRender={menu => (
                            <div>
                                {menu}
                                <Divider style={{ margin: '4px 0' }} />
                                <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                    <Input placeholder={"New category"} style={{ flex: 'auto' }} value={newCategory} onChange={({target:{value}})=>setNewCategory(value)} />
                                    {newCategory&& newCategory.length>2 &&
                                    <Button
                                        type={"link"}
                                        style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                        onClick={createCategory}
                                    >
                                        <PlusOutlined /> Add item
                                    </Button>}
                                </div>
                            </div>
                        )}
                        onChange={setPitchCategoryID}
                    >
                        {categories && categories.map(item => (
                            <Option key={item.id} value={item.id}>{item.name}</Option>
                        ))}
                    </Select>
                    <p className={'pt-4'}>Pitch:</p>
                    <ReactQuill className={'my-4'}  style={{backgroundColor:'white',height:"100px"}} theme={'snow'} value={pitchValue} onChange={setPitchValue}/>

                </div>
                <div className="card-footer">

                    <Button onClick={submitForm} className={'float-right'}>Submit</Button>

                </div>
            </div>

        </Spin>
    )
}
export default  PitchCreate
