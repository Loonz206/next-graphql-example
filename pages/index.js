/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from "react";
import Head from "next/head";
import Image from "next/image";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import HelloWorld from "../src/components/HelloWorld";

export default function Home({ users }) {
  const renderUsers = users.map(({ id, login, avatar_url }) => {
    return (
      <div
        key={id}
        className="tile"
        style={{
          border: "1px solid black",
          padding: "10px",
          margin: "10px",
          flex: "2",
          borderRadius: "8px",
        }}
      >
        <h3>{login}</h3>
        <Image
          style={{ height: "auto", width: "100%", display: "block" }}
          src={avatar_url}
          alt={avatar_url + `images`}
        />
      </div>
    );
  });
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello Next</h1>
      <HelloWorld />
      <div className="container" style={{ display: "flex", flexWrap: "wrap" }}>
        {renderUsers}
      </div>
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
