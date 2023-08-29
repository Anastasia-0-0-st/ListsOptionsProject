import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostIdPages = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(params.id);
        setPost(response.data);
    });

    const [fetchComments, isCommentsLoading, errorComments] = useFetching(async (id) => {
        const response = await PostService.getCommentsById(params.id);
        setComments(response.data);
    })

    useEffect(
        () => {
            fetchPostById(params.id);
            fetchComments(params.id);
        }
    ,[]);

    return (
        <div>
            {
                isLoading
                    ? <Loader />
                    : <h1>{post.id}. {post.title} </h1>
            }
            <h1>Комментарии</h1>
            {
                isCommentsLoading
                    ? <Loader />
                    : <div>
                        {
                            comments.map(comm =>
                                <div key={comm.id} style={{marginTop: 30}}>
                                    <h3>{comm.email}</h3>
                                    <p>{comm.body}</p>
                                </div>
                            )
                        }
                    </div>
            }
        </div>
    );
};

export default PostIdPages;