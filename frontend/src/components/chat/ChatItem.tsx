import {
  EllipsisVerticalIcon,
  PaperClipIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import React, { useState } from "react";
import { deleteOneOnOneChat } from "../../api";
import { useAuth } from "../../context/AuthContext";
import { ChatListItemInterface } from "../../interfaces/chat";
import { classNames, getChatObjectMetadata, requestHandler } from "../../utils";
import GroupChatDetailsModal from "./GroupChatDetailsModal";

const ChatItem: React.FC<{
  chat: ChatListItemInterface;
  onClick: (chat: ChatListItemInterface) => void;
  isActive?: boolean;
  unreadCount?: number;
  onChatDelete: (chatId: string) => void;
}> = ({ chat, onClick, isActive, unreadCount = 0, onChatDelete }) => {
  const { user } = useAuth();
  const [openOptions, setOpenOptions] = useState(false);
  const [openGroupInfo, setOpenGroupInfo] = useState(false);

  // Define an asynchronous function named 'deleteChat'.
  const deleteChat = async () => {
    await requestHandler(
      //  A callback function that performs the deletion of a one-on-one chat by its ID.
      async () => await deleteOneOnOneChat(chat._id),
      null,
      // A callback function to be executed on success. It will call 'onChatDelete'
      // function with the chat's ID as its parameter.
      () => {
        onChatDelete(chat._id);
      },
      // The 'alert' function (likely to display error messages to the user.
      alert
    );
  };

  if (!chat) return;
  return (
    <>
      <GroupChatDetailsModal
        open={openGroupInfo}
        onClose={() => {
          setOpenGroupInfo(false);
        }}
        chatId={chat._id}
        onGroupDelete={onChatDelete}
      />
      <div
        role="button"
        onClick={() => onClick(chat)}
        onMouseLeave={() => setOpenOptions(false)}
        className={classNames(
          "p-4 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-700 flex items-center gap-3 group",
          isActive ? "bg-gray-200 dark:bg-gray-700" : "",
          unreadCount > 0
            ? "font-bold"
            : ""
        )}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpenOptions(!openOptions);
          }}
          className="self-center p-1 relative"
        >
          <EllipsisVerticalIcon className="h-6 group-hover:w-6 group-hover:opacity-100 w-0 opacity-0 transition-all ease-in-out duration-100" />
          <div
            className={classNames(
              "z-20 text-left absolute bottom-0 translate-y-full text-sm w-52 rounded-2xl p-2 shadow-md bg-gray-200",
              openOptions ? "block" : "hidden"
            )}
          >
            {chat.isGroupChat ? (
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenGroupInfo(true);
                }}
                role="button"
                className="p-4 w-full rounded-lg inline-flex items-center hover:bg-gray-100"
              >
                <InformationCircleIcon className="h-4 w-4 mr-2" /> About group
              </p>
            ) : (
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  const ok = confirm(
                    "Are you sure you want to delete this chat?"
                  );
                  if (ok) {
                    deleteChat();
                  }
                }}
                role="button"
                className="p-4 text-danger rounded-lg w-full inline-flex items-center hover:bg-gray-100"
              >
                <TrashIcon className="h-4 w-4 mr-2" />
                Delete chat
              </p>
            )}
          </div>
        </button>
        <div className="flex justify-center items-center flex-shrink-0">
          {chat.isGroupChat ? (
            <div className="w-12 relative h-12 flex-shrink-0 flex justify-start items-center flex-nowrap">
              {chat.participants.slice(0, 3).map((participant, i) => {
                return (
                  <img
                    key={participant._id}
                    src={participant.avatar.url}
                    className={classNames(
                      "w-8 h-8 border-[1px] border-white rounded-full absolute outline outline-4 outline-dark group-hover:outline-secondary",
                      i === 0
                        ? "left-0 z-[3]"
                        : i === 1
                        ? "left-2.5 z-[2]"
                        : i === 2
                        ? "left-[18px] z-[1]"
                        : ""
                    )}
                  />
                );
              })}
            </div>
          ) : (
            <img
              src={getChatObjectMetadata(chat, user!).avatar}
              className="w-12 h-12 rounded-full"
            />
          )}
        </div>
        <div className="w-full">
          <p className="truncate-1">
            {getChatObjectMetadata(chat, user!).title}
          </p>
          <div className="w-full inline-flex items-center text-left">
            {chat.lastMessage && chat.lastMessage.attachments.length > 0 ? (
              // If last message is an attachment show paperclip
              <PaperClipIcon className="h-3 w-3 mr-2 flex flex-shrink-0" />
            ) : null}
            <small className="truncate-1 text-sm text-ellipsis inline-flex items-center">
              {getChatObjectMetadata(chat, user!).lastMessage}
            </small>
          </div>
        </div>
        <div className="flex h-full text-sm flex-col justify-between items-end">
          <small className="mb-2 inline-flex flex-shrink-0 w-max">
            {moment(chat.updatedAt).add("TIME_ZONE", "hours").fromNow(true)}
          </small>

          {/* Unread count will be > 0 when user is on another chat and there is new message in a chat which is not currently active on user's screen */}
          {unreadCount <= 0 ? null : (
            <span className="bg-success h-2 w-2 aspect-square flex-shrink-0 p-2 text-white text-xs rounded-full inline-flex justify-center items-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatItem;
