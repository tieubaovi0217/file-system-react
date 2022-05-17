import './styles.css';

import axios from 'axios';
import { Button } from 'antd';
import { useEffect } from 'react';

const ConferencePage = () => {
  function parse(event) {
    try {
      return JSON.parse(event.data);
    } catch (error) {
      return null;
    }
  }

  function displayIframe() {
    document.getElementById('frame').hidden = false;
  }

  // function openIframe() {
  //   document.getElementById('frame').hidden = true;
  // }

  useEffect(() => {
    const subdomain = process.env.REACT_APP_API_READY_PLAYER_ME_SUB_DOMAIN; // Replace with your custom subdomain

    const frame = document.getElementById('frame');

    frame.src = `https://${subdomain}.readyplayer.me/avatar?frameApi`;

    window.addEventListener('message', subscribe);
    document.addEventListener('message', subscribe);

    function subscribe(event) {
      const json = parse(event);

      if (json?.source !== 'readyplayerme') {
        return;
      }

      // Susbribe to all events sent from Ready Player Me once frame is ready
      if (json.eventName === 'v1.frame.ready') {
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
        document.getElementById(
          'avatarUrl',
        ).innerHTML = `Avatar URL: ${json.data.url}`;

        // send avatar url to save
        axios.post(
          `${process.env.REACT_APP_API_URL}/user/save-avatar-url`,
          { avatarUrl: json.data.url },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
          },
        );

        document.getElementById('frame').hidden = true;
      }

      // Get user id
      if (json.eventName === 'v1.user.set') {
        console.log(
          `User with id ${json.data.id} set: ${JSON.stringify(json)}`,
        );
      }
    }

    return () => {
      window.removeEventListener('message', subscribe);
      document.removeEventListener('message', subscribe);
    };
  }, []);

  return (
    <section className="conference">
      <h1>Conference Page</h1>
      <Button type="primary" size={'large'}>
        <a
          href="https://localhost:8443/test1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to the conference
        </a>
      </Button>
      {/* <h2>Ready Player Me iframe example</h2>
      <ul>
        <li>Click "Open Ready Player Me" button.</li>
        <li>
          Create an avatar and hit the "Done" button when you're finished
          customizing your avatar.
        </li>
        <li>
          This parent page will receive the url to the avatar when it is
          created.
        </li>
        <li>
          URL will be displayed, and Ready Player Me window will be closed.
        </li>
      </ul>
      <p class="warning">
        If you are a Ready Player Me partner, don't forget to replace 'demo' in
        the iframe source url with your partner subdomain.
      </p> */}

      <div>
        <Button type="primary" size={'large'} onClick={displayIframe}>
          Open Ready Player Me
        </Button>

        <p id="avatarUrl">Avatar URL:</p>
        <iframe
          id="frame"
          className="frame"
          allow="camera *; microphone *"
          title="ready_player_me"
        ></iframe>
      </div>
    </section>
  );
};

export default ConferencePage;
