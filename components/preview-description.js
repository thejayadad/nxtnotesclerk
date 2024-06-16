'use client'
// components/PreviewEditor.js
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.bubble.css';
import React, { useMemo } from 'react';

const PreviewEditor = ({ value }) => {
  const ReactQuill = useMemo(
    () =>
      dynamic(() => import('react-quill'), {
        ssr: false,
      }),
    []
  );

  return (
    <div className="bg-orange-900 text-white p-2 rounded-md">
      {value ? (
        <ReactQuill theme="bubble" value={value} readOnly />
      ) : (
        <p className="text-gray-400">Click to add description</p>
      )}
    </div>
  );
};

export default PreviewEditor;
