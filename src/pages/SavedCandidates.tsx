import React, { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface.tsx';

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setSavedCandidates(storedCandidates);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Potential Candidates</h1>

      {savedCandidates.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {savedCandidates.map((candidate) => (
            <li key={candidate.id} style={{ marginBottom: "20px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
              <img src={candidate.avatar_url} alt={candidate.name} style={{ width: "80px", borderRadius: "50%" }} />
              <h2>{candidate.name || "No Name Available"}</h2>
              <p><strong>Username:</strong> {candidate.login}</p>
              <p><strong>Location:</strong> {candidate.location || "Not Available"}</p>
              <p><strong>Company:</strong> {candidate.company || "Not Available"}</p>
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer" style={{ color: "#007bff", textDecoration: "none" }}>
                View GitHub Profile
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No candidates have been saved yet.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
