import React, { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from 'next/head'
// You need to import getStaticPaths if you're using getStaticPros in a dynamic page.

export default function MeetupDetails(props) {
  console.log("props are " + props.meetupData);

  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}/>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://cluster0:Password95@cluster0.cuhicor.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); //Empty means all fields, but since we only need id

  client.close();
  return {
    // fallback to true or blocking tell NodeJS that there might be more paths that are specified.
    // Instead of showing 404, it fetches the path and store it in cache and regenerate whenever needed. 
    fallback: blocking,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // You can use context to get params. Cannot use useRouter().
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://cluster0:Password95@cluster0.cuhicor.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  }); //Empty means all fields, but since we only need id
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
