import Date from '~/components/date';
import Link from 'next/link';
import TagList from '~/components/tag_list';
import { Post } from '~/types/index';
import { ReactNode } from 'react';

type CardProps = {
    props: Post;
};

type CardOutsideProps = {
    children?: ReactNode;
    action?: boolean;
};

export const CardOutside = ({ children, action = true }: CardOutsideProps): JSX.Element => {
    const style = action ? 'hover:bg-blue-300 active:bg-blue-500' : '';

    return (
        <div className={`w-full flex flex-col p-3 text-gray-500`}>
            <div
                className={`cursor-pointer p-2 bg-blue-200 rounded-lg shadow-lg flex-1 flex flex-col ${style}`}
            >
                <div className={`p-4 rounded-lg  bg-white`}>{children}</div>
            </div>
        </div>
    );
};

const Card = ({ props }: CardProps): JSX.Element => {
    return (
        <Link href={`/blog/post/${props.id}`} key={props.id}>
            <a>
                <CardOutside>
                    <header className="bg-cover">
                        <h3 className="mb-4 text-2xl">{props.title}</h3>
                        <div className="mb-4 text-grey-darker text-sm flex-1">
                            <Date dateString={props.createdAt} />
                        </div>
                        <TagList list={props.tagList} title={props.title} />
                    </header>
                    <main className="p-4 flex-1 flex flex-col">
                        <p>{props.summary}</p>
                    </main>
                </CardOutside>
            </a>
        </Link>
    );
};
export default Card;
