
import React, { useState } from 'react';
import { Table, Modal, Input, Button } from 'antd';
import {DeleteOutlined,FormOutlined,PlusCircleOutlined,} from '@ant-design/icons';
const { Search } = Input;
const App = () => {
  const [data, setData] = useState([
    {
      id: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      id: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      id: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
    },
  ]);

  const [search, setSearch] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [newUser, setNewUser] = useState({
    name: '',
    age: '',
    address: '',
  });

  const [elemEdit, setElemEdit] = useState(null);
  const filterData = data.filter((e) =>`${e.name} ${e.age} ${e.address}`.toLowerCase().includes(search.toLowerCase()));

   const handleSubmitAdd = (event) => {
    event.preventDefault();

    const user = {
      id: Date.now(),
      name: newUser.name,
      age: newUser.age,
      address: newUser.address,
    };
    setData((prev) => [...prev, user]);
    setNewUser({
      name: '',
      age: '',
      address: '',
    });
    setOpenAdd(false);
  };
  const handleDelete = (id) => {
    setData((prev) => prev.filter((e) => e.id !== id));
  };
 const handleEdit=(e)=>{
    setOpenEdit(true)
    setElemEdit(e)
  }
  const handleSubmitEdit = (event) => {
    event.preventDefault();
    setData((prev) =>prev.map((e) =>e.id === elemEdit.id ? elemEdit : e));
    setOpenEdit((prev)=>!prev)
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 15 }}>
          <PlusCircleOutlined
            onClick={() => {
              setNewUser({ name: '', age: '', address: '' });
              setOpenAdd(true);
            }}
            style={{
              fontSize: 20,
              cursor: 'pointer',
              color: 'green',
            }}/>
          <FormOutlined
            onClick={() => handleEdit(record)}
            style={{
              fontSize: 20,
              cursor: 'pointer',
              color: 'blue',
            }}/>

          <DeleteOutlined
            onClick={() => handleDelete(record.id)}
            style={{
              fontSize: 20,
              cursor: 'pointer',
              color: 'red',
            }} />
        </div>)}]

  return (
    <div style={{ padding: 20 }}>
      <Search placeholder="Search name, age or address..." allowClear enterButton="Search" size="large"onChange={(e) => setSearch(e.target.value)} onSearch={(value) => setSearch(value)}style={{ width: 350, marginBottom: 20 }}/>
      <Table columns={columns} dataSource={filterData}  rowKey="id" pagination={{ pageSize: 5 }}/>
      <Modal open={openAdd} onCancel={() => setOpenAdd(false)} title="Add User" footer={null}>
        <form onSubmit={handleSubmitAdd} style={{ display: 'grid', gap: 15 }}>
          <Input placeholder="Name" value={newUser.name} onChange={(e) => setNewUser((prev) => ({...prev, name: e.target.value,}))}required/>
          <Input type="number" placeholder="Age" value={newUser.age} onChange={(e) => setNewUser((prev) => ({ ...prev, age: e.target.value, }))}required/>
          <Input placeholder="Address"value={newUser.address} onChange={(e) => setNewUser((prev) => ({...prev, address: e.target.value,}))}required/>
          <Button type="primary" htmlType="submit"> Add User</Button>
        </form>
      </Modal>
      <Modal open={openEdit} onCancel={() => setOpenEdit(false)} title="Edit User"footer={null}>
        <form onSubmit={handleSubmitEdit} style={{ display: 'grid', gap: 15 }}>
          <Input placeholder="Name" value={elemEdit?.name || ''} onChange={(e) => setElemEdit((prev) => ({ ...prev,name: e.target.value,}))} required/>
          <Input type="number" placeholder="Age" value={elemEdit?.age ?? ''}onChange={(e) =>setElemEdit((prev) => ({...prev,age: e.target.value,}))} required/>
          <Input placeholder="Address" value={elemEdit?.address || ''} onChange={(e) => setElemEdit((prev) => ({ ...prev, address: e.target.value, }))}required/>
          <Button type="primary" htmlType="submit">Save</Button>
        </form>
      </Modal>
    </div>
  )};
export default App;
