import NewMeetupForm from "../components/meetups/NewMeetupForm";
import { Fragment } from "react";
import Head from "next/head";

export default function NewMeetUpPage() {
  async function addMeetUpHandler(enteredMeetUpData) {
    const response = await fetch("/api/newmeetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetUpData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const data = await response.json()
    try {
      console.log("response is" + response);
      const data = await response.json();
      console.log("data is");
      console.log("data is" + data);
      return res.send("Updated");
    } catch (error) {
      console.log("error is" + error);
    }
  }
  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking oppertunities."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetUpHandler} />
    </Fragment>
  );
}
