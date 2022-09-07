import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from "react";

export default function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meeetups</title>
        <meta name="description" content="Browse a huge list of React meetups!"/>
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   // run only in server, never in the client. Runtime only.
//   const req = context.req
//   const res = context.res

//   return{
//     props: {
//       meetups: DUMMY_MEETUPS,
//     }
//   }
// }

export async function getStaticProps() {
  // This code will never run or execute in the client side, server only. //Build time only.
  // It is executed during build

  const client = await MongoClient.connect(
    "mongodb+srv://cluster0:Password95@cluster0.cuhicor.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    //always returns an object
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10, // You can recreate static page from server every 10 seconds if there are continous requests coming for this particular page. So you can make sure that your data is not older than 10 seconds.
  };
}

// import { useEffect, useState } from "react";
// import MeetupList from "../components/meetups/MeetupList";
// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1200px-Stadtbild_M%C3%BCnchen.jpg?20130611211153",
//     address: "Some Address 5, 12345 Some City",
//     description: "This is a first meetup",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1200px-Stadtbild_M%C3%BCnchen.jpg?20130611211153",
//     address: "Some Address 5, 12345 Some City",
//     description: "This is a second meetup",
//   },
//   {
//     id: "m3",
//     title: "A Third Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1200px-Stadtbild_M%C3%BCnchen.jpg?20130611211153",
//     address: "Some Address 5, 12345 Some City",
//     description: "This is a third meetup",
//   },
//   {
//     id: "m4",
//     title: "A Fourth Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1200px-Stadtbild_M%C3%BCnchen.jpg?20130611211153",
//     address: "Some Address 5, 12345 Some City",
//     description: "This is a fourth meetup",
//   },
// ];

// export default function HomePage() {
//   const [loadedmeetups, setLoadedMeetups] = useState([])
//   useEffect(() => {
//     //send Http request
//     setLoadedMeetups(DUMMY_MEETUPS)
//   }, [])
//   return (
//       <MeetupList meetups={loadedmeetups} />
//   );
// }
