"use client"

import React from "react";
import ContentGeneratorCard from "@/components/custom/ContentGeneratorCard";
import { useState } from "react";

const contentTypes = [
  {value: 'twitter', label: 'Twitter Threads'},
  {value: 'instagram', label: 'Instagram Captions'},
  { value: 'likedin', label: 'LinkedIn Post'}
]

function page() {
  const [contentData, setContentData] = useState({contentType: '', prompt: ''})

  function handleFormSubmition(e){
    e.preventDefault()
    console.log(contentData);
  }

  return (
    <>
    <ContentGeneratorCard 
    setContentData={setContentData} 
    contentData={contentData}
    handleFormSubmition={handleFormSubmition}
    ></ContentGeneratorCard>
    </>
  );
}

export default page;
