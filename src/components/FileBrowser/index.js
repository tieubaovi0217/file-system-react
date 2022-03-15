import './index.css';
import { Divider } from 'antd';

import FileBrowserHeader from './FileBrowserHeader';
import FileBrowserContent from './FileBrowserContent';
import FileBrowserActions from './FileBrowserActions';

const FileBrowser = () => {
  return (
    <div className="file-browser">
      <FileBrowserActions />
      {/* <Divider /> */}
      <FileBrowserHeader />
      {/* <Divider /> */}
      <FileBrowserContent />
    </div>
  );
};

export default FileBrowser;
