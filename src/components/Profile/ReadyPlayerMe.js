import React, { useEffect } from 'react';

const ReadyPlayerMe = ({ onUpdateAvatar }) => {
  function parse(event) {
    try {
      return JSON.parse(event.data);
    } catch (error) {
      return null;
    }
  }

  // eslint-disable-next-line no-unused-vars
  function displayIframe() {
    document.getElementById('frame').hidden = false;
  }

  // function openIframe() {
  //   document.getElementById('frame').hidden = true;
  // }

  function subscribe(event) {
    const json = parse(event);
    console.log(json?.eventName);

    if (json?.source !== 'readyplayerme') {
      return;
    }

    // Subscribe to all events sent from Ready Player Me once frame is ready
    if (json.eventName === 'v1.frame.ready') {
      // eslint-disable-next-line no-undef
      frame.contentWindow.postMessage(
        JSON.stringify({
          target: 'readyplayerme',
          type: 'subscribe',
          eventName: 'v1.**',
        }),
        '*',
      );
    }

    // Get avatar GLB URL
    if (json.eventName === 'v1.avatar.exported') {
      console.log(`Avatar URL: ${json.data.url}`);

      onUpdateAvatar(json);
    }

    // Get user id
    if (json.eventName === 'v1.user.set') {
      console.log(`User with id ${json.data.id} set: ${JSON.stringify(json)}`);
    }
  }

  useEffect(() => {
    const frame = document.getElementById('frame');

    const subdomain = process.env.REACT_APP_API_READY_PLAYER_ME_SUB_DOMAIN; // Replace with your custom subdomain
    frame.src = `https://${subdomain}.readyplayer.me/avatar?frameApi`;

    window.addEventListener('message', subscribe);
    document.addEventListener('message', subscribe);

    return () => {
      window.removeEventListener('message', subscribe);

      document.removeEventListener('message', subscribe);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <iframe
      id="frame"
      className="frame"
      allow="camera *; microphone *"
      title="ready_player_me"
    ></iframe>
  );
};

export default React.memo(ReadyPlayerMe);
