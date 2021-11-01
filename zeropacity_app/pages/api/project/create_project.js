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
                .add({
                    user_id: body.user_id,
                    project_name: body.project_name,
                    project_subtitle: body.project_subtitle,
                    description: body.description,
                    budget: body.budget, 
                    public_key: body.public_key ?? null,
                    img_url: body.img_url ?? null,
                    tags: body.tags ?? null,
                    create_date: new Date(),
                })
                .catch((error) => {
                    console.log(error);
                    res.status(455).json({ msg: 'create project error' });
                })
                .then(() => {
                    res.status(200).json({ msg: 'create project success' });
                });
        })
    } else {
        res.status(456).json({ msg: 'Wrong http req type' });
    }
}