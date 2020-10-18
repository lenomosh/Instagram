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
import PostCommentIndex from "../../Comment";
import Moment from "react-moment";
import apiUrls from "../../environment";
import './read.scss'
import {PostAction} from "../Index";
import {message} from "antd/es";
import {useSelector} from "react-redux";

const PostRead = ({post}) =>{
    const {content,author,comments,CREATED_AT,likes,dislikes} = post
    const currentUser = useSelector(state=>state.user.currentUser)
    // console.log(apiUrls.profile_picture.read+author.profile_picture.id)
    const handlePostAction =data=>{
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
        PostAction(input)
    }


    return (
        <div className={'PostRead'}>

            <div className="post-item py-2">
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
                                    <div className="post-author-name">
                                        <a href={`/profile/${author.id}`}>{author.name}</a>
                                    </div>
                                    <div className="post-created-at">
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
                                    onClick={()=>handlePostAction({
                                        user_id:1,
                                        action_type:1,
                                        post_id:post.id
                                    })}
                                    className={'post-action-icon'} />
                                <span className={'post-action-stats'}>{likes}</span>
                            </div>
                            <div className="col-sm-3 align-self-center">
                                <DislikeOutlined onClick={()=>handlePostAction({
                                    user_id:1,
                                    action_type:0,
                                    post_id:post.id
                                })}
                                                 className={'post-action-icon'} />
                                <span className={'post-action-stats'}>{dislikes}</span>
                            </div>
                            <div className="col-sm-3">
                                <CommentOutlined className={'post-action-icon post-action-icon-clicked'}/>
                                <span className={'post-action-stats'}>{comments.length}</span>
                            </div>
                            <div className="col-sm-3 float-right">
                                <SendOutlined className={'post-action-icon float-right'}/>
                            </div>
                        </div>
                    </div>
                    <div className="comments">
                        <PostCommentIndex postID={post.id} comments ={comments}  />
                    </div>
                </div>
            </div>
        </div>
    )

}
export default PostRead
