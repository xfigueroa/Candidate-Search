import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import Candidate from '../interfaces/Candidate.interface.tsx';

const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);

  useEffect(() => {
    searchGithub().then((data) => {
      if (Array.isArray(data)) {
        setCandidates(data);
      } else {
        console.error("Invalid data format received:", data);
      }
    });
  }, []);
  
  
  

  const handleSaveCandidate = () => {
    const selectedCandidate = candidates[currentCandidateIndex];
  
    if (selectedCandidate) {
      const storedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
  
      const updatedCandidates = [...storedCandidates, selectedCandidate];
  
      localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  
      setSavedCandidates(updatedCandidates);
    }
  
    setCurrentCandidateIndex(currentCandidateIndex + 1);
  };
  
  // Cargar candidatos guardados al iniciar
  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setSavedCandidates(storedCandidates);
  }, []);
  

  const handleSkipCandidate = () => {
    if (currentCandidateIndex < candidates.length) {
    setCurrentCandidateIndex(currentCandidateIndex + 1);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Candidate Search</h1>
  
      {candidates.length > 0 && currentCandidateIndex < candidates.length ? (
        <div 
          className='candidate' 
          style={{ 
            border: "1px solid #ddd", 
            padding: "20px", 
            borderRadius: "10px", 
            maxWidth: "400px", 
            margin: "auto", 
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)" 
          }}
        >
          <img 
            src={candidates[currentCandidateIndex].avatar_url} 
            alt={candidates[currentCandidateIndex].login} 
            style={{ width: "100px", borderRadius: "50%" }}
          />
          <h2>{candidates[currentCandidateIndex].name || "No Name Available"}</h2>
          <p><strong>Username:</strong> {candidates[currentCandidateIndex].login}</p>
          <p><strong>Location:</strong> {candidates[currentCandidateIndex].location || "Not Available"}</p>
          <p><strong>Company:</strong> {candidates[currentCandidateIndex].company || "Not Available"}</p>
          <a 
            href={candidates[currentCandidateIndex].html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            View GitHub Profile
          </a>
          <br />
          <button 
            className='save-button' 
            onClick={handleSaveCandidate}
            style={{ margin: "10px", padding: "10px", background: "green", color: "white", border: "none", borderRadius: "5px" }}
          >
            +
          </button>
          <button 
            className='reject-button' 
            onClick={handleSkipCandidate}
            style={{ margin: "10px", padding: "10px", background: "red", color: "white", border: "none", borderRadius: "5px" }}
          >
            -
          </button>
        </div>
      ) : (
        <p>No candidates found or end of list.</p>
      )}
    </div>
  );
}
  

export default CandidateSearch;