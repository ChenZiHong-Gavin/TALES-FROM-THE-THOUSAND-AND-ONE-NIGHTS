import OpenAI from 'openai';
export const checkApiKey = async (keys) => {

  const openai = new OpenAI(
    {
        apiKey: keys,
        dangerouslyAllowBrowser: true
    }
  )

  return openai.models.list();
};