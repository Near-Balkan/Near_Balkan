import React, { useContext, useState } from 'react';
import { useComment } from '../hooks/useComment';
import { useFetchComments } from '../hooks/usefetchComments';
import { UserContext } from '../App'

import { FaLock } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Comments = ({ id, movie }) => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const {user} = useContext(UserContext);
  const [newComment, setNewComment] = useState('');

  const { comments } = useFetchComments(id);
  const { insertComment, deleteComment } = useComment(`films/${id}/comments`);

  const commentHandler = (e) => {
    e.preventDefault();

    if (newComment === '') {
      return;
    }
    const commentData = {
      order: comments.length + 1,
      userId: user?.uid,
      username: user?.displayName,
      comments: newComment,
    };
    insertComment(commentData);
    setNewComment('');
  };

  const formatterHU = new Intl.DateTimeFormat("hu-HU", {
    year: "numeric",
    // month: "long",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric"
  });

  const formatterEN = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric"
  });

  return (
    <section className='flex flex-col gap-2 rounded-md bg-teal-700 px-7 py-5'>
      <h3 className="text-lg font-semibold font-h2-title text-nbgreylight opacity-70">{t("comments.comments")}</h3>
      {comments
        ?.sort((a, b) => b.order - a.order)
        .map((comment, index) => (
          <>
            {user && (user?.uid || "none") === comment.userId && (
              <>
                {comment.userId !== movie.userId && (
                  <div className='py-1 flex flex-col items-end' key={index}>
                    <Link
                      to=""
                      className='flex flex-row items-center gap-1.5 group/button max-w-fit'>
                      {comment.user?.profilePicture ? (
                        <img
                          src={comment.user?.profilePicture}
                          alt='user'
                          className='rounded-full w-full max-w-4 h-full min-h-4 max-h-4 aspect-1'
                        />
                      ) : (
                        <button type="button"
                          className="group-hover/button:bg-nbgreenmain group-active/button:bg-nbgreenlight group-disabled/button:bg-nbgreymiddark flex justify-center items-end gap-1 bg-nbgreydark rounded-full w-4 h-4 -translate-y-px overflow-hidden select-none peer">
                          <svg
                            className="group-hover/button:fill-nbgreenlight group-active/button:fill-nbgreenmain group-disabled/button:fill-nbgreymain transition-all fill-nbgreymain"
                            xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M11.7571 0.951111C8.62515 0.951111 6.06264 4.14002 6.06264 8.0692C6.06264 11.9984 8.62515 15.1873 11.7571 15.1873C14.8891 15.1873 17.4516 11.9984 17.4516 8.0692C17.4516 4.14002 14.8891 0.951111 11.7571 0.951111ZM5.80639 15.1873C2.78832 15.3297 0.368164 17.8068 0.368164 20.8818V23.729H23.1461V20.8818C23.1461 17.8068 20.7544 15.3297 17.7078 15.1873C16.1703 16.9241 14.0634 18.0345 11.7571 18.0345C9.45085 18.0345 7.3439 16.9241 5.80639 15.1873Z" />
                          </svg>
                        </button>)}
                      <h3
                        className="group-hover/button:text-nbgreenmain group-active/button:text-nbgreenlight group-disabled/button:text-nbgreylight max-w-fit font-bold font-h2-title text-xs text-left text-nbgreylight truncate leading-none tracking-tight cursor-pointer">
                        {comment.user?.firstName + ' ' + comment.user?.lastName || 'unknown user'}</h3>
                    </Link>
                    <div className='flex items-center justify-end gap-1 rounded-full bg-nbgreenmain mt-1 pl-3 pr-1 w-5 min-w-fit hover:rounded-lg text-wrap max-w-96 text-ellipsis group cursor-default'>
                      <p className='w-full py-1 overflow-hidden text-sm text-gray-700 font-semibold break-words font-p-paragraph group-hover:line-clamp-none line-clamp-1'>
                        {comment.comments}
                      </p>
                      <p
                        onClick={() => deleteComment(comment.id)}
                        className='text-2xl cursor-pointer text-red-500 hover:text-nbredlight'
                      >
                        <TiDelete />
                      </p>
                    </div>
                  </div>
                )}
                {comment.userId === movie.userId && (
                  <div className='my-1 p-4 flex flex-col items-end bg-nbgreydark rounded-lg pt-2 @container/update' key={index}>
                    <div class="flex flex-col @[255px]/update:justify-between @[255px]/update:items-center gap-x-2 @[255px]/update:flex-row pb-2 w-full">
                      <h3 className="text-base font-semibold font-h2-title text-nbgreylight opacity-70">{t("comments.update-by-creator")}</h3>
                      {/* <div class="bg-nbgreymain hidden sm:block opacity-75 rounded-full w-1 h-1"></div> */}
                      <h4 class="font-bold font-h3-subtitle text-xs text-nbgreymain opacity-70 tracking-tighter">{i18n.language === 'en' && (formatterEN.format(new Date(comment.createdAt.seconds * 1000)).replace(',', '') || 'unknown time')} {i18n.language === 'hu' && (formatterHU.format(new Date(comment.createdAt.seconds * 1000)).replace(' ', '').replace(' ', '') || 'unknown time')}</h4>
                    </div>
                    <Link
                      to=""
                      className='flex flex-row items-center gap-1.5 group/button max-w-fit'>
                      {comment.user?.profilePicture ? (
                        <img
                          src={comment.user?.profilePicture}
                          alt='user'
                          className='rounded-full w-full max-w-4 h-full min-h-4 max-h-4 aspect-1'
                        />
                      ) : (
                        <button type="button"
                          className="group-hover/button:bg-nbgreenmain group-active/button:bg-nbgreenlight group-disabled/button:bg-nbgreymiddark flex justify-center items-end gap-1 bg-nbgreydark rounded-full w-4 h-4 -translate-y-px overflow-hidden select-none peer">
                          <svg
                            className="group-hover/button:fill-nbgreenlight group-active/button:fill-nbgreenmain group-disabled/button:fill-nbgreymain transition-all fill-nbgreymain"
                            xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M11.7571 0.951111C8.62515 0.951111 6.06264 4.14002 6.06264 8.0692C6.06264 11.9984 8.62515 15.1873 11.7571 15.1873C14.8891 15.1873 17.4516 11.9984 17.4516 8.0692C17.4516 4.14002 14.8891 0.951111 11.7571 0.951111ZM5.80639 15.1873C2.78832 15.3297 0.368164 17.8068 0.368164 20.8818V23.729H23.1461V20.8818C23.1461 17.8068 20.7544 15.3297 17.7078 15.1873C16.1703 16.9241 14.0634 18.0345 11.7571 18.0345C9.45085 18.0345 7.3439 16.9241 5.80639 15.1873Z" />
                          </svg>
                        </button>)}
                      <h3
                        className="group-hover/button:text-nbgreenmain group-active/button:text-nbgreenlight group-disabled/button:text-nbgreylight max-w-fit font-bold font-h2-title text-xs text-left text-nbgreylight truncate leading-none tracking-tight cursor-pointer">
                        {comment.user?.firstName + ' ' + comment.user?.lastName || 'unknown user'}</h3>
                    </Link>
                    <div className='flex items-center justify-start gap-1 rounded-full bg-nbgreenmain mt-1 pl-3 pr-1 w-5 min-w-fit hover:rounded-lg text-wrap max-w-96 text-ellipsis group cursor-default'>
                      <p className='w-full py-1 overflow-hidden text-sm text-gray-700 font-semibold break-words font-p-paragraph group-hover:line-clamp-none line-clamp-1'>
                        {comment.comments}
                      </p>
                      <p
                        onClick={() => deleteComment(comment.id)}
                        className='text-2xl cursor-pointer text-red-500 hover:text-nbredlight'
                      >
                        <TiDelete />
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
            {(user?.uid || "none") !== comment.userId && (
              <>
                {comment.userId !== movie.userId && (
                  <div className='py-1 flex flex-col items-start' key={index}>
                    <Link
                      to=""
                      className='flex flex-row items-center gap-1.5 group/button max-w-fit'>
                      {comment.user?.profilePicture ? (
                        <img
                          src={comment.user?.profilePicture}
                          alt='user'
                          className='rounded-full w-full max-w-4 h-full min-h-4 max-h-4 aspect-1'
                        />
                      ) : (
                        <button type="button"
                          className="group-hover/button:bg-nbgreenmain group-active/button:bg-nbgreenlight group-disabled/button:bg-nbgreymiddark flex justify-center items-end gap-1 bg-nbgreydark rounded-full w-4 h-4 -translate-y-px overflow-hidden select-none peer">
                          <svg
                            className="group-hover/button:fill-nbgreenlight group-active/button:fill-nbgreenmain group-disabled/button:fill-nbgreymain transition-all fill-nbgreymain"
                            xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M11.7571 0.951111C8.62515 0.951111 6.06264 4.14002 6.06264 8.0692C6.06264 11.9984 8.62515 15.1873 11.7571 15.1873C14.8891 15.1873 17.4516 11.9984 17.4516 8.0692C17.4516 4.14002 14.8891 0.951111 11.7571 0.951111ZM5.80639 15.1873C2.78832 15.3297 0.368164 17.8068 0.368164 20.8818V23.729H23.1461V20.8818C23.1461 17.8068 20.7544 15.3297 17.7078 15.1873C16.1703 16.9241 14.0634 18.0345 11.7571 18.0345C9.45085 18.0345 7.3439 16.9241 5.80639 15.1873Z" />
                          </svg>
                        </button>)}
                      <h3
                        className="group-hover/button:text-nbgreenmain group-active/button:text-nbgreenlight group-disabled/button:text-nbgreylight max-w-fit font-bold font-h2-title text-xs text-left text-nbgreylight truncate leading-none tracking-tight cursor-pointer">
                        {comment.user?.firstName + ' ' + comment.user?.lastName || 'unknown user'}</h3>
                    </Link>
                    <div className='flex items-center justify-start gap-1 rounded-full bg-nbgreenlight mt-1 px-3 w-5 min-w-fit hover:rounded-lg text-wrap max-w-96 text-ellipsis group cursor-default'>
                      <p className='w-full py-1 overflow-hidden text-sm text-gray-700 font-semibold break-words font-p-paragraph group-hover:line-clamp-none line-clamp-1'>
                        {comment.comments}
                      </p>
                    </div>
                  </div>
                )}
                {comment.userId === movie.userId && (
                  <div className='my-1 p-4 flex flex-col items-start bg-nbgreydark rounded-lg pt-2 @container/update' key={index}>
                    <div class="flex flex-col @[255px]/update:justify-between @[255px]/update:items-center gap-x-2 @[255px]/update:flex-row pb-2 w-full">
                      <h3 className="text-base font-semibold font-h2-title text-nbgreylight opacity-70">{t("comments.update-by-creator")}</h3>
                      {/* <div class="bg-nbgreymain hidden sm:block opacity-75 rounded-full w-1 h-1"></div> */}
                      <h4 class="font-bold font-h3-subtitle text-xs text-nbgreymain opacity-70 tracking-tighter">{i18n.language === 'en' && (formatterEN.format(new Date(comment.createdAt.seconds * 1000)).replace(',', '') || 'unknown time')} {i18n.language === 'hu' && (formatterHU.format(new Date(comment.createdAt.seconds * 1000)).replace(' ', '').replace(' ', '') || 'unknown time')}</h4>
                    </div>
                    <Link
                      to=""
                      className='flex flex-row items-center gap-1.5 group/button max-w-fit'>
                      {comment.user?.profilePicture ? (
                        <img
                          src={comment.user?.profilePicture}
                          alt='user'
                          className='rounded-full w-full max-w-4 h-full min-h-4 max-h-4 aspect-1'
                        />
                      ) : (
                        <button type="button"
                          className="group-hover/button:bg-nbgreenmain group-active/button:bg-nbgreenlight group-disabled/button:bg-nbgreymiddark flex justify-center items-end gap-1 bg-nbgreydark rounded-full w-4 h-4 -translate-y-px overflow-hidden select-none peer">
                          <svg
                            className="group-hover/button:fill-nbgreenlight group-active/button:fill-nbgreenmain group-disabled/button:fill-nbgreymain transition-all fill-nbgreymain"
                            xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M11.7571 0.951111C8.62515 0.951111 6.06264 4.14002 6.06264 8.0692C6.06264 11.9984 8.62515 15.1873 11.7571 15.1873C14.8891 15.1873 17.4516 11.9984 17.4516 8.0692C17.4516 4.14002 14.8891 0.951111 11.7571 0.951111ZM5.80639 15.1873C2.78832 15.3297 0.368164 17.8068 0.368164 20.8818V23.729H23.1461V20.8818C23.1461 17.8068 20.7544 15.3297 17.7078 15.1873C16.1703 16.9241 14.0634 18.0345 11.7571 18.0345C9.45085 18.0345 7.3439 16.9241 5.80639 15.1873Z" />
                          </svg>
                        </button>)}
                      <h3
                        className="group-hover/button:text-nbgreenmain group-active/button:text-nbgreenlight group-disabled/button:text-nbgreylight max-w-fit font-bold font-h2-title text-xs text-left text-nbgreylight truncate leading-none tracking-tight cursor-pointer">
                        {comment.user?.firstName + ' ' + comment.user?.lastName || 'unknown user'}</h3>
                    </Link>
                    <div className='flex items-center justify-start gap-1 rounded-full bg-nbgreenlight mt-1 px-3 w-5 min-w-fit hover:rounded-lg text-wrap max-w-96 text-ellipsis group cursor-default'>
                      <p className='w-full py-1 overflow-hidden text-sm text-gray-700 font-semibold break-words font-p-paragraph group-hover:line-clamp-none line-clamp-1'>
                        {comment.comments}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        ))
      }
      {
        user ? (
          <form className='flex justify-between gap-2 pt-2' onSubmit={commentHandler}>
            <input
              value={newComment || ''}
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
              type='text'
              placeholder={t("comments.write-your-comment")}
              className='peer-hover/anchor:text-nbgreenmain peer-active/anchor:text-nbgreenlight peer-disabled/anchor:text-nbgreenlight border-0 focus:border-0 active:border-0 m-0 p-0 px-3 font-a-anchor font-semibold text-base text-nbgreydark hover:text-nbgreenlight focus:text-nbgreenmain active:text-nbgreenlight placeholder:text-nbgreydark placeholder:focus:text-nbgreymain leading-5 tracking-tight transition-all ring-0 active:ring-0 focus:ring-0 focus:underline placeholder:no-underline decoration-nbgreenlight decoration-2 overflow-visible placeholder:hover:text-nbgreenlight placeholder:active:text-nbgreenlight w-full rounded-full bg-nbgreymain focus:bg-nbgreydark'
            />
            <button type='submit' value='Send' class="peer/anchor bg-nbgreymain hover:bg-nbgreenmain active:bg-nbgreenlight disabled:bg-nbgreenlight px-3 py-2 rounded-full min-w-fit min-h-fit transition-all select-none group/button focus:outline-none focus:ring focus:ring-nbgreenmain">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4 group-hover/button:stroke-nbgreenlight group-active/button:stroke-nbgreenmain group-disabled/button:stroke-nbgreymiddark stroke-nbgreydark m-auto translate-x-px">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </button>
          </form>
        ) : (
          <div className="flex justify-between gap-2 pt-2">
            <input
              value={newComment || ''}
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
              type='text'
              placeholder={t("comments.log-in-to-write")}
              className='peer-hover/anchor:text-nbgreenmain peer-active/anchor:text-nbgreenlight peer-disabled/anchor:text-nbgreenlight border-0 focus:border-0 active:border-0 m-0 p-0 px-3 font-a-anchor font-semibold text-base text-nbgreydark hover:text-nbgreenlight focus:text-nbgreenmain active:text-nbgreenlight placeholder:text-nbgreydark placeholder:focus:text-nbgreymain leading-5 tracking-tight transition-all ring-0 active:ring-0 focus:ring-0 focus:underline placeholder:no-underline decoration-nbgreenlight decoration-2 overflow-visible placeholder:hover:text-nbgreenlight placeholder:active:text-nbgreenlight w-full rounded-full bg-nbgreymain focus:bg-nbgreydark'
            />
            <Link to='/login' value='Send' class="peer/anchor bg-nbgreymain hover:bg-nbgreenmain active:bg-nbgreenlight disabled:bg-nbgreenlight px-3 py-2 rounded-full min-w-fit min-h-fit transition-all select-none group/button focus:outline-none focus:ring focus:ring-nbgreenmain">
              <FaLock className='mt-[-2px] translate-y-px h-3 text-nbgreydark' />
            </Link>
          </div>
        )}
    </section >
  );
};

export default Comments;
