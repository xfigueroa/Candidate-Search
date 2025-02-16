const searchGithub = async () => {
  try {
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    if (!token) {
      throw new Error("GitHub token is missing!");
    }

    console.log("Using GitHub Token:", token); // Debugging

    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(`https://api.github.com/users?since=${start}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    // 📌 Imprimir la respuesta cruda antes de convertir a JSON
    const text = await response.text();
    console.log("Raw API Response:", text);

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return JSON.parse(text);
  } catch (err) {
    console.error("Error fetching GitHub users:", err);
    return [];
  }
};


const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    // console.log('an error occurred', err);
    return {};
  }
};

export { searchGithub, searchGithubUser };
