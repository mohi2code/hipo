import { useState, useCallback } from "react"
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: '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'
});

export function useFetchProfile() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (username) => {
    try {
      setIsLoading(true);
      const profile = await octokit.request('GET /users/{username}', {
        username: username,
      });
      setData(profile);
      setIsLoading(false);
      return profile;
    } catch (error) {
      setIsLoading(false);
      setError(error);
      throw error;
    }
  };

  return {
    data,
    error,
    isLoading,
    execute: useCallback(execute, [])
  };
}

const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;

export function useFetchRepos() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [url, setURL] = useState('');
  const [remaining, setRemaining] = useState(true);
  

  const execute = async (username) => {  
    if (!remaining)
      return;

    try {
      setIsLoading(true);
      const response = await octokit.request('GET ' + (url ? url : `/users/${username}/repos`), {
        per_page: 2
      });

      const parsedData = parseData(response.data);
      setData([...data, ...parsedData]);

      const linkHeader = response.headers.link;

      setRemaining(linkHeader && linkHeader.includes(`rel=\"next\"`));

      if (linkHeader && linkHeader.includes(`rel=\"next\"`)) {
        setURL(linkHeader.match(nextPattern)[0]);
      }

      setIsLoading(false);
      return [...data, ...parsedData];
    } catch (error) {
      setIsLoading(false);
      setError(error);
      throw error;
    }
  };

  return {
    data,
    error,
    isLoading,
    remaining,
    execute: useCallback(execute, [data, remaining, url])
  };
}

function parseData(data) {
  if (Array.isArray(data)) {
    return data
  }

  if (!data) {
    return []
  }

  delete data.incomplete_results;
  delete data.repository_selection;
  delete data.total_count;

  const namespaceKey = Object.keys(data)[0];
  data = data[namespaceKey];
  
  return data;
}
