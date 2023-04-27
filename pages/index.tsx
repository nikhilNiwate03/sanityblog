import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Header from "@/components/Header";
import MediumIcon from "../public/assets/medium_icon.png";
import { FaBlog } from "react-icons/fa";
import { sanityClient, urlFor } from "../sanity.js";
import { Post } from "@/typings";
import Link from "next/link";
import { SiBloglovin } from "react-icons/si";

const inter = Inter({ subsets: ["latin"] });

interface IPostProps {
  posts: [Post];
}

export default function Home({ posts }: IPostProps) {
  return (
    <div>
      <Head>
        <title>Blog Medium</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Header />

      <div className="flex border-y border-black items-center justify-around bg-yellow-400 max-w-7xl mx-auto py-10 ">
        <div className="px-10 space-y-5 ">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{" "}
            is a place to write,read and connect
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect
            with millions of readers
          </h2>
        </div>

        <div className="hidden md:inline-flex lg:h-full p-10 ">
          <SiBloglovin size={200} cursor={"pointer"} />
        </div>
      </div>
      {/* Posts */}
      <div className="grid grid-col-1 sm:grid-col-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 max-w-7xl mx-auto">
        {posts.map((post) => {
          return (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="border rounded-lg group cursor-pointer overflow-hidden">
                <img
                  className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                  src={urlFor(post.mainImage).url()!}
                  alt={post.title}
                />
                <div className="flex justify-between p-5 bg-white">
                  <div>
                    <p className="text-lg font-bold">{post.title}</p>
                    <p className="text-xs">
                      <span className="text-ellipsis overflow-hidden">
                        {post.description}
                      </span>{" "}
                      by {post.author.name}
                    </p>
                  </div>
                  <img
                    className="h-11 w-11 rounded-full object-cover"
                    src={urlFor(post.author.image).url()!}
                    alt={post.author.name}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug  
 }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
