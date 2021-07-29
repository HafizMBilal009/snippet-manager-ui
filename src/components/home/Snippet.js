import { request } from 'axios';
import React from 'react';
import domain from '../../domain/domain';
import './Snippet.scss';
const Snippet = ({
  snippet: { _id, title, description, code },
  getSnippets,
  editorTitle,
  setEditorTitle,
  editorDescription,
  setEditorDescription,
  editorCode,
  setEditorCode,
  setIsEditorOpen,
  setSaveSnippetType,
  setSnippetId,
}) => {
  const deleteSnippet = () => {
    request({
      url: `${domain}/snippet/${_id}`,
      method: 'DELETE',
    }).then(() => {
      getSnippets();
    });
  };
  const populateData = () => {
    setSaveSnippetType('update');
    setIsEditorOpen(true);
    setSnippetId(_id);
    setEditorTitle(title);
    setEditorDescription(description);
    setEditorCode(code);
  };
  return (
    <div className='snippet'>
      <h2 className='title'>{title}</h2>
      <p className='description'>{description}</p>
      <pre className='code'>
        <code>{code}</code>
      </pre>
      <button onClick={populateData} className='edit-btn'>
        Edit
      </button>
      <button onClick={deleteSnippet} className='delete-btn'>
        Delete
      </button>
    </div>
  );
};

export default Snippet;
