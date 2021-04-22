import React from 'react';
import styled from 'styled-components';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import InfoIcon from '@material-ui/icons/Info';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Message from './Message';

function Chat() {
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection('room').doc(roomId)
  );

  const [roomMessages] = useCollection(
    roomId &&
      db
        .collection('room')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
  );

  console.log(roomDetails?.data());
  console.log(roomMessages);

  return (
    <ChatContainer>
      <>
        <Header>
          <HeaderLeft>
            <h4>
              <strong>#{roomDetails?.data().name}</strong>
            </h4>
            <StarBorderIcon />
          </HeaderLeft>
          <HeaderRight>
            <p>
              <InfoIcon /> Details
            </p>
          </HeaderRight>
        </Header>

        <ChatMessage>
          {roomMessages?.docs.map(doc => {
            const { message, timestamp, user, userImage } = doc.data();

            return (
              <Message
                key={doc.id}
                message={message}
                timestamp={timestamp}
                user={user}
                userImage={userImage}
              />
            );
          })}
        </ChatMessage>
        <ChatInput channelName={roomDetails?.data().name} channelId={roomId} />
      </>
    </ChatContainer>
  );
}

export default Chat;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const ChatMessage = styled.div``;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;
