import React, { useState } from 'react';
import { request } from 'axios';
import './SnippetEditor.scss';
import ErrorMessage from '../misc/ErrorMessage';
import Loader from '../misc/Loader';
import domain from '../../domain/domain';
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
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);

  const saveSnippet = (e) => {
    e.preventDefault();
    setIsLoaderVisible(true);
    const snippet = {
      title: editorTitle,
      description: editorDescription,
      code: editorCode,
    };
    if (saveSnippetType === 'add') {
      request({
        method: 'POST',
        url: `${domain}/snippet`,
        data: snippet,
      })
        .then(() => {
          setIsLoaderVisible(false);
          getSnippets();
          closeEditor();
        })
        .catch(
          ({
            response: {
              data: { errorMessage },
            },
          }) => {
            setIsLoaderVisible(false);
            setErrorMessage(errorMessage);
          }
        );
    } else {
      request({
        method: 'PUT',
        url: `${domain}/snippet/${snippetId}`,
        data: snippet,
      })
        .then(() => {
          setIsLoaderVisible(false);
          getSnippets();
          closeEditor();
        })
        .catch(
          ({
            response: {
              data: { errorMessage },
            },
          }) => {
            setIsLoaderVisible(false);
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
        {isLoaderVisible ? (
          <Loader />
        ) : (
          <>
            <button type='submit' className='btn-save' onClick={saveSnippet}>
              Save
            </button>
            <button className='btn-cancel' onClick={() => closeEditor()}>
              Cancel
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default SnipperEditor;
