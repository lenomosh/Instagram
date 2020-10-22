import React from 'react'
import {Comment} from "antd";
import {Link} from "react-router-dom";
import './Read.scss'

const PostCommentRead =({comment})=>{
    return (
            <Comment
                className={"post-comment-read-wrapper"}
                content={<span>
                    <Link to={'/profile/'+comment.author.profile.id}><span style={{fontWeight:"bold",color:"black"}}>{comment.author.name}:  </span>
                    </Link> {comment.content}

                </span>}
            />

    )
}
export default  PostCommentRead
