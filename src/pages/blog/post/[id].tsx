import PostCard from '~/components/post-card';
import { useBreadcrumb } from '~/lib/use-breadcrumb';
import React from 'react';
import PageHead from '~/components/page-head';
import { Post, PostHeader, MicrocmsReqHeader, PostDetail } from '~/types/index';

export interface OutputGetBlogByID {
    props: PostHeader & MicrocmsReqHeader & PostDetail;
}

type blogIdPaths = `/blog/post/${string}`;

const BlogPostId = (props: PostHeader & MicrocmsReqHeader & PostDetail): JSX.Element => {
    useBreadcrumb([
        {
            id: 1,
            text: 'Home',
            href: '/',
        },
        {
            id: 2,
            text: 'Blog',
            href: '/blog',
        },
        {
            id: 3,
            text: props.title,
        },
    ]);

    return (
        <>
            <PageHead
                subtitle={`${props.title}`}
                description={`Blog detail page`}
                image={``}
                url={``}
            ></PageHead>
            <PostCard props={props} />
        </>
    );
};

export const getStaticProps = async (context: {
    params: { id: string };
}): Promise<OutputGetBlogByID> => {
    const res = await fetch(
        `${process.env.MYDOMAIN_BASEURL}/api/blog?${new URLSearchParams(context.params)}`,
        {
            method: 'GET',
        }
    );
    const content = await res.json();
    return {
        props: content,
    };
};

export const getStaticPaths = async (): Promise<{
    paths: blogIdPaths[];
    fallback: boolean;
}> => {
    const res = await fetch(`${process.env.MYDOMAIN_BASEURL}/api/blog`, {
        method: 'GET',
    });
    const json = await res.json();

    const paths = json.contents.map((c: Post) => `/blog/post/${c.id}` as blogIdPaths);

    return { paths, fallback: false };
};

export default BlogPostId;
