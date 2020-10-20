import React from 'react'
import {Comment,Avatar} from "antd";
import apiUrls from "../../environment";

const PostCommentRead =()=>{
    return (
            <Comment
                author={"Jane Doe"}
                content={"Lorem ipsum dolor sit amet"}
            />

    )
}
export default  PostCommentRead
