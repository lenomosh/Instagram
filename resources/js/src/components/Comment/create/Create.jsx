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
        <Form.Item >
            <Input suffix={
                <Button htmlType="submit" disabled={value.length<2} loading={submitting} onClick={onSubmit} type="link">
                    Add Comment
                </Button>
            } onChange={onChange} value={value} size={"large"}/>
        </Form.Item>
    </>
);

class PostCommentCreate extends React.Component {
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
        Axios.post(`${apiUrls.comment.create}`,{
            content:this.state.value,
            post_id:this.props.post_id,
        },{
            headers:{
                Authorization:`Bearer ${this.props.token}`
            }
        }).then(
            res=> {
                message.success("Comment posted successfully!",5)
                this.props.onFinish(res.data)
                this.setState({loading:false})
            }
        ).catch(err=>{
            if (err.response){
                if (err.response.status===422){
                    return err.response.data.errors.map(e=>message.error(e,5))
                }
            }
            message.error(err.response.data.description,5)
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
        const {value,loading } = this.state;
        return (
            <Spin spinning={false}>
                <Comment
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
export default connect(mapStateToProps) (PostCommentCreate)
