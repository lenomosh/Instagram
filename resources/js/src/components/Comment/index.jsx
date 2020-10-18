import React, {useState} from 'react'
import PitchCommentView from "./read/Read";
import PitchCommentCreate from "./create/Create";

const PitchCommentIndex = ({comments, pitchID})=>{
    const [allComments, setAllComments] = useState([...comments]);
    return (
        <div className={'px-4'}>
            {allComments && allComments.map(comment =>
                <PitchCommentView key={comment.id} comment={comment}/>
            )}
            <PitchCommentCreate onFinishedCreating={newComment=>setAllComments([...comments,newComment])} pitchID={pitchID}/>
        </div>
    )
}
export default PitchCommentIndex
