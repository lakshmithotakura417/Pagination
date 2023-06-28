import React,{useState,useEffect} from 'react'
import axios from 'axios'
function DisplayData() {
    const [comments,setComments]=useState([]);
    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/comments")
        .then(response=>setComments(response.data))
        .catch((err)=>console.log(err))
    },[])
    const [commentsPerPage,setTododsPerPage]=useState(10);
    const[currentPage,setCurrentPage]=useState(1);
    const totalPages=Math.ceil(comments.length/commentsPerPage);
    const pages=[...Array(totalPages+1).keys()].slice(1)
    const indexOfLastPage=currentPage*commentsPerPage;
    const indexOfFirstPage=indexOfLastPage-commentsPerPage;
   const visibleComments=comments.slice(indexOfFirstPage,indexOfLastPage)
  return (
    <>
       <table className="table table-light table-hover bg-dark-subtle">
            <thead>
                <tr>
                <th>ID</th>
                <th >Name</th>
                <th >Email</th>
                <th >Body</th>
                </tr>
            </thead>
            <tbody>
                {visibleComments.map((comment)=>{
                    return <tr key={comment.id}>
                    <th >{comment.id}</th>
                    <td>{comment.name}</td>
                    <td>{comment.email}</td>
                    <td>{comment.body}</td>
                    </tr>
                })}
                
                
            </tbody>
        </table>
        {/* selecting pages */}
        <div>
            <span onClick={()=>setCurrentPage(currentPage-1)}>prev..</span>
            {pages.map((page)=><span onClick={()=>setCurrentPage(page)}>{page} |</span>)}
            <span onClick={()=>setCurrentPage(currentPage+1)}>next..</span>
        </div>
    </>
  )
}

export default DisplayData
