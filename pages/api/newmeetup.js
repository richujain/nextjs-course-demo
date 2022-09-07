// Code in this api route runs only on server.
// Never exposed to client. Safe to use credentials.

import { MongoClient } from "mongodb";

// The function we define here will be triggered when a request is send to api/newmeetup
async function handler(req, res) {
    if(req.method === 'POST'){
        try{
            const data = req.body
            //const { title, image, address, description } = data
            // Mongo Client returns a promise. So change is to awake and make the parents function async. 
            const client = await MongoClient.connect('mongodb+srv://cluster0:Password95@cluster0.cuhicor.mongodb.net/?retryWrites=true&w=majority')
            const db = client.db()
            // Collections => Table, Documents => Entries
            const meetupsCollection = db.collection('meetups')
            // result will be the automatically generated ID
            const result = await meetupsCollection.insertOne(data)
            console.log(result)
            client.close;
    
            // res.status(201).json({message: 'Meetup inserted!'})
        } catch(err){
            res.status(err).json({})
        }
        
    } else{
        res.status(405)
        res.end
    }
}

export default handler;