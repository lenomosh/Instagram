import React, {useState} from 'react'
import {Avatar} from "antd";
import {
    EllipsisOutlined,
    HeartOutlined,
    HeartFilled,
    MessageOutlined,
    SendOutlined,
} from "@ant-design/icons";
import PostCommentIndex from "../../Comment";
import apiUrls, {axiosHeader, siteUrl} from "../../environment";
import './read.scss'
import {message, Popover} from "antd/es";
import {Link} from "react-router-dom";
import Paragraph from "antd/lib/typography/Paragraph";
import PostCommentCreate from "../../Comment/create/Create";
import Axios from "axios";

const PostRead = ({post,token}) => {
    const [hideLikeHeart, setHideLikeHeart] = useState(true);
    const [user_has_liked, setUser_has_liked] = useState(post.user_has_liked);
    const [likeCount, setLikeCount] = useState(post.likes.length);
    const [comments, setComments] = useState(post.comments);

    const likePost =()=>{
        if (!user_has_liked){
            setHideLikeHeart(false)
            Axios.post(`${apiUrls.like.create}`,{post_id:post.id},{
                headers:{
                    ...axiosHeader,
                    Authorization:`Bearer ${token}`
                }
            }).then(res=>{
                setUser_has_liked(res.data)
            }).catch(err=>{
                if (err.response){
                    if (err.response.status ===409){
                        message.error("Already Liked!",4)
                    }else if (err.response.status === 422){
                        err.response.data.errors.map(e=>message.error(e,4))
                    }else{
                        message.error("Internal Server Error!",5)
                        console.log(err)
                    }
                }

            })
            if (!user_has_liked) {
                setLikeCount(likeCount + 1)
            }
            setTimeout(()=>{
                setHideLikeHeart(true)
            },1000)
        }



    }
    const unlikepost = ()=>{
        if (user_has_liked){
            Axios.delete(`${apiUrls.like.del+post.user_has_liked.id}`,{
                headers:{
                    ...axiosHeader,
                    Authorization:`Bearer ${token}`
                }
            }).then(res=>{
                setUser_has_liked(null)
                setLikeCount(likeCount-1)
            }).catch(err=>{
                console.log(err)

            })
        }

    }
    // console.log("=".repeat(100))
    // console.log("user_has_liked",user_has_liked)
    // console.log("like_count",likeCount)
    // console.log("post_id",post.id)
    // console.log("post url",siteUrl+post.author.profile.profile_picture)
    return (
        <div className={'PostRead'}>
            <div className="card">
                <div className="card-body">
                    <div className="post-read-card-header">
                        <Link  to={`/profile/${post.user_id}`}>

                        {post.author.profile.profile_picture?
                        <Avatar
                            src={`${siteUrl+post.author.profile.profile_picture}`}
                            className={"post-read-card-header-avatar"}/>
                            :null}
                        <span className={"post-read-username"}>
                                {post.author.username}
                        </span>
                        </Link>

                        <span className="post-read-options">
                            <EllipsisOutlined className={"post-read-options-icon"}/>
                        </span>
                    </div>
                    <div style={{backgroundImage:`url(${siteUrl+ post.path})`}} onDoubleClick={likePost} className="post-read-media-content">
                        <HeartFilled hidden={hideLikeHeart} className={"post-read-double-tap-icon"} />


                    </div>
                    <div className="post-read-insight">
                        <div className="post-read-actions">

                            {user_has_liked?
                                <HeartFilled style={{color:"red"}} onClick={unlikepost} className={"post-read-action-icon"}/>:
                                <HeartOutlined  onClick={likePost} className={"post-read-action-icon"}/>

                            }
                            <Popover  placement={"bottom"} content={'Coming Soon'} trigger={"click"}>

                                <MessageOutlined className={"post-read-action-icon"}/>
                            </Popover>

                            <Popover  placement={"bottom"} content={'Coming Soon'} trigger={"click"}>

                                <SendOutlined className={"post-read-action-icon"}/>
                            </Popover>

                        </div>
                        <div className="post-read-likes-count">
                            {`${likeCount} ${likeCount===1?'like':'likes'} `}
                        </div>
                        <div className="post-read-caption">
                            <Paragraph
                                ellipsis={{
                                    rows:1,
                                    expandable: true,
                                    symbol: 'more'
                                }}
                            >
                                <span className={"post-read-caption-author"}>{post.author.username}: </span>{post.caption}</Paragraph>
                        </div>
                        <div className="post-read-comments">
                            {comments.length>0 && <PostCommentIndex comments={comments}/>}
                            <PostCommentCreate onFinish={data=>setComments([data,...comments])} post_id={post.id} token={token}/>


                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}
export default PostRead
