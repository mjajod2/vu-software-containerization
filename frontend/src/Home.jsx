import React, { useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { useState } from 'react';
const { Column, ColumnGroup } = Table;

function Home ()  {
const [data, setData] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        const response = await fetch("http://127.0.0.1:5000/test" , {
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
    fetchData();
},[1])
 return (
        <Table dataSource={data}>
            <Table.Column title="ID" dataIndex="key" key="key" />
            <Table.Column title="Product Name" dataIndex="productname" key="productname" />
        </Table>
 );
}
export default Home;