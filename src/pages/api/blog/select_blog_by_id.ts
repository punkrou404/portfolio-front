import highlightjs from 'highlight.js';
import matter from 'gray-matter';
import marked from 'marked';
import { BlogError, PostHeader, MicrocmsReqHeader, PostDetail } from '~/pages/api/types';
import { MICROCMS_GET_HEADER } from '~/lib/const';

interface InputSelectBlogById {
    id: string | string[];
}

export interface OutputSelectBlogById extends PostHeader, MicrocmsReqHeader, PostDetail {}

export const selectBlogById = async ({
    id,
}: InputSelectBlogById): Promise<OutputSelectBlogById> => {
    console.log(`[getBlogByID] start`);
    console.log(`[getBlogByID]Query parameter validation start`);

    if (!id) {
        throw {
            status: 400,
            message: `Bad Request. "id" is required.`,
        } as BlogError;
    }

    console.log(`[getBlogByID]Query parameter validation end`);
    console.log(`[getBlogByID]Get content by id start`);
    const urls = `${process.env.MICROCMS_BASEURL}/blog/${id}`;
    console.log(`[getBlogByID]API urls: ${urls}`);
    const result = await fetch(urls, MICROCMS_GET_HEADER);
    const json = await result.json();

    console.log(`[getBlogByID]Get content by id end`);
    console.log(`[getBlogByID]Parsed HTML for markdown start`);

    marked.setOptions({
        highlight: (code, lang) => highlightjs.highlightAuto(code, [lang]).value,
        pedantic: false,
        gfm: true,
        breaks: true,
        silent: false,
    });
    const matterResult = matter(json.body);
    const contentHtml = marked(matterResult.content);

    console.log(`[getBlogByID]Parsed HTML for markdown end`);
    console.log(`[getBlogByID]Calcurate time to finish reading start`);

    const onlyContentString = /<("[^"]*"|'[^']*'|[^'">])*>/g;
    const time2FinishReading =
        Math.floor(contentHtml.replace(onlyContentString, '').length / 500) || 1;

    console.log(`[getBlogByID]Calcurate time to finish reading end`);
    console.log(`[getBlogByID]Response setting start`);

    const res = Object.assign(
        {
            contentHtml,
            time2FinishReading,
        },
        json as MicrocmsReqHeader,
        matterResult.data as PostHeader
    );

    console.log(`[getBlogByID]Response setting end`);
    console.log(`[getBlogByID] end`);

    return res;
};
