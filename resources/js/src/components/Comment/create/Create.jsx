import React from 'react'
import { Comment, Avatar, Form, Button, Input } from 'antd';
import {message} from "antd/es";
import Axios from "axios";
import apiUrls from "../../environment";
import {connect} from "react-redux";
import Spin from "antd/es/spin";

const { TextArea } = Input;



const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={3} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);

class PitchCommentCreate extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            submitting: false,
            value: '',
            loading:false
        };

    }

    handleSubmit = () => {
        if (!this.state.value) {
            return message.warn("You can not submit a blank comment",5)
        }
        this.setState({loading:true})
        Axios.post(apiUrls.comment.create,{
            content:this.state.value,
            pitch_id:this.props.pitchID,
            user_id:this.props.currentUser.user.id
        },{
            headers:{
                Authorization:`Bearer ${this.props.currentUser.access_token}`
            }
        }).then(
            res=> {
                message.success("Comment posted successfully!",5)
                this.props.onFinishedCreating(res.data)
                this.setState({loading:false})

                // console.log(res.data)
            }
        ).catch(err=>{
            message.error(err.response.data.description,5)
            // console.log(err.response)
            this.setState({loading:true})

        })
        this.setState({
                submitting: false,
                value: '',
            });
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const {submitting, value,loading } = this.state;

        return (
            <Spin spinning={loading}>
                <Comment
                    avatar={
                        <Avatar
                            src={apiUrls.profile_picture.read+this.props.currentUser.user?.profile_picture?.id}
                            alt={this.props.currentUser.user?.name}
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={loading}
                            value={value}
                        />
                    }
                />
            </Spin>
        );
    }
}
const mapStateToProps =({user:{currentUser}})=>({currentUser})
export default connect(mapStateToProps) (PitchCommentCreate)
