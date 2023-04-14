import '@ant-design/cssinjs';
import "./App.css";
import { Button, Table, Modal, Input, DatePicker, Form, Dropdown, Tag, Select, Pagination,Radio } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import 'dayjs/locale/zh-cn';
import moment from 'moment';
import Tagg from './Tagg.js';


function App() {
  /////////////////////  creating States///////////////////////
  const sta = ['OPEN', 'WORKING','Done', 'OVERDUE'];
  const [seacrchtext, setsearchtext] = useState("");
  const [inc, setinc] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  ///////////////      Demo Data and State for InputData///////////////////
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      timestamp: moment().format("MMMM D YYYY,h:mm:ss"),
      title: "Task 1",
      description: "Complete the assignment",
      duedate: "29/04/2023",
    },
    {
      id: 2,
      timestamp: moment().format("MMMM D YYYY,h:mm:ss"),
      title: "Task 2",
      description: "Read the Documentation of important concepts",
      duedate: "29/04/2023",
    },
  ]);

  ////////////////////////////  Creating Table Columns /////////////////////////////
  const columns = [
    ////  Coulumn 1
    {
      key: "1",
      title: "Time Stamp",
      dataIndex: "timestamp",
      onFilter: (value, record) => {
        return record.titl
      }
    },
    ////  Coulumn 2
    {
      key: "2",
      title: "Title",
      dataIndex: "title",
      filteredValue: [seacrchtext],
      onFilter: (value, record) => {
        return String(record.title).toLowerCase().includes(value.toLowerCase())
      }
    },
    ////  Coulumn 3
    {
      key: "3",
      title: "Description",
      dataIndex: "description",
    },
    ////  Coulumn 4
    {
      key: "4",
      title: "DueDate",
      dataIndex: "duedate",
    },
    ////  Coulumn 5
    {
      key: "5",
      title: "Tag",
      dataIndex: "tag",
      render: () => {
        return (
          <Tagg></Tagg>
        )
      }

    },
    ///// coulmn 6
    {
      key: "6",
      title: "Status",
      dataIndex: "status",
      render: (record) => {
        return (
          <Select placeholder="Select Status" defaultValue={sta[0]}>
            {sta.map((sta, index) => {
              return <Select.Option key={index} value={sta}> {sta}</Select.Option>
            })}
          </Select>
        )
      }
    },
    ////  Coulumn 7
    {
      key: "7",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <Radio.Button style={{color:"blue",border:"1px solid blue"}}
               onClick={() => {
               onEditTask(record);
              }}
              >
                Add/Edit Task
            </Radio.Button>
            <DeleteOutlined
              onClick={() => {
                onDeleteTask(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  //////////////////////------- Function to Add task in the table when "Add a new Task" button is clicked-------------------------

  const onAddTask = () => {
    setinc(inc + 1);
    const newTask = {
      id: parseInt(Math.random()*1000),
      timestamp: moment().format("D MM YYYY,h:mm:ss"),
      title: "Add New Task",
      description: "Add description",
      duedate: <DatePicker disabled />,
      tag: <Tag closable >Important</Tag>
    };
    setDataSource((pre1) => {
      return [...pre1, newTask];
    });

  };


  /////////////////////---------------------- Function to delete task------------------////////////////////////////////////////////
  const onDeleteTask = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this Task record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre1) => {
          return pre1.filter((Task) => Task.id !== record.id);
        });
      },
    });
  };


  /////////////--------------------- Function to Edit the Task-----------------------------
  const onEditTask = (record) => {
    setIsEditing(true);
    setEditingTask({ ...record });
  };


  const resetEditing = () => {
    setIsEditing(false);
    setEditingTask(null);
  };

  //////////////// -----------------------Return segment------------------------------///////////////////////////////////
  return (
    <div className="App">
        {/* ---------Button for Add Task--------------- */}
        <Button type='primary' onClick={onAddTask} style={{margin:"auto",marginTop:"15px",width:"20vw"}} >Add a new Task</Button>

        {/* ---------Search Bar--------------- */}
        <div>
        <Input.Search placeholder='Search here'
          onSearch={(value) => {
            setsearchtext(value);
          }}
          style={{width:"50vw",marginTop:"25px",marginBottom:"25px",border:"1px solid lightgrey"}}
        />
        </div>

        {/* -------- -------------- Defining Table------------- --------------- */}
        <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 6 }}  style={{borderRadius:"40px"}}></Table>


        {/* --------------------------------------Making a form to give input to the table--------------- */}
        <Form>
          <Modal
            title="Edit Task"
            visible={isEditing}
            okText="Save"
            onCancel={() => {
              resetEditing();
            }}
            
            onOk={() => {
              setDataSource((pre1) => {
                return pre1.map((Task) => {
                  if (Task.id === editingTask.id) {
                    return editingTask;
                  } else {
                    return Task;
                  }
                });
              });
              resetEditing();
            }}
          >
            {/* --------------------------------------Input for Title------------------------------------------- */}
            <Form.Item
              name={"title"}
              label="Title"
              rules={[
                {
                  required: true,
                  message: "mandatory",
                }
              ]}
            >
              <Input
              maxLength={100}
                value={editingTask?.title}
                onChange={(e) => {
                  setEditingTask((pre1) => {
                  if(e.target.value==""){
                    return ({...pre1,title: "Add Title" });
                  }
                  else{
                    return ({...pre1,title: e.target.value });
                  }
                  // return {...pre1,title: e.target.value }
                  });

                }}

               

              />
            </Form.Item>
              {/* --------------------------------------Input for  Description------------------------------------------- */}
            <Form.Item
              name={"description"}
              label="Description"
              rules={[
                {
                  required: true,
                  message: "mandatory",
                }
              ]}
              
            >
              <Input
              maxLength={1000}
              placeholder="Ädd Task"
                value={editingTask?.description}
                value1={editingTask?.title}

                onChange={(e) => {
                  setEditingTask((pre1) => {
                    if(e.target.value==""  || e.target.value1==""){
                      return ({...pre1,description: "Add Description" });
                    }
                    else{
                      return ({...pre1,description: e.target.value });
                    }
                    
                  });
                 

                }}
                
              />
            </Form.Item>
             {/* --------------------------------------Input for Date------------------------------------------- */}
            <Input type='date'
              value={editingTask?.duedate}
              value1={editingTask?.title}
              onChange={(e) => {

                setEditingTask((pre1) => {
                  if(e.target.value=="" || e.target.value1==""){
                    return ({...pre1,duedate: <DatePicker disabled/> });
                  }
                  else{
                    return ({...pre1,duedate: e.target.value });
                  }
                  
                });
              }}
            />

          </Modal>
        </Form>
            
    </div>
  );
}

export default App;
