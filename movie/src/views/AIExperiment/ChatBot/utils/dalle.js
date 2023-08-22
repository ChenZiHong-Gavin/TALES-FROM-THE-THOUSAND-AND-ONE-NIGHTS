import { OpenAI } from 'openai';

export const dalle = async (prompt, key) => {

    const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true })

    // createImage -> images.generate
    const response = await openai.images.generate({
        prompt: `${prompt}`,
        n: 1,
        size: '512x512',
    });


    return response;
};