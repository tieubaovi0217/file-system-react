import './styles.css';

import { useState, useEffect, useCallback } from 'react';
import { Divider } from 'antd';

import ConferenceList from './ConferenceList';
import axios from 'axios';
import { buildPath } from 'common/helpers';
import ConferenceHeading from './ConferenceHeading';
import ConferenceActions from './ConferenceActions';

const ConferencePage = () => {
  const [conferences, setConferences] = useState([]);

  const getConferences = useCallback(async () => {
    try {
      const resp = await axios.get(buildPath('/user/conferences'), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });
      console.log(resp);
      setConferences(resp.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getOnlineConference = useCallback(async () => {
    try {
      const resp = await axios.get(buildPath('/conference'), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });
      console.log(resp);
      setConferences(resp.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getConferences();
  }, [getConferences]);

  const handleGetOwnConferences = () => {
    getConferences();
  };

  const handleGetOnlineConferences = () => {
    getOnlineConference();
  };

  return (
    <div className="conferences">
      <ConferenceHeading />
      <ConferenceActions
        onShowOwnConferences={handleGetOwnConferences}
        onShowOnlineConferences={handleGetOnlineConferences}
        onRefresh={getConferences}
      />
      <Divider dashed></Divider>
      <ConferenceList conferences={conferences} onRefresh={getConferences} />
    </div>
  );
};

export default ConferencePage;
