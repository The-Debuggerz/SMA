import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../NavBar/Navbar";

const HomePage = () => {
  const [posts, setPost] = useState([]);
  useEffect(() => {
    fetch("https://localhost:5000/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .then((data) => {
        setPost((s) => [...s, ...data]);
      });
  }, []);
  console.log(posts);
  return (
//     <div>
//      
//  <div>
//   <span className="text-xl">Posts</span>
//         <div>
//           {posts.map((post, i) => {
//             return (
//               <div key={i}>
//                 <h3>{post.name}</h3>
//                 <p>{post.content}</p>
//                 <div>{post.created.day}</div>
//                 <div>{post.created.month}</div>
//                 <div>{post.created.date}</div>
//                 <div>{post.created.time}</div>
//               </div>
//             );
//           })}
//         </div>
//         </div>
//     </div>
<>
<Navbar/>
<div className="grid place-items-center h-screen w-screen">
  <h1 className="font-bold text-5xl">
    Welcome To <b className="text-yellow-300">The Debuggers</b>
  </h1>
  <div>
    <span className="text-xl">Posts</span>
  </div>
  <div className="ui items">
    {posts.map((post, i) => {
      return (
        <div className="item">
          <a className="ui tiny image">
            <img src={"https://picsum.photos/200/300?random=" + i} />
          </a>
          <div className="content">
            <a className="header">{post.title}</a>
            <div className="description">
              <p>{post.content}</p>
            </div>
            <div className="meta">
              <span className="cinema">
                At {post.createdAt} by
                <a className="font-bold"> {post.author}</a>
              </span>
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>
</>

  );
};

export default HomePage;
