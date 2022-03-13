import './index.css';
import { Divider } from 'antd';

import FileBrowserHeader from './FileBrowserHeader';
import FileBrowserContent from './FileBrowserContent';
import FileBrowserFooter from './FileBrowserFooter';

const FileBrowser = () => {
  return (
    <div className="file-browser">
      <FileBrowserHeader />
      <Divider />
      <FileBrowserContent />
      <Divider />
      <FileBrowserFooter />
    </div>
  );
};

export default FileBrowser;
