import React from 'react';
import { useBreadcrumb } from '~/lib/use-breadcrumb';
import Card from '~/components/card';
import PageHead from '~/components/page-head';
import { NextPageContext } from 'next';
import SearchInput from '~/components/search-input';
import { Post } from '~/types/index';

type BlogSearchProps = {
    contents: Post[];
    hitCount: number;
    keyword: string | string[];
};

const BlogSearch = ({ contents, hitCount, keyword }: BlogSearchProps): JSX.Element => {
    useBreadcrumb([
        {
            id: 1,
            text: 'Home',
            href: '/',
        },
        {
            id: 2,
            text: 'Blog',
            href: `/blog/search?keyword=${keyword}`,
        },
        {
            id: 3,
            text: `"${String(keyword)}"`,
        },
    ]);

    return (
        <div>
            <PageHead
                subtitle={`Blog page. search for "${String(keyword)}"`}
                description={`Blog list`}
                image={``}
                url={``}
            />
            <SearchInput />
            <div className="text-blue-500">
                {`Blog page. search for "${String(keyword)}". ${hitCount} hits.`}
            </div>
            {contents.map((content) => (
                <Card props={content} key={content.id} />
            ))}
        </div>
    );
};

export const getServerSideProps = async (params: NextPageContext) => {
    const { keyword } = params.query;
    const res = await fetch(
        `${process.env.MYDOMAIN_BASEURL}/api/blog?${new URLSearchParams({
            keyword: String(keyword),
        })}`,
        {
            method: 'GET',
        }
    );
    const json = await res.json();
    const { contents, hitCount } = json;

    return {
        props: {
            contents,
            hitCount,
            keyword,
        },
    };
};

export default BlogSearch;
