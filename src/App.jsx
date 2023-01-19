import { useState } from 'react'
import { Configuration, OpenAIApi} from "openai"
import {DotLoader} from 'react-spinners'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  //initializing a configuration variable
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setLoading(true);
    const res = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });
    setLoading(false);
    setResult(res.data.data[0].url);
};
  return (
  <div className="app-main">
    <h2>Got an Idea, but looking for an Image?</h2>
    <input 
    className='app-input' 
    placeholder='Type Something to generate an image'
    onChange={(e) => setPrompt(e.target.value)}
    />
    <button className='app-button' onClick={generateImage}>Generate an Image</button>

    {loading ? <DotLoader color={'white'}/> : '' }
    {result != '' ?  <img className="result-image" src={result} alt="Trust me and get your image!!"/> : '' }
  </div>
  );
}

export default App
