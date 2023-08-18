import React, {useState} from "react";
import ReactDOM from "react-dom";
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'JavaScript', body: 'description1'},
        {id: 2, title: 'C++', body: 'description2'},
        {id: 3, title: 'Lua', body: 'description3'},
    ]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const [selectedSort, setSelectedSort] = useState('');
    const sortPosts = (sort) => {
        setSelectedSort(sort);
        setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
    }

  return (
    <div className="App">
        <PostForm create={createPost}  />
        <hr style={{margin: '15px 0'}}/>
        <div>
          <MySelect
              defaultValue='Сортировка'
              option={[
                  {value: 'title', name: 'По названию'},
                  {value: 'body', name: 'По описанию'}
              ]}
              value={selectedSort}
              onChange={sortPosts}
              />
        </div>
        {posts.length
            ?
                <PostList posts={posts} remove={removePost} title="Посты про ЯП"/>
            :
                <h1 style={{textAlign: 'center'}}>
                    Посты не найдены!
                </h1>
        }
    </div>
  );
}

export default App;
