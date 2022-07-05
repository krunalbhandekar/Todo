import React,{useState}from 'react'
import todo from "../images/todo1.jpg"
import { loadData, saveData} from './Localstorage'

const Todo = () => {
    
    const [inputdata, setinputdata] = useState("")
    const [items, setitems] = useState([])

    // for edit 

    const [togglesubmit, settogglesubmit] = useState(true)
    const [edit, setedit] = useState(null)
    
    const additem=()=>{
        if(!inputdata){
            alert("Please Add Todo")
        }
          // for edit 
        else if(inputdata && !togglesubmit){
            setitems(items.map((e)=>{
                if(e.id==edit){
                    return {...e,name:inputdata}
                }
                return e
            }))
            settogglesubmit(true)
            setinputdata("")
            setedit(null)
        }
        // ----
        else{
            const data={
            id:new Date().getTime().toString(),
            name:inputdata
            }
            setitems([...items,data])
            setinputdata("")
        }
    }

    const deleteitem=(id)=>{
        const updateitems=items.filter((e)=>{
            return id!=e.id
        })
        setitems(updateitems)
    }

    const edititem=(id)=>{
        let newedit=items.find((e)=>{
            return e.id == id
        })
        settogglesubmit(false)
        setinputdata(newedit.name)
        setedit(id)
    }

    const removeall=()=>{
        setitems([])
    }

  return (
    
        
            <div className="main">
                <figure>
                    {/* <img src={todo} alt="todologo" width="100px"/> */}
                    <h1>TODO</h1>
                    <figcaption>Add Your List Here</figcaption>
                </figure>
                {/* input and add here */}
                <div className="input">
                    <input type="text"
                     placeholder='Add Items...' 
                     value={inputdata}
                     onChange={(e)=>setinputdata(e.target.value)}
                     style={{width:"80%",border:"none",outline:"none"}}
                     />
                     {
                        togglesubmit ? <button onClick={additem}>+</button> : <button onClick={additem}>edit</button>
                     }
                    
                </div>

                {/* clear all here */}

                    
                <div className="remove">
                    {
                         items.length ?
                        <button onClick={removeall}>Remove All</button> : "Check List"
                    }
                </div>

                {/* show / map here */}
                <div className="mapparent">
                    {
                        items.map((e)=>{
                            return (
                                <div key={e.id}  className="map">
                                    <h3>{e.name}</h3>
                                    <div>
                                    <button onClick={()=>edititem(e.id)}>Edit</button>
                                    <button onClick={()=>deleteitem(e.id)}>Delete</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

               

            </div>
      
    
  )
}

export default Todo