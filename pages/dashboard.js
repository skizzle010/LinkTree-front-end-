import React, { useEffect, useState ,useContext} from "react";
import LinkBox from "../components/LinkBox";
import UserHeader from "../components/UserHeader";
import { toast } from "react-toastify";
import UserContext from "../context/userContext";

const dashboard = () => {

  const[data,setData] = useState({})
  const {setUserData} = useContext(UserContext);
  useEffect(()=>{
    if(!localStorage.getItem("LinkTreeToken"))return window.location.href ="/login";
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/data/dashboard`,{
      method: 'POST',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify({
        tokenMail : localStorage.getItem('LinkTreeToken')
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.status==='error') return toast.error("Error happened")
      setData(data.userData);
      setUserData(data.userData); 
      localStorage.setItem('userHandle',data.userData.handle)
      toast.success(data.message)
    }).catch(err=>{
      console.log(err)
    })
  },[])
  return (
    <>
      <div className="">
        <UserHeader data={data} />
        <span className="header"></span>
        <main>
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-5  "> 
            <LinkBox lbTitle="Links" lbNumber={data.links} lbSvg="links.svg" lbTheme="red"/>
            <LinkBox lbTitle="Growth" lbNumber="30%" lbSvg="report.svg" lbTheme="blue"/>
            <LinkBox lbTitle="Social Handle" lbNumber="instagram.in/handle" lbSvg="links.svg" lbTheme="red"/>
            <LinkBox lbTitle="Analytics" lbNumber="Data" lbSvg="report.svg" lbTheme="blue"/>
          </section>
          
          <section></section>
        </main>
      </div>
    </>
  );
};

export default dashboard;
