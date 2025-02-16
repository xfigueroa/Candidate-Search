import { useEffect, useState } from "react";
import Candidate from "../interfaces/Candidate.interface.tsx";
import { searchGithub } from "../api/API";

export function useFetch() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    searchGithub().then((data) => {
      setCandidates(data);
    });
  }, []); 

  return { candidates };
}
