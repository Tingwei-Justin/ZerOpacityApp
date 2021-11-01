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
    if (req.method == 'POST') {
        var body = req.body;
        cors(req, res).then(() => {
            db.collection('contribution')
                .doc(body.contribution_id)
                .update({
                    user_id: body.user_id,
                    project_id: body.project_id,
                    contributor_comment: body.contributor_comment ?? null, 
                    amount: body.amount, 
                    create_date: new Date(),
                })
                .catch((error) => {
                    console.log(error);
                    res.status(455).json({ msg: 'update contribution error' });
                })
                .then(() => {
                    res.status(200).json({ msg: 'update contribution success' });
                });
        })
    } else {
        res.status(456).json({ msg: 'Wrong http req type' });
    }
}