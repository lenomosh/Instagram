import React, {useState} from 'react'
import PostCommentCreate from "./create/Create";
import PostCommentRead from "./read/Read";

const PostCommentIndex = ()=>{
    return (
        <div className={'px-4'}>
            <PostCommentRead />
            {/*<PostCommentCreate onFinishedCreating={newComment=>setAllComments([...comments,newComment])} postID={postID}/>*/}
        </div>
    )
}
export default PostCommentIndex
