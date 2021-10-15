import { useHistory, useParams } from "react-router";
import useFetch from "./useFetch";



const BlogDetails=()=>{
    const {id}=useParams();
    const { error,isPending, data: blog}=useFetch('http://localhost:8000/blogs/' + id);
    const handleDelete=()=>{
        fetch('http://localhost:8000/blogs/' + blog.id,{
            method: 'DELETE'
        })
        .then(()=>{
            hist.push('/')
        })
    }
    const hist=useHistory()
    return(
        <div className="blog-details">
            {isPending && <div> Loading......</div>}
            {error && <div> {error} </div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div>
                    <button onClick={handleDelete}>Delete this Blog</button>
                </article>
            )}
        </div>
    )
}

export default BlogDetails;
