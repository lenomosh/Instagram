import React from 'react'
import { Result, Button } from 'antd';
import HeaderTemplate from "../../components/template/front/header/header";

const PageNotFound = () =>{

    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <Result
                        status="404"
                        title="404"
                        subTitle="Sorry, the page you visited does not exist."
                        extra={<Button href={'/'} type="primary">Back Home</Button>}
                    />

                </div>
            </div>
        </div>
    )
}
export default PageNotFound
