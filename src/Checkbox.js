import { useState } from "react"
export const Checkbox = ({ isChecked, label, checkHandler, index, deleteHandler,submitHandler }) => {
    const [updata, setUpdata] = useState(false);
    const [newupdate, setNewupdate] = useState(label);


    const submitUpdate =()=>{
        setUpdata(!updata);
        console.log(updata);
      
    }
    return (
      <div>
        {updata ? "":<><input
          type="checkbox"
          id={`checkbox-${index}`}
          checked={isChecked}
          onChange={checkHandler}
        />
        <label htmlFor={`checkbox-${index}`}>{label}</label></>}
        

        {isChecked ?<> 
         
        {updata ? <>
          <form>
        <input type='text' value = {newupdate} onChange={(event)=>setNewupdate(event.target.value)}/>
        <button type="submit" onClick={()=>submitHandler(newupdate)} >Submit</button>
        <button type="reset" onClick={()=>setUpdata(!updata)} >Reset</button>
        

      </form>
      </>: <><button type="button" onClick={deleteHandler} >Delete</button>
      <button type="button" onClick={submitUpdate} value={updata}>Update</button>
      </>}
        
        </> : null}
      </div>
    )
  }