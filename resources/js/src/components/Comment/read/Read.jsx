import React from 'react'
import {Comment,Avatar} from "antd";
import apiUrls from "../../environment";

const PitchCommentView =({comment})=>{
    return (
        <div>
            {comment && <Comment
                actions={[<span key="comment-nested-reply-to">Reply to</span>]}
                author={comment.author.name}
                avatar={
                    <Avatar
                        src={apiUrls.profile_picture.read+comment.author?.profile_picture?.id}
                        alt={comment.author.name}
                    />
                }
                content={comment.content}
            >
            </Comment>}

        </div>

    )
}
export default  PitchCommentView
