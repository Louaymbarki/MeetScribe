const firebase = require('firebase/app');
require('firebase/firestore');
const { google } = require('googleapis');
const Dropbox = require('dropbox').Dropbox;
const fetch = require('node-fetch');

class StorageManager {
  constructor() {
    // Firebase setup
    const firebaseConfig = {
      apiKey: 'your_api_key',
      authDomain: 'your_auth_domain',
      projectId: 'your_project_id',
      storageBucket: 'your_storage_bucket',
      messagingSenderId: 'your_messaging_sender_id',
      appId: 'your_app_id',
    };
    firebase.initializeApp(firebaseConfig);
    this.firestore = firebase.firestore();

    // Google setup
    this.googleClient = new google.auth.OAuth2(
      'your_client_id',
      'your_client_secret',
      'your_redirect_uri'
    );
    // Set your Google access token here
    this.googleClient.setCredentials({ access_token: 'your_access_token' });

    // Dropbox setup
    this.dropboxClient = new Dropbox({ accessToken: 'your_dropbox_access_token', fetch });
  }

  async saveToFirestore(documentId, data) {
    try {
      await this.firestore.collection('transcriptions').doc(documentId).set(data);
      console.log('Data saved to Firestore');
    } catch (error) {
      console.error('Error saving data to Firestore:', error);
    }
  }

  async saveToGoogleDrive(folderId, fileName, content) {
    const drive = google.drive({ version: 'v3', auth: this.googleClient });
    const fileMetadata = {
      name: fileName,
      mimeType: 'application/vnd.google-apps.document',
      parents: [folderId],
    };
    const media = {
      mimeType: 'text/plain',
      body: content,
    };

    try {
      await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id',
      });
      console.log('File saved to Google Drive');
    } catch (error) {
      console.error('Error saving file to Google Drive:', error);
    }
  }

  async saveToGoogleDocs(folderId, fileName, content) {
    const docs = google.docs({ version: 'v1', auth: this.googleClient });
    const fileMetadata = {
      name: fileName,
      mimeType: 'application/vnd.google-apps.document',
      parents: [folderId],
    };

    try {
      const { data } = await this.googleClient.drive.files.create({
        resource: fileMetadata,
        fields: 'id',
      });

      const docId = data.id;
      const requests = [
        {
          insertText: {
            location: {
              index: 1,
            },
            text: content,
          },
        },
      ];

      await docs.documents.batchUpdate({
        documentId: docId,
        requestBody: {
          requests,
        },
      });

      console.log('File saved to Google Docs');
    } catch (error) {
      console.error('Error saving file to Google Docs:', error);
    }
  }

  async saveToDropbox(path, content) {
    try {
      await this.dropboxClient.filesUpload({
        path: path,
        contents: content,
      });
      console.log('File saved to Dropbox');
    } catch (error) {
      console.error('Error saving file to Dropbox:', error);
    }
  }
}

const storageManager = new StorageManager();

// Example usage:
// storageManager.saveToFirestore('documentId', { key: 'value' });
// storageManager.saveToGoogleDrive('folderId', 'fileName.txt', 'content');
// storageManager.saveToGoogleDocs('folderId', 'fileName', 'content');
// storageManager.saveToDropbox('/folder/fileName.txt', 'content');

module.exports = StorageManager;