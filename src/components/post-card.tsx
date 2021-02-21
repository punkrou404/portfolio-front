import Date from '~/components/date';
import MarkdownPreview from '~/components/markdown-preview';
import TagList from '~/components/tag_list';
import DeprecationAlert from '~/components/deprecation_alert';
import { OutputSelectBlogById } from '~/pages/api/blog/select_blog_by_id';
import { Alert } from '@material-ui/lab';

type PostCardProps = {
    props: OutputSelectBlogById;
};

const PostCard = ({ props }: PostCardProps): JSX.Element => {
    return (
        <div className="w-full flex-col p-3 text-gray-500">
            <div className="p-4 bg-white rounded-lg shadow-lg flex-col">
                <header className="bg-cover">
                    <h3 className="mb-4 text-2xl">{props.title}</h3>
                    <div className="mb-4 text-sm">
                        <DeprecationAlert props={props} />
                    </div>
                    <div className="mb-4 text-sm">
                        {`作成: `}
                        <Date dateString={props.createdAt} />
                    </div>
                    <div className="mb-4 text-sm">
                        {`更新: `}
                        <Date dateString={props.updatedAt} />
                    </div>
                    <div className="pb-4 text-sm">
                        <Alert severity="info">{`このPOSTは約${props.time2FinishReading}分で読めます。`}</Alert>
                    </div>
                    <div>
                        <TagList list={props.tagList} title={props.title} />
                    </div>
                </header>
                <main className="pt-4 flex-col">
                    <div className="pb-4 border-t" />
                    <MarkdownPreview content={props.contentHtml} />
                </main>
                <footer className="pt-4">
                    <div className="pb-4 border-t" />
                    Comment.
                </footer>
            </div>
        </div>
    );
};

export default PostCard;
