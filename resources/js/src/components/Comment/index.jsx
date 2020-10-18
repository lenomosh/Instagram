import React, {useState} from 'react'
import PostCommentView from "./read/Read";
import PostCommentCreate from "./create/Create";

const PostCommentIndex = ({comments, postID})=>{
    const [allComments, setAllComments] = useState([...comments]);
    return (
        <div className={'px-4'}>
            {allComments && allComments.map(comment =>
                <PostCommentView key={comment.id} comment={comment}/>
            )}
            <PostCommentCreate onFinishedCreating={newComment=>setAllComments([...comments,newComment])} postID={postID}/>
        </div>
    )
}
export default PostCommentIndex
