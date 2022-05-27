import './styles.css';

import { useState, useEffect } from 'react';
import { Divider } from 'antd';

import ConferenceList from './ConferenceList';
import axios from 'axios';
import { buildPath } from 'common/helpers';
import ConferenceHeading from './ConferenceHeading';
import ConferenceActions from './ConferenceActions';

const ConferencePage = () => {
  const [conferences, setConferences] = useState([]);

  useEffect(() => {
    const getConferences = async () => {
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
    };

    getConferences();
  }, []);

  return (
    <div className="conferences">
      <ConferenceHeading />
      <ConferenceActions />
      <Divider dashed></Divider>
      <ConferenceList conferences={conferences} />
    </div>
  );
};

export default ConferencePage;
