import React, { useState, useEffect } from 'react';
import MatchCard from '../components/MatchCard.jsx';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

function MatchSchedule() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const response = await fetch('http://localhost:7000/app/admin/matchlist', {
          credentials: 'include',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}. Please log in or register to access this content.`);
        }

        const result = await response.json();
        console.log('Fetched data:', result);

        if (Array.isArray(result.data)) {
          setMatches(result.data);
          setError(null);
        } else {
          throw new Error('Fetched data is not in the expected format.');
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
        setError(error.message);
        setModalIsOpen(true);
        setMatches([]);
      }
    }

    fetchMatches();
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="header flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="logo">
          <h1 className="text-3xl font-bold">DHEKHO</h1>
        </div>
      </div>

      <div className="flex-grow">
        <div className="container mx-auto p-4">
          {error ? (
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Error"
              className="modal"
              overlayClassName="overlay"
              style={{
                content: {
                  position:'absolute',
                  top: '250px',
                  left: '700px',
                  // right: '',
                  // bottom: 'auto',
                  marginRight: '-50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80%',
                  maxWidth: '500px',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                },
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                }
              }}
            >
              <div className="text-center p-4">
                <h2 className="text-2xl font-bold mb-4">Error</h2>
                <p>{error}</p>
                <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                  Close
                </button>
              </div>
            </Modal>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matches.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-4 text-center">
        <p>&copy; {new Date().getFullYear()} DHEKHO. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default MatchSchedule;
