import React, { useState } from "react";
import './App.css';
const UserLogin = () => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
    });
    const [tableData, setTableData] = useState([]);
    const [editClick, setEditClick] = useState(false);
    const [editIndex, setEditIndex] = useState("");
    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("inputs", inputs);
        if (editClick) {
            const tempTableData = tableData;
            Object.assign(tempTableData[editIndex], inputs); setTableData([...tempTableData]);
            setEditClick(false);
            setInputs({
                name: "",
                email: "",
            });
        }
        else {
        setTableData([...tableData, inputs]);
        setInputs({
            name:"",
            email:"",
        });
        }
    };
    const handleDelete = (index) => {
        const filterData = tableData.filter((item, i) => i != index);
        setTableData(filterData);
    };
    const handleEdit = (index) => {
        const tempData = tableData[index];
        setInputs({ name: tempData.name, email: tempData.email });
        setEditClick(true);
        setEditIndex(index);
    };
    return (
        <div className="user-data-main">
            <h2>User Login</h2>
            <div className="user-form">
                <form onSubmit={handleSubmit}>
                    <div className="user-form-inner">
                        <label>Name</label>
                        <input name="name" value={inputs.name} onChange={handleChange} required/>
                    </div>
                    <div className="user-form-inner">
                        <label>Email</label>
                        <input name="email" value={inputs.email} onChange={handleChange} required />
                    </div>
                    <div className="user-form-inner">
                    <label></label>
                      <button type="submit" className="btn edit">{editClick ? "Update" : "Add"}</button>
                    </div>
                </form>
            </div>
            <div>
                <table className="user-table" border="1">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((item, i) => (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>
                                    <button onClick={() => handleEdit(i)} className="btn edit">Edit</button>
                                    <button onClick={() => handleDelete(i)} className="btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default UserLogin;