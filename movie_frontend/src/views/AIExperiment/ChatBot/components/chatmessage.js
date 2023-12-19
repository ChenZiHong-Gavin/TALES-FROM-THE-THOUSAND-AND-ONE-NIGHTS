import React from 'react';
import { MdComputer } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import moment from 'moment';
import Image from './image';
import person from '../../../../assets/png/chatPerson.png';
import Styles from '../index.module.scss';

/**
 * A chat message component that displays a message with a timestamp and an icon.
 *
 * @param {Object} props - The properties for the component.
 */
const ChatMessage = (props) => {
  const { id, createdAt, text, ai = false, selected } = props.message;

  return (
    <div
      key={id}
      className={`${ai ? Styles['flex-row-reverse'] : ''} ${ai ? Styles['bg-light-white'] : ''} ${Styles.message}`}
    >
      {selected === 'DALL·E' && ai ? (
        <Image url={text} />
      ) : (
        <div className={Styles['message__wrapper']}>
          <ReactMarkdown
            className={`${Styles['message__markdown']} ${ai ? Styles['text-left'] : Styles['text-right']}`}
            children={text}
            remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || 'language-js');
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={oneDark}
                    language={match[1]}
                    PreTag='div'
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}{' '}
                  </code>
                );
              },
            }}
          />

          <div
            className={`${ai ? Styles['text-left'] : Styles['text-right']} ${Styles['message__createdAt']}`}>
            {moment(createdAt).calendar()}
          </div>
        </div>
      )}

      <div className={Styles['message__pic']}>
        {ai ? (
          <div className={Styles['avatar']}>
            <div className={`${Styles['w-8']} ${Styles['border']} ${Styles['rounded-full']}`}>
              <MdComputer className={`${Styles['w-6']} ${Styles['h-full']} ${Styles['mx-auto']}`} />
            </div>
          </div>
        ) : (
          <div className={Styles['avatar']}>
            <div className={`${Styles['w-8']} ${Styles['border']} ${Styles['rounded-full']}`}>
              <img src={person} alt='profile pic' />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;