import React, {useState} from 'react'
import PostCommentCreate from "./create/Create";
import PostCommentRead from "./read/Read";
import List from "antd/es/list";

const PostCommentIndex = ({comments})=>{
    return (
        <div className={'px-4'}>
            <List
                itemLayout="horizontal"
                dataSource={comments}
                header={comments && `${comments.length} ${comments.length>1? 'comments':'comment'}`}
                renderItem={item => (
                    <List.Item>
                        <PostCommentRead comment={item} />

                    </List.Item>
                )}
            />
            {/*<PostCommentCreate onFinishedCreating={newComment=>setAllComments([...comments,newComment])} postID={postID}/>*/}
        </div>
    )
}
export default PostCommentIndex
