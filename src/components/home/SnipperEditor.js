import React, { useState } from 'react';
import { request } from 'axios';
import './SnippetEditor.scss';
import ErrorMessage from '../misc/ErrorMessage';
const SnipperEditor = ({
  getSnippets,
  setIsEditorOpen,
  snippetId,
  editorTitle,
  setEditorTitle,
  editorDescription,
  setEditorDescription,
  editorCode,
  setEditorCode,
  saveSnippetType,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const saveSnippet = (e) => {
    e.preventDefault();
    const snippet = {
      title: editorTitle,
      description: editorDescription,
      code: editorCode,
    };
    if (saveSnippetType === 'add') {
      request({
        method: 'POST',
        url: 'http://localhost:5000/snippet',
        data: snippet,
      })
        .then(() => {
          getSnippets();
          closeEditor();
        })
        .catch(
          ({
            response: {
              data: { errorMessage },
            },
          }) => {
            setErrorMessage(errorMessage);
          }
        );
    } else {
      request({
        method: 'PUT',
        url: `http://localhost:5000/snippet/${snippetId}`,
        data: snippet,
      })
        .then(() => {
          getSnippets();
          closeEditor();
        })
        .catch(
          ({
            response: {
              data: { errorMessage },
            },
          }) => {
            setErrorMessage(errorMessage);
          }
        );
    }
  };
  const closeEditor = () => {
    setIsEditorOpen(false);
    setEditorTitle('');
    setEditorDescription('');
    setEditorCode('');
  };
  return (
    <div className='snippet-editor'>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
      <form className='form'>
        <label htmlFor='editor-title'>Title</label>
        <input
          id='editor-title'
          type='text'
          value={editorTitle}
          onChange={(e) => setEditorTitle(e.target.value)}
        />
        <label htmlFor='editor-description'>Description</label>
        <input
          id='editor-description'
          type='text'
          value={editorDescription}
          onChange={(e) => setEditorDescription(e.target.value)}
        />
        <label htmlFor='editor-code'>Code</label>
        <textarea
          id='editor-code'
          value={editorCode}
          onChange={(e) => setEditorCode(e.target.value)}
        />
        <button type='submit' className='btn-save' onClick={saveSnippet}>
          Save
        </button>
        <button className='btn-cancel' onClick={() => closeEditor()}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default SnipperEditor;
