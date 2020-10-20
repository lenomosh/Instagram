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
const PostCreate =()=>{
    const currentuser = useSelector(state=>state.user.currentUser)
    const [postValue, setPostValue] = useState('');
    const [categories, setCategories] = useState(null);
    const [postCategoryID, setPostCategoryID] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [loading, setLoading] = useState(false);
    // useEffect(() => {
    //     if (!categories){
    //         getCategories()
    //     }
    //
    // }, );

    const submitForm = ()=>{
        if (!postCategoryID){
            return message.warn("Select category to which the post should belong!",6)
        }
        if (!postValue){
            return message.info("You really want to submit a blank post? Wow",6)
        }
        // console.log(postValue.length)
        // console.log(postValue)
        if (postValue.length<9){
            return message.warn("Seriously, your post is too short. :XD",5)
        }
        setLoading(true)
        Axios.post(apiUrls.post.create
        ,{
                content:postValue,
                user_id:currentuser.user.id,
                category_id:postCategoryID
            },
            {
           headers: {
               ...axiosHeader,
               Authorization: `Bearer ${currentuser.access_token}`
           }
            })
            .then(res=>{
                message.success("Post created successfully.",5)
                setPostCategoryID('')
                setPostValue('')
                setLoading(false)
                // console.log(res.data)
        })
            .catch(err=>{

                if (err.response?.status===500){
                    message.error("Looks like your post is too long!",5)
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
                        onChange={setPostCategoryID}
                    >
                        {categories && categories.map(item => (
                            <Option key={item.id} value={item.id}>{item.name}</Option>
                        ))}
                    </Select>
                    <p className={'pt-4'}>Post:</p>
                    <ReactQuill className={'my-4'}  style={{backgroundColor:'white',height:"100px"}} theme={'snow'} value={postValue} onChange={setPostValue}/>

                </div>
                <div className="card-footer">

                    <Button onClick={submitForm} className={'float-right'}>Submit</Button>

                </div>
            </div>

        </Spin>
    )
}
export default  PostCreate
