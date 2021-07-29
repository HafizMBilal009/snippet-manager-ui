import { request } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import SnipperEditor from './SnipperEditor';
import Snippet from './Snippet';
import './Home.scss';
import UserContext from '../../context/UserContext';
import { Link } from 'react-router-dom';
const Home = () => {
  const [snippets, setSnippets] = useState([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [snippetId, setSnippetId] = useState(null);
  const [editorTitle, setEditorTitle] = useState('');
  const [editorDescription, setEditorDescription] = useState('');
  const [editorCode, setEditorCode] = useState('');
  const [saveSnippetType, setSaveSnippetType] = useState('add');

  const { user } = useContext(UserContext);
  const getSnippets = () =>
    request({
      method: 'GET',
      url: 'http://localhost:5000/snippet',
    }).then(({ data }) => setSnippets(data));

  const renderSnippets = () => {
    let sortedSnippets = [...snippets];
    sortedSnippets = sortedSnippets.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return sortedSnippets?.map((snippet, i) => (
      <Snippet
        snippet={snippet}
        key={i}
        getSnippets={getSnippets}
        editorTitle={editorTitle}
        setEditorTitle={setEditorTitle}
        editorDescription={editorDescription}
        setEditorDescription={setEditorDescription}
        editorCode={editorCode}
        setEditorCode={setEditorCode}
        setIsEditorOpen={setIsEditorOpen}
        setSaveSnippetType={setSaveSnippetType}
        setSnippetId={setSnippetId}
      />
    ));
  };

  useEffect(() => {
    if (!user) setSnippets([]);
    else getSnippets();
  }, [user]);
  return (
    <div className='home'>
      {!isEditorOpen && user && (
        <button
          className='btn-editot-toggle'
          onClick={() => setIsEditorOpen(true)}
        >
          Add Snippet
        </button>
      )}
      {isEditorOpen && user && (
        <SnipperEditor
          getSnippets={getSnippets}
          setIsEditorOpen={setIsEditorOpen}
          editorTitle={editorTitle}
          setEditorTitle={setEditorTitle}
          editorDescription={editorDescription}
          setEditorDescription={setEditorDescription}
          editorCode={editorCode}
          setEditorCode={setEditorCode}
          saveSnippetType={saveSnippetType}
          snippetId={snippetId}
        />
      )}
      {snippets?.length > 0
        ? renderSnippets()
        : user && (
            <p className='no-snippets'>No snippets have been added yet.</p>
          )}
      {user === null && (
        <div className='no-user-message'>
          <h2>Welcome to Snippet Manager</h2>
          <Link to='/signup'>Register here</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
