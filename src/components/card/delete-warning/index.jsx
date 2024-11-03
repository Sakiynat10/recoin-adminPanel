import React from 'react'
import "./style.scss"
import { Button, Flex } from 'antd';
import request from '../../../server/request';
import Cookies from 'js-cookie';
import { TOKEN } from '../../../constants';

const DeleteWarning = ({id , onEvent , closeDeleteModal , text}) => {
    const token = Cookies.get(TOKEN)
    const deleteModalProduct = async() => {
        await request.delete(`admin/product/${id}/remove` , {
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        onEvent();
        closeDeleteModal();
    }

    const cancelModal = () => {
        closeDeleteModal();
    }

  return (
    <div className='delete-screen' >
      <div className="delete-modal">
        <h2>Do you want to delete this {text} ? </h2>
        <Flex gap={10}>
            <Button type="primary"  onClick={cancelModal} >No</Button>
            <Button type='primary' danger onClick={deleteModalProduct}>Yes</Button>
        </Flex>
      </div>
    </div>
  )
}

export default DeleteWarning;