import './styles.css';
import { Button } from 'antd';

const EditorPage = () => {
  return (
    <section className="editor">
      <h1 className="heading">Editor Page</h1>

      <Button
        type="primary"
        size={'large'}
        href={process.env.REACT_APP_EDITOR_PAGE_URL}
        target={'_blank'}
      >
        Go to the Editor Page
      </Button>
    </section>
  );
};

export default EditorPage;
