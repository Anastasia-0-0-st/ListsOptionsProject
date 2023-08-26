import React, {useEffect, useMemo, useState} from "react";
import ReactDOM from "react-dom";
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import axios from "axios";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";

function App() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [isPostLoading, setIsPostLoading] = useState(false);

    async function fetchPosts() {
        setIsPostLoading(true);
        setTimeout(async () => {
            const posts = await PostService.getAll();
            setPosts(posts);
            setIsPostLoading(false);
        }, 1000);
    }

    useEffect(() => {
        fetchPosts();
    },[])

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

  return (
    <div className="App">
        <MyButton onClick={fetchPosts}>Get posts</MyButton>
        <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
            Создать пост
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost}  />
        </MyModal>

        <hr style={{margin: '15px 0'}}/>

        <PostFilter
          filter={filter}
          setFilter={setFilter}
        />
        {
            isPostLoading
            ? <div style={{display: "flex", justifyContent: 'center', marginTop: 50}}> <Loader /> </div>
            : <PostList posts={sortedAndSearchedPosts} remove={removePost} title="Посты про ЯП"/>
        }
    </div>
  );
}

export default App;
