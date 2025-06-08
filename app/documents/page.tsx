// app/documents/page.tsx
'use client'
import React, { useState } from 'react';

const DocumentRepository = () => {
  const [documents, setDocuments] = useState<File[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments([...documents, ...Array.from(e.target.files)]);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Document Repository</h2>
      <input type="file" multiple onChange={handleUpload} />
      <ul className="mt-4">
        {documents.map((doc, i) => (
          <li key={i} className="mt-2">{doc.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentRepository;
