import React from 'react'
import {useRef,useState, useEffect} from 'react';
import{ToastContainer, toast} from 'react-toastify';
import {v4 as uuidv4} from 'uuid';

const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({site:"",username:"",password:""})
  const [passwordArray , setPasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if(passwords){
      setPasswordArray(JSON.parse(passwords))
    }
  },[])

  const showPassword = () =>{
    passwordRef.current.type = "text"
    console.log(ref.current.src)
    if(ref.current.src.includes("icons/hide.png")){
      ref.current.src = "icons/eye.png"
       passwordRef.current.type = "password"
    }
    else{
      ref.current.src = "icons/hide.png"
       passwordRef.current.type = "text"
    }
    
  }

  const copyText = (text) =>{
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      
      });
      navigator.clipboard.writeText(text)
  }

  const savePassword = () =>{
    setPasswordArray([...passwordArray,{...form, id: uuidv4()}])
    localStorage.setItem("passwords",JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
    console.log([...passwordArray, form])
    setform({site:"", username:"", password:""})
  }

  const deletePassword = (id) =>{
   console.log("Deleting password with id", id)
   setPasswordArray(passwordArray.filter(item=>item.id!==id))
   localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
  }

  const editPassword = (id) =>{
    console.log("edit password with id", id)
    setform(passwordArray.filter(i=>i.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
   }

  const handleChange = (e) =>{
    setform({...form,[e.target.name]: e.target.value})
  }

  return (
    <>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition= "Bounce"
/>
{/* Same as */}
<ToastContainer />
<div className="bg-green-200">
   <div className='md:mycontainer p-2 min-h-[82.3vh]'>
        <h1 className='text-2xl text font-bold text-center'>
        <span className='text-green-500'> &lt;</span>
            <span>Pass</span>
            <span className='text-green-500'>OP/&gt;</span>
        </h1>
        <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

      <div className="flex flex-col p-4 text-black gap-3 items-center ">
        <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type='text' name="site" id="site" />
      <div className='flex flex-col md:flex-row w-full justify-between gap-3'>
           <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1'  type="text" name="username" id="username" />
       <div className='relative'>
            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1'  type="password" name="password" id="password" />
            <span className='absolute right-[10px] top-[5px] cursor-pointer text-xs' onClick={showPassword}>
                 <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye"/>
            </span>
        </div>
        </div>
        <button onClick={savePassword} className="flex justify-center item-center bg-green-400
        hover:bg-green-300 rounded-full gap-2 px-6 py-2 w-fit border-green-800 border">
        <lord-icon
        src="https://cdn.lordicon.com/jgnvfzqg.json"
        trigger="hover">
        </lord-icon>
        Save Password</button>
      </div>
      <div className="passwords">
        <h2 className="font-bold text-xl py-2">Your Passwords</h2>
        {passwordArray.length === 0 && <div> No passwords to show </div>}
        {passwordArray.lenght !=0 &&
        <tables>
          

<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right rounded-md overflow-hidden">
        <thead className="text-xs text-black uppercase bg-green-500">
            <tr>
                <th  className=" py-2">
                    Site
                </th>
                <th  className="py-2">
                    Username
                </th>
                <th className=" py-2">
                    Password
                </th>
                <th className=" py-2">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody className='bg-green-300'>
          {passwordArray.map((item , index)=>{
               return <tr key={index}>
                <td className=" py-2  border border-white text-center w-32">
                <div className='flex items-center justify-center'> 
                    {item.site}
                    <div className="w-4  cursor-pointer "onClick={()=>{copyText(item.site)}}>
                    <img src="/icons/copy.png"></img>
                    </div>
                  </div>
                </td>
                <td className=" py-2 border border-white text-center w-32">
                <div className='flex items-center justify-center'> 
                    {item.username}
                    <div className="w-4  cursor-pointer "onClick={()=>{copyText(item.username)}}>
                      <img src="/icons/copy.png"></img>
                      </div>
                  </div>
                </td>
                <td className="py-2 border border-white text-center w-32">
                <div className=' flex items-center justify-center'>  
                    {item.password}
                    <div className="w-4  cursor-pointer "onClick={()=>{copyText(item.password)}} >
                      <img src="/icons/copy.png"></img>
                      </div>
                </div>
                </td>
                <td className="py-2 border border-white text-center w-32">
                <div className=' flex items-center justify-center'>  
                  <span className="cursor-pointer mx-1" onClick={()=>{editPassword(item.id)}}>
                 <img className="w-6"src="/icons/edit.png"></img>  
                 </span>
                 <span className="cursor-pointer mx-1" onClick={()=>{deletePassword(item.id)}}>
                <lord-icon
                  src="https://cdn.lordicon.com/skkahier.json"
                  trigger="hover"
                  style={{"width":"25px","height":"25px"}}>
                </lord-icon>
                </span>
                </div>
                </td>
            </tr>
            })}
            </tbody>
    </table>
</div>

        </tables>}
      </div>
      </div>
      </div>
    </>
  )
}

   

export default Manager
