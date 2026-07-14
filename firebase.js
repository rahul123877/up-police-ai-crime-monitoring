import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
    getFirestore,
    collection,
    onSnapshot,
    deleteDoc,
    updateDoc,
    doc,
    query,
    orderBy,
    getDocs,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

/* ---------------- FIREBASE CONFIG ---------------- */

const firebaseConfig = {
    apiKey: "AIzaSyC8aoQxs8QuweHroIsNSH9tL5DyTMa3JBg",
    authDomain: "ai-crime-monitoring.firebaseapp.com",
    projectId: "ai-crime-monitoring",
    storageBucket: "ai-crime-monitoring.firebasestorage.app",
    messagingSenderId: "1006416656939",
    appId: "1:1006416656939:web:ea42ff5c576b3b60af486e",
    measurementId: "G-8J2VBLW3LX"
};

/* ---------------- INITIALIZE APP ---------------- */

const app = initializeApp(firebaseConfig);

/* ---------------- SERVICES ---------------- */

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

/* ---------------- COLLECTIONS ---------------- */

const reportsRef = collection(db, "reports");
const usersRef = collection(db, "policeUsers");

/* ---------------- FIRESTORE FUNCTIONS ---------------- */

const listenReports = (callback) => {
    const q = query(reportsRef, orderBy("time", "desc"));
    return onSnapshot(q, callback);
};

const addReport = async (data) => {
    return await addDoc(reportsRef, data);
};

const deleteReport = async (id) => {
    return await deleteDoc(doc(db, "reports", id));
};

const updateStatus = async (id, status) => {
    return await updateDoc(doc(db, "reports", id), {
        status
    });
};

const getUsers = async () => {
    const snap = await getDocs(usersRef);
    return snap.docs.map((d) => ({
        id: d.id,
        ...d.data()
    }));
};

/* ---------------- STORAGE ---------------- */

const uploadFile = async (file, path) => {
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
};

/* ---------------- EXPORT ---------------- */

export {
    app,
    db,
    auth,
    storage,
    reportsRef,
    usersRef,
    listenReports,
    addReport,
    deleteReport,
    updateStatus,
    getUsers,
    uploadFile
};