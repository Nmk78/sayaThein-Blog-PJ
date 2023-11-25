'use client';

import React, { useState, useEffect } from 'react';
import Create from '@components/create';

const Page = () => {
  const [post, setPost] = useState({});
  let id;

  if (typeof window !== 'undefined') {
    id = window.location.pathname.split('/').pop();
  }

  const fetchPost = async () => {
    try {
      const res = await fetch(`http://localhost:4000/posts/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json(); 
      setPost(data.post); 

    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []); 


  return (
    <>
      <Create mode="edit" post={post} />
    </>
  );
};

export default Page;
