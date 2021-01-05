import React from "react";
import Head from "next/head";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function Home(props) {
  console.log(props);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello Next</h1>
    </div>
  );
}

export async function getServerSideProps() {
  // do something to get local graphql..
  const client = new ApolloClient({
    uri: `http://localhost:3000/api/graphql`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      {
        getUsers {
          id
          login
          avatar_url
        }
      }
    `,
  });

  return {
    props: {
      // set serverside props
      users: data.getUsers,
    },
  };
}
