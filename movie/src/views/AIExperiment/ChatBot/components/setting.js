import React, { useEffect, useState } from 'react';
import { checkApiKey } from '../utils/checkKeys';
import Styles from '../index.module.scss'

const Setting = ({ modalOpen, setModalOpen }) => {
    const apiKey = window.localStorage.getItem('api-key') || '';
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [input, setInput] = useState('');

    const saveKey = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        const keys = input;

        await checkApiKey(keys)
            .then(() => {
                window.localStorage.setItem('api-key', keys);
                console.log('works');
                setModalOpen(false);
            })
            .catch((e) => {
                console.log(e);
                console.log(keys);
                console.log('doesnt work');
                setErrorMsg('error: incorrect keys');
            });

        setLoading(false);
    };

    const removeApiKey = () => {
        window.localStorage.removeItem('api-key');
        setInput('');
    };

    useEffect(() => {
        if (modalOpen) {
            setInput(apiKey);
        }
    }, [apiKey, modalOpen]);

    return (
        <form
            onSubmit={saveKey}
            className={`${Styles['flex']} ${Styles['flex-col']} ${Styles['items-center']} ${Styles['justify-center']} ${Styles['gap-2']}`}>
            <p className={`${Styles['text-lg']} ${Styles['font-semibold']}`}>Use your own API-key.</p>
            <p>keys are saved in your own browser</p>
            <p className={`${Styles['italic']}`}>
                Get OpenAI API key{' '}
                <a
                    className={`${Styles['text-blue-600']}`}
                    rel='noreferrer'
                    target='_blank'
                    href='https://platform.openai.com/account/api-keys'>
                    here
                </a>
                .
            </p>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type='password'
                className={`${Styles['w-full']} ${Styles['max-w-xs']} ${Styles['input']} ${Styles['input-bordered']}`}
            />
            <button disabled={loading} className={`${Styles['w-full']} ${Styles['max-w-xs']} ${Styles['btn']} ${Styles['btn-outline']}`}>
                {loading ? (
                    <span className={`${Styles['w-56']} ${Styles['progress']} ${Styles['progress-info']}`} />
                ) : (
                    'save to localStorage'
                )}
            </button>
            {apiKey && input && (
                <span
                    onClick={removeApiKey}
                    disabled={loading}
                    className={`${Styles['w-full']} ${Styles['max-w-xs']} ${Styles['btn']} ${Styles['btn-error']}`}>
                    remove keys
                </span>
            )}
            <p>{errorMsg}</p>
        </form>
    );
};

export default Setting;