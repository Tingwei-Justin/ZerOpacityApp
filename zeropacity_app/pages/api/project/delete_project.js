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
            db.collection('project')
                .doc(body.project_id)
                .delete()
                .catch((error) => {
                    console.log(error);
                    res.status(455).json({ msg: 'delete project error' });
                })
                .then(() => {
                    res.status(200).json({ msg: 'delete project success' });
                });
        })
    } else {
        res.status(456).json({ msg: 'Wrong http req type' });
    }
}