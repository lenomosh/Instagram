import React from 'react'
import {Avatar} from "antd";
import {
    CommentOutlined,
    DislikeOutlined,
    LikeOutlined,
    MoreOutlined,
    SendOutlined,
    UserOutlined
} from "@ant-design/icons";
import HTMLReactParser from "html-react-parser";
import PitchCommentIndex from "../../Comment";
import Moment from "react-moment";
import apiUrls from "../../environment";
import './read.scss'
import {PitchAction} from "../Index";
import {message} from "antd/es";
import {useSelector} from "react-redux";

const PitchRead = ({pitch}) =>{
    const {content,author,comments,CREATED_AT,likes,dislikes} = pitch
    const currentUser = useSelector(state=>state.user.currentUser)
    // console.log(apiUrls.profile_picture.read+author.profile_picture.id)
    const handlePitchAction =data=>{
       const input ={
           access_token:currentUser.access_token,
            data:data,
            onErrorOccurred:err=>{
               let msg
               if (err.response.data.description){
                   msg = err.response.data.description
               }
               if (err.response.data.msg){
                   msg = err.response.data.msg
               }
                message.error(msg, 5)

            },
            onFinishedSubmit:res=>{
                message.success(data.action_type===1?"Liked":"Disliked", 5)
            },

        }
        PitchAction(input)
    }


    return (
        <div className={'PitchRead'}>

            <div className="pitch-item py-2">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-sm-2 align-self-center">
                                <a href={`/profile/${author.id}`}>

                                    <Avatar
                                        src={apiUrls.profile_picture.read+author.profile_picture?.id}
                                        size="large"
                                        // icon={<UserOutlined />}
                                    />
                                </a>
                            </div>
                            <div className={'col-sm-7 align-self-center'}>
                                <div className="row flex-column">
                                    <div className="pitch-author-name">
                                        <a href={`/profile/${author.id}`}>{author.name}</a>
                                    </div>
                                    <div className="pitch-created-at">
                                        <Moment toNow>{CREATED_AT}</Moment>
                                    </div>

                                </div>

                            </div>
                            <div className="col-sm-3 align-self-center float-right">
                                <MoreOutlined style={{fontSize:'1.5rem',fontWeight:"bolder",cursor:"pointer"}} className={'float-right'}/>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        {HTMLReactParser( content)}
                    </div>
                    <div className="card-footer">
                        <div className="row">
                            <div className="col-sm-3 align-self-center">
                                <LikeOutlined
                                    onClick={()=>handlePitchAction({
                                        user_id:1,
                                        action_type:1,
                                        pitch_id:pitch.id
                                    })}
                                    className={'pitch-action-icon'} />
                                <span className={'pitch-action-stats'}>{likes}</span>
                            </div>
                            <div className="col-sm-3 align-self-center">
                                <DislikeOutlined onClick={()=>handlePitchAction({
                                    user_id:1,
                                    action_type:0,
                                    pitch_id:pitch.id
                                })}
                                                 className={'pitch-action-icon'} />
                                <span className={'pitch-action-stats'}>{dislikes}</span>
                            </div>
                            <div className="col-sm-3">
                                <CommentOutlined className={'pitch-action-icon pitch-action-icon-clicked'}/>
                                <span className={'pitch-action-stats'}>{comments.length}</span>
                            </div>
                            <div className="col-sm-3 float-right">
                                <SendOutlined className={'pitch-action-icon float-right'}/>
                            </div>
                        </div>
                    </div>
                    <div className="comments">
                        <PitchCommentIndex pitchID={pitch.id} comments ={comments}  />
                    </div>
                </div>
            </div>
        </div>
    )

}
export default PitchRead
