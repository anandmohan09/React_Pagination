import React from 'react';
import {useEffect,useState} from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import './index.css';
import {BsPersonCircle} from 'react-icons/bs'


function Pagination(){
    let url = "http://localhost:4500/students";
    const[myData,setMyData]=useState([]);
    const[currentPage,setCurrentPage]=useState(1);
    const recordsPerPage=7;
    const lastIndex=currentPage*recordsPerPage;
    const firstIndex=lastIndex-recordsPerPage;
    const records=myData.slice(firstIndex,lastIndex);
    const npages=Math.ceil(myData.length/recordsPerPage)
    const numbers=[...Array(npages+1).keys()].slice(1);
    function prePage(event){
        event.preventDefault();
        if(currentPage !== firstIndex ){
          setCurrentPage(currentPage-1)
        }
      }
      
      function changeCPage(i){
    
       setCurrentPage(i);
      }
      
        function nextPage(event){
          event.preventDefault();
          if(currentPage !== lastIndex){
            setCurrentPage(currentPage+1);
      
          }
      
        }

        function getData(){
            axios.get(url)
            .then((res) => {
              setMyData(res.data)
              
            })
            .catch((error) => {
              console.log(error);
            })
            

        }
        
    useEffect(()=>{
        getData();
    },[])
    return (
        <>
        <div className='container' >
            <div style={{display:'flex'}}>
            <BsPersonCircle style={{fontSize:'50px',marginTop:'3px'}}/>
            <h1 style={{marginLeft:'10px'}}>Student Details</h1>
            </div>
        <Table style={{textAlign:'center'}} >
      <thead >
        <tr>
            <th style={{backgroundColor:"green",color:'white'}}>Id</th>
          <th style={{backgroundColor:"green",color:'white'}}>First Name</th>
          <th style={{backgroundColor:"green",color:'white'}}>Last Name</th>
          <th style={{backgroundColor:"green",color:'white'}}>Age</th>
          <th style={{backgroundColor:"green",color:'white'}}>Gender</th>
        </tr>
      </thead>
      {
        records.filter((post)=>{
            return(
                <>
                </>
            )
        })
       .map((post)=>{
            return (
                <>
                <tbody>
           <tr>
          <td>{post.id}</td>
          <td>{post.FirstName}</td>
          <td>{post.LastName}</td>
          <td>{post.Age}</td>
          <td>{post.Gender}</td>
        </tr>
      </tbody>

                </>
            )
        })
      }
      
    </Table>
        </div>
        <div className='container' style={{textAlign:"center"}}>
      <nav style={{textAlign:'center'}}>
        <ul className='pagination' style={{listStyle:'none', display:'flex',padding:'10px 0px'}}>
          <li className='page-item' >
            <a href='/' className='page-link' onClick={prePage}>Prev</a>

          </li>
          {
            numbers.map((n,i)=>{
              return (
                <>
                <li style={{cursor:"pointer"}} className={`page-item ${currentPage === n ? 'active':''}`} key={i}>
                  <div  className='page-link' onClick={()=>{changeCPage(n)}} >{n}</div>
                </li>
               
                </>
              )
              
            })
          }
           <li className='page-item'>
            <a href='/' className='page-link' onClick={nextPage}>Next</a>

          </li>
        </ul>
      </nav>
      </div>

        </>
    )
}

export default Pagination;