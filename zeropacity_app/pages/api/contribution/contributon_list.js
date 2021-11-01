const functions = require("firebase-functions");
const serviceAccount = require("../../../serviceAccountKey.json");
const admin = require('firebase-admin');

import Cors from 'cors'
import initMiddleware from '../../../lib/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(Cors({ methods: ['GET', 'POST', 'OPTIONS'] }))

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const db = admin.firestore();

export default (req, res) => {
    if (req.method == 'GET') {
        var query = req.query;
        cors(req, res).then(() => {
            db.collection('contribution')
                .where("project_id", "==", query.project_id)
                .get()
                .then((querySnapshot) => {
                    var contributons = [];
                    if (!querySnapshot.empty) {
                        querySnapshot.forEach((doc) => {
                            var contribution = doc.data();
                            contribution.contribution_id = doc.id;
                            contributons.push(contribution);
                        });
                    }
                    res.status(200).send(contributons);
                })
                .catch((error) => {
                    console.log(error);
                    res.status(455).json({ msg: 'get project donation information wrong' });
                });
        })
    } else {
        res.status(456).json({ msg: 'Wrong http req type' });
    }
}