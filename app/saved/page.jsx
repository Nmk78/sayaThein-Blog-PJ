import Loading from '@components/Loading';
import Post from '@components/Post';
import React from 'react'

const SavedPosts = () => {

  let loading = false;

  if(loading){
      return (<div className="w-full h-full flex flex-col items-center justify-center ">
        <Loading size="2x" />
        <span className="my-4">Loading saved posts...</span>
      </div>)
    }
  
  const posts = [
    {
      id: 1,
      title: "Getting Started with JavaScript",
      content: "In this post, we'll explore the basics of JavaScript programming. JavaScript is a versatile programming language that is commonly used for building interactive and dynamic web applications. We'll cover topics such as variables, data types, functions, and control flow. By the end of this post, you'll have a solid foundation in JavaScript to start creating your own web projects.",
      author: "John Doe",
      date: "2023-08-01"
    },
    {
      id: 2,
      title: "Introduction to Web Development",
      content: "Welcome to our blog's series on web development! In this post, we'll introduce you to the exciting world of web development. We'll discuss the three main components of web development: front-end, back-end, and full-stack. You'll also learn about essential technologies like HTML, CSS, JavaScript, and more. Whether you're a beginner or an experienced developer, this series will provide valuable insights into the art of creating web applications.",
      author: "Jane Smith",
      date: "2023-08-05"
    },
    {
      id: 3,
      title: "CSS Styling Techniques",
      content: "Styling is a crucial aspect of web design, and CSS (Cascading Style Sheets) is the language used to control the visual presentation of web pages. In this post, we'll dive deep into CSS styling techniques. From selecting elements and applying styles to using flexbox and grid layouts for advanced designs, you'll gain the knowledge needed to create visually appealing and responsive websites. Get ready to elevate your web design skills with CSS!",
      author: "Alex Johnson",
      date: "2023-08-10"
    },
    {
      id: 4,
      title: "Node.js: Building Backend Applications",
      content: "Node.js has revolutionized the way we build backend applications. In this post, we'll explore the power of Node.js for creating server-side applications. You'll learn about event-driven architecture, the Node.js runtime environment, and how to build APIs using frameworks like Express.js. Whether you're a JavaScript enthusiast or looking to expand your backend development skills, this post will guide you through the world of Node.js.",
      author: "Michael Brown",
      date: "2023-08-15"
    },
    {
      id: 5,
      title: "Responsive Web Design Principles",
      content: "In today's digital age, responsive web design is a must-have skill for every web developer. As users access websites on various devices, it's essential to create designs that adapt seamlessly to different screen sizes. This post will cover the principles of responsive web design, including media queries, fluid grids, and flexible images. By implementing these techniques, you'll ensure that your web projects look great on desktops, tablets, and smartphones.",
      author: "Emily Davis",
      date: "2023-08-20"
    }
  ];
    return (
      <main className="flex flex-col md:w-2/3 h-screen items-center mx-auto px-4 ">

          {posts.map(({id, title, author, date})=>{
                  return <Post id={id} title = {title} author = {author} date = {date}/>
          })}
          </main>
    );
}

export default SavedPosts