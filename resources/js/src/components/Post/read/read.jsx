import React, {useState} from 'react'
import {Avatar} from "antd";
import {
    CommentOutlined,
    DislikeOutlined,
    EllipsisOutlined,
    HeartOutlined,
    HeartFilled,
    MessageOutlined,
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
import {Link} from "react-router-dom";
import Paragraph from "antd/lib/typography/Paragraph";
import PostCommentCreate from "../../Comment/create/Create";

const PostRead = () => {
    const [hideLikeHeart, setHideLikeHeart] = useState(true);
    const [user_has_liked, setUser_has_liked] = useState(false);
    const [likeCount, setLikeCount] = useState(20);


    const likePost =()=>{
        setHideLikeHeart(false)
        if (!user_has_liked) {
            setLikeCount(likeCount + 1)
            setUser_has_liked(true)
        }
        setTimeout(()=>{
            setHideLikeHeart(true)
        },1000)

    }
    const unlikepost = ()=>{
        setUser_has_liked(false)
        setLikeCount(likeCount-1)
    }
    return (
        <div className={'PostRead'}>
            <div className="card">
                <div className="card-body">
                    <div className="post-read-card-header">
                        <Avatar className={"post-read-card-header-avatar"}/>
                        <span>
                            <a className={"post-read-username"} href="#">_lennoxomondi</a>
                        </span>
                        <span className="post-read-options">
                            <EllipsisOutlined className={"post-read-options-icon"}/>
                        </span>
                    </div>
                    <div onDoubleClick={likePost} className="post-read-media-content">
                        <HeartFilled hidden={hideLikeHeart} className={"post-read-double-tap-icon"} />


                    </div>
                    <div className="post-read-insight">
                        <div className="post-read-actions">

                            {user_has_liked?
                                <HeartFilled style={{color:"red"}} onClick={unlikepost} className={"post-read-action-icon"}/>:
                                <HeartOutlined  onClick={likePost} className={"post-read-action-icon"}/>

                            }
                            <MessageOutlined className={"post-read-action-icon"}/>
                            <SendOutlined className={"post-read-action-icon"}/>
                        </div>
                        <div className="post-read-likes-count">
                            {likeCount} likes
                        </div>
                        <div className="post-read-caption">
                            <Paragraph
                                ellipsis={{
                                    rows:1,
                                    expandable: true,
                                    onEllipsis: ellipsis => {
                                        console.log('Ellipsis changed:', ellipsis);
                                    },
                                }}
                            >
                                <span className={"post-read-caption-author"}>_lennoxomondi: </span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam corporis dolor est et explicabo illo impedit itaque iure laudantium magni nostrum possimus, quasi, quidem quisquam quo reprehenderit voluptates. Deleniti.
                            </Paragraph>
                        </div>
                        <div className="post-read-comments">
                            <PostCommentIndex/>
                            <PostCommentIndex/>
                            <PostCommentCreate/>


                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}
export default PostRead
