import { useState, useCallback } from "react"
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: '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'
});

const userCache = new Map();

export function useFetchProfile() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (username) => {
    try {
      if (userCache.get(username)) {
        setData((userCache.get(username).profile));
        console.log(`%c✨ Loading ${username} cached profile data from memory...`, "color:yellow; font-size: 12px;");
        return (userCache.get(username)).profile;
      }

      setIsLoading(true);
      const profile = await octokit.request('GET /users/{username}', {
        username: username,
      });
      setData(profile);
      console.log(`%c🚀 Loading ${username} profile data from server... `, "color:yellow; font-size: 12px;");
      setIsLoading(false);
      userCache.set(username, { profile });
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
      console.log(`%c🚀🗂️ Loading ${username} repositories data from server...`, "color:yellow; font-size: 12px");

      const linkHeader = response.headers.link;

      setRemaining(linkHeader && linkHeader.includes(`rel=\"next\"`));

      if (linkHeader && linkHeader.includes(`rel=\"next\"`)) {
        setURL(linkHeader.match(nextPattern)[0]);
      }

      setIsLoading(false);
      return parsedData;
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
