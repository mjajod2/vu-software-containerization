import React, { useEffect } from 'react';
import { Space, Table, Button, Modal, Input} from 'antd';
import { useState } from 'react';

function Home ()  {
const [data, setData] = useState([]);
const [isModalVisible, setModalVisible] = useState(false);
const [isDeleteModalVisible, setDeleteVisible] = useState(false);
const [id, setId] = useState("");
const [name, setName] = useState("");

const fetchData = async () => {
    const response = await fetch("http://127.0.0.1:5001/" , {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if(response.ok) {
        const x = await response.json();
        const formattedData = x.map(item => ({
            key: item.id,
            productname: item.productname
          }));
        
        setData(formattedData);
        console.log(data)
    }
}

useEffect(() => {
    fetchData();
},[])


const onIdChange = (e) => {
    setId(e.target.value);
    console.log(e.target.value);
}
const onNameChange = (f) => {
    setName(f.target.value);
}

const handleOK = async() => {
    try {
        const response = await fetch ("http://127.0.0.1:5001/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                name,
            })
        });
        if(response.ok) {
            await fetchData();
            console.log(await response.json());
            setModalVisible(false);
            setId("");
            setName("");
        }
    } catch (error) {
        console.log('doesnt work')
    }
    console.log('ok')
}

const handleDelete = async() => {
    try {
        const response = await fetch ("http://127.0.0.1:5001/delete", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id
            })
        });
        if (response.ok) {
            await fetchData();
            setDeleteVisible(false);
            setId("");
        }
    } catch (error) {
        console.log('fail');
        console.log(error)
    }
}

 return (
        <div style={{display:'flex', flexDirection:'column',width:'20vw', padding:'18vw', marginLeft:'20vw'}}> 
            <div style={{display:'flex', flexDirection:'row', marginBottom:'2vw'}}>
            <Button style={{marginRight: '2vw', marginLeft:'3vw'}} onClick={() => setModalVisible(true)}>Add Item</Button>
            <Button onClick={() => setDeleteVisible(true)}>Delete Item</Button>
            </div>
            <Table dataSource={data}>
            <Table.Column title="ID" dataIndex="key" key="key" />
            <Table.Column title="Product Name" dataIndex="productname" key="productname" />
        </Table>
        <Modal title="Add Item" visible={isModalVisible} onOk={handleOK} onCancel={() => setModalVisible(false)}>
            <label>ID</label>
            <Input onChange={onIdChange}></Input>
            <label>Name</label>
            <Input onChange={onNameChange}></Input>
        </Modal>
        <Modal title="Delete Item" open={isDeleteModalVisible} onOk={handleDelete} onCancel={() => setDeleteVisible(false)}>
            <label>ID</label>
            <Input onChange={onIdChange}></Input>
        </Modal>
        </div>
 );
}
export default Home;